# Reflection — UI State Slices

Personal notes after completing Stage 2. Write in first person.

---

## What I learned

- `createSlice` colocates state, reducers, and actions — less ceremony than Stage 1's manual `createReducer` + `createAction`
- Splitting sidebar and modals into separate slices keeps each reducer focused on one UI concern
- Selectors read state; reducers write it — `selectIsAnyModalOpen` derives from `activeModal` instead of storing a duplicate flag
- Client demo components can import from the `store/` barrel; server layouts must still import `StoreProvider` directly
- Root state shape `{ ui: { sidebar, modals } }` is ready for `auth` and RTK Query siblings in later stages

---

## What surprised me

- [ ] How natural `createSlice` felt compared to Stage 1's placeholder reducer
- [ ] That opening a second modal replaces the first — intentional for Stage 2, not a stack
- [ ] Other surprises: none

---

## What felt elegant

- Immer inside `createSlice` — writing `state.isOpen = !state.isOpen` without manual spreading
- DevTools action names like `ui/sidebar/toggleSidebar` and `ui/modals/openModal`
- The demo shell — sidebar + main + modal overlay — feels like early ProjectFlow chrome
- Importing hooks, actions, and selectors from one `store/` entry in client components

---

## What felt painful or unnecessary

- [ ] Thin selectors like `selectSidebarIsOpen` — useful for consistency, but feel verbose at this scale
- [ ] Two dimensions on sidebar (`isOpen` + `isCollapsed`) — worth it, or over-modeled?
- [ ] Other friction:

---

## Open questions before Stage 3

- Should auth session live in its own top-level slice or under a namespace?
- When a user logs out, should listener middleware close modals and reset sidebar?
- Will ProjectFlow use the same single-`activeModal` pattern or need a stack?

---

## Notes after using the demo shell

Visit `/learning/redux/02-ui-slices`. Toggle sidebar, collapse it, open each modal. Check DevTools.

```
(sidebar collapse + modal open — anything unexpected in state or re-renders?)


```
