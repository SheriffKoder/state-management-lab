/**
 * @file lib/supabase/client.ts
 * Browser Supabase client for client components.
 *
 * Import only from client components or client-only modules — not from
 * Server Components or route layouts.
 */

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const PLACEHOLDER_URL = "your-project-url";
const PLACEHOLDER_KEY = "your-publishable-or-anon-key";

/**
 * True when Supabase URL and publishable key are set to real values.
 * Demo UIs can branch on this instead of crashing at runtime.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  return Boolean(
    url &&
      key &&
      url !== PLACEHOLDER_URL &&
      key !== PLACEHOLDER_KEY,
  );
}

function getSupabaseEnv(): { url: string; key: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    );
  }

  return { url, key };
}

/**
 * Singleton browser client (cached by @supabase/ssr in the browser).
 * Call `isSupabaseConfigured()` first when env may be absent.
 */
export function createClient(): SupabaseClient {
  const { url, key } = getSupabaseEnv();

  return createBrowserClient(url, key);
}
