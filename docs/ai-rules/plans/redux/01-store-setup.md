# Stage 1 — Store Setup & Project Foundations

**Status:** Plan for review — not yet executed  
**Master plan:** [`docs/ai-rules/plans/redux/00-initial-plan.md`](./00-initial-plan.md)  
**Iteration path:** `learning/redux/01-store-setup`

---

## Goal

Establish the minimum Redux Toolkit foundation inside the learning track:

- a working `configureStore` setup
- typed `useAppDispatch` / `useAppSelector` hooks
- a client `StoreProvider` wired into Next.js App Router
- a planned (but mostly empty) root reducer shape for future stages

This stage is **foundational**, not feature-rich. The demo should prove the store is connected — nothing more.

---

## Scope

### In scope

| Area | What we build |
|------|----------------|
| Dependencies | `@reduxjs/toolkit`, `react-redux` |
| Store | `configureStore`, root reducer stub, typed hooks |
| Provider | Client-side provider component |
| Routing | App Router page at `/learning/redux/01-store-setup` |
| Demo | Minimal UI that reads/writes one piece of state |
| Metadata | `why.md`, `when-to-use.md`, `tradeoffs.md`, `reflection.md` |
| Progress | Homepage nav config + README checklist updates |

### Out of scope (later stages)

- Real feature slices (sidebar, modals) → Stage 2
- Auth / Supabase → Stage 3+
- Async thunks → Stage 4
- RTK Query → Stage 6+
- Global root layout Provider for the entire app (prefer route-scoped Provider for now)
- Showcase work (`showcase/projectflow`)

---

## Current repo gaps (to resolve during execution)

1. **`learning/` does not exist yet** — this stage creates the first iteration folder.
2. **Redux packages are not installed** — `@reduxjs/toolkit` and `react-redux` need to be added.
3. **README progress** — Redux is marked as current focus but has no completed Stage 1 entry aligned to the 12-stage plan.

These will be corrected as part of the final progress-update steps, not in isolation.

---

## Target file structure

```bash
learning/redux/01-store-setup/
├── why.md
├── when-to-use.md
├── tradeoffs.md
├── reflection.md
├── store/
│   ├── index.ts              # public store API (store, hooks, provider exports)
│   ├── store.ts              # configureStore
│   ├── rootReducer.ts        # combineReducers stub — placeholder for future slices
│   ├── hooks.ts              # useAppDispatch, useAppSelector
│   └── store-provider.tsx    # "use client" — wraps children with <Provider>
└── ui/
    └── store-setup-demo.tsx  # minimal client demo (counter or static readout)

app/learning/redux/01-store-setup/
├── layout.tsx                # route-scoped StoreProvider
└── page.tsx                  # thin page composer — no business logic
```

### Design decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Store location | Inside `learning/redux/01-store-setup/store/` | Master plan: keep Redux code close to its domain, not at repo root |
| Provider scope | Route layout under `/learning/redux/01-store-setup` | Avoids forcing Redux on homepage and unrelated routes |
| Root reducer | Empty stub or single placeholder slice | Stage 1 focuses on wiring; real slices start Stage 2 |
| Demo complexity | One trivial state field (e.g. counter) | Proves dispatch + selector flow without teaching slices yet |
| FSD alignment | `app/` = routing only; logic lives in `learning/` | Matches project guidelines |

---

## Root reducer plan (Stage 1 only)

Stage 1 defines the **shape** future stages will extend — not the full app architecture.

```ts
// Conceptual plan — not final code
rootReducer = combineReducers({
  // Stage 2+: ui.sidebar, ui.modals
  // Stage 3+: auth
  // Stage 4+: async entities
  // Stage 6+: rtkQuery reducer paths injected by createApi
  _placeholder: placeholderReducer, // removed in Stage 2 when real slices land
})
```

Document this intent in `why.md` and `tradeoffs.md` so later refactors are intentional.

---

## Execution steps

