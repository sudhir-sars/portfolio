"use client";

import { ArrowRightIcon } from "@/components/ui/icons";
import { ChapterSheet } from "../../ChapterSheet";
import { WRITING } from "./writing";

export function WritingSection() {
  return (
    <ChapterSheet id="writing" number="04" name="Writing">
      <div className="flex flex-col gap-10">
        <div className="max-w-2xl">
          <h2 className="font-semibold text-2xl text-white tracking-tight sm:text-4xl">
            Writing
          </h2>
          <p className="mt-5 text-base text-white/90 leading-relaxed">
            Notes from building real systems, the constraints, the trade-offs,
            and what actually worked.
          </p>
        </div>

        <ul className="flex flex-col">
          {WRITING.map((entry) => (
            <li key={entry.title}>
              <a
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-6 border-white/10 border-t py-5 transition-colors duration-150 hover:border-white/25"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3 text-[0.7rem] text-white/40 uppercase tracking-[0.2em]">
                    <span>{entry.date}</span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span>{entry.tag}</span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span>{entry.readingTime}</span>
                  </div>

                  <h3 className="mt-2 font-medium text-base text-white/90 transition-colors duration-150 group-hover:text-white sm:text-lg">
                    {entry.title}
                  </h3>

                  <p className="mt-1.5 max-w-2xl text-sm text-white/55 leading-relaxed">
                    {entry.blurb}
                  </p>
                </div>

                <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-white/40 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ChapterSheet>
  );
}
