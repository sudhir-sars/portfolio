"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ChapterSheet } from "./ChapterSheet";

/**
 * The homepage entry point to the Journey. Deliberately quiet: no stats, no
 * paginated deck, just an invitation that reads as a natural redirection to the
 * full story at /journey.
 */
export function JourneyCard() {
  return (
    <ChapterSheet id="journey" number="03" name="Journey">
      <Link
        href="/journey"
        className="group relative flex flex-col gap-6"
        aria-label="Read the full journey"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 -top-2 z-0 hidden select-none font-mono font-bold leading-none text-white/[0.05] sm:block sm:text-8xl"
        >
          README
        </span>

        <div className="relative z-10 flex max-w-2xl flex-col gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            The long version
          </span>

          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            The Journey
          </h2>

          <p className="text-base leading-relaxed text-white/60">
            Not a résumé, a build log. Eighteen moments from a school computer I
            wasn't allowed to touch to the real-time AI systems I ship today,
            curiosity first, engineering second, and the two slowly becoming the
            same thing.
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors duration-150 group-hover:text-white">
            Read the full journey
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </ChapterSheet>
  );
}
