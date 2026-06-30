"use client";

import { ResumeIcon } from "@/components/ui/icons";
import { ChapterSheet } from "../../ChapterSheet";
import { EDUCATION, EXPERIENCE } from "./resume";

export function ResumeSection() {
  return (
    <ChapterSheet id="resume" number="05" name="Résumé">
      <div className="flex flex-col gap-10">
        <div className=" relative flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-semibold text-2xl text-white tracking-tight sm:text-4xl">
              Résumé
            </h2>
            <p className="mt-5 text-base text-white/90 leading-relaxed">
              The short version, full history in the PDF.
            </p>
          </div>
          <div className="absolute right-2 top-2">
            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-wide text-white/80 transition-all duration-150 hover:bg-white/10 hover:text-white active:scale-95"
            >
              <ResumeIcon className="h-4 w-4" />
              <span>View Full Résumé</span>
            </a>
          </div>
        </div>

        <section>
          <h3 className="text-xs text-white/35 uppercase tracking-[0.2em]">
            Experience
          </h3>
          <div className="mt-6 flex flex-col gap-8">
            {EXPERIENCE.map((job) => (
              <div key={`${job.company}-${job.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-medium text-base text-white/90 sm:text-lg">
                    {job.role}
                    <span className="">
                      {" "}
                      <span className="text-sm px-3">|</span>
                      {job.company}
                    </span>
                  </h4>
                  <span className="font-mono text-xs text-white/40">
                    {job.period}
                  </span>
                </div>

                <ul className="mt-3 space-y-2">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-white/60 leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs text-white/35 uppercase tracking-[0.2em]">
            Education
          </h3>
          <div className="mt-6 flex flex-col gap-4">
            {EDUCATION.map((edu) => (
              <div
                key={edu.degree}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
              >
                <div>
                  <h4 className="font-medium text-base text-white/90">
                    {edu.degree}
                  </h4>
                  <p className="mt-0.5 text-sm text-white/45">{edu.school}</p>
                </div>
                <span className="font-mono text-xs text-white/40">
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ChapterSheet>
  );
}
