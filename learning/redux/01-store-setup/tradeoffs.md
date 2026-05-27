# Tradeoffs — Store Setup

## Complexity introduced

Stage 1 adds files and concepts before there is meaningful shared state:

- `store/` module (reducer, store, hooks, provider)
- A client Provider boundary in the route layout
- Typed hook indirection instead of raw `useDispatch` / `useSelector`

This is intentional overhead. The bet is that Stages 2–12 and the ProjectFlow capstone will need global client state often enough to justify setup now.

## Client-only boundary in App Router

Redux does not run on the server. In Next.js App Router that means:

- `StoreProvider` and `hooks.ts` must be behind `"use client"`
- Server components (pages, layouts without `"use client"`) cannot call `useAppSelector`
- Importing the store **barrel** from a server file can accidentally pull in client hooks and break the build

Stage 1 learned this the hard way: React-Redux's RSC entry does not expose `useDispatch.withTypes`, so hooks must stay in client modules and server layouts should import `StoreProvider` directly.

## Placeholder reducer — intentional debt

The `_placeholder` slice (with a demo `count` field) exists only to prove wiring. It is not a modeling decision.

| Debt | Payoff in Stage 2 |
|------|-------------------|
| `_placeholder` key in root state | Replaced by real `ui` / feature slices |
| `incrementDemoCount` action | Removed with demo UI |
| Comments documenting future slices | Becomes actual `combineReducers` keys |

Removing the placeholder without adding real slices would leave an empty store — fine for wiring, useless for features.

## Common mistakes

1. **Provider in root layout too early** — every page pays for Redux even when unused; harder to debug hydration and bundle size
2. **Untyped hooks** — `useSelector(state => state.foo)` fails silently when slices rename; always use `useAppSelector`
3. **Putting server data in slices** — fetch + cache + invalidation belongs in RTK Query, not manual reducers
4. **Barrel imports on the server** — re-exporting hooks from `store/index.ts` risks evaluating client code during RSC prerender
5. **One giant store from day one** — registering every future slice immediately adds noise; grow incrementally with each stage

## Overengineering risks

- Adding middleware, persistence, or saga-style layers in Stage 1 — none are needed yet
- Creating slices before a feature needs shared state — wait until Stage 2
- Duplicating server cache in Redux — RTK Query (Stage 6) owns remote data

## Scaling considerations

- **DevTools** enabled in development — disable or gate in production if bundle size matters (RTK handles this via `configureStore` defaults)
- **Single store instance** per Provider tree is fine for this lab; multi-tab or SSR-hydrated stores need explicit patterns in Stage 12
- **Root reducer planning** now prevents refactor churn when auth logout must reset multiple slices (Stage 9)
