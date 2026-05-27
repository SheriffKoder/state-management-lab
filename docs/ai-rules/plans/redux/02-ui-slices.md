# Stage 2 — UI State Slices

**Status:** Plan for review — not yet executed  
**Master plan:** [`docs/ai-rules/plans/redux/00-initial-plan.md`](./00-initial-plan.md)  
**Prior stage:** [`01-store-setup.md`](./01-store-setup.md)  
**Iteration path:** `learning/redux/02-ui-slices`

---

## Goal

Introduce **Redux Toolkit slices** for shared **client UI state** — the kind ProjectFlow will keep in Redux while server data lives in RTK Query.

Stage 2 replaces Stage 1's placeholder reducer with real slices for:

- **Sidebar** — open / collapsed navigation chrome
- **Modals** — which modal (if any) is active

The demo should feel like a thin app shell: toggle sidebar, open/close modals, read state via selectors — all visible in Redux DevTools.

This stage teaches **createSlice**, **actions**, **reducers**, and **selectors** — not server data or auth.

---

## Scope

### In scope

| Area | What we build |
|------|----------------|
| Slices | `sidebarSlice`, `modalsSlice` via `createSlice` |
| Selectors | Per-slice + one derived cross-ui selector |
| Store | New independent store under `02-ui-slices/` (Stage 1 stays untouched) |
| Demo | Mini shell UI — sidebar toggle + modal open/close |
| Routing | App Router page at `/learning/redux/02-ui-slices` |
| Metadata | `why.md`, `when-to-use.md`, `tradeoffs.md`, `reflection.md` |
| Progress | Homepage nav + README checklist updates |

### Out of scope (later stages)

- Auth slice / session → Stage 3
- Async thunks / API calls → Stage 4
- Normalized entities → Stage 5
- RTK Query → Stage 6+
- Sharing one store across learning iterations (each stage is self-contained)
- ProjectFlow showcase work

---

## ProjectFlow connection

ProjectFlow will use Redux Toolkit for **client UI state** only. Stage 2 models the chrome every ops tool needs:

| Stage 2 demo | ProjectFlow equivalent |
|--------------|------------------------|
| Sidebar open / collapsed | Project navigation, workspace switcher panel |
| Active modal | Create project, edit task, invite member dialogs |
| Selectors | `isSidebarCollapsed`, `activeModal`, derived layout flags |

Server-owned data (projects, tasks, comments) does **not** belong in these slices — that rule is reinforced here so Stage 6+ stays clean.

---

## Current repo state (starting point)

Stage 1 is complete at `learning/redux/01-store-setup/`:

- Store wiring, typed hooks, route-scoped Provider
- `_placeholder` slice with demo counter (intentionally temporary)
- Documented RSC/client import boundaries

Stage 2 **does not modify Stage 1**. It creates a new iteration folder that copies the store pattern and replaces the placeholder with real UI slices.

---

## Target file structure

```bash
learning/redux/02-ui-slices/
├── why.md
├── when-to-use.md
├── tradeoffs.md
├── reflection.md
├── store/
│   ├── index.ts                 # public store API
│   ├── store.ts                 # configureStore
│   ├── rootReducer.ts           # combineReducers — ui.sidebar + ui.modals
│   ├── hooks.ts                 # useAppDispatch, useAppSelector ("use client")
│   └── store-provider.tsx       # "use client" Provider
├── slices/
│   └── ui/
│       ├── index.ts             # public slice exports
│       ├── sidebarSlice.ts      # createSlice — isOpen, isCollapsed
│       ├── modalsSlice.ts       # createSlice — activeModal id | null
│       └── selectors.ts         # selectSidebarState, selectActiveModal, selectIsAnyModalOpen
└── ui/
    ├── ui-slices-demo.tsx       # demo shell composer
    ├── demo-sidebar.tsx         # dumb sidebar UI driven by selectors
    └── demo-modal-trigger.tsx   # buttons + modal panel driven by modals slice

app/learning/redux/02-ui-slices/
├── layout.tsx                   # route-scoped StoreProvider
└── page.tsx                     # thin page composer
```

### Design decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Iteration isolation | New folder, new store | Master plan: each learning stage runs independently |
| Slice location | `slices/ui/` | Groups UI chrome; mirrors future ProjectFlow `ui` domain |
| Root shape | Nested `ui: { sidebar, modals }` | Matches Stage 1 rootReducer comments; scales when auth slice adds a sibling key |
| Modal model | Single `activeModal: string \| null` | Simple; one dialog at a time is common in ops UIs |
| Sidebar model | `isOpen` + `isCollapsed` | Two independent UI dimensions worth selecting separately |
| Selectors file | Shared `selectors.ts` under `slices/ui/` | Teaches colocated + cross-slice derived selectors early |
| Stage 1 code | Leave unchanged | Stage 1 remains a valid reference for store wiring only |

