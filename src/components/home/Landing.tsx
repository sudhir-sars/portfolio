"use client";

import { useRef } from "react";
import { ScrollIndicator } from "@/components/home/ScrollIndicator";
import { useTrackActiveChapter } from "@/store/chapter";

/**
 * The opening screen. Full viewport, transparent over the background image,
 * with the experience title and a single quiet instruction.
 */
export function Landing() {
  const sectionRef = useRef<HTMLElement>(null);
  // On the cover, the nav pill shows "README | … Viewers" again.
  useTrackActiveChapter(sectionRef, null);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex h-screen flex-col items-center justify-center px-6 text-center"
    >
      <h1 className="text-5xl font-semibold tracking-[0.18em] text-white sm:text-8xl md:text-9xl">
        README
      </h1>

      <p className="mt-6 text-xs font-light uppercase tracking-[0.25em] text-white/55 sm:text-base sm:tracking-[0.35em]">
        Start from the beginning.
      </p>

      <div className="absolute bottom-10">
        <ScrollIndicator />
      </div>
    </section>
  );
}
