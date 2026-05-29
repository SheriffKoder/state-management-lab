# Reflection — Async Thunks

Personal notes after completing Stage 4. Write in first person.

---

## What I learned

- Reducers stay sync; async work lives in **thunks** (`projectsThunks.ts`)
- `createAsyncThunk` auto-generates `pending`, `fulfilled`, `rejected` — I don't write those action types
- Slice listens via **`extraReducers`**, not the normal `reducers` block
- `dispatch(fetchProjects())` kicks off the flow; selectors read `status`, `items`, `error`
- Thunks fit **request/response** fetches; auth **subscriptions** stay on the listener (Stage 3)

---

## What surprised me

- [ ] That `fetchProjects.pending` is a property on the function RTK returns — not something I defined
- [ ] How clearly DevTools shows `projects/fetchAll/pending` → `fulfilled` in order
- [ ] That refetch is just dispatching the same thunk again — no separate "reload" action

---

## What felt elegant

- Split: thunk = fetch, slice = state, component = dispatch + display
- Status strip correlates UI with DevTools action names
- `rejectWithValue` gives typed error strings in `rejected` handler
- Same Supabase client as Stage 3 — only the Redux pattern changed

---

## What felt painful or unnecessary

- [ ] Three `extraReducers` handlers per thunk — fine for one endpoint, would not scale to 20
- [ ] Duplicating Postgres rows in Redux until refetch
- [ ] Skipping `addProject` — mutations wait for Stage 7 RTK Query

---

## Open questions before Stage 5

- How does entity adapter change `items: Project[]`?
- When RTK Query lands, do I delete `fetchProjects` or keep it for comparison?
- Should failed fetches reset `items` or keep stale data visible?

---

## Notes after using the demo

Visit `/learning/redux/04-async-thunks`. Watch status go `idle` → `loading` → `succeeded`. Click **Refetch** — pending fires again. Break network or table name temporarily — **Retry** dispatches rejected → pending → fulfilled.

```
(refetch / error / empty table — anything unexpected?)


```
