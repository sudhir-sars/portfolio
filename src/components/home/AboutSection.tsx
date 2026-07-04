import { Section } from "./Section";

/** Tech grouped the way it reads on the resume. */
const STACK: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["TypeScript", "Rust", "Go"],
  },
  {
    label: "Backend & Cloud",
    items: ["Node.js", "REST APIs", "gRPC", "GCP", "Postgres", "MongoDB"],
  },
  {
    label: "AI Systems",
    items: [
      "Knowledge Systems",
      "Re-Act Agents",
      "Agentic Workflows",
      "LLM Evals",
    ],
  },
];

const HIGHLIGHTS: string[] = [
  "Open-source contributor",
  "3 IEEE research papers published",
  "Codeforces Specialist, rating 1474",
  "5th place / 1700+, LPU Codethon",
  "7th place / 150+ teams, Coding Ninjas Hackathon",
];

export function AboutSection() {
  return (
    <Section
      id="about"
      label="Profile"
      title="Built close to the metal, shipped close to the user"
      lead="Most recently a founding engineer at Infina, where I built a cross-platform desktop assistant that turns speech into executable actions in under a second — across the tools people already work in. Before that: retrieval pipelines serving thousands of users, and a storage engine written from the WAL up."
    >
      <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
        <div>
          <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What I work with
          </h3>
          <div className="mt-6 space-y-6">
            {STACK.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-medium text-muted-foreground">
                  {group.label}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Highlights
          </h3>
          <ul className="mt-6 space-y-3.5">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
