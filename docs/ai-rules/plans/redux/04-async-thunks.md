# Stage 4 — Async Thunks

**Status:** Plan for review — not yet executed  
**Master plan:** [`docs/ai-rules/plans/redux/00-initial-plan.md`](./00-initial-plan.md)  
**Prior stage:** [`03-auth-slice.md`](./03-auth-slice.md)  
**Iteration path:** `learning/redux/04-async-thunks`

---

## Goal

Introduce **`createAsyncThunk`** — Redux Toolkit's standard pattern for **async server work** (fetch, create, delete) with automatic **loading** and **error** lifecycle actions.

Stage 4 teaches:

- What a thunk is and why sync `createSlice` reducers are not enough for API calls
- `createAsyncThunk` — `pending` / `fulfilled` / `rejected` action types
- `extraReducers` — wiring async actions into slice state
- Request status modeling (`idle` | `loading` | `succeeded` | `failed`)
- Dispatching thunks from components and reading results via selectors
- How this pattern prepares Stage 5 (normalization) and Stage 6 (RTK Query)

**Not** a full data layer yet — RTK Query replaces most manual fetch thunks in production. This stage builds the mental model so RTK Query's cache lifecycle makes sense later.

---

## What is a thunk? (concept primer)

Redux reducers must be **pure and synchronous**. You cannot `await fetch()` inside a reducer.

A **thunk** is a function that Redux can dispatch instead of a plain action object. The thunk runs **imperative code** (async API calls, branching logic) and **dispatches other actions** when results arrive.

```ts
// Conceptual — the idea behind every async Redux flow
function fetchSomethingThunk() {
  return async (dispatch) => {
    dispatch({ type: "fetch/pending" });
    try {
      const data = await api.get("/items");
      dispatch({ type: "fetch/fulfilled", payload: data });
    } catch (err) {
      dispatch({ type: "fetch/rejected", payload: err.message });
    }
  };
}
```

**`createAsyncThunk`** from RTK generates that boilerplate for you:

| Generated action | When it fires |
|------------------|---------------|
| `fetchProjects.pending` | Thunk started |
| `fetchProjects.fulfilled` | Async function returned successfully |
| `fetchProjects.rejected` | Async function threw or returned `rejectWithValue` |

Components call `dispatch(fetchProjects())` — the slice's `extraReducers` listen for the three lifecycle actions and update `status`, `items`, and `error`.

**Stage 3 vs Stage 4:**

| Pattern | Stage 3 auth | Stage 4 thunks |
|---------|--------------|----------------|
| Trigger | Supabase `onAuthStateChange` (push events) | User action or mount (`dispatch(fetchProjects())`) |
| Sync mechanism | Listener dispatches sync slice actions | Thunk dispatches its own pending/fulfilled/rejected |
| Best for | Long-lived subscriptions, session hydration | One-shot or repeatable async requests |
| Redux API | Sync reducers only | Sync reducers + `extraReducers` for async |

Auth **listener** stays the right tool for session sync. **Thunks** are the right tool for "go fetch this list from Supabase."

---

## Scope

### In scope

| Area | What we build |
|------|----------------|
| Projects slice | `createSlice` + `extraReducers` for async lifecycle |
| Async thunk | `fetchProjects` — reads from Supabase `demo_projects` table |
| Optional second thunk | `addProject` — simple insert to show fulfilled vs rejected with validation (keep minimal) |
| Status model | `idle` / `loading` / `succeeded` / `failed` + `error` string |
| Selectors | `selectProjects`, `selectProjectsStatus`, `selectProjectsError`, `selectIsProjectsLoading` |
| Demo | Project list with loading spinner, error retry, empty state, refetch button |
| Supabase seed | SQL for `demo_projects` table + sample rows (reuse existing project from Stage 3) |
| Routing | `/learning/redux/04-async-thunks` with standard learning page shell |
| Metadata | Thunks vs RTK Query, vs raw `useEffect` fetch, vs Stage 3 listener |
| Progress | Homepage nav + README updates |

### Out of scope (later stages)

