# Redux Learning & Showcase Master Plan

This repository is a structured progression toward **Redux mastery at a production level**.

The goal is to master:

* Redux Toolkit
* RTK Query
* Production state architecture
* Auth integration
* Supabase integration
* Next.js App Router integration
* Real-world scaling patterns

This is not tutorial code.

Each stage should produce reusable knowledge and visible progress.

---

# Repository Structure Rules

## Keep files close to their domain

All feature-specific code should live inside:

```bash
learning/redux/
showcase/projectflow/
```

Avoid placing Redux files in root.

---

## Root-level shared infrastructure (allowed)

Only truly shared utilities may live in root:

```bash
lib/
  supabase/
    client.ts
    server.ts
    middleware.ts
    auth-helpers.ts

shared/
  components/
  utils/
  types/
```

Use root only for:

* Supabase setup
* generic shared UI
* shared utility helpers
* shared TypeScript types

---

## Learning area

Incremental isolated Redux learning.

```bash
learning/
  redux/
    01-store-setup/
    02-ui-slices/
    03-auth-slice/
    04-async-thunks/
    05-entity-adapter/
    06-rtk-query-basics/
    07-rtk-query-crud/
    08-optimistic-updates/
    09-cross-slice-communication/
    10-performance-scaling/
    11-supabase-realtime/
    12-production-patterns/
```

Each folder must run independently.

---

## Showcase area

Final production-style application.

```bash
showcase/
  projectflow/
```

ProjectFlow is the capstone.

---

# Mandatory Tasks For Every Stage

After completing each stage:

## 1. Create iteration metadata files

Every stage folder must include:

```bash
why.md
when-to-use.md
tradeoffs.md
reflection.md
```

---

### why.md

Explain:

* what problem this solves
* why Redux feature/tool exists
* why this stage matters

---

### when-to-use.md

Explain:

* when this pattern should be used
* when not to use it
* alternatives

---

### tradeoffs.md

Explain:

* complexity introduced
* downsides
* common mistakes
* scaling considerations

---

### reflection.md

Personal notes:

* what I learned
* what surprised me
* what felt elegant
* what felt difficult
* open questions

Write in first person.

---

## 2. Update root README

After every stage:

Update:

* progress checklist
* current focus
* completed stages
* key learnings

Mark completed items.

---

## 3. Update homepage configuration

Homepage must reflect progress.

Update:

* current active stage
* learning progress
* links to completed iterations
* showcase progress

Homepage should always be navigable.

---

## 4. Commit with meaningful message

Use conventional commits.

Examples:

```bash
feat: add redux ui slice iteration
feat: implement auth slice with supabase session sync
experiment: compare thunk vs rtk query project loading
docs: add tradeoffs for entity adapter
notes: reflect on optimistic cache updates
refactor: move shared supabase helpers to root
```

Avoid vague commits.

---

# Learning Stages

---

# Stage 1 — Store Setup & Project Foundations

## Build

```bash
learning/redux/01-store-setup
```

## Focus

* configureStore
* typed hooks
* Provider setup
* Next.js integration
* root reducer planning

## Output

* store/
* hooks.ts
* provider wiring

## Required updates

* metadata files
* README progress
* homepage learning node

---

# Stage 2 — UI State Slices

## Build

```bash
learning/redux/02-ui-slices
```

## Focus

* createSlice
* sidebar state
* modal state
* actions
* selectors

---

# Stage 3 — Authentication Slice

## Build

```bash
learning/redux/03-auth-slice
```

## Focus

* Supabase auth
* login/logout
* session persistence
* session hydration
* route protection

## Learn

* auth boundaries
* client vs server auth
* Redux vs direct session usage
* cookies basics

## Cookie topics

Learn:

* session cookies
* HttpOnly
* Secure
* SameSite
* Next.js cookies()

Do not go deep beyond what supports auth understanding.

---

# Stage 4 — Async Thunks

## Build

```bash
learning/redux/04-async-thunks
```

## Focus

* createAsyncThunk
* loading states
* error states
* pending/fulfilled/rejected
* extraReducers

---

# Stage 5 — Entity Adapter & Normalization

## Build

```bash
learning/redux/05-entity-adapter
```

## Focus

* normalized state
* ids/entities
* generated selectors
* relational data modeling

---

# Stage 6 — RTK Query Basics

## Build

```bash
learning/redux/06-rtk-query-basics
```

## Focus

* createApi
* baseQuery
* Supabase integration
* query hooks

---

# Stage 7 — RTK Query CRUD

## Build

```bash
learning/redux/07-rtk-query-crud
```

## Focus

* mutations
* invalidation
* cache lifecycle
* refetching

---

# Stage 8 — Optimistic Updates

## Build

```bash
learning/redux/08-optimistic-updates
```

## Focus

* onQueryStarted
* patchQueryData
* rollback handling

---

# Stage 9 — Cross-Slice Communication

## Build

```bash
learning/redux/09-cross-slice-communication
```

## Focus

* listener middleware
* store reset
* auth logout cleanup
* global reactions

---

# Stage 10 — Performance & Scaling

## Build

```bash
learning/redux/10-performance-scaling
```

## Focus

* memoized selectors
* reselect
* reducer splitting
* avoiding rerenders
* lazy reducer patterns

---

# Stage 11 — Supabase Realtime

## Build

```bash
learning/redux/11-supabase-realtime
```

## Focus

* subscriptions
* live cache updates
* RTK Query synchronization

---

# Stage 12 — Production Patterns

## Build

```bash
learning/redux/12-production-patterns
```

## Focus

* global error middleware
* retry strategies
* auth refresh
* secure setup
* safe hydration
* App Router integration

---

# Final Capstone — ProjectFlow Showcase

## Build

```bash
showcase/projectflow
```

Production application using everything learned.

## Features

* auth
* projects CRUD
* tasks CRUD
* comments
* analytics widgets
* optimistic updates
* realtime updates
* role permissions

## Architectural rules

Use:

* Redux Toolkit → client UI state
* RTK Query → server state
* Supabase → backend/auth/realtime

Avoid putting everything into Redux.

State ownership must be intentional.

---

# Success Criteria

By the end, I should be able to:

* explain Redux architecture clearly
* choose between slices, thunks, and RTK Query
* manage normalized state confidently
* handle auth and sessions correctly
* understand cookie-based session basics
* integrate Redux into Next.js App Router
* build production-grade Redux applications
* discuss tradeoffs confidently in interviews
