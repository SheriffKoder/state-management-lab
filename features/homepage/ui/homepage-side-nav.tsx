/**
 * @file features/homepage/ui/homepage-side-nav.tsx
 * Client wrapper that maps navigation config into dumb group/item components.
 */

"use client";

import { useMemo, useState } from "react";

import {
  getNavItemCompletionPercent,
  type HomepageNavGroup,
} from "@/lib/homepage-navigation";
import { cn } from "@/lib/utils";

import { HomepageNavGroupBlock } from "./homepage-nav-group";

/**
 * Props for {@link HomepageSideNav}.
 */
export interface HomepageSideNavProps {
  groups: HomepageNavGroup[];
  className?: string;
}

/** Builds the initial expanded set from items marked as current focus. */
function getInitialExpandedItemIds(groups: HomepageNavGroup[]): Set<string> {
  const expandedIds = new Set<string>();

  for (const group of groups) {
    for (const item of group.items) {
      if (item.isCurrentFocus && item.subitems?.length) {
        expandedIds.add(item.id);
      }
    }
  }

  return expandedIds;
}

/**
 * Renders the homepage learning navigation from config.
 *
 * @param props - see {@link HomepageSideNavProps}
 */
export function HomepageSideNav({ groups, className }: HomepageSideNavProps) {
  const [expandedItemIds, setExpandedItemIds] = useState<Set<string>>(() =>
    getInitialExpandedItemIds(groups),
  );

  const getCompletionPercent = useMemo(
    () => (item: Parameters<typeof getNavItemCompletionPercent>[0]) =>
      getNavItemCompletionPercent(item),
    [],
  );

  function handleToggleItem(itemId: string) {
    setExpandedItemIds((current) => {
      const next = new Set(current);

      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }

      return next;
    });
  }

  return (
    <nav
      aria-label="Learning navigation"
      className={cn(
        "w-72 shrink-0 py-4",
        className,
      )}
    >
      {groups.map((group) => (
        <HomepageNavGroupBlock
          key={group.id}
          group={group}
          expandedItemIds={expandedItemIds}
          getCompletionPercent={getCompletionPercent}
          onToggleItem={handleToggleItem}
        />
      ))}
    </nav>
  );
}
