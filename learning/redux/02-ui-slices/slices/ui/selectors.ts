/**
 * @file learning/redux/02-ui-slices/slices/ui/selectors.ts
 * Colocated selectors for UI slice state and derived layout flags.
 */

import type { RootState } from "../../store/store";

/**
 * Whether the sidebar panel is visible.
 */
export const selectSidebarIsOpen = (state: RootState) =>
  state.ui.sidebar.isOpen;

/**
 * Whether the sidebar is in collapsed (icon-only) mode.
 */
export const selectSidebarIsCollapsed = (state: RootState) =>
  state.ui.sidebar.isCollapsed;

/**
 * Id of the currently open modal, or null when none are open.
 */
export const selectActiveModal = (state: RootState) => state.ui.modals.activeModal;

/**
 * Derived flag — true when any modal is open.
 * Computed from activeModal rather than stored separately.
 */
export const selectIsAnyModalOpen = (state: RootState) =>
  selectActiveModal(state) !== null;
