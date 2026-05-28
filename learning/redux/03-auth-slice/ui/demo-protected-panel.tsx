/**
 * @file learning/redux/03-auth-slice/ui/demo-protected-panel.tsx
 * Client-gated content — only renders when Redux reports authenticated.
 */

"use client";

import {
  selectIsAuthenticated,
  useAppSelector,
} from "@/learning/redux/03-auth-slice/store";

export function DemoProtectedPanel() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-md border border-foreground/10 bg-foreground/[0.02] p-6">
      <p className="text-xs uppercase tracking-wide text-foreground/50">
        Protected panel
      </p>
      <h2 className="mt-1 text-sm font-semibold tracking-tight">
        Workspace content
      </h2>
      <p className="mt-2 text-sm text-foreground/60">
        This block is gated by{" "}
        <code className="text-foreground/80">selectIsAuthenticated</code> — a
        client-side check for learning. Production apps also enforce auth on the
        server.
      </p>
    </div>
  );
}
