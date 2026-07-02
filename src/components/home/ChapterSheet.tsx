"use client";

import type { ReactNode } from "react";
import { useMemo, useRef } from "react";
import { Sheet } from "@/components/Sheet";
import { useTrackActiveChapter } from "@/store/chapter";

interface ChapterSheetProps {
  /** Anchor id, also the scroll target used by the nav. */
  id: string;
  /** Two-digit chapter number, e.g. "01". Reported to the nav pill in view. */
  number: string;
  /** Chapter name, e.g. "About Me". Surfaced in the nav pill while in view. */
  name: string;
  children: ReactNode;
  /** Extra classes for the content area. */
  contentClassName?: string;
}

/**
 * One full-screen sheet in the homepage stack. Wraps the shared {@link Sheet}
 * card in a min-h-screen section, and reports itself as the active chapter to
 * the nav while it's on screen. Visual/width concerns live in Sheet; this only
 * adds the scroll section and active-chapter tracking.
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
      className="flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6 sm:py-24 md:px-8"
    >
      <Sheet contentClassName={contentClassName}>{children}</Sheet>
    </section>
  );
}
