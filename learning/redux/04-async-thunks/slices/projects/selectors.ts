/**
 * @file learning/redux/04-async-thunks/slices/projects/selectors.ts
 * Colocated selectors for projects slice state and derived fetch flags.
 */

import type { RootState } from "../../store/store";

/** Projects branch of root state. */
export const selectProjectsState = (state: RootState) => state.projects;

/** Loaded project rows (empty until first successful fetch). */
export const selectProjects = (state: RootState) => state.projects.items;

/** Async fetch lifecycle status. */
export const selectProjectsStatus = (state: RootState) => state.projects.status;

/** Last fetch error message, or null. */
export const selectProjectsError = (state: RootState) => state.projects.error;

/** True while fetchProjects pending action is in flight. */
export const selectIsProjectsLoading = (state: RootState) =>
  selectProjectsStatus(state) === "loading";

/** True after a successful fetch with at least one project. */
export const selectHasProjects = (state: RootState) =>
  selectProjects(state).length > 0;
