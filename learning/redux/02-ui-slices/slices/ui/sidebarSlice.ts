/**
 * @file learning/redux/02-ui-slices/slices/ui/sidebarSlice.ts
 * Redux slice for shared sidebar chrome state (open + collapsed).
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
}

const initialState: SidebarState = {
  isOpen: true,
  isCollapsed: false,
};

export const sidebarSlice = createSlice({
  name: "ui/sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    toggleSidebarCollapsed: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, toggleSidebarCollapsed } =
  sidebarSlice.actions;

export const sidebarReducer = sidebarSlice.reducer;