- Normalized `ids` + `entities` shape → Stage 5 (`createEntityAdapter`)
- RTK Query as primary server cache → Stage 6+
- Auth-gated RLS policies (demo table can be anon-readable for learning; document production RLS)
- Optimistic updates → Stage 8
- Refactoring Stage 3 auth login into thunks (optional mention in metadata only — listener still required for hydration)
- Modifying Stages 1–3 iterations

---

## ProjectFlow connection

| Stage 4 demo | ProjectFlow equivalent |
|--------------|------------------------|
| `fetchProjects` thunk | Load workspace project list on dashboard mount |
| Loading skeleton | Project cards while Supabase responds |
| Error + retry | Network failure banner with "Try again" |
| `addProject` thunk (optional) | "New project" form submission before RTK Query |
| `status: "loading"` | Any screen waiting on server data |

**State ownership rule (unchanged from Stage 3):**

| Layer | Owns |
|-------|------|
| Supabase | Authoritative project rows in Postgres |
| Redux `projects` slice | Client copy + request lifecycle for this demo |
| RTK Query (Stage 6+) | Will replace manual fetch thunks for server cache |

---

## Prerequisites

Before executing Stage 4:

1. **Supabase configured** — same `.env.local` as Stage 3
2. **`demo_projects` table** created and seeded (SQL provided in Step 1)
3. Table readable with anon key (learning simplification — note RLS in metadata)

Demo must degrade gracefully when Supabase env is missing (setup card, no crash).

---

## Current repo state (starting point)

- Stages 1–3 complete
- `lib/supabase/client.ts` and `server.ts` exist at repo root
- Stage 3 auth uses sync reducers + listener — **not modified**
- No `learning/redux/04-async-thunks/` yet

---

## Target file structure

```bash
learning/redux/04-async-thunks/
├── why.md
├── when-to-use.md
├── tradeoffs.md
├── reflection.md
├── store/
│   ├── index.ts
│   ├── store.ts
│   ├── rootReducer.ts                 # { projects }
│   ├── hooks.ts
│   └── store-provider.tsx
├── slices/
│   └── projects/
│       ├── index.ts
│       ├── projectsSlice.ts           # state + extraReducers
│       ├── projectsThunks.ts          # fetchProjects (+ optional addProject)
│       ├── selectors.ts
│       └── types.ts                   # Project row type
└── ui/
    ├── async-thunks-demo.tsx          # demo shell composer
    ├── demo-project-list.tsx          # list + loading/error/empty
    ├── demo-project-form.tsx          # optional add form
    └── demo-status-strip.tsx          # Redux request status visibility

app/learning/redux/04-async-thunks/
├── layout.tsx                         # StoreProvider only (no auth listener)
└── page.tsx                           # standard learning page shell
```

### Design decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Iteration isolation | New folder, new store | Master plan: each stage runs independently |
| Demo domain | `projects` slice | Aligns with ProjectFlow; natural list fetch UX |
| Thunk file split | `projectsThunks.ts` separate from slice | Keeps slice readable; common RTK convention |
| State shape (Stage 4) | `{ items: Project[], status, error }` | Simple array before Stage 5 normalization |
| Auth in Stage 4 | None in store | Focus on async fetch; auth was Stage 3's job |
| Supabase access | Browser client in thunk | Same as Stage 3 login — client-side demo |
| Second thunk | Optional `addProject` | Shows rejected path with validation; skip if scope feels heavy |
| Page layout | Standard learning shell | [`01-repo-structure.md`](../../01-repo-structure.md) |
| Demo imports | Client UI → `store/` barrel | Same pattern as Stages 2–3 |

---

## Projects slice design (planned)

### Types

```ts
// Conceptual — not final code
interface Project {
  id: string;
  name: string;
  status: "active" | "archived";
  created_at: string;
}

type ProjectsStatus = "idle" | "loading" | "succeeded" | "failed";

interface ProjectsState {
  items: Project[];
  status: ProjectsStatus;
  error: string | null;
}
```

### Thunk

```ts
export const fetchProjects = createAsyncThunk<
  Project[],           // return type on success
  void,                // argument type (none)
  { rejectValue: string }
>("projects/fetchAll", async (_, { rejectWithValue }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("demo_projects")
    .select("id, name, status, created_at")
    .order("created_at", { ascending: false });

  if (error) return rejectWithValue(error.message);
  return data ?? [];
});
```

