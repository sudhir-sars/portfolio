"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";
import type { FeaturedProject } from "@/components/landing/story/sections/featured/featured";
import { ArrowRightIcon } from "@/components/ui/icons";
import { DURATION, EASE } from "@/lib/animation";
import { useChapterStore } from "@/store/chapter";

/**
 * Long-form write-up for a single featured project, rendered at /[slug].
 * Shares the frosted-paper language of the homepage chapter sheets so a detail
 * page reads as another sheet pulled out of the stack.
 */
export function ProjectDetail({ project }: { project: FeaturedProject }) {
  const { detail } = project;

  // Keep the nav pill anchored to the section this project came from.
  const setActive = useChapterStore((state) => state.setActive);
  useEffect(() => {
    setActive({ number: "02", name: "Featured Work" });
    return () => setActive(null);
  }, [setActive]);

  return (
    <section className="flex min-h-screen w-full items-start justify-center px-4 py-24 sm:px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 64 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.slow, ease: EASE.out }}
        className="w-full max-w-5xl"
      >
        <article className="relative flex w-full flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.08] backdrop-blur-xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />

          <div className="relative flex flex-col gap-10 p-4 sm:p-8 md:p-12">
            {/* Header */}
            <header className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-white/45 transition-colors duration-150 hover:text-white/80"
                >
                  <ArrowRightIcon className="h-3 w-3 rotate-180" />
                  Featured Work
                </Link>

                {project.links.length > 0 && (
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/60 transition-colors duration-150 hover:border-white/25 hover:text-white"
                      >
                        {link.label}
                        <ArrowRightIcon className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.15em] text-white/45">
                  {project.role} · {project.period}
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {project.name}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-white/70">
                  {detail.summary}
                </p>
              </div>
            </header>

            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_16rem]">
              {/* Body */}
              <div className="flex flex-col gap-9">
                {detail.sections.map((section) => (
                  <section
                    key={section.heading}
                    className="flex flex-col gap-3"
                  >
                    <h2 className="text-xs uppercase tracking-[0.2em] text-white/40">
                      {section.heading}
                    </h2>

                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-sm leading-relaxed text-white/70 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.bullets && (
                      <ul className="mt-1 space-y-2">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-3 text-sm leading-relaxed text-white/60 sm:text-base"
                          >
                            <span
                              aria-hidden
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/35"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* Sidebar */}
              <aside className="flex flex-col gap-8 md:border-l md:border-white/10 md:pl-8">
                <div>
                  <h2 className="text-xs uppercase tracking-[0.2em] text-white/40">
                    At a glance
                  </h2>
                  <dl className="mt-4 space-y-4">
                    {detail.facts.map((fact) => (
                      <div key={fact.label}>
                        <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-white/35">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 font-mono text-sm text-white/80">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <h2 className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Stack
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-white/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </motion.div>
    </section>
  );
}
