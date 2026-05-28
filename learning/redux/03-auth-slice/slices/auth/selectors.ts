/**
 * @file learning/redux/03-auth-slice/slices/auth/selectors.ts
 * Colocated selectors for auth slice state and derived auth flags.
 */

import type { RootState } from "../../store/store";

/** Auth branch of root state. */
export const selectAuthState = (state: RootState) => state.auth;

/** Current auth lifecycle status. */
export const selectAuthStatus = (state: RootState) => state.auth.status;

/** Logged-in user snapshot, or null when unauthenticated. */
export const selectAuthUser = (state: RootState) => state.auth.user;

/** True when Supabase session is mirrored as authenticated in Redux. */
export const selectIsAuthenticated = (state: RootState) =>
  selectAuthStatus(state) === "authenticated";

/** True while hydrating or awaiting a Supabase auth response. */
export const selectIsAuthLoading = (state: RootState) =>
  selectAuthStatus(state) === "loading";

/** Last auth error message, or null. */
export const selectAuthError = (state: RootState) => state.auth.error;
