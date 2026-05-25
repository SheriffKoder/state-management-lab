/**
 * @file lib/homepage-showcase.ts
 * Config for homepage showcase comparison links.
 */

/** One comparable task-board implementation entry. */
export interface HomepageShowcaseItem {
  id: string;
  label: string;
  descriptor: string;
  href: string;
}

/** One showcase block with its title, description, and implementations. */
export interface HomepageShowcaseSection {
  id: string;
  title: string;
  description: string;
  items: HomepageShowcaseItem[];
}

/** Homepage showcase sections. */
export type HomepageShowcaseConfig = HomepageShowcaseSection[];

/** Homepage showcase section config. */
export const homepageShowcaseConfig: HomepageShowcaseConfig = [
  {
    id: "task-board",
    title: "Compare implementations of the same Task Board:",
    description:
      "Each showcase builds the same task board—list, add, edit, and delete tasks, plus filtering, sorting, and a detail drawer—using a different state management approach so tradeoffs are easy to compare.",
    items: [
      {
        id: "redux-task-board",
        label: "Redux",
        descriptor: "predictable",
        href: "/showcase/redux-task-board",
      },
      {
        id: "zustand-task-board",
        label: "Zustand",
        descriptor: "lightweight",
        href: "/showcase/zustand-task-board",
      },
      {
        id: "tanstack-task-board",
        label: "TanStack Query",
        descriptor: "server cache",
        href: "/showcase/tanstack-task-board",
      },
      {
        id: "hybrid-task-board",
        label: "Hybrid",
        descriptor: "practical boundaries",
        href: "/showcase/hybrid-task-board",
      },
    ],
  },
];
