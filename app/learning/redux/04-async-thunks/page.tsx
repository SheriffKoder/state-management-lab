/**
 * @file app/learning/redux/04-async-thunks/page.tsx
 * Thin page composer for the Stage 4 async thunks learning iteration.
 */

import { AsyncThunksDemo } from "@/learning/redux/04-async-thunks/ui/async-thunks-demo";

export default function AsyncThunksPage() {
  return (
    <main className="h-screen bg-background px-4 py-8 text-foreground sm:px-8">
      <div className="mx-auto flex h-full flex-col gap-6 rounded-md border border-foreground/10 p-6">
        <header className="max-w-2xl">
          <h1 className="text-2xl font-semibold tracking-tight">
            04 — Async Thunks
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            Async server work via createAsyncThunk — pending, fulfilled, and
            rejected lifecycle wired through extraReducers.
          </p>
        </header>

        <div className="h-full min-h-0 overflow-hidden rounded-lg border border-foreground/10 bg-background shadow-sm">
          <AsyncThunksDemo />
        </div>
      </div>
    </main>
  );
}
