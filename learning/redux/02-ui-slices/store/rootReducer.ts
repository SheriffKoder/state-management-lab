/**
 * @file learning/redux/02-ui-slices/store/rootReducer.ts
 * Root reducer — registers UI slices under a nested `ui` key.
 *
 * State shape:
 * {
 *   ui: {
 *     sidebar: { isOpen, isCollapsed },
 *     modals: { activeModal },
 *   },
 *   // Stage 3+: auth
 *   // Stage 6+: rtkQuery reducer paths
 * }
 */

import { combineReducers } from "@reduxjs/toolkit";

import { modalsReducer, sidebarReducer } from "../slices/ui";

export const rootReducer = combineReducers({
  ui: combineReducers({
    sidebar: sidebarReducer,
    modals: modalsReducer,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;
