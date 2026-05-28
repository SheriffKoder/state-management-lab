# When to Use — Authentication Slice

## Store user id/email in Redux when

- **Many components** need auth UI state (header, sidebar, gated panels, empty states)
- **Selectors drive layout** — show login vs workspace without prop drilling
- **You want DevTools visibility** into auth transitions (`auth/setSession`, `auth/clearSession`)
- **Other slices or middleware** will react to auth (Stage 9: close modals on logout)
- **Client-side gating is enough for the current feature** — demo panels, conditional chrome

Stage 3 stores a **snapshot**, not the session token.

## Read session directly from Supabase when

- **Performing auth operations** — `signInWithPassword`, `signOut`, OAuth redirect handling
- **One-off checks in an event handler** before a single Supabase call
- **You are the sync layer** — `AuthListener` is the only place that should routinely copy Supabase → Redux

Rule: components call Supabase for **actions**; they read Redux for **display and gating**.

## Redux auth snapshot vs React Context

| Use Redux `auth` slice | Use Context |
|------------------------|-------------|
| Already using Redux across the app | Tiny app, auth is the only global state |
| DevTools, middleware, cross-slice logic matter | No RTK Query or listener middleware planned |
| ProjectFlow-scale chrome + server data in same store | Prototype with login + one page |

Context can work for auth-only apps. This lab uses Redux so auth sits beside `ui` slices and future RTK Query reducers with one mental model.

## Server `getUser()` vs client `useAppSelector`

| Check | Where | Trust level |
|-------|-------|-------------|
| `useAppSelector(selectIsAuthenticated)` | Client component | UX gating — can be bypassed in devtools |
| `supabase.auth.getSession()` in client | Browser | Reads cookie via SDK; good for hydration |
| `createClient()` from `lib/supabase/server.ts` + `getUser()` | Server Component / route handler | **Authoritative** for protected data and redirects |

Stage 3 demo uses **client selector gating** for learning. Production routes that protect data must also check on the server — `lib/supabase/server.ts` is scaffolded for that; Stage 12 goes deeper.

```
Browser request
  → cookies sent automatically
  → server cookies() + getUser()  ← enforce
  → client Redux mirror           ← convenience for UI
```

## Cookie concepts (practical summary)

| Term | One line |
|------|----------|
| **Session cookie** | Browser storage that keeps the user logged in across visits; Supabase sets it on sign-in |
| **HttpOnly** | JavaScript cannot read the cookie — reduces token theft via XSS |
| **Secure** | Cookie only sent over HTTPS (production) |
| **SameSite** | Limits cross-site cookie sending — CSRF mitigation (`Lax` is common) |
| **`cookies()` in Next.js** | Server reads cookies on **this request** — used in `lib/supabase/server.ts` |

You do not set auth cookies manually in Stage 3. `@supabase/ssr` + `supabase-js` manage persistence when you call the Auth API.

## How this fits the 12-stage path

- **Stage 4** — refactor async auth flows to `createAsyncThunk` (optional pattern comparison)
- **Stage 6+** — RTK Query attaches `Authorization` from Supabase session, not from Redux tokens
- **Stage 9** — listener middleware resets UI slices on `clearSession`
- **Stage 12** — middleware refresh, server route protection, safe hydration

Rule: **Supabase owns session. Redux owns UI-facing auth state. Server enforces access.**
