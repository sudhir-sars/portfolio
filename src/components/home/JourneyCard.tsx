"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ChapterSheet } from "./ChapterSheet";

/** A short table-of-contents teaser, era → moment. Narrative, not metrics. */
const PREVIEW: { era: string; title: string }[] = [
  { era: "Age 10", title: "The first computer I wasn't allowed to touch" },
  { era: "2012", title: "JARVIS, and a spec I couldn't unsee" },
  { era: "~2015", title: "An accidental recommendation system" },
  { era: "2022", title: "The day GPT arrived" },
  { era: "2023", title: "Quantize, then fine-tune on one GPU" },
  { era: "2025 – 2026", title: "Founding engineer, in production" },
];

/**
 * The homepage entry point to the Journey. Deliberately quiet: no stats, no
 * paginated deck. A short table of contents that reads as a natural redirection
 * to the full story at /journey.
 */
export function JourneyCard() {
  return (
    <ChapterSheet id="journey" number="03" name="Journey">
      <Link
        href="/journey"
        className="group relative flex flex-col gap-12"
        aria-label="Read the full journey"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 right-0 z-0 hidden select-none font-mono font-bold leading-none text-white/[0.05] sm:block sm:text-8xl"
        >
          README
        </span>

        <div className="relative z-10 flex max-w-3xl flex-col gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            The long version
          </span>

          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            The Journey
          </h2>

          <p className="text-sm leading-relaxed text-white/75 sm:text-base">
            Not a résumé, a build log. Eighteen moments from a school computer I
            wasn't allowed to touch to the real-time AI systems I ship today,
            curiosity first, engineering second, and the two slowly becoming the
            same thing.
          </p>

          <p className="text-sm leading-relaxed text-white/55 sm:text-base">
            It starts at ten, pulling cables out of a school desktop to see what
            each one killed, and runs through a homemade JARVIS, a media player
            that was secretly a recommender, quantized language models on a
            single rented GPU, and the production systems thousands of people
            now depend on.
          </p>
        </div>

        <div className="relative z-10">
          <h3 className="text-xs uppercase tracking-[0.15em] text-white/35">
            A few chapters
          </h3>

          <div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {PREVIEW.map((chapter) => (
              <div key={chapter.title} className="flex flex-col gap-1">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/40">
                  {chapter.era}
                </span>
                <p className="text-sm text-white/70 transition-colors duration-150 group-hover:text-white/90">
                  {chapter.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <span className="relative z-10 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors duration-150 group-hover:text-white">
          Read all eighteen
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
        </span>
      </Link>
    </ChapterSheet>
  );
}
