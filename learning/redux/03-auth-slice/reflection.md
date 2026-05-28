# Reflection — Authentication Slice

Personal notes after completing Stage 3. Write in first person.

---

## What I learned

- Supabase owns the session (cookies, tokens, refresh); Redux only mirrors **UI-facing** auth state
- `AuthListener` is the bridge: `getSession()` on mount + `onAuthStateChange` for login/logout afterward
- Login form calls Supabase; listener dispatches Redux — components read auth via selectors, not cookies
- Hydration matters: without `getSession()`, refresh would flash the login form despite a valid cookie
- `lib/supabase/server.ts` exists for server-side `getUser()` but Stage 3 demo is client-gated only
- Auth slice stores `id` + `email` only — not JWTs or full `Session` objects

---

## What surprised me

- [ ] That refresh kept me logged in without the login form dispatching anything to Redux
- [ ] That `onAuthStateChange` fires like an event listener — Supabase notifies, listener updates Redux
- [ ] That I never touch cookies directly — Supabase + `@supabase/ssr` handle persistence

---

## What felt elegant

- One listener in the layout — any component can `useAppSelector(selectIsAuthenticated)`
- Clear split: Supabase for actions, Redux for display
- Status strip makes `idle` → `loading` → `authenticated` visible while learning
- `toAuthUser()` trimming Supabase `User` down to what the UI needs

---

## What felt painful or unnecessary

- [ ] Both `getSession()` and `onAuthStateChange` on load — overlap, but each has a role
- [ ] Client-only protected panel — fine for learning, but I want server enforcement next

---

## Open questions before Stage 4

- Should login async move into `createAsyncThunk` instead of listener + form?
- When logout lands in Stage 9, should modals auto-close via listener middleware?
- When do I wire `lib/supabase/server.ts` into a real protected route?

---

## Notes after using the demo

Visit `/learning/redux/03-auth-slice`. Sign in, check DevTools for `auth/setSession`. Refresh — still authenticated. Log out — protected panel hides.

```
(refresh / logout — anything unexpected in status strip or hydration timing?)


```
