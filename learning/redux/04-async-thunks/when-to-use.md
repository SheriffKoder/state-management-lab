# When to Use — Async Thunks

## Use `createAsyncThunk` when

- **Server data must live in Redux** (not just local component state)
- **Multiple components** need the same fetch status — loading, error, list
- **You dispatch fetches from many places** — mount, retry, refetch button, form submit
- **DevTools visibility** into request lifecycle matters while learning or debugging
- **You are not ready for RTK Query** but need structured async + error handling
- **One-off imperative flows** — “load this once when user clicks” without a full cache layer

Stage 4 pattern: `dispatch(fetchProjects())` + selectors for UI.

## Prefer RTK Query when (Stage 6+)

| Manual thunk (Stage 4) | RTK Query (later) |
|------------------------|-------------------|
| You wire pending/fulfilled/rejected yourself | Generated hooks: `useGetProjectsQuery()` |
| Manual refetch via re-dispatch | Built-in refetch, cache tags, invalidation |
| Duplicate rows in slice + server | Normalized cache with deduplication |
| No automatic stale-time | `keepUnusedDataFor`, background refetch |

**Rule of thumb:** new **read-heavy server data** in ProjectFlow → RTK Query. Thunks remain useful for **non-HTTP side effects** or legacy code paths.

## Prefer auth listener when (Stage 3 pattern)

- **Supabase pushes changes** — login, logout, token refresh, tab sync
- **Long-lived subscription** — `onAuthStateChange`, not a single request/response
- **One writer** copying external state into Redux

Do not replace auth hydration with a one-time `fetchSession` thunk alone — you still need the subscription for logout and refresh events.

## Raw `useEffect` + fetch vs Redux thunk

| Approach | Good for | Weakness |
|----------|----------|----------|
| `useEffect` + `fetch` in component | Prototype, single screen, no shared state | Loading/error duplicated per component; hard to retry from sibling UI |
| `createAsyncThunk` | Shared fetch state in Redux; explicit lifecycle | Boilerplate; manual cache |
| RTK Query | Production server cache in Redux apps | Another API to learn |

Stage 4 demo could fetch in `useEffect` without Redux — but the status strip, retry button, and DevTools would not share one source of truth.

## When **not** to use thunks for server data

- **Simple local fetch** — one component, no shared loading state → `useEffect` or RTK Query hook alone may suffice
- **Entire app server state** — RTK Query (Stage 6–7) scales better than dozens of manual thunks
- **Auth session sync** — listener pattern (Stage 3), not fetch-on-mount thunks
- **URL-driven lists with SWR/TanStack Query** — if Redux is not storing that data at all

## How this fits the 12-stage path

- **Stage 5** — same project rows, normalized `ids` + `entities`
- **Stage 6** — `createApi` replaces `fetchProjects` for reads
- **Stage 7** — mutations + invalidation instead of manual `addProject` thunk
- **Stage 9** — listener middleware can clear `projects` on logout

Rule: **thunks teach async Redux**. **RTK Query owns server cache** in the capstone.