Each step is independently executable. Review and approve one at a time.

### Step 1 — Install dependencies

Adds `@reduxjs/toolkit` and `react-redux` to the project so every later step—store creation, typed hooks, and the Provider—builds on a shared, versioned foundation rather than ad hoc imports.

```bash
npm install @reduxjs/toolkit react-redux
```

**Done when:** packages appear in `package.json` and `node_modules`.

---

### Step 2 — Scaffold iteration folder

Creates the iteration folder layout and placeholder files so code, metadata, and routing each have a fixed home inside `learning/redux/01-store-setup/` without pulling Redux into the repo root or mixing business logic into `app/`.

Create:

- `learning/redux/01-store-setup/` directory tree (see target structure above)
- empty metadata file placeholders (content filled in Step 8)

**Done when:** folder structure exists; no runtime behavior yet.

---

### Step 3 — Root reducer stub

Defines the root reducer entry point and a known initial state shape. This is where future slices (ui, auth, RTK Query) will register in later stages—Stage 1 only establishes the contract, not feature logic.

Create `store/rootReducer.ts`:

- `combineReducers` with a single minimal placeholder reducer **or** inline initial reducer in `store.ts` if we want zero placeholder noise
- export `RootState` type from the store module (`AppDispatch` follows in Step 4)

**Done when:** TypeScript compiles; reducer returns a known initial state.

---

### Step 4 — configureStore

Turns the reducer stub into a runnable Redux store and exports the core TypeScript types (`AppStore`, `RootState`, `AppDispatch`) that components and hooks will depend on throughout the learning track.

Create `store/store.ts`:

- call `configureStore` with the root reducer
- export `store`, `AppStore`, `RootState`, `AppDispatch`
- keep devTools enabled for learning visibility

**Done when:** store can be imported without side effects in server components (store module itself is server-safe; Provider is client-only).

---

### Step 5 — Typed hooks

Wraps React-Redux's generic hooks with app-specific types so every `dispatch` and selector call is checked against `RootState` and `AppDispatch`, catching mistakes at compile time instead of at runtime.

Create `store/hooks.ts`:

- `useAppDispatch` → typed to `AppDispatch`
- `useAppSelector` → typed with `RootState`
- follow Redux Toolkit docs pattern (`useDispatch.withTypes`, `useSelector.withTypes` or equivalent)

**Done when:** hooks compile and are exported from `store/index.ts`.

---

### Step 6 — StoreProvider (client)

Bridges the Redux store to React's component tree on the client only. In Next.js App Router, the Provider must live behind a `"use client"` boundary so server components never assume a browser-only store context.

Create `store/store-provider.tsx`:

- `"use client"` directive
- wraps children with `<Provider store={store}>`
- accepts `children: React.ReactNode`

**Done when:** provider can wrap a client subtree without hydration errors.

---

### Step 7 — App Router wiring

Connects the learning route to the store and a minimal interactive demo, proving end-to-end that Provider wiring, state reads, and dispatches work in the browser—not just in isolated store modules.

Create:

- `app/learning/redux/01-store-setup/layout.tsx` — wraps route with `StoreProvider`
- `app/learning/redux/01-store-setup/page.tsx` — renders demo component
- `learning/redux/01-store-setup/ui/store-setup-demo.tsx` — client demo

**Demo behavior (minimal):**

- display current state value
- one button to dispatch a simple increment/set action
- short inline note: "Stage 1 — store wiring only"

**Done when:** `/learning/redux/01-store-setup` loads, button updates state, no console errors.

---

### Step 8 — Metadata files

Captures the learning intent, usage guidance, tradeoffs, and personal notes required by the repo's iteration metadata rules. Stage 1 should be documented—not only coded—so later stages and the ProjectFlow capstone can reference why this foundation exists.

Write content for each required file per [`docs/ai-rules/03-iteration-metadata.md`](../../03-iteration-metadata.md):

