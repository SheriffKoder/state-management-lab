/**
 * @file lib/homepage-navigation.ts
 * Types, helpers, and config for the homepage learning navigation.
 */

/** A single learning iteration shown under a tool item. */
export interface HomepageNavSubItem {
  id: string;
  label: string;
  href?: string;
  completed: boolean;
}

/** A tool or topic entry that may expose expandable subitems. */
export interface HomepageNavItem {
  id: string;
  label: string;
  href?: string;
  isCurrentFocus?: boolean;
  subitems?: HomepageNavSubItem[];
}

/** A labeled group of navigation items (e.g. Local UI State). */
export interface HomepageNavGroup {
  id: string;
  label: string;
  items: HomepageNavItem[];
}

/** Completion ratio for an item's subitems, or null when there are none. */
export function getNavItemCompletionPercent(
  item: HomepageNavItem,
): number | null {
  if (!item.subitems?.length) {
    return null;
  }

  const completedCount = item.subitems.filter(
    (subitem) => subitem.completed,
  ).length;

  return Math.round((completedCount / item.subitems.length) * 100);
}

/** Returns the item marked as the current learning focus, if any. */
export function getCurrentFocusItem(
  groups: HomepageNavGroup[],
): HomepageNavItem | undefined {
  for (const group of groups) {
    const focusItem = group.items.find((item) => item.isCurrentFocus);
    if (focusItem) {
      return focusItem;
    }
  }

  return undefined;
}

/** Homepage sidebar navigation config. */
export const homepageNavigationConfig: HomepageNavGroup[] = [
  // {
  //   id: "local-ui-state",
  //   label: "Local UI State",
  //   items: [
  //     {
  //       id: "local-state",
  //       label: "Local State",
  //       subitems: [],
  //     },
  //     {
  //       id: "use-reducer",
  //       label: "Reducer",
  //       subitems: [],
  //     },
  //   ],
  // },
  {
    id: "shared-client-state",
    label: "Shared Client State",
    items: [
      // {
      //   id: "context-api",
      //   label: "Context API",
      //   subitems: [],
      // },
      {
        id: "redux-toolkit",
        label: "Redux Toolkit",
        isCurrentFocus: true,
        subitems: [
          {
            id: "redux-01-basic-store",
            label: "01 Basic Store",
            href: "/learning/redux/01-basic-store",
            completed: true,
          },
          {
            id: "redux-02-reducers",
            label: "02 Reducers",
            href: "/learning/redux/02-reducers",
            completed: false,
          },
          {
            id: "redux-03-selectors",
            label: "03 Selectors",
            href: "/learning/redux/03-selectors",
            completed: false,
          },
          {
            id: "redux-04-async-flows",
            label: "04 Async Flows",
            href: "/learning/redux/04-async-flows",
            completed: false,
          },
          {
            id: "redux-05-slice-architecture",
            label: "05 Slice Architecture",
            href: "/learning/redux/05-slice-architecture",
            completed: false,
          },
        ],
      },
      // {
      //   id: "zustand",
      //   label: "Zustand",
      //   subitems: [],
      // },
    ],
  },
  // {
  //   id: "server-state",
  //   label: "Server State",
  //   items: [
  //     {
  //       id: "tanstack-query",
  //       label: "TanStack Query",
  //       subitems: [],
  //     },
  //     {
  //       id: "swr",
  //       label: "SWR",
  //       subitems: [],
  //     },
  //   ],
  // },
  // {
  //   id: "url-state",
  //   label: "URL State",
  //   items: [
  //     {
  //       id: "nuqs",
  //       label: "URL State",
  //       subitems: [],
  //     },
  //   ],
  // },
];
