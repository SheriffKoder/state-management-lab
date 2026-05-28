# Stage 3 — Authentication Slice

**Status:** Plan for review — not yet executed  
**Master plan:** [`docs/ai-rules/plans/redux/00-initial-plan.md`](./00-initial-plan.md)  
**Prior stage:** [`02-ui-slices.md`](./02-ui-slices.md)  
**Iteration path:** `learning/redux/03-auth-slice`

---

## Goal

Add an **`auth` slice** that mirrors how ProjectFlow will represent **client-side auth UI state** — who is logged in, loading status, errors — while **Supabase owns the real session**.

Stage 3 teaches:

- Supabase Auth (login / logout)
- Session persistence and hydration on load
- Client vs server auth boundaries in Next.js App Router
- What belongs in Redux vs what stays in Supabase/cookies
- Lightweight route / UI protection patterns

**Not** a production auth system yet — that lands in Stage 12. This iteration builds understanding and a working demo.

---

## Scope

### In scope

| Area | What we build |
|------|----------------|
| Shared Supabase | Root `lib/supabase/client.ts` (+ minimal `server.ts` if needed) |
| Auth slice | `createSlice` — status, user snapshot, error |
| Session sync | `onAuthStateChange` listener + initial `getSession` hydration |
| Login / logout | Supabase `signInWithPassword` / `signOut` wired to slice |
| Selectors | `selectIsAuthenticated`, `selectAuthUser`, `selectAuthStatus`, etc. |
| Demo | Login form, user panel, protected vs public areas inside app window |
| Routing | `/learning/redux/03-auth-slice` with standard learning page shell |
| Metadata | Cookie basics, Redux vs session, auth boundaries |
| Progress | Homepage nav + README updates |

### Out of scope (later stages)

- `createAsyncThunk` as the primary async pattern → Stage 4 (Stage 3 uses Supabase callbacks + slice actions; optional note that Stage 4 refactors to thunks)
- RTK Query / server data → Stage 6+
- Cross-slice logout cleanup (close modals, reset UI) → Stage 9
- Full middleware / cookie refresh hardening → Stage 12
- Role-based permissions → ProjectFlow capstone
- Modifying Stage 1 or Stage 2 iterations

---

## ProjectFlow connection

| Stage 3 demo | ProjectFlow equivalent |
|--------------|------------------------|
| Login form | Workspace sign-in |
| User email in header | Contributor / admin identity in chrome |
| Protected panel | App routes requiring authenticated session |
| Session hydration on load | User refreshes page, stays logged in |
| Logout | Clears client auth state; session cookie cleared by Supabase |

**State ownership rule:**

| Layer | Owns |
|-------|------|
| Supabase | Session token, refresh, cookie persistence |
| Redux `auth` slice | UI-facing snapshot — user id/email, status, error message |
| Server (`getUser` / RSC) | Authoritative check for protected server routes (introduced lightly here) |

Redux should **not** become the source of truth for the session token.

---

## Prerequisites

Before executing Stage 3:

1. A **Supabase project** with Email auth enabled
2. `.env.local` populated from [`.env.example`](../../../.env.example):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
3. At least one test user (email + password) in Supabase Auth

Demo must degrade gracefully when env vars are missing (clear message in app window, no crash).

---

## Current repo state (starting point)

- Stages 1–2 complete; `@supabase/ssr` and `@supabase/supabase-js` already in `package.json`
- **No `lib/supabase/` yet** — Stage 3 creates shared client infrastructure
- Stage 2 root shape: `{ ui: { sidebar, modals } }` — Stage 3 iteration is **independent**; auth-only store is acceptable, or minimal `ui` + `auth` combined demo

---

## Target file structure

```bash
lib/supabase/                          # NEW — shared root infrastructure
├── client.ts                          # browser Supabase client (@supabase/ssr)
└── server.ts                          # server client for optional RSC auth read

learning/redux/03-auth-slice/
├── why.md
├── when-to-use.md
├── tradeoffs.md
├── reflection.md
├── store/
│   ├── index.ts
│   ├── store.ts
│   ├── rootReducer.ts                 # { auth } or { ui, auth }
│   ├── hooks.ts
│   └── store-provider.tsx
├── slices/
│   └── auth/
│       ├── index.ts
│       ├── authSlice.ts               # status, user, error
│       ├── selectors.ts
│       └── auth-listener.ts           # onAuthStateChange + hydrate dispatch
└── ui/
    ├── auth-slice-demo.tsx            # demo shell composer (relative root)
    ├── demo-login-form.tsx            # email/password login
    ├── demo-user-panel.tsx            # logged-in user + logout
    └── demo-protected-panel.tsx       # gated content when authenticated

app/learning/redux/03-auth-slice/
├── layout.tsx                         # StoreProvider + AuthListener mount
└── page.tsx                           # standard learning page shell
```

