# Tradeoffs — Authentication Slice

## Redux auth can drift from Supabase

If `AuthListener` unmounts, throws, or never runs, Redux can show `authenticated` while Supabase has cleared the session — or the opposite.

Mitigations:

- Mount `AuthListener` once at layout level (Stage 3 pattern)
- Keep sync logic in **one file** — do not duplicate `setSession` in random components
- On critical server actions, call `getUser()` on the server — do not trust Redux alone

**Smell test:** if a component dispatches `setSession` outside the listener, auth ownership is broken.

## What not to put in the auth slice

| Do store | Do not store |
|----------|----------------|
| `status`, `user.id`, `user.email`, `error` | Access token, refresh token, full `Session` |
| UI loading / error strings | Password, magic link tokens |
| Snapshot for selectors | `user_metadata` used for authorization (user-editable in Supabase) |

Storing JWTs in Redux:

- Exposes secrets in DevTools
- Duplicates Supabase as source of truth
- Creates two places to refresh tokens

## Client-only protection vs server enforcement

Stage 3 `DemoProtectedPanel` uses `selectIsAuthenticated` — **hide UI only**.

| Approach | Pros | Cons |
|----------|------|------|
| Client selector gate | Simple; fast UX; good for learning | Bypassable; no data protection |
| Server `getUser()` + redirect | Real security for routes and APIs | More wiring; RSC boundaries |
| Both | Correct UX + correct security | Two checks to maintain |

ProjectFlow will use **both**: Redux for chrome, server for tasks, comments, and admin actions.

## Hydration timing and loading flashes

On refresh:

1. Redux starts `idle` or previous in-memory state is gone
2. `AuthListener` dispatches `setLoading()`
3. `getSession()` resolves → `authenticated` or `unauthenticated`

Users may briefly see loading or wrong UI if hydration is slow. Stage 12 covers safer patterns; Stage 3 exposes the status strip so the lifecycle is visible.

## `getSession()` and `onAuthStateChange` overlap

Both can fire on load. Slightly redundant but intentional:

- `getSession()` — explicit hydrate after refresh
- `onAuthStateChange` — login, logout, refresh, and tab sync after subscribe

Duplicate `setSession` dispatches with the same user are harmless (idempotent enough for this demo).

## Common mistakes

1. **Dispatching `setSession` from the login form on success** — bypasses Supabase as single writer; use listener
2. **Storing JWT in Redux "for API calls"** — use Supabase client or server client; it attaches tokens from cookies
3. **Skipping `AuthListener` on some routes** — Redux auth stale on those pages
4. **Treating client gate as security** — protected APIs need RLS + server auth
5. **Importing store barrel in server layouts** — pulls client hooks; import `StoreProvider` and `AuthListener` directly
6. **Not handling missing env** — demo uses `isSupabaseConfigured()` to avoid runtime crashes

## Cookie and SSR tradeoffs (short)

- **Browser client** (`lib/supabase/client.ts`) — login, logout, listener; Supabase manages cookies in the browser
- **Server client** (`lib/supabase/server.ts`) — not used in Stage 3 demo yet; needed when RSC must know the user
- **Server Components** may not write cookies — `setAll` in server client wraps try/catch for that reason

## Scaling considerations

- Root shape `{ auth }` leaves room for `ui` and RTK Query paths as siblings
- Stage 9 listener middleware can `closeModal()` and reset chrome on logout
- Stage 4 may compare listener + manual dispatch vs `createAsyncThunk` for the same flows
