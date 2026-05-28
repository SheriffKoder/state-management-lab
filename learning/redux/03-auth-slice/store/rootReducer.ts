/**
 * @file learning/redux/03-auth-slice/store/rootReducer.ts
 * Root reducer — registers auth slice at the top level.
 *
 * State shape:
 * {
 *   auth: { status, user, error },
 * }
 */

import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "../slices/auth";

export const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
