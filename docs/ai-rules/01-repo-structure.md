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
  01-basic-store/
  02-actions-reducers/
  03-selectors/
  04-async-flows/

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