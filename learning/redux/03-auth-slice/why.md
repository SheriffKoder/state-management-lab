# Why — Authentication Slice

## The problem

Stages 1–2 wired the store and UI chrome. Stage 3 answers: **how does the app know who is logged in?**

ProjectFlow needs identity in the UI — email in the header, gated panels, contributor vs admin chrome. That information must be **shared across components** and **survive a page refresh**. Local `useState` in the login form cannot do that alone.

## Two layers: Supabase session vs Redux auth snapshot

Auth is split on purpose:

| Layer | Owns | This iteration |
|-------|------|----------------|
| **Supabase** | Session token, refresh, cookie persistence | `signInWithPassword`, `signOut`, `getSession` |
| **Redux `auth` slice** | UI snapshot — `status`, user `id`/`email`, `error` | `authSlice`, selectors, demo panels |

Supabase is the **source of truth** for the session. Redux is a **mirror for React components** — not a second session store.

Redux should **never** hold JWTs or refresh tokens. DevTools, bugs, and third-party scripts should not get access to secrets that belong in HttpOnly cookies.

## Why login/logout still touch Redux (via the listener)

The login form calls **Supabase only** — not `setSession` directly. So why Redux actions at all?

Because many components need auth state:

- Login form vs user panel vs protected panel
- Status strip (`loading`, `authenticated`, error)
- Future stages: RTK Query headers, logout cleanup in listener middleware

`AuthListener` subscribes to `onAuthStateChange` and dispatches `setSession` / `clearSession`. One bridge, one direction:

```
Supabase auth changes → AuthListener → Redux → any component via useAppSelector
```

If every button dispatched slice actions manually, login/logout logic would scatter and drift from Supabase.

## Hydration on page load

Redux starts empty on every full page load. Cookies do not.

Without hydration:

1. User logs in → Redux says `authenticated`
2. User refreshes → Redux resets to `idle` → flash of login form even though cookie is valid

`AuthListener` runs `getSession()` on mount, then stays subscribed. Refresh → cookie read → Redux catches up → protected panel stays visible.

## Why only `id` + `email` in the slice

The UI needs:

- **Who** — email in the user panel
- **Which user** — `id` for future API calls and RLS
- **Lifecycle** — `status` and `error` for loading and failure UX

It does not need the full Supabase `User` object, session expiry, or token strings. Less stored = less leak surface and simpler selectors.

## ProjectFlow connection

| Stage 3 demo | ProjectFlow equivalent |
|--------------|------------------------|
| Login form | Workspace sign-in |
| User email in panel | Contributor / admin identity in chrome |
| Protected panel | Routes and panels requiring a session |
| Session after refresh | User returns tomorrow, still signed in |
| Logout | Clears client mirror; Supabase clears cookie |

Stage 12 adds production hardening (middleware, server enforcement). Stage 3 teaches the **ownership model** and a working client demo.
