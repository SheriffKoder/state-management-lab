/**
 * @file learning/redux/04-async-thunks/ui/demo-status-strip.tsx
 * Redux projects request status — visible for learning DevTools correlation.
 */

"use client";

import {
  selectProjectsError,
  selectProjectsStatus,
  useAppSelector,
} from "@/learning/redux/04-async-thunks/store";

export function DemoStatusStrip() {
  const status = useAppSelector(selectProjectsStatus);
  const error = useAppSelector(selectProjectsError);

  return (
    <dl className="mt-3 grid max-w-md gap-2 text-sm">
      <div className="flex items-center justify-between gap-4">
        <dt className="text-foreground/60">Redux fetch status</dt>
        <dd className="font-medium">{status}</dd>
      </div>
      {error ? (
        <div className="flex items-start justify-between gap-4">
          <dt className="text-foreground/60">Error</dt>
          <dd className="max-w-[14rem] text-right text-destructive">{error}</dd>
        </div>
      ) : null}
    </dl>
  );
}
