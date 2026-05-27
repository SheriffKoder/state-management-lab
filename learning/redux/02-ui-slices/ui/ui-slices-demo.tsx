/**
 * @file learning/redux/02-ui-slices/ui/ui-slices-demo.tsx
 * Mini app shell composing sidebar + main content + modal triggers.
 */

"use client";

import {
  selectActiveModal,
  selectSidebarIsCollapsed,
  selectSidebarIsOpen,
  useAppSelector,
} from "@/learning/redux/02-ui-slices/store";

import { DemoModalOverlay, DemoModalTrigger } from "./demo-modal-trigger";
import { DemoSidebar } from "./demo-sidebar";

/**
 * ProjectFlow-style chrome demo — sidebar and modals driven by Redux slices.
 * `relative` scopes modal overlay to this app window, not the viewport.
 */
export function UiSlicesDemo() {
  const isSidebarOpen = useAppSelector(selectSidebarIsOpen);
  const isSidebarCollapsed = useAppSelector(selectSidebarIsCollapsed);
  const activeModal = useAppSelector(selectActiveModal);

  return (
    <div className="relative flex h-full overflow-hidden">
      <DemoSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-foreground/10 px-5 py-3">
          <p className="text-xs uppercase tracking-wide text-foreground/50">
            Stage 2 — UI slices
          </p>
          <h2 className="text-sm font-semibold tracking-tight">
            Client UI state demo
          </h2>
        </header>

        <div className="flex flex-1 flex-col gap-5 overflow-auto p-5">
          <p className="max-w-md text-sm text-foreground/60">
            Sidebar and modal state are shared via Redux slices. Use the controls
            below and watch actions in Redux DevTools.
          </p>

          <DemoModalTrigger />

          <dl className="grid max-w-xs gap-3 rounded-md border border-foreground/10 p-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-foreground/60">Sidebar open</dt>
              <dd className="font-medium">{isSidebarOpen ? "true" : "false"}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-foreground/60">Sidebar collapsed</dt>
              <dd className="font-medium">
                {isSidebarCollapsed ? "true" : "false"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-foreground/60">Active modal</dt>
              <dd className="font-medium">{activeModal ?? "none"}</dd>
            </div>
          </dl>
        </div>
      </div>

      <DemoModalOverlay />
    </div>
  );
}
