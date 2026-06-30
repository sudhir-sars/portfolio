"use client";

import { motion } from "motion/react";
import { type ReactNode, useMemo, useRef } from "react";
import { DURATION, EASE } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { useTrackActiveChapter } from "@/store/chapter";

interface ChapterSheetProps {
  /** Anchor id, also the scroll target used by the nav. */
  id: string;
  /** Two-digit chapter number, e.g. "01". Shown as a faint corner marker. */
  number: string;
  /** Chapter name, e.g. "About Me". Surfaced in the nav pill while in view. */
  name: string;
  children: ReactNode;
  /** Extra classes for the content area. */
  contentClassName?: string;
}

/**
 * One full-screen sheet in the stack: a frosted paper card (inlined here on
 * purpose, no separate component) that rises into view on scroll and reports
 * itself as the active chapter to the nav while it's on screen.
 */
export function ChapterSheet({
  id,
  number,
  name,
  children,
  contentClassName,
}: ChapterSheetProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const active = useMemo(() => ({ number, name }), [number, name]);
  useTrackActiveChapter(sectionRef, active);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="flex min-h-screen items-center justify-center "
    >
      <motion.div
        initial={{ opacity: 0, y: 64 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: DURATION.slow, ease: EASE.out }}
        className="w-full max-w-7xl"
      >
        <article className="relative flex w-full flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.08] backdrop-blur-xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />

          <div className="relative flex flex-col p-4 sm:p-8 md:p-12">
            <div className={cn("flex flex-col", contentClassName)}>
              {children}
            </div>
          </div>
        </article>
      </motion.div>
    </section>
  );
}
