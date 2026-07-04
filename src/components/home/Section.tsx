import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  /** Anchor id, the scroll target used by the nav. */
  id: string;
  /** Small bronze overline above the title, e.g. "Selected Work". */
  label: string;
  title: string;
  /** Optional lead paragraph under the title. */
  lead?: string;
  /** Optional action rendered on the header's right edge. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * The single section shell for the homepage. Every section shares the same
 * container width, vertical rhythm, and header hierarchy (overline → title →
 * lead), so the page reads as one system. Visual restraint is the point:
 * hairline top rule, generous whitespace, no decoration.
 */
export function Section({
  id,
  label,
  title,
  lead,
  action,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className="border-t border-border scroll-mt-16">
      <div
        className={cn(
          "mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 md:px-8",
          className,
        )}
      >
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <div className="max-w-2xl">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand">
              {label}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h2>
            {lead && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {lead}
              </p>
            )}
          </div>
          {action}
        </div>

        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
