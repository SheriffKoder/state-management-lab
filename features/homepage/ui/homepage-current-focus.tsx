/**
 * @file features/homepage/ui/homepage-current-focus.tsx
 * Current focus and latest iteration progress derived from navigation config.
 */

import {
  getCurrentFocusItem,
  type HomepageNavGroup,
} from "@/lib/homepage-navigation";
import { cn } from "@/lib/utils";

import { HomepageNavSubItemRow } from "./homepage-nav-subitem";

/**
 * Props for {@link HomepageCurrentFocusSection}.
 */
export interface HomepageCurrentFocusSectionProps {
  groups: HomepageNavGroup[];
  className?: string;
}

/**
 * Renders the active learning focus and its iteration progress.
 *
 * @param props - see {@link HomepageCurrentFocusSectionProps}
 */
export function HomepageCurrentFocusSection({
  groups,
  className,
}: HomepageCurrentFocusSectionProps) {
  const focusItem = getCurrentFocusItem(groups);

  if (!focusItem) {
    return null;
  }

  const hasIterations = Boolean(focusItem.subitems?.length);

  return (
    <section className={cn("w-full px-6 py-8", className)}>
      <div className="flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-foreground/60">Currently exploring:</p>
          <p className="text-xl font-semibold tracking-tight text-foreground">
            {focusItem.label}
          </p>
        </div>

        {hasIterations ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-foreground/60">Latest iterations:</p>
            <div className="flex flex-col gap-0.5">
              {focusItem.subitems?.map((subitem) => (
                <HomepageNavSubItemRow
                  key={subitem.id}
                  subitem={subitem}
                  className="pl-0"
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
