"use client";

import { ChapterSheet } from "../ChapterSheet";

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
    <ChapterSheet id="about" number="01" name="About Me">
      <div className="flex flex-col gap-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            Sudhir Saraswat
          </h2>
          <p className="mt-3 text-xs uppercase tracking-[0.15em] text-white/45">
            Founding Engineer | Systems &amp; AI
          </p>
          <p className="mt-7 text-base leading-relaxed text-white/90">
            I build close to the metal and close to the user, creating real-time
            AI systems, agentic workflows, and the low-latency infrastructure
            underneath them. Most recently, I was a founding engineer at Infina,
            where I shipped a cross-platform desktop assistant that turns speech
            into executable actions in under a second across the tools people
            already work in. Building it convinced me that software should feel
            a little magical...
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-white/35">
              What I work with
            </h3>
            <div className="mt-5 space-y-5">
              {STACK.map((group) => (
                <div key={group.label}>
                  <p className="text-[0.7rem] uppercase tracking-[0.15em] text-white/40">
                    {group.label}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65"
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
            <h3 className="text-xs uppercase tracking-[0.15em] text-white/35">
              Highlights
            </h3>
            <ul className="mt-5 space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-white/60"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-xs uppercase tracking-[0.15em] text-white/35">
            Why the black hole?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            The background isn&apos;t just for the mood. I&apos;m genuinely into
            space, rockets, and the brutal engineering that gets things off the
            ground, so a black hole quietly running behind everything felt right.
            The same pull toward hard, unforgiving systems is what got me into
            engineering in the first place.
          </p>
        </div>
      </div>
    </ChapterSheet>
  );
}
