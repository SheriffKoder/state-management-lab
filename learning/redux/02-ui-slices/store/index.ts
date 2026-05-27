/**
 * @file learning/redux/02-ui-slices/store/index.ts
 * Public store API for Stage 2 — UI slices.
 *
 * Server layouts must import StoreProvider from `./store-provider` directly —
 * not this barrel — to avoid evaluating client hooks during RSC prerender.
 */

export { rootReducer } from "./rootReducer";
export { store } from "./store";
export { useAppDispatch, useAppSelector } from "./hooks";
export { StoreProvider } from "./store-provider";
export type { AppDispatch, AppStore, RootState } from "./store";

// Optional exports for convenience — use only in client components.
// So all exports are taken from this index.ts file.
export {
  closeModal,
  openModal,
  selectActiveModal,
  selectIsAnyModalOpen,
  selectSidebarIsCollapsed,
  selectSidebarIsOpen,
  setSidebarOpen,
  toggleSidebar,
  toggleSidebarCollapsed,
} from "../slices/ui";
