/**
 * @file features/homepage/ui/homepage-showcase-item.tsx
 * Dumb row for one showcase implementation link.
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { HomepageShowcaseItem } from "@/lib/homepage-showcase";
import { cn } from "@/lib/utils";

/**
 * Props for {@link HomepageShowcaseItemRow}.
 */
export interface HomepageShowcaseItemRowProps {
  item: HomepageShowcaseItem;
  className?: string;
}

/**
 * Renders one showcase entry with label, descriptor, and open link.
 *
 * @param props - see {@link HomepageShowcaseItemRowProps}
 */
export function HomepageShowcaseItemRow({
  item,
  className,
}: HomepageShowcaseItemRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4 py-2", className)}>
      <p className="text-sm">
        <span className="font-medium text-foreground">[ {item.label} ]</span>{" "}
        <span className="text-foreground/60">{item.descriptor}</span>
      </p>
      <Link
        href={item.href}
        className="inline-flex shrink-0 items-center gap-1 text-sm text-foreground/60 underline underline-offset-4 transition-colors hover:text-foreground"
      >
        Open
        <ArrowUpRight aria-hidden className="size-3.5" />
      </Link>
    </div>
  );
}
