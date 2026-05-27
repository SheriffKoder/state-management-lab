# Why — UI State Slices

## The problem

Stage 1 wired the store. Stage 2 answers: **what actually belongs in it?**

App chrome — sidebar open/closed, which modal is visible — is shared across many components. A header button, a keyboard shortcut, and a mobile overlay might all need to toggle the same sidebar. Without a shared store, that state gets lifted, passed as props, or duplicated in Context.

## Why UI state in Redux (for ProjectFlow-scale apps)

ProjectFlow is a multi-panel ops tool. UI chrome is:

- **Shared** — sidebar, modals, drawers, filters affect layout globally
- **Event-driven** — user clicks dispatch clear actions (`toggleSidebar`, `openModal`)
- **Inspectable** — DevTools should show `ui/sidebar/toggleSidebar`, not scattered `useState` updates

This is different from **server state** (projects, tasks, comments). Those belong in RTK Query later — not in UI slices.

## Why `createSlice`

Stage 1 used `createReducer` + manual actions for wiring. Stage 2 uses `createSlice` because it colocates:

- initial state
- reducers (with Immer — "mutating" syntax, immutable output)
- auto-generated action creators
- a named reducer for DevTools (`ui/sidebar`, `ui/modals`)

Less boilerplate, clearer ownership per feature.

## Why separate sidebar and modals slices

Both are "UI," but they change for **different reasons**:

| Slice | Concern | Changes when |
|-------|---------|----------------|
| `sidebar` | Navigation chrome layout | User toggles nav, responsive breakpoint |
| `modals` | Overlay/dialog visibility | User opens create-task, closes settings |

Merging into one `uiSlice` works for tiny apps. Splitting teaches:

- one slice = one reason to change
- selectors can still combine both (`selectIsAnyModalOpen` reads modals only)
- root reducer stays organized: `ui: { sidebar, modals }`

## Why selectors alongside slices

Reducers **write** state. Selectors **read** it (and derive values like `activeModal !== null`).

Components should not hardcode `state.ui.sidebar.isOpen` everywhere — selectors hide shape and enable memoization in Stage 10.

## Why the store barrel for UI imports

Demo components import hooks, actions, and selectors from `store/` — not `slices/ui/` directly. That keeps slice folders as implementation detail and gives UI one public entry point (while server layouts still import `StoreProvider` directly).
