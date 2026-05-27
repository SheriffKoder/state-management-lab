# Tradeoffs — UI State Slices

## Global UI state and re-renders

Any component using `useAppSelector` re-renders when the selected value changes. Putting sidebar and modals in Redux means:

- Sidebar toggle re-renders all components selecting sidebar state
- Modal open re-renders components selecting modal state

Mitigations (Stage 10):

- Narrow selectors — select only `isOpen`, not the whole `ui` tree
- `React.memo` on heavy child components
- `createSelector` for memoized derived values

For Stage 2's small demo, re-render cost is negligible. The tradeoff matters at ProjectFlow scale.

## Over-using Redux for UI

Not every interaction needs a slice. Adding Redux for:

- hover states
- form field focus
- one-component toggles

…adds files, actions, and DevTools noise without shared-state benefit.

**Smell test:** "Would another component need this state?" If no, use `useState`.

## Slice granularity mistakes

### Too few slices

One giant `uiSlice` with sidebar + modals + filters + theme:

- Harder to reason about
- Unrelated actions in one reducer
- Larger re-render surface if selectors are lazy

### Too many slices

One slice per modal (`createTaskModalSlice`, `settingsModalSlice`):

- Boilerplate explosion
- Harder to enforce "one modal at a time"

Stage 2's `modalsSlice` with `activeModal: string | null` is the middle ground.

## Single `activeModal` vs modal stack

Stage 2 choice: **replace, don't stack**.

| Approach | Pros | Cons |
|----------|------|------|
| Single id (`activeModal`) | Simple; matches many ops UIs | Cannot show nested dialogs |
| Stack of ids | Nested modals | More state, close-order logic |

ProjectFlow can start with single-id; add stack only if product requires nested dialogs.

## Selectors that look redundant

`selectSidebarIsOpen` just reads one field — seems like duplication of the reducer shape. Value is:

- hide path (`state.ui.sidebar.isOpen` → one import)
- room for derived logic later (e.g. combine with viewport)
- consistent component API

`selectIsAnyModalOpen` is the clearer win — **derived**, not stored.

## Common mistakes

1. **Storing server data in UI slices** — e.g. task list in sidebar slice because it renders there
2. **Importing `slices/ui` from components** — bypasses store public API; use `store/` barrel in client UI
3. **Importing store barrel from server layouts** — pulls client hooks; use `store-provider` directly
4. **Duplicating derived state in reducer** — storing `isAnyModalOpen` when `activeModal !== null` computes it
5. **Putting auth session in UI slice** — auth gets its own slice in Stage 3

## Scaling considerations

- Nested root shape `ui: { sidebar, modals }` leaves room for `auth`, RTK Query paths as siblings
- Action names in DevTools (`ui/sidebar/toggleSidebar`) help debug user-reported "sidebar stuck" issues
- Stage 9 listener middleware can `closeModal()` on route change or logout — easier when modal state is global and action-driven
