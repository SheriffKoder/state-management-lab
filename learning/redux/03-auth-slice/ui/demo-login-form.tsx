/**
 * @file learning/redux/03-auth-slice/ui/demo-login-form.tsx
 * Email/password login — calls Supabase; Redux updates via AuthListener.
 */

"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  setError,
  setLoading,
  useAppDispatch,
} from "@/learning/redux/03-auth-slice/store";

function DemoSetupInstructions() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-md border border-foreground/10 p-6">
      <p className="text-xs uppercase tracking-wide text-foreground/50">
        Setup required
      </p>
      <h2 className="text-sm font-semibold tracking-tight">
        Supabase is not configured
      </h2>
      <p className="text-sm text-foreground/60">
        Copy <code className="text-foreground/80">.env.example</code> to{" "}
        <code className="text-foreground/80">.env.local</code> and set:
      </p>
      <ul className="list-inside list-disc text-sm text-foreground/60">
        <li>
          <code className="text-foreground/80">NEXT_PUBLIC_SUPABASE_URL</code>
        </li>
        <li>
          <code className="text-foreground/80">
            NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
          </code>
        </li>
      </ul>
      <p className="text-sm text-foreground/60">
        Create a test user in Supabase Auth, then refresh this page.
      </p>
    </div>
  );
}

export function DemoLoginForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isSupabaseConfigured()) {
    return <DemoSetupInstructions />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    dispatch(setLoading());

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      dispatch(setError(error.message));
    }

    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-md border border-foreground/10 p-6"
    >
      <div>
        <p className="text-xs uppercase tracking-wide text-foreground/50">
          Public area
        </p>
        <h2 className="mt-1 text-sm font-semibold tracking-tight">Sign in</h2>
        <p className="mt-1 text-sm text-foreground/60">
          Supabase handles auth; AuthListener mirrors the session into Redux.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="demo-auth-email">Email</Label>
        <Input
          id="demo-auth-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="demo-auth-password">Password</Label>
        <Input
          id="demo-auth-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <Button type="submit" size="sm" disabled={submitting}>
        {submitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
