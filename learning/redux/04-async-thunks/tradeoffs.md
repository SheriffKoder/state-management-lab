# Tradeoffs — Async Thunks

## Manual cache — no automatic refetch or deduplication

Stage 4 stores fetched rows in `projects.items`. Redux does not know:

- when data went stale
- whether another component already fetched the same list
- how to merge a single updated row after an edit

Every refetch re-dispatches the full thunk. Stage 6 RTK Query adds cache keys, tags, and deduplication.

## Easy to forget `rejected` or leave stale `loading`

`extraReducers` need all three cases:

| Missing handler | Symptom |
|-----------------|---------|
| No `pending` | UI never shows loading |
| No `fulfilled` | Stuck loading forever on success |
| No `rejected` | Stuck loading forever on error |

Stage 4 status strip makes `failed` visible — if error UI is blank, check `rejected` handler and `rejectWithValue`.

## Duplicating server rows in Redux

`demo_projects` lives in Postgres **and** in `state.projects.items`. Two copies can drift:

- Another user adds a project — your Redux list is stale until refetch
- Mutation without updating slice — list wrong until refetch

Stage 5 normalizes shape; Stage 6–7 centralize server truth in RTK Query cache.

## Boilerplate vs clarity

Per resource you typically add:

- thunk file
- `extraReducers` block
- status + error fields
- selectors
- loading/error UI

Verbose for one endpoint — acceptable for learning. At scale, RTK Query reduces repetition.

## Common mistakes

1. **Async logic inside `reducers`** — invalid; use thunks
2. **Dispatching `fulfilled` manually** — let RTK dispatch after thunk resolves
3. **Forgetting `{ rejectValue: string }` typing** — `action.payload` on `rejected` is untyped
4. **Not using `rejectWithValue`** — thrown errors become generic `rejected` payloads
5. **Mutating state outside Immer** — `extraReducers` still use Immer; assign to `state` fields, do not reassign `state`
6. **Fetch in component without dispatching thunk** — Redux never updates; bypasses lifecycle
7. **Storing server data only in Redux with no refetch strategy** — stale UI after mutations (Stage 7 fixes)

## `rejectWithValue` vs throw

```ts
if (error) return rejectWithValue(error.message); // ✅ typed payload
throw new Error(error.message);                   // works but payload shape differs
```

Prefer `rejectWithValue` when the slice needs a user-facing string in `action.payload`.

## Refetch and concurrent requests

Double-click **Refetch** can dispatch two thunks. Both may complete — last `fulfilled` wins. RTK Query dedupes by cache key; manual thunks do not unless you add abort logic (`signal` in `createAsyncThunk`).

## RLS and learning table

Stage 4 uses anon-readable `demo_projects` for simplicity. Production ProjectFlow uses **RLS** — same thunk pattern, but errors may be permission denials, not missing tables.

## Scaling considerations

- Root shape `{ projects }` stays flat until Stage 5 entity adapter
- Many resources → many thunks → consider RTK Query before copy-pasting `extraReducers`
- Logout (Stage 9) may reset `projects` to initial state via listener middleware
