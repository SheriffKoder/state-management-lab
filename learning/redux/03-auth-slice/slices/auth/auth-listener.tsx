/**
 * @file learning/redux/03-auth-slice/slices/auth/auth-listener.tsx
 * Keeps Redux auth state in sync with Supabase — the "bridge" component.
 *
 * ## Two layers (do not confuse them)
 *
 * | Layer    | Owns                         | This file touches it? |
 * |----------|------------------------------|------------------------|
 * | Supabase | Session token, cookies, refresh | Yes — reads via API |
 * | Redux    | UI snapshot (status, email)  | Yes — writes via dispatch |
 *
 * Components read auth from Redux (`useAppSelector`). They never read cookies
 * or JWTs directly. This listener is the only place that copies Supabase
 * session changes into the auth slice.
 *
 * ## When it runs
 *
 * Mounted once in `app/learning/redux/03-auth-slice/layout.tsx`, inside
 * `StoreProvider`, so `useAppDispatch` works. It renders `{children}` unchanged —
 * no UI of its own; think of it as a background sync worker.
 *
 * ## Flow on page load
 *
 * 1. `setLoading()` — UI can show a spinner while we check for an existing session
 * 2. `getSession()` — ask Supabase "is there a cookie/session already?" (e.g. after refresh)
 * 3. `onAuthStateChange()` — subscribe so login/logout *after* load also update Redux
 *
 * Login form and logout button call Supabase directly (`signInWithPassword`, `signOut`).
 * They do NOT dispatch `setSession` themselves — Supabase fires the listener, which does.
 */

"use client";

import { useEffect } from "react";
import type { User } from "@supabase/supabase-js";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAppDispatch } from "../../store/hooks";

import { clearSession, setLoading, setSession } from "./authSlice";
import type { AuthUser } from "./authSlice";

interface AuthListenerProps {
  children: React.ReactNode;
}

/**
 * Supabase returns a full `User` object (metadata, identities, etc.).
 * Redux only stores what the UI needs — id + email — not tokens or raw session.
 */
function toAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email ?? "",
  };
}

/**
 * Invisible wrapper: syncs Supabase → Redux on mount and on every auth change.
 * Must be a child of `StoreProvider`.
 */
export function AuthListener({ children }: AuthListenerProps) {
  const dispatch = useAppDispatch();

  // Runs once when this route's client tree mounts (and cleans up on leave).
  useEffect(() => {
    // No Supabase project configured — skip API calls; demo UI shows setup instructions.
    if (!isSupabaseConfigured()) {
      dispatch(clearSession());
      return;
    }

    // Create a new Supabase client for this component.
    const supabase = createClient();

    // If the user navigates away before async work finishes, ignore stale results.
    let cancelled = false;

    // Step 1 — tell UI we're checking for an existing session (e.g. status strip → "loading").
    dispatch(setLoading());

    /**
     * Step 2 — hydrate: read session from Supabase storage (browser cookies).
     * Without this, a page refresh would leave Redux at initial `idle` even when
     * the user is still logged in.
     */
    const hydrate = async () => {

      // Read session from Supabase storage (browser cookies).
      const { data: { session }, error } = await supabase.auth.getSession();

      // If the user navigates away before async work finishes, ignore stale results.
      if (cancelled) return;

      if (error || !session?.user) {
        // No valid session — show login UI (`status: "unauthenticated"`).
        dispatch(clearSession());
        return;
      }

      // Session exists — mirror user into Redux (`status: "authenticated"`).
      dispatch(setSession(toAuthUser(session.user)));
    };

    // Call the hydrate function to read the session from Supabase storage (browser cookies).
    void hydrate();

    /**
     * Step 3 — subscribe: Supabase notifies us whenever auth changes.
     * Covers login, logout, token refresh, and another tab signing out.
     * Login form calls `signInWithPassword` → Supabase updates session → this fires → Redux updates.
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // If the user navigates away before async work finishes, ignore stale results.
      if (cancelled) return;

      if (session?.user) {
        dispatch(setSession(toAuthUser(session.user)));
      } else {
        dispatch(clearSession());
      }
    });

    // Cleanup: unsubscribe and flag cancelled so in-flight `getSession` can't dispatch after unmount.
    return () => { cancelled = true; subscription.unsubscribe(); };

  }, [dispatch]);

  return children;
}
