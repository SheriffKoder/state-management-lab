/**
 * @file app/learning/redux/02-ui-slices/page.tsx
 * Thin page composer for the Stage 2 UI slices learning iteration.
 */

import { UiSlicesDemo } from "@/learning/redux/02-ui-slices/ui/ui-slices-demo";

export default function UiSlicesPage() {
  return (
    <main className="h-screen bg-background px-4 py-8 text-foreground sm:px-8">
      <div className="mx-auto flex h-full flex-col gap-6 rounded-md border border-foreground/10 p-6">
        <header className="max-w-2xl">
          <h1 className="text-2xl font-semibold tracking-tight">
            02 — UI Slices
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            Sidebar and modal state via createSlice, actions, and selectors —
            the kind of client UI state ProjectFlow keeps in Redux.
          </p>
        </header>

        <div className="h-full min-h-0 overflow-hidden rounded-lg border border-foreground/10 bg-background shadow-sm">
          <UiSlicesDemo />
        </div>
      </div>
    </main>
  );
}
