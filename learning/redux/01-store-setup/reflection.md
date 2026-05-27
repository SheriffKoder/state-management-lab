# Reflection — Store Setup

Personal notes after completing Stage 1. Write in first person.

---

## What I learned

- `configureStore` is the single entry point — reducer, middleware, and DevTools in one call
- Typed hooks (`useAppDispatch`, `useAppSelector`) are worth setting up before any real slices exist
- In Next.js App Router, Redux lives behind a client boundary; the store module and the Provider are not the same concern
- Route-scoped Provider keeps Redux opt-in per learning iteration instead of global by default
- Open the DevTools and trace a state changed

---

## What surprised me

- [ ] Importing hooks through a barrel file from a server layout broke the build — React-Redux's server entry doesn't support `withTypes`
- [ ] Stage 1 can feel like "a lot of files for a counter" — the value is the foundation, not the demo
- [ ] A tag from the store is called again from within the dispatch hook, double imports to do one action.

---

## What felt elegant

- `useDispatch.withTypes<AppDispatch>()` and `useSelector.withTypes<RootState>()` — one-line typing with no wrapper functions
- Scoping Provider to `/learning/redux/01-store-setup/layout.tsx` — clear boundary, no Redux on the homepage
- Comments in `rootReducer.ts` documenting where future slices register — makes the growth path visible

---

## What felt painful or unnecessary

- [ ] The `_placeholder` slice and demo counter — useful for proving wiring, but ready to delete in Stage 2
- [ ] Remembering which imports are server-safe vs client-only
- [ ] Other friction:

---

## Open questions before Stage 2

- When ProjectFlow grows, will Provider move from route layout to an authenticated app layout?
- Should each learning iteration get its own store instance, or will iterations eventually share one store?
- How will ui slices be namespaced — flat `sidebar`, `modals` keys or nested under `ui`?
- can we have multiple stores in the same provider?

---

## Notes after using the demo

Visit `/learning/redux/01-store-setup` and click **Increment demo count**. Then jot down anything that clicked (or didn't):

```
(store ready: true, count increments — did DevTools show the action?)


```