### Slice + extraReducers

```ts
// Conceptual — sync reducers optional (e.g. clearError)
extraReducers: (builder) => {
  builder
    .addCase(fetchProjects.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(fetchProjects.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    })
    .addCase(fetchProjects.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload ?? "Failed to load projects";
    });
}
```

### Selectors (examples)

```ts
selectProjects(state)
selectProjectsStatus(state)
selectProjectsError(state)
selectIsProjectsLoading(state)   // status === "loading"
selectHasProjects(state)           // items.length > 0
```

---

## Root reducer plan (Stage 4)

```ts
// Conceptual — not final code
rootReducer = combineReducers({
  projects: projectsReducer,
  // Stage 5+: same data, normalized via entity adapter
  // Stage 6+: RTK Query reducer paths
})
```

---

## Demo UX (planned)

Inside the standard **app window**:

| Zone | Behavior |
|------|----------|
| **Status strip** | Shows `projects.status` and error message (learning visibility) |
| **Project list** | Renders rows when `succeeded`; skeleton/spinner when `loading` |
| **Empty state** | "No projects yet" when `succeeded` + `items.length === 0` |
| **Error state** | Message + "Retry" button dispatches `fetchProjects()` again |
| **Refetch control** | Manual refresh button (re-dispatch thunk — watch DevTools pending → fulfilled) |
| **Add form** (optional) | Name input → `dispatch(addProject(name))` → list updates on fulfilled |

On mount: `useEffect(() => { dispatch(fetchProjects()) }, [])` in demo list component.

If Supabase env missing → setup instructions card (same pattern as Stage 3).

---

## Supabase seed (for Step 1)

Provide this SQL in the plan execution notes / metadata:

```sql
create table if not exists public.demo_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'active' check (status in ('active', 'archived')),
  created_at timestamptz not null default now()
);

-- Learning-only: allow anon read/write (document that production uses RLS)
alter table public.demo_projects enable row level security;

create policy "Allow anon read demo_projects"
  on public.demo_projects for select to anon using (true);

create policy "Allow anon insert demo_projects"
  on public.demo_projects for insert to anon with check (true);

insert into public.demo_projects (name, status) values
  ('Website redesign', 'active'),
  ('Client onboarding', 'active'),
  ('Q1 retrospective', 'archived');
```

---

## Execution steps

Each step is independently executable. Review and approve one at a time.

### Step 1 — Supabase table + seed

Creates the demo data source thunks will read from.

- Run / document SQL above in Supabase SQL editor
- Verify anon client can `select` from `demo_projects`

**Done when:** table exists with seed rows; query works from Supabase dashboard.

---

### Step 2 — Scaffold iteration folder

Creates the Stage 4 folder with store scaffold and placeholder demo.

Create:

- `learning/redux/04-async-thunks/` tree
- `app/learning/redux/04-async-thunks/` with standard learning page shell (placeholder)
- Empty metadata placeholders

**Done when:** route loads static placeholder; Stages 1–3 unchanged.

---

### Step 3 — Types + async thunk

Implements the async API call as a reusable thunk.

Create:

- `slices/projects/types.ts` — `Project`, `ProjectsState` types
- `slices/projects/projectsThunks.ts` — `fetchProjects` via `createAsyncThunk`

**Done when:** thunk compiles; can be imported (not yet wired to slice).

---

### Step 4 — Projects slice + extraReducers

Wires thunk lifecycle into Redux state.

Create `slices/projects/projectsSlice.ts`:

- `initialState` with `items: []`, `status: "idle"`, `error: null`
- `extraReducers` for `fetchProjects` pending / fulfilled / rejected
- Optional sync reducer: `clearProjectsError`
- Export `projectsReducer`

**Done when:** slice compiles; reducer handles all three async cases.

---

### Step 5 — Selectors + public exports

Exposes read paths for the demo UI.

Create `slices/projects/selectors.ts` and update `slices/projects/index.ts`:

- Status, items, error, loading selectors
- Re-export thunk + actions from barrel

**Done when:** selectors compile against planned `RootState`.

---

### Step 6 — Root reducer + store wiring

Registers `projects` at the top level.

Update / create:

