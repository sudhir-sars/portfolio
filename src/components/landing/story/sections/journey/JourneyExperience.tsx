"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { DURATION, EASE } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { useChapterStore } from "@/store/chapter";
import { JOURNEY } from "./journey";

const SWIPE_THRESHOLD = 60;

const slide = {
  enter: (dir: number) => ({ x: dir >= 0 ? 56 : -56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -56 : 56, opacity: 0 }),
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The full-page Journey reader. Lives at /journey rather than nested inside the
 * homepage stack: a frosted card holding a swipeable, keyboard-navigable deck
 * of moments. Keyboard nav is always live here (there is nothing else on the
 * page to steal focus), unlike the old in-stack section.
 */
export function JourneyExperience() {
  const total = JOURNEY.length;
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);

  const paginate = useCallback(
    (dir: number) =>
      setPage(([i]) => {
        const next = Math.min(total - 1, Math.max(0, i + dir));
        return [next, dir];
      }),
    [total],
  );

  // Mirror the nav pill to "03 | Journey" while this page is mounted.
  const setActive = useChapterStore((state) => state.setActive);
  useEffect(() => {
    setActive({ number: "03", name: "Journey" });
    return () => setActive(null);
  }, [setActive]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") paginate(1);
      else if (event.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
  };

  const page = JOURNEY[index];

  const progress = (index / (total - 1)) * 100;

  return (
    <section className="flex min-h-screen w-full items-center justify-center px-4 py-24 sm:px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 64 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.slow, ease: EASE.out }}
        className="w-full max-w-7xl"
      >
        <article className="relative flex w-full flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.08] backdrop-blur-xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />

          <div className="relative flex flex-col p-4 sm:p-8 md:p-12">
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-white/45 transition-colors duration-150 hover:text-white/80"
                >
                  <ArrowRightIcon className="h-3 w-3 rotate-180" />
                  README
                </Link>

                <span className="font-mono text-xs tracking-widest text-white/40">
                  {pad(index + 1)} / {pad(total)}
                </span>
              </div>

              <div className="relative h-[64vh] overflow-hidden">
                <AnimatePresence custom={direction} initial={false}>
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: EASE.out }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={onDragEnd}
                    className=" absolute inset-0 cursor-grab touch-pan-y overflow-y-auto pr-3 active:cursor-grabbing"
                  >
                    <div className="relative flex min-h-full flex-col justify-center">
                      {page.ghost && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute right-0 top-0 z-0 hidden select-none font-mono font-bold leading-none text-white/[0.05] sm:block sm:text-9xl"
                        >
                          {page.ghost}
                        </span>
                      )}

                      <div className="relative z-10 flex max-w-3xl flex-col gap-5">
                        {page.era && (
                          <span className="font-mono text-xs text-white/40 uppercase tracking-[0.3em]">
                            {page.era}
                          </span>
                        )}

                        <h3
                          className={cn(
                            "font-semibold tracking-tight text-white text-2xl sm:text-3xl",
                          )}
                        >
                          {page.title}
                        </h3>

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
                                className={
                                  "text-sm leading-relaxed text-white/55 sm:text-base"
                                }
                              >
                                {block}
                              </p>
                            ) : (
                              // biome-ignore lint/suspicious/noArrayIndexKey: static content
                              <ul key={i} className="space-y-2">
                                {block.list.map((item) => (
                                  <li
                                    key={item}
                                    className={cn(
                                      "flex items-start gap-3",
                                      "text-sm leading-relaxed text-white/55 sm:text-base",
                                    )}
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
                                <dt className="text-[0.65rem] text-white/35 uppercase tracking-[0.2em]">
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
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  disabled={index === 0}
                  aria-label="Previous moment"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 text-white/70 transition-colors duration-150 hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-20"
                >
                  <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
                </button>

                <div className="relative h-px flex-1 bg-white/10">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-white/50"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: EASE.out }}
                  />
                </div>

                <span className="hidden shrink-0 text-[0.65rem] text-white/25 uppercase tracking-[0.2em] sm:block">
                  Drag · swipe · ← →
                </span>

                <button
                  type="button"
                  onClick={() => paginate(1)}
                  disabled={index === total - 1}
                  aria-label="Next moment"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 text-white/70 transition-colors duration-150 hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-20"
                >
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </motion.div>
    </section>
  );
}
