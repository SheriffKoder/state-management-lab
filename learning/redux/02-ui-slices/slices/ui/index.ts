/**
 * @file learning/redux/02-ui-slices/slices/ui/index.ts
 * Public UI slice exports for Stage 2.
 */

// Modals slice
export {
  closeModal,
  modalsReducer,
  modalsSlice,
  openModal,
} from "./modalsSlice";
export type { ModalsState } from "./modalsSlice";

// Selectors
export {
  selectActiveModal,
  selectIsAnyModalOpen,
  selectSidebarIsCollapsed,
  selectSidebarIsOpen,
} from "./selectors";

// Sidebar slice
export {
  sidebarReducer,
  sidebarSlice,
  setSidebarOpen,
  toggleSidebar,
  toggleSidebarCollapsed,
} from "./sidebarSlice";
export type { SidebarState } from "./sidebarSlice";
