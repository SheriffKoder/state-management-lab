# Repo Structure Rules

This repository has two purposes:

1. **Learning**: incremental exploration of a tool.
2. **Showcase**: polished comparable implementations.

## Learning structure

Each tool has a dedicated folder:

learning/<tool-name>/

Inside each tool folder, iterations are incremental:

learning/<tool-name>/01-<topic>
learning/<tool-name>/02-<topic>
learning/<tool-name>/03-<topic>

Rules:

- Each iteration builds on previous understanding.
- Earlier iterations stay minimal.
- Later iterations may reuse/refactor previous ideas.
- Each iteration must include metadata markdown files.
- Keep examples focused on one concept.

Example:

learning/redux/
  01-store-setup/
  02-ui-slices/
  03-auth-slice/
  …

---

## Learning page layout

Every `app/learning/<tool>/<iteration>/page.tsx` uses the same shell:

1. **`main`** — `h-screen`, padded background
2. **Outer card** — `mx-auto flex h-full flex-col gap-6 rounded-md border p-6` wraps title + demo
3. **`header`** — `max-w-2xl` with stage title and one-line description
4. **App window** — `h-full min-h-0 overflow-hidden rounded-lg border shadow-sm` contains the demo component at real proportions

Demo UI lives inside the app window (`learning/.../ui/*-demo.tsx`):

- Use realistic widths (`max-w-sm`, `max-w-md`) on inner cards — not full-bleed content
- Overlays/modals use `absolute inset-0` within a `relative` demo root — not `fixed` to the viewport
- Sidebars use `border-r` and full height of the app window

`page.tsx` is a thin composer only — no Redux logic in the route file.

---

## Showcase structure

Polished comparable implementations live here:

showcase/<tool-name>-task-board/

Examples:

showcase/redux-task-board/
showcase/zustand-task-board/
showcase/tanstack-task-board/

Rules:

- Same domain/problem across all showcase apps.
- Similar UI and feature set.
- Only implementation approach should differ.
- Optimize readability over experimentation.