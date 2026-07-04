export interface WritingEntry {
  title: string;
  blurb: string;
  /** Display date, e.g. "2024". */
  date: string;
  tag: string;
  readingTime: string;
  href: string;
}

export const WRITING: WritingEntry[] = [
  {
    title: "Building PromptX: Shipping LLM Prompts Without Deploying Code",
    blurb:
      "A deep dive into the architecture behind PromptX—immutable prompt versioning, edge delivery, deterministic A/B testing, and a control plane for shipping LLM prompts without redeploying applications.",
    date: "2026",
    tag: "Systems",
    readingTime: "18 min",
    href: "https://medium.com/p/building-promptx-shipping-llm-prompts-without-deploying-code-f6d697f615c4",
  },
];
