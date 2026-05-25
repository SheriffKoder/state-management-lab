/**
 * @file features/homepage/ui/homepage-nav-group.tsx
 * Dumb group block for the homepage side navigation.
 */

import type { HomepageNavGroup, HomepageNavItem } from "@/lib/homepage-navigation";
import { cn } from "@/lib/utils";

import { HomepageNavItemRow } from "./homepage-nav-item";

/**
 * Props for {@link HomepageNavGroupBlock}.
 */
export interface HomepageNavGroupBlockProps {
  group: HomepageNavGroup;
  expandedItemIds: ReadonlySet<string>;
  getCompletionPercent: (item: HomepageNavItem) => number | null;
  onToggleItem: (itemId: string) => void;
  className?: string;
}

/**
 * Renders one navigation group with its items and a bottom border.
 *
 * @param props - see {@link HomepageNavGroupBlockProps}
 */
export function HomepageNavGroupBlock({
  group,
  expandedItemIds,
  getCompletionPercent,
  onToggleItem,
  className,
}: HomepageNavGroupBlockProps) {
  return (
    <section
      className={cn(
        "px-3 pt-2 pb-4",
        className,
      )}
    >
      <h2 className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-foreground/50">
        {group.label}
      </h2>
      <div className="space-y-0.5 border-b border-foreground/10 pb-2">
        {group.items.map((item) => (
          <HomepageNavItemRow
            key={item.id}
            item={item}
            completionPercent={getCompletionPercent(item)}
            isExpanded={expandedItemIds.has(item.id)}
            onToggle={() => onToggleItem(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