---

## Slice design (planned)

### `sidebarSlice`

```ts
// Conceptual — not final code
initialState = {
  isOpen: true,
  isCollapsed: false,
}

actions = {
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapsed,
}
```

### `modalsSlice`

```ts
// Conceptual — not final code
initialState = {
  activeModal: null as string | null, // e.g. "create-task" | "project-settings"
}

actions = {
  openModal,   // payload: modal id
  closeModal,
}
```

### Selectors (examples)

```ts
selectSidebarIsOpen(state)
selectSidebarIsCollapsed(state)
selectActiveModal(state)
selectIsAnyModalOpen(state)   // derived: activeModal !== null
```

---

## Root reducer plan (Stage 2)

```ts
// Conceptual — not final code
rootReducer = combineReducers({
  ui: combineReducers({
    sidebar: sidebarReducer,
    modals: modalsReducer,
  }),
  // Stage 3+: auth
  // Stage 6+: rtkQuery reducer paths
})
```

Stage 1's `_placeholder` and `incrementDemoCount` do not carry forward.

---

## Execution steps

Each step is independently executable. Review and approve one at a time.

### Step 1 — Scaffold iteration folder

Creates the Stage 2 folder layout by copying the proven store pattern from Stage 1 and adding `slices/ui/` plus demo UI placeholders — without slice logic yet.

Create:

- `learning/redux/02-ui-slices/` directory tree (see target structure)
- Copy/adapt store boilerplate from Stage 1 (`store.ts`, `hooks.ts`, `store-provider.tsx`)
- Empty metadata placeholders (content filled in Step 9)
- Stub `app/learning/redux/02-ui-slices/` route files

**Done when:** folder structure exists; route loads a static placeholder page; no slice logic yet.

---

### Step 2 — Sidebar slice

Implements the first real `createSlice` for navigation chrome state — the most common shared UI state in multi-panel apps like ProjectFlow.

Create `slices/ui/sidebarSlice.ts`:

- `createSlice` with `isOpen` and `isCollapsed`
- exported actions and reducer
- slice name: `ui/sidebar` (DevTools readability)

**Done when:** slice compiles; reducer is importable; actions export correctly.

---

### Step 3 — Modals slice

Adds a second slice for overlay UI state, teaching that unrelated UI concerns get separate slices rather than one bloated `ui` object.

Create `slices/ui/modalsSlice.ts`:

- `createSlice` with `activeModal: string | null`
- `openModal` (payload: string), `closeModal`
- guard: opening a modal replaces the current one (no stack yet)

**Done when:** slice compiles; opening/closing actions are typed.

---

### Step 4 — Selectors

Introduces colocated selectors and one derived selector — the pattern ProjectFlow will use for layout decisions without recomputing in components.

Create `slices/ui/selectors.ts`:

- `selectSidebarIsOpen`, `selectSidebarIsCollapsed`
- `selectActiveModal`, `selectIsAnyModalOpen`
- use typed `RootState` from the store module

Export public selectors from `slices/ui/index.ts`.

**Done when:** selectors compile against `RootState`; derived selector does not duplicate state.

---

### Step 5 — Root reducer wiring

Replaces Stage 1's placeholder pattern by registering real slices under a nested `ui` key — the store shape future stages will extend.

Update `store/rootReducer.ts`:

- `combineReducers` → `ui: combineReducers({ sidebar, modals })`
- remove any placeholder/demo reducer
- export updated `RootState`

**Done when:** `RootState` reflects `{ ui: { sidebar, modals } }`; TypeScript compiles.

---

### Step 6 — Store + hooks + Provider

Wires the slice-backed root reducer into `configureStore` and reconnects typed hooks and the client Provider — same RSC-safe patterns learned in Stage 1.

Ensure:

- `store/store.ts` uses the new `rootReducer`
- `hooks.ts` has `"use client"` and `withTypes` pattern
- `store-provider.tsx` wraps `<Provider store={store}>`
- `store/index.ts` exports store, hooks, provider, and slice actions/selectors as needed

**Done when:** store module exports a working typed API; no barrel imports of hooks from server layouts.

---

### Step 7 — Demo UI shell

