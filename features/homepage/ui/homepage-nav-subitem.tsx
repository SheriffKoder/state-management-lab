/**
 * @file features/homepage/ui/homepage-nav-subitem.tsx
 * Dumb row for a single learning iteration in the side navigation.
 */

import Link from "next/link";

import type { HomepageNavSubItem } from "@/lib/homepage-navigation";
import { cn } from "@/lib/utils";

/**
 * Props for {@link HomepageNavSubItemRow}.
 */
export interface HomepageNavSubItemRowProps {
  subitem: HomepageNavSubItem;
  className?: string;
}

/**
 * Renders one subitem with a completion marker and label.
 *
 * @param props - see {@link HomepageNavSubItemRowProps}
 */
export function HomepageNavSubItemRow({
  subitem,
  className,
}: HomepageNavSubItemRowProps) {
  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          "w-3 shrink-0 text-xs",
          subitem.completed ? "text-emerald-500" : "text-foreground/40",
        )}
      >
        {subitem.completed ? "✓" : "○"}
      </span>
      <span
        className={cn(
          "truncate text-xs",
          subitem.completed ? "text-emerald-500" : "text-foreground/60",
        )}
      >
        {subitem.label}
      </span>
    </>
  );

  if (subitem.href) {
    return (
      <Link
        href={subitem.href}
        className={cn(
          "flex items-center gap-2 rounded-sm py-1 pl-6 pr-2 transition-colors hover:text-foreground",
          className,
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cn("flex items-center gap-2 py-1 pl-6 pr-2", className)}>
      {content}
    </div>
  );
}
