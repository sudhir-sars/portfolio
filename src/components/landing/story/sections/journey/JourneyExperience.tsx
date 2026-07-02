"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { DURATION, EASE } from "@/lib/animation";
import { JOURNEY, type JourneyPage } from "./journey";

const pad = (n: number) => String(n).padStart(2, "0");

/** One moment in the timeline: a frosted card that reveals as it scrolls in. */
function JourneyMoment({ page, index }: { page: JourneyPage; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: DURATION.slow, ease: EASE.out }}
      className="relative flex w-full flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.08] p-4 backdrop-blur-xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] sm:p-8 md:p-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      {page.ghost && (
        <span
          aria-hidden
          className="pointer-events-none absolute right-6 top-6 z-0 hidden select-none font-mono font-bold leading-none text-white/[0.05] sm:block sm:text-9xl"
        >
          {page.ghost}
        </span>
      )}

      <span className="absolute top-6 left-6 font-mono text-xs tracking-widest text-white/25 sm:top-8 sm:left-8">
        {pad(index + 1)} / {pad(JOURNEY.length)}
      </span>

      <div className="relative z-10 mt-8 flex max-w-3xl flex-col gap-5 sm:mt-4">
        {page.era && (
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            {page.era}
          </span>
        )}

        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {page.title}
        </h2>

        {page.subtitle && (
          <p className="max-w-2xl text-sm text-white/70 sm:text-base">
            {page.subtitle}
          </p>
        )}

        <div className="space-y-4">
          {page.blocks.map((block, i) =>
            typeof block === "string" ? (
              <p
                // biome-ignore lint/suspicious/noArrayIndexKey: static content
                key={i}
                className="text-sm leading-relaxed text-white/55 sm:text-base"
              >
                {block}
              </p>
            ) : (
              // biome-ignore lint/suspicious/noArrayIndexKey: static content
              <ul key={i} className="space-y-2">
                {block.list.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-white/55 sm:text-base"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/35"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ),
          )}
        </div>

        {page.stats && (
          <dl className="mt-2 grid grid-cols-2 gap-x-8 gap-y-4 border-white/10 border-t pt-5 sm:grid-cols-3">
            {page.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-white/35">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-mono text-sm text-white/80 sm:text-base">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </motion.article>
  );
}

/**
 * The full-page Journey reader at /journey. Unlike the old in-stack section,
 * this is a single vertical scroll: every moment is stacked as its own frosted
 * card and reveals on scroll, so the whole story reads top to bottom.
 */
export function JourneyExperience() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-24 sm:gap-8 sm:px-6 md:px-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-white/45 transition-colors duration-150 hover:text-white/80"
        >
          <ArrowRightIcon className="h-3 w-3 rotate-180" />
          README
        </Link>

        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          The Journey
        </span>
      </div>

      {JOURNEY.map((page, index) => (
        <JourneyMoment key={page.title} page={page} index={index} />
      ))}
    </div>
  );
}
