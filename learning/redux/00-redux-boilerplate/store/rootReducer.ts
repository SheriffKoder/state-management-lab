/**
 * Root reducer — ui.sidebar and ui.modals slices wired in Steps 2–5.
 */

import { combineReducers } from "@reduxjs/toolkit";

/** Temporary scaffold until real slices replace this in Step 5. */
function scaffoldReducer(state = true) {
  return state;
}

export const rootReducer = combineReducers({
  _scaffold: scaffoldReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
