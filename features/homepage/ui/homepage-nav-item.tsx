/**
 * @file features/homepage/ui/homepage-nav-item.tsx
 * Dumb expandable navigation row for a tool with optional subitems.
 */

import type { HomepageNavItem } from "@/lib/homepage-navigation";
import { cn } from "@/lib/utils";

import { HomepageNavSubItemRow } from "./homepage-nav-subitem";

/**
 * Props for {@link HomepageNavItemRow}.
 */
export interface HomepageNavItemRowProps {
  item: HomepageNavItem;
  completionPercent: number | null;
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
}

/**
 * Renders a tool summary row and its subitems when expanded.
 *
 * @param props - see {@link HomepageNavItemRowProps}
 */
export function HomepageNavItemRow({
  item,
  completionPercent,
  isExpanded,
  onToggle,
  className,
}: HomepageNavItemRowProps) {
  const hasSubitems = Boolean(item.subitems?.length);

  return (
    <div className={cn("py-0.5", className)}>
      {hasSubitems ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          className={cn(
            "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left transition-colors hover:bg-foreground/5",
            item.isCurrentFocus && "bg-foreground/5",
          )}
        >
          {completionPercent !== null ? (
            <span className="shrink-0 text-xs tabular-nums text-foreground/50">
              [{completionPercent}%]
            </span>
          ) : null}
          <span
            className={cn(
              "flex-1 truncate text-xs font-medium",
              item.isCurrentFocus
                ? "text-foreground"
                : "text-foreground/80",
            )}
          >
            {item.label}
          </span>
          <span
            aria-hidden
            className={cn(
              "shrink-0 text-xs text-foreground/40 transition-transform",
              isExpanded && "rotate-90",
            )}
          >
            ›
          </span>
        </button>
      ) : (
        <div className="flex items-center gap-2 px-2 py-1.5">
          <span
            className={cn(
              "flex-1 truncate text-xs",
              item.isCurrentFocus
                ? "font-medium text-foreground"
                : "text-foreground/80",
            )}
          >
            {item.label}
          </span>
        </div>
      )}

      {hasSubitems && isExpanded ? (
        <div className="mt-0.5 space-y-0.5">
          {item.subitems?.map((subitem) => (
            <HomepageNavSubItemRow key={subitem.id} subitem={subitem} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
