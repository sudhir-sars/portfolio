export interface WritingEntry {
  title: string;
  blurb: string;
  /** Display date, e.g. "2024". */
  date: string;
  tag: string;
  readingTime: string;
  href: string;
}

// TODO: replace the "#" hrefs with the real post URLs once published.
export const WRITING: WritingEntry[] = [
  {
    title: "Designing Edge-Native Prompt Infrastructure",
    blurb:
      "Serving prompts in sub-millisecond from 300+ locations with weighted rollouts and instant rollback, on Cloudflare Workers + KV.",
    date: "2025",
    tag: "Systems",
    readingTime: "10 min",
    href: "#",
  },
  {
    title: "Building an LSM Key-Value Store in Rust",
    blurb:
      "Write-ahead logging, compaction, and the read/write paths behind p99 9.3ms writes and 3.0ms reads under load.",
    date: "2025",
    tag: "Rust",
    readingTime: "12 min",
    href: "#",
  },
];