### Design decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Iteration isolation | New folder, new store | Master plan: each stage runs independently |
| Supabase location | Root `lib/supabase/` | Master plan: shared infra only at root |
| Auth slice shape | `{ status, user, error }` | UI needs — not full Session object |
| Async in Stage 3 | Supabase calls + listener dispatches | Defers `createAsyncThunk` to Stage 4 |
| Session source of truth | Supabase / cookies | Redux mirrors for components |
| Root reducer | `{ auth }` primary; optional minimal `ui` | Keeps focus on auth; can show user in header only |
| Route protection demo | Client selector gate + optional server read | Teaches both boundaries without full middleware |
| Page layout | Standard learning shell | [`01-repo-structure.md`](../../01-repo-structure.md) |
| Demo imports | Client UI → `store/` barrel | Same pattern as Stage 2 |

---

## Auth slice design (planned)

### State

```ts
// Conceptual — not final code
type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface AuthUser {
  id: string;
  email: string;
}

interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
  error: string | null;
}
```

### Slice actions (sync)

```ts
setLoading()
setSession(user)      // payload: AuthUser
clearSession()
setError(message)     // payload: string | null
```

### Session sync (`auth-listener.ts`)

On Provider mount (client):

1. Dispatch `setLoading()`
2. Call `supabase.auth.getSession()` — hydrate initial state
3. Subscribe to `supabase.auth.onAuthStateChange` — dispatch `setSession` / `clearSession`

Login form calls `signInWithPassword` — listener updates Redux when Supabase confirms.  
Logout calls `signOut` — same pattern.

### Selectors (examples)

```ts
selectAuthStatus(state)
selectAuthUser(state)
selectIsAuthenticated(state)    // status === "authenticated"
selectIsAuthLoading(state)
selectAuthError(state)
```

---

## Root reducer plan (Stage 3)

```ts
// Conceptual — not final code
rootReducer = combineReducers({
  auth: authReducer,
  // Optional minimal ui if demo includes app chrome:
  // ui: combineReducers({ sidebar, modals }),
  // Stage 6+: rtkQuery reducer paths
})
```

---

## Demo UX (planned)

Inside the standard **app window**:

| Zone | Behavior |
|------|----------|
| **Public area** | Login form when `unauthenticated` |
| **User panel** | Shows email + logout when `authenticated` |
| **Protected panel** | Hidden until `selectIsAuthenticated`; shows “workspace content” placeholder |
| **Status strip** | `idle` / `loading` / error message for learning visibility |

Modal overlay not required unless reusing Stage 2 UI — keep auth-focused.

If Supabase env is missing → show setup instructions card (`max-w-md`) instead of login form.

---

## Cookie & session topics (for metadata)

Stage 3 documentation should explain at a practical level:

| Topic | Why it matters |
|-------|----------------|
| Session cookies | Supabase persists session across refreshes |
| HttpOnly | Tokens not readable by JS — security |
| Secure | HTTPS only in production |
| SameSite | CSRF mitigation |
| `cookies()` in Next.js | Server-side session read in RSC / Route Handlers |

Do not go deeper than needed to understand auth boundaries.

---

## Execution steps

Each step is independently executable. Review and approve one at a time.

### Step 1 — Supabase shared client

Creates root-level Supabase clients so the learning iteration (and future ProjectFlow work) share one setup pattern instead of embedding clients inside Redux files.

Create:

- `lib/supabase/client.ts` — browser client via `@supabase/ssr`
- `lib/supabase/server.ts` — server client (minimal, for optional server auth read)

Verify `.env.example` matches required vars.

**Done when:** clients compile; browser client importable from client components.

---

### Step 2 — Scaffold iteration folder

Creates the Stage 3 folder by copying the store pattern from prior stages and adding `slices/auth/` plus demo placeholders — no auth logic yet.

Create:

- `learning/redux/03-auth-slice/` tree
- `app/learning/redux/03-auth-slice/` with standard learning page shell (placeholder demo)
- Empty metadata placeholders

**Done when:** route loads static placeholder; Stages 1–2 unchanged.

---

### Step 3 — Auth slice

Implements the core auth state machine — the Redux mirror of Supabase session for UI consumption.

Create `slices/auth/authSlice.ts`:

- `createSlice` with `AuthState` above
- sync reducers: `setLoading`, `setSession`, `clearSession`, `setError`
- export actions + `authReducer`

**Done when:** slice compiles; reducer importable.

---

### Step 4 — Auth selectors

Exposes read paths for components and teaches derived auth flags without storing duplicate booleans in state.

Create `slices/auth/selectors.ts`:

- `selectAuthStatus`, `selectAuthUser`, `selectIsAuthenticated`, `selectIsAuthLoading`, `selectAuthError`

Export from `slices/auth/index.ts`.

**Done when:** selectors compile against planned `RootState`.

