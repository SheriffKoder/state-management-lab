/**
 * @file learning/redux/04-async-thunks/slices/projects/projectsSlice.ts
 * Projects slice — async fetch lifecycle via extraReducers on fetchProjects.
 *
 * Sync reducers are minimal; loading/success/error come from the thunk's
 * pending / fulfilled / rejected actions (Step 3).
 */

import { createSlice } from "@reduxjs/toolkit";

import { fetchProjects } from "./projectsThunks";
import type { ProjectsState } from "./types";

const initialState: ProjectsState = {
  items: [],
  status: "idle",
  error: null,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearProjectsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to load projects";
      });
  },
});

export const { clearProjectsError } = projectsSlice.actions;

export const projectsReducer = projectsSlice.reducer;
