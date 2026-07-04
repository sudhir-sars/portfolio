import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Proof points, stated plainly. Numbers carry the argument. */
const PROOF: { value: string; label: string }[] = [
  { value: "800 ms", label: "Speech to executable action, in production" },
  { value: "1.5M+", label: "Embeddings indexed for retrieval at scale" },
  { value: "19K/s", label: "Sustained reads, custom Rust storage engine" },
];

/**
 * The opening screen: name, capability statement, two actions, and three
 * verifiable numbers. Confidence through precision, not persuasion.
 */
export function Landing() {
  return (
    <section id="top" className="mx-auto w-full max-w-5xl px-6 md:px-8">
      <div className="pt-24 pb-20 sm:pt-36 sm:pb-28">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand">
          Founding Engineer · Systems &amp; AI
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
          Real-time AI systems, engineered end to end.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          I'm Sudhir Saraswat. I design and ship voice-to-action pipelines,
          agentic workflows, and the low-latency infrastructure underneath them
          — measured in milliseconds, run in production.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/#projects"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity duration-150 hover:opacity-85"
          >
            View selected work
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-secondary"
          >
            Get in touch
          </Link>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:mt-20 sm:grid-cols-3">
          {PROOF.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-mono text-2xl font-medium tracking-tight tabular-nums text-foreground">
                {stat.value}
              </dd>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
