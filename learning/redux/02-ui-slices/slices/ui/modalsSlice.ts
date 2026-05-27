/**
 * @file learning/redux/02-ui-slices/slices/ui/modalsSlice.ts
 * Redux slice for which modal (if any) is currently active.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ModalsState {
  /** Active modal id, e.g. "create-task" or "project-settings"; null when closed. */
  activeModal: string | null;
}

const initialState: ModalsState = {
  activeModal: null,
};

export const modalsSlice = createSlice({
  name: "ui/modals",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
