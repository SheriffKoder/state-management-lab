# State Management Lab

A structured exploration of state management patterns in React and Next.js—
from local UI state to global client state, server cache, and URL-driven state.

This repository is both:

- **Learning space** → incremental tool exploration and notes
- **Showcase space** → comparable implementations of the same problem using different approaches

---

## Goal

Understand:

- when each state-management approach becomes necessary
- what tradeoffs it introduces
- how different state types should be separated
- how multiple approaches can coexist in a real application

---

## State categories being explored

### Local UI State
Ephemeral component interactions.

Examples:

- `useState`
- `useReducer`

---

### Shared Client State
State shared across components and features.

Examples:

- Context API
- Redux Toolkit
- Zustand

---

### Server State
Remote data synchronization and caching.

Examples:

- TanStack Query
- SWR

---

### URL State
Application state represented in the URL.

Examples:

- `searchParams`
- `nuqs`

---

## Current exploration progress

### Learning

- [ ] Local State (`useState`)
- [ ] Reducer (`useReducer`)
- [ ] Context API
- [x] Redux Toolkit ← current focus
- [ ] Zustand
- [ ] TanStack Query
- [ ] SWR
- [ ] URL State (`nuqs`)

#### Redux Toolkit — 12-stage path

Progress toward the [ProjectFlow](docs/ai-rules/plans/redux/business-model-target.md) capstone:

- [x] [01 Store Setup](learning/redux/01-store-setup/) — `configureStore`, typed hooks, route-scoped Provider
- [x] [02 UI Slices](learning/redux/02-ui-slices/) — sidebar, modals, `createSlice`, selectors
- [x] [03 Auth Slice](learning/redux/03-auth-slice/) — Supabase session sync, auth listener, login demo
- [ ] 04 Async Thunks — loading and error states
- [ ] 05 Entity Adapter — normalized state
- [ ] 06 RTK Query Basics — queries and Supabase
- [ ] 07 RTK Query CRUD — mutations and invalidation
- [ ] 08 Optimistic Updates — cache patches and rollback
- [ ] 09 Cross-Slice Communication — listener middleware
- [ ] 10 Performance & Scaling — memoized selectors, reducer splitting
- [ ] 11 Supabase Realtime — live cache updates
- [ ] 12 Production Patterns — error middleware, safe hydration

**Next up:** Stage 4 — Async Thunks

---

### Showcase

Comparable task-board implementations:

- [ ] Redux Task Board
- [ ] Zustand Task Board
- [ ] TanStack Query Task Board
- [ ] Hybrid Task Board

---

## Key questions

- When does local state stop scaling?
- What problems does Context actually solve?
- When is Redux overkill?
- What belongs in Zustand vs Redux?
- What belongs in TanStack Query or SWR instead of client state?
- When should state live in the URL?
- How should server state and UI state interact?
- How do multiple state systems coexist cleanly?

---

## Repository structure

```bash
learning/
  redux/
    01-store-setup/
    02-ui-slices/
    03-auth-slice/
    …
  zustand/
  tanstack-query/
  swr/
  nuqs/

showcase/
  projectflow/          # Redux capstone
  redux-task-board/
  zustand-task-board/
  tanstack-task-board/
  hybrid-task-board/
```

---

## Philosophy

This repository focuses on **architectural judgment**, not just API usage.

The goal is to understand:

- why a tool exists
- when to use it
- when not to use it
- what complexity it introduces