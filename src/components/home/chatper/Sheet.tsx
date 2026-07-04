import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  children: ReactNode;
  /** Extra classes for the outer card (rarely needed). */
  className?: string;
  /** Extra classes for the padded content area, e.g. gap utilities. */
  contentClassName?: string;
}

/**
 * The frosted "paper" card used everywhere in the experience: homepage chapter
 * sheets, the journey timeline, and project detail pages. This is the single
 * source of truth for the card's look, padding, and max width, so every sheet
 * across the site stays visually identical. Compose it; don't re-implement the
 * border/blur/width by hand. Static by design — no entrance animation.
 */
export function Sheet({ children, className, contentClassName }: SheetProps) {
  return (
    <article
      className={cn(
        "relative flex w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.08] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:rounded-[32px]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div
        className={cn(
          "relative flex flex-col p-6 sm:p-8 md:p-12",
          contentClassName,
        )}
      >
        {children}
      </div>
    </article>
  );
}
