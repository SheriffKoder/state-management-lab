# Why — Store Setup

## The problem

When client state is shared across multiple components — especially across routes, widgets, or feature boundaries — local `useState` and prop drilling stop scaling. State becomes hard to trace, updates are scattered, and components re-render unpredictably because ownership is unclear.

Redux addresses this by giving shared client state a **single source of truth** with a predictable update flow: dispatch an action → reducer produces new state → subscribers re-render.

## Why Redux Toolkit (not raw Redux)

Raw Redux requires a lot of ceremony: manual action constants, switch statements, store configuration, and middleware wiring. Redux Toolkit (`@reduxjs/toolkit`) removes that friction with opinionated defaults:

- `configureStore` — sensible middleware (including Immer) and DevTools out of the box
- `createReducer` / `createSlice` — less boilerplate, immutable updates via Immer
- Typed hooks — compile-time safety for dispatch and selectors

This lab uses RTK from the start because production Redux is RTK Redux.

## Why this stage matters

Every later Redux stage in this repo depends on what Stage 1 establishes:

| Piece | Role in later stages |
|-------|----------------------|
| `rootReducer` | Where ui, auth, and RTK Query reducers register |
| `configureStore` | Where middleware (listeners, RTK Query) attaches |
| Typed hooks | Used in every component that reads or writes client state |
| `StoreProvider` | The React boundary that makes the store available |

Without store wiring, slices, thunks, and RTK Query have nowhere to live.

## Why a route-scoped Provider in Next.js

Next.js App Router distinguishes **server components** from **client components**. Redux stores are client-only — they hold mutable in-memory state tied to the browser runtime.

Stage 1 scopes the Provider to `/learning/redux/01-store-setup` rather than the root layout because:

- the homepage and unrelated routes do not need Redux yet
- it keeps the client boundary explicit and easy to reason about
- it mirrors how ProjectFlow will likely scope Redux to authenticated app routes, not the entire site

The store module (`configureStore`, reducers) can be imported safely; only hooks and the Provider require `"use client"`.

## What pain this removes

- **Scattered setup** — one known folder (`store/`) instead of Redux files spread across the repo
- **Untyped access** — `useAppDispatch` / `useAppSelector` catch state shape mistakes at compile time
- **Accidental global Redux** — route-scoped Provider avoids forcing Redux on every page prematurely
