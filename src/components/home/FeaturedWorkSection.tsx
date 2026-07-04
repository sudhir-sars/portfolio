import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { FEATURED, type FeaturedProject } from "@/data/featured";
import { Section } from "./Section";

function ProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-[border-color,box-shadow] duration-200 hover:border-foreground/25 hover:shadow-[0_1px_3px_rgba(38,33,26,0.06),0_8px_24px_-12px_rgba(38,33,26,0.12)]">
      {/* Stretched link: covers the whole card so it's clickable, while the
          external links below stay real, non-nested anchors above it. */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Read the ${project.name} write-up`}
        className="absolute inset-0 z-10 rounded-xl"
      />

      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {project.name}
          </h3>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            {project.role}
          </p>
        </div>

        {project.links.length > 0 && (
          <div className="relative z-20 flex shrink-0 flex-wrap justify-end gap-1.5">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors duration-150 hover:border-foreground/30 hover:text-foreground"
              >
                {link.label}
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            ))}
          </div>
        )}
      </header>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {project.tagline}
      </p>

      <ul className="mt-6 space-y-2.5">
        {project.metrics.map((metric) => (
          <li
            key={metric}
            className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80"
          >
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand"
            />
            {metric}
          </li>
        ))}
      </ul>

      <p className="mt-auto pt-7 font-mono text-[11px] tracking-tight text-muted-foreground/80">
        {project.tech.join(" · ")}
      </p>
    </article>
  );
}

export function FeaturedWorkSection() {
  return (
    <Section
      id="projects"
      label="Selected Work"
      title="Systems built end to end"
      lead="Real-time AI products, edge infrastructure, and a storage engine — each shipped to production and measured. Open any card for the full write-up."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {FEATURED.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
