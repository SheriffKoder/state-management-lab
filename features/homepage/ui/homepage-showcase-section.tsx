/**
 * @file features/homepage/ui/homepage-showcase-section.tsx
 * Showcase comparisons section mapped from config.
 */

import type {
  HomepageShowcaseConfig,
  HomepageShowcaseSection as HomepageShowcaseSectionConfig,
} from "@/lib/homepage-showcase";
import { cn } from "@/lib/utils";

import { HomepageShowcaseItemRow } from "./homepage-showcase-item";

/**
 * Props for {@link HomepageShowcaseSectionBlock}.
 */
export interface HomepageShowcaseSectionBlockProps {
  section: HomepageShowcaseSectionConfig;
  className?: string;
}

/**
 * Renders one showcase comparison block.
 *
 * @param props - see {@link HomepageShowcaseSectionBlockProps}
 */
export function HomepageShowcaseSectionBlock({
  section,
  className,
}: HomepageShowcaseSectionBlockProps) {
  return (
    <div className={cn("flex w-full max-w-5xl flex-col gap-6", className)}>
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {section.title}
        </h2>
        <p className="max-w-2xl text-sm text-foreground/60">
          {section.description}
        </p>
      </div>

      <div className="flex flex-col divide-y divide-foreground/10">
        {section.items.map((item) => (
          <HomepageShowcaseItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

/**
 * Props for {@link HomepageShowcaseSection}.
 */
export interface HomepageShowcaseSectionProps {
  config: HomepageShowcaseConfig;
  className?: string;
}

/**
 * Renders all task-board showcase comparison blocks.
 *
 * @param props - see {@link HomepageShowcaseSectionProps}
 */
export function HomepageShowcaseSection({
  config,
  className,
}: HomepageShowcaseSectionProps) {
  if (!config.length) {
    return null;
  }

  return (
    <section
      className={cn(
        "w-full border-t border-foreground/10 px-6 py-8",
        className,
      )}
    >
      <div className="flex flex-col gap-10">
        {config.map((section) => (
          <HomepageShowcaseSectionBlock key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
