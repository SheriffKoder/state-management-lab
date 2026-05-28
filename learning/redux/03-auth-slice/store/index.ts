/**
 * @file learning/redux/03-auth-slice/store/index.ts
 * Public store API for Stage 3 — auth slice.
 *
 * Server layouts must import StoreProvider from `./store-provider` directly —
 * not this barrel — to avoid evaluating client hooks during RSC prerender.
 * AuthListener mounts the same way — import from `../slices/auth/auth-listener`.
 */

export { rootReducer } from "./rootReducer";
export { store } from "./store";
export { useAppDispatch, useAppSelector } from "./hooks";
export { StoreProvider } from "./store-provider";
export type { AppDispatch, AppStore, RootState } from "./store";

// Optional exports for convenience — use only in client components.
export {
  clearSession,
  selectAuthError,
  selectAuthState,
  selectAuthStatus,
  selectAuthUser,
  selectIsAuthenticated,
  selectIsAuthLoading,
  setError,
  setLoading,
  setSession,
} from "../slices/auth";