Builds an interactive mini app shell that proves slices, actions, and selectors work together — not just in DevTools isolation.

Create demo components:

- **`demo-sidebar.tsx`** — reads sidebar selectors; toggle / collapse buttons dispatch slice actions
- **`demo-modal-trigger.tsx`** — buttons open named modals (`create-task`, `project-settings`); close button dispatches `closeModal`; panel renders when `selectIsAnyModalOpen`
- **`ui-slices-demo.tsx`** — composes sidebar + main area + modal triggers in a layout resembling ProjectFlow chrome

Update:

- `app/learning/redux/02-ui-slices/layout.tsx` — `StoreProvider` (direct import, not barrel)
- `app/learning/redux/02-ui-slices/page.tsx` — renders `UiSlicesDemo`

**Done when:** `/learning/redux/02-ui-slices` loads; sidebar and modals respond to interaction; DevTools shows `ui/sidebar/*` and `ui/modals/*` actions.

---

### Step 8 — Metadata files

Documents why UI state belongs in slices, when to split vs merge slices, and tradeoffs of global UI state — required before treating the iteration as complete.

Write content per [`docs/ai-rules/03-iteration-metadata.md`](../../03-iteration-metadata.md):

| File | Stage 2 focus |
|------|----------------|
| `why.md` | Why UI chrome goes in Redux; why separate sidebar/modals slices; `createSlice` benefits |
| `when-to-use.md` | UI state in Redux vs local state; when modal/sidebar state should stay local |
| `tradeoffs.md` | Global UI state re-renders; over-using Redux for UI; slice granularity mistakes |
| `reflection.md` | First-person notes after using the demo shell |

**Done when:** all four files have substantive Stage 2 content.

---

### Step 9 — Homepage + README progress

Marks Stage 2 complete in navigation and README so repo progress matches the new iteration.

Update:

- `lib/homepage-navigation.ts` — `redux-02-ui-slices` → `completed: true`
- `README.md` — check off Stage 2 in the 12-stage list; set **Next up:** Stage 3

**Done when:** sidebar shows 17% (2/12) or correct ratio; link opens Stage 2 page.

---

### Step 10 — Verify

Confirms build, lint, and manual flows before commit.

```bash
npm run lint
npm run build
```

Manual check:

- homepage nav link opens Stage 2 page
- sidebar toggle / collapse works
- modals open and close; only one active at a time
- Redux DevTools shows nested `ui.sidebar` and `ui.modals` state
- Stage 1 route still works unchanged

**Done when:** lint and build pass.

---

## Metadata content outline (draft for review)

### why.md — suggested headings

1. What counts as UI state vs server state
2. Why `createSlice` over manual reducers
3. Why sidebar and modals are separate slices
4. How this prepares ProjectFlow app chrome

### when-to-use.md — suggested headings

1. Put UI state in a slice when…
2. Keep UI state local when…
3. Sidebar/modals in Redux vs component state
4. Selector patterns for derived layout state

### tradeoffs.md — suggested headings

1. Global UI state and re-render scope
2. Single `activeModal` vs modal stack
3. Slice granularity — too many vs too few
4. Common mistakes: storing server data in UI slices

### reflection.md — suggested prompts

- What felt cleaner about `createSlice` vs Stage 1's `createReducer`?
- Did separate sidebar/modals slices feel right?
- What would I change before building ProjectFlow?
- Open questions before Stage 3 (auth)

---

## Verification checklist

- [ ] `learning/redux/02-ui-slices/` exists and is self-contained
- [ ] `sidebarSlice` and `modalsSlice` use `createSlice`
- [ ] Selectors exported and used in demo components
- [ ] Root state shape: `{ ui: { sidebar, modals } }`
- [ ] Route `/learning/redux/02-ui-slices` interactive demo works
- [ ] All four metadata files present
- [ ] Homepage nav + README updated
- [ ] Stage 1 iteration unchanged
- [ ] `npm run lint` passes
- [ ] `npm run build` passes

---

## Suggested commit message (after full stage completion)

```
feat: add redux stage 2 ui slices iteration

Introduce sidebar and modals createSlice slices with selectors and a
mini app-shell demo at /learning/redux/02-ui-slices.
```

---

## How to proceed

After you review this plan:

1. Confirm or request changes to slice shape, demo UI, or modal model.
2. Ask to **execute Step 1**, then Step 2, and so on — one step at a time.
3. Fill in `reflection.md` personally after Step 7 once you've used the demo shell.

No code will be written until you approve execution.
