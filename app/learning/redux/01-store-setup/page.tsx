/**
 * @file app/learning/redux/01-store-setup/page.tsx
 * Thin page composer for the Stage 1 store setup learning iteration.
 */

import { StoreSetupDemo } from "@/learning/redux/01-store-setup/ui/store-setup-demo";

export default function StoreSetupPage() {
  return (
    <main className="h-screen bg-background p-8 text-foreground">
      <div className="mx-auto flex flex-col gap-6 border border-foreground/10 rounded-md p-6 h-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            01 — Store Setup
          </h1>
          <p className="text-sm text-foreground/60">
            Configure the store, typed hooks, and a route-scoped Provider.
            Interact below to confirm dispatch and selectors work in the browser.
          </p>
        </div>

        <StoreSetupDemo />
      </div>
    </main>
  );
}
