"use client";

import { ArrowRightIcon } from "@/components/ui/icons";
import { ChapterSheet } from "../../ChapterSheet";
import { FEATURED, type FeaturedProject } from "./featured";

function ProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10  p-6 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.05]">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.15em] text-white/60">
            {project.role}
          </p>
        </div>

        {project.links.length > 0 && (
          <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/60 transition-colors duration-150 hover:border-white/25 hover:text-white"
              >
                {link.label}
                <ArrowRightIcon className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        )}
      </header>

      <p className="mt-4 text-sm leading-relaxed text-white/85">
        {project.tagline}
      </p>

      <ul className="mt-5 space-y-2">
        {project.metrics.map((metric) => (
          <li
            key={metric}
            className="flex items-start gap-2.5 text-sm text-white/80"
          >
            <span
              aria-hidden
              className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40"
            />
            {metric}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-white/55"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function FeaturedWorkSection() {
  return (
    <ChapterSheet id="projects" number="02" name="Featured Work">
      <div className="flex flex-col gap-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            Featured Work
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/55">
            A few things I've built end to end, from real-time AI systems to the
            low-latency infrastructure underneath them.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURED.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </ChapterSheet>
  );
}