---

### Step 5 — Root reducer wiring

Registers `auth` at the top level of the store — sibling to future `ui` and RTK Query reducers.

Update `store/rootReducer.ts`:

- `combineReducers({ auth: authReducer })`
- export updated `RootState`

**Done when:** `RootState` includes `auth` shape; TypeScript compiles.

---

### Step 6 — Store + hooks + Provider + listener

Connects the auth slice to React: typed hooks, Provider, and the Supabase listener that keeps Redux in sync with the real session.

Ensure:

- `store/store.ts`, `hooks.ts`, `store-provider.tsx` (Stage 1/2 pattern)
- `slices/auth/auth-listener.tsx` — client component: hydrate + `onAuthStateChange`
- Mount listener inside layout alongside `StoreProvider`
- `store/index.ts` exports auth actions, selectors, hooks

**Done when:** store API complete; listener mounts without SSR errors.

---

### Step 7 — Demo UI

Builds the interactive auth demo inside the standard app window — login, logout, protected panel, status visibility.

Create:

- `demo-login-form.tsx` — email/password, dispatches loading/error, calls Supabase sign-in
- `demo-user-panel.tsx` — shows user email, logout button
- `demo-protected-panel.tsx` — renders when authenticated
- `auth-slice-demo.tsx` — composes panels in `relative h-full` app window

Update `page.tsx` + `layout.tsx` per learning page layout rules.

**Done when:** login/logout works with real Supabase; protected panel gates correctly; DevTools shows auth actions.

---

### Step 8 — Metadata files

Documents auth boundaries, cookie basics, and Redux vs Supabase ownership — required before treating the iteration complete.

| File | Stage 3 focus |
|------|----------------|
| `why.md` | Why auth UI state in Redux; why Supabase owns session; hydration |
| `when-to-use.md` | Redux auth snapshot vs Context vs direct `getSession`; server vs client checks |
| `tradeoffs.md` | Stale Redux auth, duplicating tokens, over-storing session, cookie security summary |
| `reflection.md` | First-person notes after login/logout/refresh testing |

**Done when:** all four files have substantive Stage 3 content.

---

### Step 9 — Homepage + README progress

Marks Stage 3 complete in navigation and README.

Update:

- `lib/homepage-navigation.ts` — `redux-03-auth-slice` → `completed: true`
- `README.md` — check off Stage 3; **Next up:** Stage 4

**Done when:** sidebar shows 25% (3/12); link works.

---

### Step 10 — Verify

Confirms build, lint, auth flows, and that prior stages still work.

```bash
npm run lint
npm run build
```

Manual check:

- login → protected panel visible
- refresh → session hydrates, still authenticated
- logout → protected panel hidden
- missing env → graceful fallback message
- Stages 1–2 routes unchanged

**Done when:** lint and build pass.

---

## Metadata content outline (draft for review)

### why.md — suggested headings

1. Two layers: Supabase session vs Redux auth snapshot
2. Why login/logout still dispatch Redux actions
3. Hydration on page load
4. ProjectFlow: workspace admins vs contributors need identity in UI

### when-to-use.md — suggested headings

1. Store user id/email in Redux when…
2. Read session directly from Supabase when…
3. Server `getUser()` vs client `useAppSelector`
4. Cookie concepts (short practical summary)

### tradeoffs.md — suggested headings

1. Redux auth can drift from Supabase if listener breaks
2. What not to put in the auth slice (tokens, refresh logic)
3. Client-only protection vs server enforcement
4. Common mistakes: storing JWT in Redux, skipping hydration

### reflection.md — suggested prompts

- What surprised me about session persistence after refresh?
- Did Redux feel necessary for auth UI, or could Context suffice?
- What is still unclear before Stage 4 (async thunks)?

---

## Verification checklist

- [ ] `lib/supabase/client.ts` exists at repo root
- [ ] `learning/redux/03-auth-slice/` self-contained
- [ ] `authSlice` with hydration + listener sync
- [ ] Selectors used in demo components
- [ ] Standard learning page shell on route
- [ ] Login / logout / refresh hydration work with Supabase
- [ ] Protected panel gated by selector
- [ ] All four metadata files present
- [ ] Homepage nav + README updated
- [ ] Stages 1–2 unchanged
- [ ] `npm run lint` and `npm run build` pass

---

## Suggested commit message (after full stage completion)

```
feat: add redux stage 3 auth slice iteration

Introduce Supabase-backed auth slice with session hydration, login/logout
demo, and protected UI at /learning/redux/03-auth-slice.
```

---

## How to proceed

After you review this plan:

1. Confirm or request changes — especially async approach (listener vs early thunks), demo scope, env requirements.
2. Ensure Supabase project + `.env.local` are ready before Step 7.
3. Ask to **execute Step 1**, then Step 2, and so on — one step at a time.

No code will be written until you approve execution.
