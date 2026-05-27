# When to Use — Store Setup

## Use a Redux store when

- **Multiple distant components** need the same client state (sidebar open, active modal, selected project, auth session snapshot for UI)
- **State updates follow clear events** — user actions, API responses, realtime messages — that should be traceable in DevTools
- **The app will grow** — more features, more cross-feature reads, normalized entities (projects → tasks → comments in ProjectFlow)
- **You need predictable ownership** — one place defines what client state exists and how it changes

Stage 1 itself does not yet justify Redux for the demo counter. The store exists here to **establish infrastructure** before real shared state arrives in Stage 2+.

## Skip Redux when

- State is **local to one component** (input value, hover, open/closed within a single widget)
- State can be **derived** from props, URL, or server data without duplication
- Only **2–3 components** share state and the tree is shallow — Context or lifted state may be enough
- The data is **server-owned** — fetch results, cache invalidation, pagination belong in RTK Query / TanStack Query (Stage 6+), not manual slices

## Alternatives at this stage

| Approach | Good for | Limit |
|----------|----------|-------|
| `useState` | Ephemeral UI in one component | Prop drilling when shared |
| `useReducer` | Local state with structured actions | No global access without Context |
| Context | Theme, auth flag, rare global reads | Re-renders all consumers on any change; awkward for frequent updates |
| Redux Toolkit | Shared client state at scale | Setup cost; must respect client/server boundaries in Next.js |

## How this lab grows the store

Stage 1 defines an empty `_placeholder` reducer. Later stages replace it incrementally:

1. **Stage 2** — `ui` slice (sidebar, modals)
2. **Stage 3** — `auth` slice (session for client UI)
3. **Stage 4** — async thunks for imperative flows
4. **Stage 5** — normalized entities via entity adapter
5. **Stage 6–7** — RTK Query for server state (projects, tasks)
6. **Stage 8–12** — optimistic updates, listeners, performance, production hardening

The rule throughout ProjectFlow: **Redux for client UI state, RTK Query for server state, Supabase for backend.** Stage 1 is the hook-up point — not the reason to use Redux yet.

## Scale considerations

- Start with **route-scoped** Providers; promote to layout-level only when most of the app needs the store
- Plan the **root reducer shape early** even if slices are empty — avoids painful renames later
- Keep **typed hooks mandatory** — the cost is one file; the benefit compounds across every selector and dispatch
