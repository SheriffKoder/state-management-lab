/**
 * @file learning/redux/02-ui-slices/ui/demo-modal-trigger.tsx
 * Modal open/close demo driven by ui/modals slice selectors and actions.
 */

"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  closeModal,
  openModal,
  selectActiveModal,
  selectIsAnyModalOpen,
  useAppDispatch,
  useAppSelector,
} from "@/learning/redux/02-ui-slices/store";

/** Demo modal ids — stand in for ProjectFlow dialogs. */
export const DEMO_MODALS = {
  CREATE_TASK: "create-task",
  PROJECT_SETTINGS: "project-settings",
} as const;

const modalLabels: Record<string, string> = {
  [DEMO_MODALS.CREATE_TASK]: "Create task",
  [DEMO_MODALS.PROJECT_SETTINGS]: "Project settings",
};

/** Buttons that dispatch openModal for each demo dialog. */
export function DemoModalTrigger() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => dispatch(openModal(DEMO_MODALS.CREATE_TASK))}
      >
        Open create task
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => dispatch(openModal(DEMO_MODALS.PROJECT_SETTINGS))}
      >
        Open project settings
      </Button>
    </div>
  );
}

/**
 * Overlay scoped to the app window (`absolute` within a `relative` demo root).
 */
export function DemoModalOverlay() {
  const dispatch = useAppDispatch();
  const isAnyModalOpen = useAppSelector(selectIsAnyModalOpen);
  const activeModal = useAppSelector(selectActiveModal);

  if (!isAnyModalOpen || !activeModal) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        className="w-full max-w-sm rounded-md border border-foreground/10 bg-background p-5 shadow-lg"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/50">
              Active modal
            </p>
            <h2
              id="demo-modal-title"
              className="text-base font-semibold tracking-tight"
            >
              {modalLabels[activeModal] ?? activeModal}
            </h2>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Close modal"
            onClick={() => dispatch(closeModal())}
          >
            <X aria-hidden className="size-4" />
          </Button>
        </div>

        <p className="text-sm text-foreground/60">
          Modal state lives in the ui/modals slice. Opening one modal replaces
          any other — no stack in Stage 2.
        </p>

        <div className="mt-5 flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => dispatch(closeModal())}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
