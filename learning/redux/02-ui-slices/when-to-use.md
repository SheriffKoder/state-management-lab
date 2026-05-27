# When to Use — UI State Slices

## Put UI state in a Redux slice when

- **Multiple components** need the same UI flag (sidebar open from header + sidebar + mobile menu)
- **Distant components** trigger the same UI change (open modal from toolbar and from keyboard shortcut)
- **Layout depends on global chrome** — main content width changes when sidebar collapses
- **You want DevTools visibility** into UI transitions during learning and debugging
- **The state outlives one component** — modal opened in one panel, closed from overlay or route change

Stage 2 demos sidebar + modals because ProjectFlow will have both patterns at scale.

## Keep UI state local (`useState`) when

- Only **one component** cares (dropdown open inside a single card)
- State **dies with the component** — tooltip hover, input focus
- **No sibling or parent** needs to read or change it
- Lifting to Redux would mean **more files and indirection** for zero shared benefit

Example: the chevron icon rotation inside a single accordion item — local state.

## Sidebar in Redux vs local state

| Use Redux slice | Use local state |
|-----------------|-----------------|
| App-wide navigation panel | One-off filter drawer inside a table |
| Collapse state affects main layout | Collapse only affects one widget |
| Open/close triggered from multiple places | Toggle button and panel are siblings in one file |

## Modals in Redux vs local state

| Use Redux slice | Use local state |
|-----------------|-----------------|
| Global dialog system (`activeModal` id) | Inline confirm dialog in one form |
| Modal opened from header, closed from overlay | Modal component owns its own `open` prop |
| Need to block sidebar when modal open (future cross-slice selector) | Simple `Dialog` from a UI library with internal state |

Stage 2 uses a **single `activeModal` id** — one dialog at a time. A modal stack (nested dialogs) would be a later refinement.

## Slice granularity guide

| Granularity | When |
|-------------|------|
| **One slice per UI concern** (sidebar, modals) | Default for ProjectFlow — clear ownership |
| **Merged `ui` slice** | Very small apps with few UI flags |
| **Slice per modal** | Overkill — use one modals slice with an id |

## How this fits the 12-stage path

- **Stage 3** adds `auth` slice — sibling to `ui`, not inside it
- **Stage 6+** adds RTK Query — server data never goes in `ui` slices
- **Stage 9** may reset UI on logout via listener middleware

Rule: **UI slices = client chrome only. Server data = RTK Query.**
