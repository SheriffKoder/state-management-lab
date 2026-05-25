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
  zustand/
  tanstack-query/
  swr/
  nuqs/

showcase/
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