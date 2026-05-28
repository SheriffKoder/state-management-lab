/**
 * @file learning/redux/03-auth-slice/slices/auth/index.ts
 * Public auth slice exports.
 */

export {
  authReducer,
  authSlice,
  clearSession,
  setError,
  setLoading,
  setSession,
} from "./authSlice";
export type { AuthState, AuthStatus, AuthUser } from "./authSlice";

export {
  selectAuthError,
  selectAuthState,
  selectAuthStatus,
  selectAuthUser,
  selectIsAuthenticated,
  selectIsAuthLoading,
} from "./selectors";

export { AuthListener } from "./auth-listener";
