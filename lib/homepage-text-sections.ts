/**
 * @file lib/homepage-text-sections.ts
 * Config for mapped text homepage sections (mental model, learnings, etc.).
 */

/** One text block within a section; newlines render as line breaks. */
export interface HomepageTextSectionItem {
  id: string;
  text: string;
}

/** A titled section of mapped text blocks. */
export interface HomepageTextSection {
  id: string;
  title: string;
  subtitle?: string;
  items: HomepageTextSectionItem[];
}

/** State ownership mental model section. */
export const homepageStateOwnershipConfig: HomepageTextSection = {
  id: "state-ownership",
  title: "State Ownership Mental Model",
  subtitle: "What belongs where?",
  items: [
    {
      id: "local-state",
      text: "Local UI state → useState / useReducer\nEphemeral interactions that die with the component.",
    },
    {
      id: "auth-theme",
      text: "Auth & theme → Context\nSimple, rarely changing values injected near the root.",
    },
    {
      id: "shared-client",
      text: "Shared client state → Zustand or Redux\nCross-feature UI and domain state with clear ownership boundaries.",
    },
    {
      id: "server-data",
      text: "Server data → TanStack Query / RSC\nRemote data, caching, sync, and invalidation—not duplicated in client stores.",
    },
    {
      id: "url-state",
      text: "URL-driven state → searchParams / nuqs\nShareable, bookmarkable application state that belongs in the address bar.",
    },
  ],
};

/** Recent learnings section. */
export const homepageRecentLearningsConfig: HomepageTextSection = {
  id: "recent-learnings",
  title: "Recent Learnings",
  subtitle: "Short reflection snippets",
  items: [
    {
      id: "redux-flow",
      text: "Redux shines when actions, reducers, and selectors need a traceable flow across features—not for every piece of UI state.",
    },
    {
      id: "context-cost",
      text: "Context is deceptively simple early on.\nThe re-render cost only shows up once the provider tree and consumer count grow.",
    },
    {
      id: "server-vs-client",
      text: "Not all \"global\" state belongs in a client store.\nServer cache tools own a different layer entirely.",
    },
    {
      id: "clarity-first",
      text: "Clarity beats cleverness.\nPick the smallest tool that keeps ownership obvious as the app grows.",
    },
  ],
};
