/**
 * @file app/learning/redux/03-auth-slice/page.tsx
 * Thin page composer for the Stage 3 auth slice learning iteration.
 */

import { AuthSliceDemo } from "@/learning/redux/03-auth-slice/ui/auth-slice-demo";

export default function AuthSlicePage() {
  return (
    <main className="h-screen bg-background px-4 py-8 text-foreground sm:px-8">
      <div className="mx-auto flex h-full flex-col gap-6 rounded-md border border-foreground/10 p-6">
        <header className="max-w-2xl">
          <h1 className="text-2xl font-semibold tracking-tight">
            03 — Auth Slice
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            Supabase owns the session; Redux mirrors auth UI state — login
            status, user snapshot, errors — for components that need it.
          </p>
        </header>

        <div className="h-full min-h-0 overflow-hidden rounded-lg border border-foreground/10 bg-background shadow-sm">
          <AuthSliceDemo />
        </div>
      </div>
    </main>
  );
}
