import { combineReducers, createAction, createReducer } from "@reduxjs/toolkit";

/**
 * Demo-only action for Stage 1 wiring. Removed when real slices land in Stage 2.
 */
export const incrementDemoCount = createAction("demo/increment");

/**
 * Placeholder state until Stage 2 introduces real feature slices.
 * Future shape:
 * - ui (sidebar, modals) — Stage 2
 * - auth — Stage 3
 * - RTK Query reducer paths — Stage 6+
 */
const placeholderInitialState = {
  ready: true,
  count: 0,
};

const placeholderReducer = createReducer(placeholderInitialState, (builder) => {
  builder.addCase(incrementDemoCount, (state) => {
    state.count += 1;
  });
});

export const rootReducer = combineReducers({
  _placeholder: placeholderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
