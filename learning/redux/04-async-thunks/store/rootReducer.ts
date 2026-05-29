/**
 * @file learning/redux/04-async-thunks/store/rootReducer.ts
 * Root reducer — registers projects slice at the top level.
 *
 * State shape:
 * {
 *   projects: { items, status, error },
 * }
 */

import { combineReducers } from "@reduxjs/toolkit";

import { projectsReducer } from "../slices/projects";

export const rootReducer = combineReducers({
  projects: projectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