| File | Stage 1 focus |
|------|----------------|
| `why.md` | Why global client state exists; why `configureStore` + Provider; why typed hooks matter in TS |
| `when-to-use.md` | When Redux store is appropriate vs local state / Context; when *not* to add Redux yet |
| `tradeoffs.md` | Boilerplate cost, Provider boundary, Next.js client/server split, over-using global state |
| `reflection.md` | First-person placeholder sections for you to fill after reviewing the running demo |

**Done when:** all four files exist with substantive Stage 1 content (reflection can have prompts + partial notes).

---

### Step 9 — Homepage navigation update

Keeps the homepage sidebar aligned with the 12-stage Redux master plan so progress, labels, and links reflect what is actually built—not placeholder entries from an older iteration list.

Update `lib/homepage-navigation.ts`:

- replace old 5-item Redux list with the 12-stage master plan labels
- set `01-store-setup` as current iteration (`completed: false` until you confirm)
- set `isCurrentFocus: true` on Redux Toolkit
- add `href: "/learning/redux/01-store-setup"` for Stage 1

**Done when:** sidebar shows correct stage list; Stage 1 link works.

---

### Step 10 — README progress update

Updates the root README so anyone landing on the repo sees accurate Redux learning progress at a glance, consistent with the homepage nav and the iteration metadata.

Update root `README.md`:

- add Redux 12-stage checklist (or a condensed progress section)
- mark Stage 1 as in progress / complete per your preference after demo review
- keep "Redux Toolkit ← current focus"

**Done when:** README reflects real repo state.

---

### Step 11 — Verify

Confirms lint, build, and manual navigation paths before treating Stage 1 as complete. Catches wiring mistakes early—especially Provider scope and broken route links—before committing.

```bash
npm run lint
npm run build
```

Manual check:

- homepage loads
- side nav link opens Stage 1 page
- demo interaction works
- no Redux Provider on homepage (unless intentionally added later)

**Done when:** lint and build pass.

---

## Metadata content outline (draft for review)

### why.md — suggested headings

1. The problem: prop drilling and scattered client state
2. Why Redux Toolkit exists (opinionated defaults over raw Redux)
3. Why this stage matters: everything else depends on store wiring
4. Next.js-specific reason: client Provider boundary

### when-to-use.md — suggested headings

1. Use a Redux store when…
2. Skip Redux when…
3. Alternatives at this stage: `useState`, `useReducer`, Context
4. How this lab will grow the store incrementally

### tradeoffs.md — suggested headings

1. Complexity added by global store + Provider
2. Client-only boundary in App Router
3. Placeholder reducer — intentional debt until Stage 2
4. Common mistakes: store in root layout too early, untyped hooks, putting server state in slices

### reflection.md — suggested prompts

- What surprised me about Provider placement in Next.js?
- What felt elegant about typed hooks?
- What felt unnecessary?
- Open questions before Stage 2

---

## Verification checklist

- [ ] `@reduxjs/toolkit` and `react-redux` installed
- [ ] `learning/redux/01-store-setup/` exists and is self-contained
- [ ] Store, hooks, and provider exported from `store/index.ts`
- [ ] Route `/learning/redux/01-store-setup` renders and interacts correctly
- [ ] All four metadata files present
- [ ] Homepage nav aligned to 12-stage Redux plan
- [ ] README progress updated
- [ ] `npm run lint` passes
- [ ] `npm run build` passes

---

## Suggested commit message (after full stage completion)

```
feat: add redux stage 1 store setup iteration

Wire configureStore, typed hooks, and route-scoped Provider for the
first Redux learning iteration at /learning/redux/01-store-setup.
```

---

## How to proceed

After you review this plan:

1. Confirm or request changes to scope, file structure, or demo approach.
2. Ask to **execute Step 1**, then Step 2, and so on — one step at a time.
3. Fill in `reflection.md` personally after Steps 7–8 once you've used the demo.

No code will be written until you approve execution.
