/**
 * @file learning/redux/03-auth-slice/slices/auth/authSlice.ts
 * Redux mirror of Supabase auth for UI — status, user snapshot, error.
 *
 * Supabase owns the session token; this slice holds what components need
 * to render login chrome, user identity, and protected panels.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated";

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
  error: string | null;
}

const initialState: AuthState = {
  status: "idle",
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = "loading";
      state.error = null;
    },
    setSession: (state, action: PayloadAction<AuthUser>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.error = null;
    },
    clearSession: (state) => {
      state.status = "unauthenticated";
      state.user = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      if (action.payload) {
        state.status = "unauthenticated";
        state.user = null;
      }
    },
  },
});

export const { setLoading, setSession, clearSession, setError } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
