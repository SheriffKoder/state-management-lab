/**
 * @file learning/redux/03-auth-slice/ui/auth-slice-demo.tsx
 * Auth demo shell — status strip, login, user panel, protected content.
 */

"use client";

import {
  selectAuthError,
  selectAuthStatus,
  selectIsAuthenticated,
  useAppSelector,
} from "@/learning/redux/03-auth-slice/store";

import { DemoLoginForm } from "./demo-login-form";
import { DemoProtectedPanel } from "./demo-protected-panel";
import { DemoUserPanel } from "./demo-user-panel";

function DemoStatusStrip() {
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);

  return (
    <dl className="mt-3 grid max-w-md gap-2 text-sm">
      <div className="flex items-center justify-between gap-4">
        <dt className="text-foreground/60">Redux auth status</dt>
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

export function AuthSliceDemo() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <header className="shrink-0 border-b border-foreground/10 px-5 py-3">
        <p className="text-xs uppercase tracking-wide text-foreground/50">
          Stage 3 — Auth slice
        </p>
        <h2 className="text-sm font-semibold tracking-tight">
          Supabase session → Redux mirror
        </h2>
        <DemoStatusStrip />
      </header>

      <div className="flex flex-1 flex-col gap-5 overflow-auto p-5">
        {isAuthenticated ? (
          <>
            <DemoUserPanel />
            <DemoProtectedPanel />
          </>
        ) : (
          <DemoLoginForm />
        )}
      </div>
    </div>
  );
}
