"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Sheet } from "@/components/Sheet";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { FeaturedProject } from "@/data/featured";
import { useChapterStore } from "@/store/chapter";

/**
 * Long-form write-up for a single featured project, rendered at
 * /projects/[slug]. Uses the shared {@link Sheet} card so it lines up exactly
 * with the homepage chapter sheets.
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
    <section className="flex h-full w-full items-start justify-center px-4 py-24 sm:px-6 md:px-8">
      <Sheet contentClassName="gap-10">
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
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {project.name}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              {detail.summary}
            </p>
          </div>
        </header>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_16rem]">
          {/* Body */}
          <div className="flex flex-col gap-9">
            {detail.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3">
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
      </Sheet>
    </section>
  );
}
