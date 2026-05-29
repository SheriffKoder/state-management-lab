# Why — Async Thunks

## The problem

Stages 1–2 handled **sync UI state**. Stage 3 synced **auth** via a listener. Stage 4 answers: **how do we load server data into Redux?**

ProjectFlow dashboards need project lists from Supabase. That work is **async** — network latency, success, failure. Redux reducers must stay **pure and synchronous**. You cannot `await` inside a reducer.

## Reducers must stay synchronous — the thunk gap

```ts
// ❌ Invalid — reducers cannot be async
reducers: {
  loadProjects: async (state) => {
    const data = await supabase.from("demo_projects").select();
    state.items = data;
  },
}
```

Something outside the reducer must run the fetch and **dispatch results** when done. That “something” is a **thunk**.

## What `createAsyncThunk` generates for you

`define fetchProjects` once with `createAsyncThunk`. RTK auto-creates three action types from the prefix `"projects/fetchAll"`:

| Action | Type string | Meaning |
|--------|-------------|---------|
| `fetchProjects.pending` | `projects/fetchAll/pending` | Request started |
| `fetchProjects.fulfilled` | `projects/fetchAll/fulfilled` | Data returned |
| `fetchProjects.rejected` | `projects/fetchAll/rejected` | Error (or `rejectWithValue`) |

You do not hand-write those action creators. Dispatch `fetchProjects()` and RTK dispatches the lifecycle for you.

## `extraReducers` and the request lifecycle

Sync slice actions (`clearProjectsError`) live in `reducers`. Thunk lifecycle actions are defined **outside** the slice — so the slice listens in `extraReducers`:

```
dispatch(fetchProjects())
  → pending   → status: "loading", error: null
  → fulfilled → status: "succeeded", items: payload
  → rejected  → status: "failed", error: message
```

Components read `status` and `items` via selectors — they never call Supabase directly for the list (in this iteration).

## Thunk vs Stage 3 auth listener

| Pattern | Stage 3 auth | Stage 4 fetch |
|---------|--------------|---------------|
| Trigger | Supabase pushes session changes | Component dispatches on mount / refetch |
| Sync layer | `AuthListener` + sync actions | `createAsyncThunk` + `extraReducers` |
| Best for | Long-lived subscriptions | One-shot or repeatable requests |

Both update Redux; the **mechanism** differs because auth is event-driven and project fetch is request-driven.

## ProjectFlow connection

| Stage 4 demo | ProjectFlow equivalent |
|--------------|------------------------|
| `fetchProjects` on mount | Dashboard loads workspace projects |
| Loading state | Skeleton while Supabase responds |
| Error + retry | Banner when network or RLS fails |
| Refetch button | User or action triggers reload |

Stage 6 replaces most manual fetch thunks with **RTK Query**. Stage 4 teaches the lifecycle so RTK Query’s `isLoading` / `isError` / cache updates make sense later.

## What this stage does not solve

- Automatic cache invalidation after mutations → Stage 7
- Normalized relational data → Stage 5
- Deduplication / shared cache across components → Stage 6 (RTK Query)

Stage 4 is the **manual async pattern** — explicit, visible in DevTools, good for learning.