- `store/rootReducer.ts` — `combineReducers({ projects: projectsReducer })`
- `store/store.ts`, `hooks.ts`, `store-provider.tsx`, `store/index.ts`
- `app/.../layout.tsx` — `StoreProvider` only

**Done when:** store API complete; TypeScript compiles.

---

### Step 7 — Demo UI

Builds the interactive fetch demo inside the app window.

Create:

- `demo-status-strip.tsx` — status + error visibility
- `demo-project-list.tsx` — mount fetch, loading/error/empty/success states, retry
- `async-thunks-demo.tsx` — composes panels in standard app window
- Optional: `demo-project-form.tsx` + `addProject` thunk

Update `page.tsx` per learning page layout rules.

**Done when:** list loads from Supabase; retry works; DevTools shows pending → fulfilled; missing env shows setup card.

---

### Step 8 — Metadata files

Documents thunk concepts and positions RTK Query as the later upgrade path.

| File | Stage 4 focus |
|------|----------------|
| `why.md` | Why reducers can't be async; what thunks solve; pending/fulfilled/rejected |
| `when-to-use.md` | Thunks vs `useEffect` fetch vs RTK Query vs auth listener |
| `tradeoffs.md` | Boilerplate, duplicate server state, no cache invalidation, forgotten error states |
| `reflection.md` | First-person notes after fetch/retry/error testing |

**Done when:** all four files have substantive Stage 4 content.

---

### Step 9 — Homepage + README progress

Marks Stage 4 complete in navigation and README.

Update:

- `lib/homepage-navigation.ts` — `redux-04-async-thunks` → `completed: true`
- `README.md` — check off Stage 4; **Next up:** Stage 5

**Done when:** sidebar shows ~33% (4/12); link works.

---

### Step 10 — Verify

```bash
npm run lint
npm run build
```

Manual check:

- initial load → loading → project list
- retry after error (simulate by breaking network or invalid table temporarily)
- refetch button dispatches new pending cycle
- missing env → graceful fallback
- Stages 1–3 routes unchanged

**Done when:** lint and build pass.

---

## Metadata content outline (draft for review)

### why.md — suggested headings

1. Reducers must stay synchronous — the thunk gap
2. What `createAsyncThunk` generates for you
3. `extraReducers` and the request lifecycle
4. ProjectFlow: every dashboard starts with an async fetch

### when-to-use.md — suggested headings

1. Use thunks when…
2. Prefer RTK Query when… (preview Stage 6)
3. Prefer auth listener when… (Stage 3 pattern)
4. Raw `useEffect` + `fetch` vs Redux thunk

### tradeoffs.md — suggested headings

1. Manual cache — no automatic refetch or deduplication
2. Easy to forget `rejected` or leave stale `loading`
3. Duplicating server rows in Redux (solved in Stage 5–6)
4. Common mistakes: mutating state outside Immer, not typing `rejectWithValue`

### reflection.md — suggested prompts

- Did pending/fulfilled/rejected click in DevTools?
- How does this compare to calling Supabase directly in the component?
- What would I want RTK Query to handle for me?

---

## Verification checklist

- [ ] `demo_projects` table seeded in Supabase
- [ ] `learning/redux/04-async-thunks/` self-contained
- [ ] `fetchProjects` thunk with `extraReducers` lifecycle
- [ ] Selectors drive loading / error / list UI
- [ ] Standard learning page shell on route
- [ ] Retry and refetch demonstrate re-dispatch
- [ ] All four metadata files present
- [ ] Homepage nav + README updated
- [ ] Stages 1–3 unchanged
- [ ] `npm run lint` and `npm run build` pass

---

## Suggested commit message (after full stage completion)

```
feat: add redux stage 4 async thunks iteration

Introduce createAsyncThunk with Supabase project fetch, extraReducers
lifecycle, and loading/error demo at /learning/redux/04-async-thunks.
```

---

## How to proceed

After you review this plan:

1. Confirm or request changes — especially demo domain (`projects` vs simpler `notes`), optional `addProject` thunk, RLS policy approach.
2. Ensure Supabase project + `.env.local` are ready; run Step 1 SQL before Step 7.
3. Ask to **execute Step 1**, then Step 2, and so on — one step at a time.

No code will be written until you approve execution.
