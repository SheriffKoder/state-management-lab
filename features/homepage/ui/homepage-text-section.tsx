/**
 * @file features/homepage/ui/homepage-text-section.tsx
 * Mapped text section with title, optional subtitle, and line-break body items.
 */

import type { HomepageTextSection } from "@/lib/homepage-text-sections";
import { cn } from "@/lib/utils";

/**
 * Props for {@link HomepageTextSectionBlock}.
 */
export interface HomepageTextSectionBlockProps {
  config: HomepageTextSection;
  className?: string;
}

/**
 * Renders one config-driven text section.
 *
 * @param props - see {@link HomepageTextSectionBlockProps}
 */
export function HomepageTextSectionBlock({
  config,
  className,
}: HomepageTextSectionBlockProps) {
  if (!config.items.length) {
    return null;
  }

  return (
    <section
      className={cn(
        "w-full border-t border-foreground/10 px-6 py-8",
        className,
      )}
    >
      <div className="flex w-full max-w-5xl flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            {config.title}
          </h2>
          {config.subtitle ? (
            <p className="text-sm text-foreground/60">{config.subtitle}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          {config.items.map((item) => (
            <p
              key={item.id}
              className="whitespace-pre-line text-sm leading-relaxed text-foreground/80"
            >
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
