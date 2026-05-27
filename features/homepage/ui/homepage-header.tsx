/**
 * @file features/homepage/ui/homepage-header.tsx
 * Top-of-page header with title, mission statement, and bottom border.
 */

import { cn } from "@/lib/utils";

/**
 * Props for {@link HomepageHeader}.
 */
export interface HomepageHeaderProps {
  /** Primary page title. */
  title: string;
  /** Short mission or intro copy beneath the title. */
  description: string;
  /** Optional slot for actions such as CTA buttons. */
  actions?: React.ReactNode;
  /** Additional class names for the outer header element. */
  className?: string;
}

/**
 * Renders the homepage header block aligned to the top left.
 *
 * @param props - see {@link HomepageHeaderProps}
 */
export function HomepageHeader({
  title,
  description,
  actions,
  className,
}: HomepageHeaderProps) {
  return (
    <header
      className={cn(
        "border-b border-foreground/10 px-6 pt-4 pb-8 w-full sticky top-0 z-10 dark:brightness-100 brightness-[1.1] contrast-[0.5] dark:contrast-100",
        className,
      )}
    >
      <div className="flex w-full max-w-5xl flex-col items-start gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground gradient-text">
          {title}
        </h1>
        <p className="max-w-2xl text-sm text-foreground/60">{description}</p>
        {actions ? <div className="pt-1">{actions}</div> : null}
      </div>
    </header>
  );
}
