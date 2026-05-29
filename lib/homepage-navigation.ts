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
            id: "redux-01-store-setup",
            label: "01 Store Setup",
            href: "/learning/redux/01-store-setup",
            completed: true,
          },
          {
            id: "redux-02-ui-slices",
            label: "02 UI Slices",
            href: "/learning/redux/02-ui-slices",
            completed: true,
          },
          {
            id: "redux-03-auth-slice",
            label: "03 Auth Slice",
            href: "/learning/redux/03-auth-slice",
            completed: true,
          },
          {
            id: "redux-04-async-thunks",
            label: "04 Async Thunks",
            href: "/learning/redux/04-async-thunks",
            completed: true,
          },
          {
            id: "redux-05-entity-adapter",
            label: "05 Entity Adapter",
            href: "/learning/redux/05-entity-adapter",
            completed: false,
          },
          {
            id: "redux-06-rtk-query-basics",
            label: "06 RTK Query Basics",
            href: "/learning/redux/06-rtk-query-basics",
            completed: false,
          },
          {
            id: "redux-07-rtk-query-crud",
            label: "07 RTK Query CRUD",
            href: "/learning/redux/07-rtk-query-crud",
            completed: false,
          },
          {
            id: "redux-08-optimistic-updates",
            label: "08 Optimistic Updates",
            href: "/learning/redux/08-optimistic-updates",
            completed: false,
          },
          {
            id: "redux-09-cross-slice-communication",
            label: "09 Cross-Slice Communication",
            href: "/learning/redux/09-cross-slice-communication",
            completed: false,
          },
          {
            id: "redux-10-performance-scaling",
            label: "10 Performance & Scaling",
            href: "/learning/redux/10-performance-scaling",
            completed: false,
          },
          {
            id: "redux-11-supabase-realtime",
            label: "11 Supabase Realtime",
            href: "/learning/redux/11-supabase-realtime",
            completed: false,
          },
          {
            id: "redux-12-production-patterns",
            label: "12 Production Patterns",
            href: "/learning/redux/12-production-patterns",
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
