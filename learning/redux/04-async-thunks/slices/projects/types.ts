/**
 * @file learning/redux/04-async-thunks/slices/projects/types.ts
 * Domain types for the projects slice and fetchProjects thunk.
 */

/** Row shape from public.demo_projects (Stage 4 learning table). */
export interface Project {
  id: string;
  name: string;
  status: "active" | "archived";
  created_at: string;
}

/** Async request lifecycle for fetchProjects — wired in extraReducers (Step 4). */
export type ProjectsStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ProjectsState {
  items: Project[];
  status: ProjectsStatus;
  error: string | null;
}
