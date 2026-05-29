/**
 * @file learning/redux/04-async-thunks/slices/projects/index.ts
 * Public projects slice exports.
 */

export { fetchProjects } from "./projectsThunks";
export {
  clearProjectsError,
  projectsReducer,
  projectsSlice,
} from "./projectsSlice";
export type { Project, ProjectsState, ProjectsStatus } from "./types";

export {
  selectHasProjects,
  selectIsProjectsLoading,
  selectProjects,
  selectProjectsError,
  selectProjectsState,
  selectProjectsStatus,
} from "./selectors";
