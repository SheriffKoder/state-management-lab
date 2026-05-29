/**
 * @file learning/redux/04-async-thunks/store/index.ts
 * Public store API for Stage 4 — async thunks.
 *
 * Server layouts must import StoreProvider from `./store-provider` directly —
 * not this barrel — to avoid evaluating client hooks during RSC prerender.
 */

export { rootReducer } from "./rootReducer";
export { store } from "./store";
export { useAppDispatch, useAppSelector } from "./hooks";
export { StoreProvider } from "./store-provider";
export type { AppDispatch, AppStore, RootState } from "./store";

// Optional exports for convenience — use only in client components.
export {
  clearProjectsError,
  fetchProjects,
  selectHasProjects,
  selectIsProjectsLoading,
  selectProjects,
  selectProjectsError,
  selectProjectsState,
  selectProjectsStatus,
} from "../slices/projects";
