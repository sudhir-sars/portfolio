export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
}

/** Canonical résumé link. The /cv route redirects here. */
export const RESUME_URL =
  "https://drive.google.com/file/d/1Ev_53rkAx2-qjYfqJhWttZY34NV47Efx/view?usp=sharing";

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Founding Engineer",
    company: "Infina",
    period: "Mar 2025 – Mar 2026",
    points: [
      "Led a cross-platform desktop AI assistant: meeting capture, automatic meeting detection, auto-updates, CI/CD, and production observability.",
      "Built a real-time voice-to-action pipeline with structured LLM outputs, ~800ms from speech capture to executable action.",
      "Optimized action execution across 5+ workplace integrations (Gmail, Slack, Linear, Jira, Outlook), cutting latency 50% and infra/API cost 25%.",
      "Shipped human-in-the-loop approval so AI actions run safely while users stay in control.",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Barley AI",
    period: "Dec 2024 – Feb 2025",
    points: [
      "Built core backend systems for an AI education platform serving 6,000+ users.",
      "Shipped guest onboarding that removed mandatory sign-up, driving a 1,900% increase in active users.",
      "Built RAG ingestion/retrieval pipelines that generated and indexed 1.5M+ embeddings for grounded Q&A and quizzes.",
      "Replaced N+1 query patterns with optimized SQL joins and ran database migrations for new capabilities.",
    ],
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    degree: "Integrated B.Tech (CSE), MBA (Product Management)",
    school: "Lovely Professional University, Punjab",
    period: "Aug 2020 – May 2025",
  },
];
