import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { FeaturedProject } from "@/data/featured";

/**
 * Long-form write-up for a single featured project, rendered at
 * /projects/[slug]. Shares the homepage container width so the two pages
 * read as one system.
 */
export function ProjectDetail({ project }: { project: FeaturedProject }) {
  const { detail } = project;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20 md:px-8">
      {/* Header */}
      <header className="flex flex-col gap-10">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            <ArrowRightIcon className="h-3 w-3 rotate-180" />
            Selected Work
          </Link>

          {project.links.length > 0 && (
            <div className="flex flex-wrap justify-end gap-1.5">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground transition-colors duration-150 hover:border-foreground/30 hover:text-foreground"
                >
                  {link.label}
                  <ArrowRightIcon className="h-3 w-3" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand">
            {project.role} · {project.period}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {detail.summary}
          </p>
        </div>
      </header>

      <div className="mt-14 grid gap-12 border-t border-border pt-12 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-16">
        {/* Body */}
        <div className="flex flex-col gap-10">
          {detail.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-4">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {section.heading}
              </h2>

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-sm leading-relaxed text-foreground/80 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className="mt-1 space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand"
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
        <aside className="flex flex-col gap-10 md:border-l md:border-border md:pl-10">
          <div>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              At a glance
            </h2>
            <dl className="mt-5 space-y-4">
              {detail.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-medium text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-mono text-sm tracking-tight text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Stack
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
