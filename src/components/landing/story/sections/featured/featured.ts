export interface ProjectLink {
  label: string;
  href: string;
}

/** A quick-fact pair shown in the detail-page sidebar. */
export interface ProjectFact {
  label: string;
  value: string;
}

/** A prose section on the detail page: a heading with paragraphs and/or a list. */
export interface ProjectSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

/** The long-form write-up rendered at /[slug]. */
export interface ProjectDetail {
  /** Lead paragraph under the title. */
  summary: string;
  /** Sidebar quick facts. */
  facts: ProjectFact[];
  sections: ProjectSection[];
}

export interface FeaturedProject {
  /** URL segment for the detail page, e.g. "infina" → /infina. */
  slug: string;
  name: string;
  role: string;
  /** Timeframe / context label shown on the detail page header. */
  period: string;
  tagline: string;
  metrics: string[];
  tech: string[];
  links: ProjectLink[];
  detail: ProjectDetail;
}

export const FEATURED: FeaturedProject[] = [
  {
    slug: "infina",
    name: "Infina AI",
    role: "Founding Engineer",
    period: "2025 – 2026",
    tagline:
      "A cross-platform desktop AI assistant with meeting capture, a real-time voice-to-action pipeline, and human-in-the-loop approval across the tools people already use.",
    metrics: [
      "800ms speech → executable action",
      "50% lower action execution latency",
      "25% lower infrastructure & API costs",
      "5+ workplace integrations",
    ],
    tech: ["Electron.js", "TypeScript", "Structured LLMs", "CI/CD"],
    links: [{ href: "https://infina.so", label: "Live" }],
    detail: {
      summary:
        "Infina is a cross-platform desktop AI assistant that turns spoken requests into executable actions across the tools people already work in. As a founding engineer, I built it end to end, from the meeting-capture layer to the release infrastructure, my first time engineering an AI product as a whole system rather than a set of isolated features.",
      facts: [
        { label: "Role", value: "Founding Engineer" },
        { label: "Platform", value: "Cross-platform desktop" },
        { label: "Latency", value: "~800 ms speech → action" },
        { label: "Integrations", value: "Gmail, Slack, Linear, Jira, Outlook" },
        { label: "Latency cut", value: "-50% end to end" },
        { label: "Cost cut", value: "-25% infrastructure & API" },
      ],
      sections: [
        {
          heading: "The idea",
          paragraphs: [
            "Joining Infina was the moment everything I'd been learning for years met production. The problems were no longer toy examples or personal experiments, every system had to be reliable, observable, and fast enough for people to trust it every single day.",
            "The product was a desktop assistant that sits alongside your work: it captures meetings, understands what you ask of it out loud, and takes real action in the apps you already use, always with you in the loop.",
          ],
        },
        {
          heading: "Voice to action, in real time",
          paragraphs: [
            "At the core is a real-time voice-to-action pipeline that transforms a spoken request into an executable action in around 800 milliseconds. Speech is transcribed, interpreted into a structured intent, and mapped onto a concrete tool call.",
            "Structured LLM outputs keep the model's decisions machine-readable and predictable, and a human-in-the-loop approval step means every consequential action is confirmed by the user before it runs. Nothing happens silently on your behalf.",
          ],
        },
        {
          heading: "Meeting capture & workplace integrations",
          paragraphs: [
            "The assistant handles meeting capture with automatic meeting detection, so recording and note-taking start without the user having to remember to trigger them.",
            'It integrates with Gmail, Slack, Linear, Jira, Outlook, and other workplace tools, turning a request like "summarize this call and file the action items" into real operations across those services.',
          ],
        },
        {
          heading: "Shipping it like a product",
          paragraphs: [
            "Building an AI product end to end meant owning everything around the model too: auto-updates, CI/CD pipelines, and the release infrastructure that gets a desktop app safely onto users' machines.",
            "Through continuous optimization we reduced end-to-end latency by 50% and infrastructure and API costs by 25%. Working here changed how I think about software, building AI isn't just choosing the right model; it's balancing latency, reliability, cost, observability, and deployment while shipping quickly without compromising trust.",
          ],
        },
      ],
    },
  },
  {
    slug: "promptx",
    name: "PromptX",
    role: "Prompt Platform",
    period: "2025 – Present",
    tagline:
      "A prompt-management platform for LLM apps, version-controlled deployments with weighted rollouts, instant rollback, and multi-tenant RBAC, served from the edge.",
    metrics: [
      "Sub-ms retrieval from 300+ edge locations",
      "Zero-downtime prompt deployments",
      "deterministic weighted rollouts",
      "Origin-free runtime path",
    ],
    tech: [
      "Cloudflare Workers",
      "Cloudflare KV",
      "TypeScript",
      "Next.js",
      "convex",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/sudhir-sars/promptx" },
      { label: "Live", href: "https://prompts.sudhirx.dev" },
    ],
    detail: {
      summary:
        "PromptX is a control plane for AI teams: author, version, ship, and observe prompts in production, decoupled from your application release cycle. Instead of prompts scattered across codebases, configs, and copy-paste, they live in one versioned source of truth and ship instantly through the edge, no rebuild, no redeploy, no waiting on CI.",
      facts: [
        { label: "Type", value: "Prompt control plane" },
        { label: "Delivery", value: "Cloudflare KV, 300+ edge locations" },
        { label: "Deploys", value: "Instant, decoupled from CI" },
        { label: "Rollouts", value: "Weighted A/B, instant rollback" },
        { label: "Access", value: "Team RBAC + audit trail" },
        { label: "SDK", value: "@xevos-ai/promptx (npm)" },
      ],
      sections: [
        {
          heading: "Why it exists",
          paragraphs: [
            "Working on production AI systems convinced me that the hard problems aren't inside the model, they're everything around it: the prompt lifecycle, deployments, experimentation, and observability. Shipping a prompt change shouldn't require shipping the whole application.",
            "PromptX turns prompts into production assets instead of hard-coded strings. Teams can author, version, deploy, experiment, observe, and roll back prompts independently of their app's release cycle.",
          ],
        },
        {
          heading: "Authoring & versioning",
          paragraphs: [
            "Prompts live in a focused workspace with full-text search across everything a team has written. Every change is captured as a sequential version with side-by-side diffs, so you can see exactly what moved and roll back to any earlier revision in a click.",
          ],
        },
        {
          heading: "Deployment, rollouts & experimentation",
          paragraphs: [
            "Deployments are decoupled from your build. A new prompt version can be shipped instantly, and traffic splitting with weighted rollouts lets you run A/B experiments and ramp changes deterministically instead of flipping a global switch.",
          ],
          bullets: [
            "Zero-downtime, instant prompt deployments",
            "Deterministic weighted rollouts for A/B experimentation",
            "One-click rollback to any prior version",
            "Real-time analytics on usage and performance",
          ],
        },
        {
          heading: "Edge delivery & collaboration",
          paragraphs: [
            "Prompts are served from Cloudflare KV across 300+ edge locations through a lightweight npm SDK, keeping retrieval fast and off your origin's critical path.",
            "Teams get role-based access control (owner, admin, member) with invites and a complete audit trail, so everyone can move fast without stepping on each other.",
          ],
        },
        {
          heading: "Under the hood",
          paragraphs: [
            "PromptX is built on Next.js (App Router) with a Convex backend, Clerk authentication, Cloudflare KV for edge distribution, and Zustand with Tailwind CSS on the front end. It's the first piece of a larger vision, Xevos, for the infrastructure autonomous AI systems will eventually run on.",
          ],
        },
      ],
    },
  },
  {
    slug: "ferrokv",
    name: "Ferro-KV",
    role: "Systems · Rust",
    period: "2024",
    tagline:
      "A high-performance LSM-based key-value store in Rust with a group-commit write-ahead log for durability, tuned for low-latency, high-concurrency workloads.",
    metrics: [
      "p99 9.3ms PUT latency",
      "p99 3.0ms GET latency",
      "19K+ GET ops/s at 32 clients",
      "Rust client SDK over gRPC",
    ],
    tech: ["Rust", "LSM-Tree", "WAL", "gRPC"],
    links: [{ label: "Repo", href: "https://github.com/sudhir-sars/ferrokv" }],
    detail: {
      summary:
        "FerroKV is a single-node key-value database written in Rust around a custom Log-Structured Merge-Tree engine. It prioritizes throughput through a group-commit write-ahead log with batched fsync, and exposes everything over gRPC. It's the project where I stopped calling libraries and started building the storage engine underneath them.",
      facts: [
        { label: "Language", value: "Rust" },
        { label: "Engine", value: "Custom LSM-Tree + WAL" },
        { label: "Interface", value: "gRPC (Tonic)" },
        { label: "PUT", value: "7,640 ops/s · p99 9.3ms" },
        { label: "GET", value: "19,263 ops/s · p99 3.0ms" },
        { label: "DELETE", value: "8,707 ops/s · p99 8.3ms" },
      ],
      sections: [
        {
          heading: "What it is",
          paragraphs: [
            "FerroKV is a high-performance, single-node key-value store. The design deliberately excludes distributed consensus, trading automatic failover for a dramatically simpler codebase and a write path I could tune aggressively.",
            "It's organized as six modular crates, so each concern, storage, locking, serving, protocol, client, and benchmarking, can evolve on its own.",
          ],
          bullets: [
            "ferrokv-storage — LSM-Tree engine: WAL, MemTable, SSTables, compaction",
            "ferrokv-lock — in-memory, lease-based lock manager",
            "ferrokv-server — gRPC server with Prometheus metrics",
            "ferrokv-proto — Protobuf / gRPC definitions",
            "ferrokv-clientSDK — Rust client with retry logic",
            "ferrokv-bench — performance benchmarking tool",
          ],
        },
        {
          heading: "The write path: group-commit WAL",
          paragraphs: [
            "Flushing every write to disk individually caps throughput at roughly 800 ops/s, the cost is dominated by fsync syscalls. FerroKV instead batches concurrent writes and issues a single fdatasync across all of them, amortizing the syscall overhead over many writers for an order-of-magnitude improvement under concurrent load.",
          ],
        },
        {
          heading: "Lock-free appends & a tiny critical section",
          paragraphs: [
            "Durability is confirmed on the WAL before the engine lock is ever acquired, so the critical section shrinks to a single in-memory BTreeMap insertion, on the order of a microsecond. That keeps contention low even with dozens of concurrent clients hammering the same engine.",
          ],
        },
        {
          heading: "Benchmarks & observability",
          paragraphs: [
            "Measured at 1M operations across 32 concurrent clients, FerroKV sustains 7,640 PUT ops/s (p99 9.3ms), 19,263 GET ops/s (p99 3.0ms), and 8,707 DELETE ops/s (p99 8.3ms).",
            "It exports Prometheus metrics for request rates, latency histograms, WAL batch statistics, MemTable size, compaction activity, and lock behavior, so its internals are legible under load rather than a black box.",
          ],
        },
      ],
    },
  },
  {
    slug: "barley",
    name: "Barley AI",
    role: "Backend Engineer",
    period: "2024 – 2025",
    tagline:
      "Backend infrastructure for an AI-powered education platform, scalable RAG pipelines, a frictionless onboarding flow, and the database work that keeps it fast at scale.",
    metrics: [
      "6,000+ users",
      "1.5M+ embeddings indexed",
      "1,900% increase in active users",
    ],
    tech: ["Rust", "MongoDB", "Knowledge Systems", "TypeScript"],
    links: [],
    detail: {
      summary:
        'Barley AI is an AI-powered education platform serving 6,000+ users. It was my first real engineering job, and it changed the question I was answering, from "does this run on my machine" to "can thousands of people depend on this at once." I built the backend: the retrieval pipelines, the onboarding flow, and the database work underneath them.',
      facts: [
        { label: "Role", value: "Backend Engineer" },
        { label: "Domain", value: "AI education platform" },
        { label: "Users", value: "6,000+" },
        { label: "Index", value: "1.5M+ embeddings" },
        { label: "Activation", value: "+1,900% active users" },
      ],
      sections: [
        {
          heading: "Retrieval at scale",
          paragraphs: [
            "I built the RAG ingestion and retrieval pipelines that generate and index over 1.5M embeddings, the knowledge layer the platform's AI features are grounded in. The work was about keeping retrieval accurate and fast as the corpus and the user base grew.",
          ],
        },
        {
          heading: "Removing the sign-up wall",
          paragraphs: [
            "I built a guest-onboarding flow that removed the forced sign-up wall, letting people experience the product before committing to an account. That single change moved active users by 1,900%, a reminder that activation is an engineering problem as much as a growth one.",
          ],
        },
        {
          heading: "The unglamorous production work",
          paragraphs: [
            "Production rewards the unglamorous work: I hunted down N+1 query patterns and replaced them with proper SQL joins, and wrote the migrations to support new features without breaking the ones already in use.",
            "A notebook only has to run once. This had to run at 2 a.m. while I was asleep, for strangers, without me there to restart it, and that constraint is what taught me to build for reliability first.",
          ],
        },
      ],
    },
  },
];

/** Lookup helper for the detail route. */
export function getProject(slug: string): FeaturedProject | undefined {
  return FEATURED.find((project) => project.slug === slug);
}
