export interface ProjectLink {
  label: string;
  href: string;
}

export interface FeaturedProject {
  name: string;
  role: string;
  tagline: string;
  metrics: string[];
  tech: string[];
  links: ProjectLink[];
}

export const FEATURED: FeaturedProject[] = [
  {
    name: "Infina AI",
    role: "Founding Engineer",
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
  },
  {
    name: "PromptX",
    role: "Prompt Platform",
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
  },
  {
    name: "Ferro-KV",
    role: "Systems · Rust",
    tagline:
      "A high-performance LSM-based key-value store in Rust with write-ahead logging for durability, tuned for low-latency, high-concurrency workloads.",
    metrics: [
      "p99 9.3ms PUT latency",
      "p99 3.0ms GET latency",
      "Rust client SDK",
      "Low-latency concurrent reads",
    ],
    tech: ["Rust", "LSM-Tree", "WAL", "gRPC"],
    links: [{ label: "Repo", href: "https://github.com/sudhir-sars/ferrokv" }],
  },
  {
    name: "Barley AI",
    role: "Backend Engineer",
    tagline:
      "Built backend infrastructure for an AI-powered education platform, including scalable RAG pipelines, onboarding flows, and database optimizations.",
    metrics: [
      "6,000+ users",
      "1.5M+ embeddings indexed",
      "1,900% increase in active users",
    ],
    tech: ["RUST", "MongoDb", "Knowledge Systems", "TypeScript"],
    links: [],
  },
];
