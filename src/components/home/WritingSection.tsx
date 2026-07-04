import { ArrowRightIcon } from "@/components/ui/icons";
import { WRITING } from "@/data/writing";
import { Section } from "./Section";

export function WritingSection() {
  return (
    <Section
      id="writing"
      label="Writing"
      title="Notes from production"
      lead="The constraints, the trade-offs, and what actually worked."
    >
      <ul className="flex flex-col border-b border-border">
        {WRITING.map((entry) => (
          <li key={entry.title}>
            <a
              href={entry.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start justify-between gap-6 border-t border-border py-6 transition-colors duration-150"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/80">
                  <span>{entry.date}</span>
                  <span
                    aria-hidden
                    className="h-0.5 w-0.5 rounded-full bg-border"
                  />
                  <span>{entry.tag}</span>
                  <span
                    aria-hidden
                    className="h-0.5 w-0.5 rounded-full bg-border"
                  />
                  <span>{entry.readingTime}</span>
                </div>

                <h3 className="mt-2.5 text-base font-medium tracking-tight text-foreground sm:text-lg">
                  {entry.title}
                </h3>

                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {entry.blurb}
                </p>
              </div>

              <ArrowRightIcon className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground/60 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
