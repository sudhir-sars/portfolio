"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE } from "@/lib/animation";
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
 * source of truth for the card's look, padding, max width, and scroll-reveal,
 * so every sheet across the site stays visually identical. Compose it; don't
 * re-implement the border/blur/width by hand.
 */
export function Sheet({ children, className, contentClassName }: SheetProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: DURATION.slow, ease: EASE.out }}
      className={cn(
        "relative flex w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.08] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div
        className={cn(
          "relative flex flex-col p-4 sm:p-8 md:p-12",
          contentClassName,
        )}
      >
        {children}
      </div>
    </motion.article>
  );
}
