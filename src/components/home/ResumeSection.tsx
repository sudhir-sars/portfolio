import { ResumeIcon } from "@/components/ui/icons";
import { EDUCATION, EXPERIENCE } from "@/data/resume";
import { Section } from "./Section";

export function ResumeSection() {
  return (
    <Section
      id="resume"
      label="Resume"
      title="Experience"
      lead="The short version — full history in the PDF."
      action={
        <a
          href="/cv"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-secondary"
        >
          <ResumeIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">View full resume</span>
          <span className="sm:hidden">View PDF</span>
        </a>
      }
    >
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-10">
          {EXPERIENCE.map((job) => (
            <div
              key={`${job.company}-${job.role}`}
              className="grid gap-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-10"
            >
              <span className="font-mono text-xs text-muted-foreground/80 sm:pt-1">
                {job.period}
              </span>

              <div>
                <h4 className="text-base font-medium tracking-tight text-foreground sm:text-lg">
                  {job.role}
                  <span className="text-muted-foreground">
                    {" "}
                    · {job.company}
                  </span>
                </h4>

                <ul className="mt-3.5 space-y-2.5">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Education
          </h3>
          <div className="mt-6 flex flex-col gap-4">
            {EDUCATION.map((edu) => (
              <div
                key={edu.degree}
                className="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-10"
              >
                <span className="font-mono text-xs text-muted-foreground/80 sm:pt-1">
                  {edu.period}
                </span>
                <div>
                  <h4 className="text-base font-medium tracking-tight text-foreground">
                    {edu.degree}
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {edu.school}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
