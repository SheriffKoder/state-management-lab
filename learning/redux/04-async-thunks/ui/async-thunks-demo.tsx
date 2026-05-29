/**
 * @file learning/redux/04-async-thunks/ui/async-thunks-demo.tsx
 * Async thunks demo shell — status strip and project fetch list.
 */

"use client";

import { DemoProjectList } from "./demo-project-list";
import { DemoStatusStrip } from "./demo-status-strip";

export function AsyncThunksDemo() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <header className="shrink-0 border-b border-foreground/10 px-5 py-3">
        <p className="text-xs uppercase tracking-wide text-foreground/50">
          Stage 4 — Async thunks
        </p>
        <h2 className="text-sm font-semibold tracking-tight">
          fetchProjects → pending / fulfilled / rejected
        </h2>
        <DemoStatusStrip />
      </header>

      <div className="flex flex-1 flex-col gap-5 overflow-auto p-5">
        <DemoProjectList />
      </div>
    </div>
  );
}
