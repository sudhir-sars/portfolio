"use client";

import { useMutation, useQuery } from "convex/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { api } from "@/convex/_generated/api";
import { DURATION, EASE } from "@/lib/animation";
import { useChapterStore } from "@/store/chapter";
import {
  ContactIcon,
  type IconComponent,
  JourneyIcon,
  ProjectIcon,
  ResumeIcon,
  ViewIcon,
  WriteIcon,
} from "../ui/icons";

const SECTIONS: { label: string; href: string; icon: IconComponent }[] = [
  {
    label: "Projects",
    href: "#projects",
    icon: ProjectIcon,
  },
  {
    label: "Journey",
    href: "#journey",
    icon: JourneyIcon,
  },
  {
    label: "Writing",
    href: "#writing",
    icon: WriteIcon,
  },
  {
    label: "Résumé",
    href: "#resume",
    icon: ResumeIcon,
  },
  {
    label: "Contact",
    href: "#contact",
    icon: ContactIcon,
  },
] as const;

const NAV_ITEM_CLASS =
  "relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1 text-xs tracking-wide text-white/60 transition-all duration-150 hover:text-white active:scale-90 active:text-white/80 sm:text-sm";

function formatReads(count: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
}

export function Navigation() {
  const reads = useQuery(api.views.get);
  const increment = useMutation(api.views.increment);
  const [hovered, setHovered] = useState<string | null>(null);
  const activeChapter = useChapterStore((state) => state.active);

  useEffect(() => {
    void increment();
  }, [increment]);

  return (
    // NOTE: only animate `opacity` here. A residual `filter`, `transform` (e.g.
    // from a `y` animation), `perspective`, or `will-change` on this ancestor
    // would disable `backdrop-filter` (backdrop-blur) on the pills below.
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: DURATION.slow,
        ease: EASE.out,
        delay: 0.2,
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex  items-center justify-between px-6 py-5 sm:px-[185px]">
        <div className="rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
          <Link
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs tracking-wide text-white/60 transition-colors duration-150 hover:text-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activeChapter ? activeChapter.number : "readme"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2, ease: EASE.out }}
                className="inline-flex items-center gap-1.5"
              >
                {activeChapter ? (
                  <>
                    <span className="tracking-[0.2em] text-white/90">
                      {activeChapter.number}
                    </span>

                    <span className="text-white/20">|</span>

                    <span>{activeChapter.name}</span>
                  </>
                ) : (
                  <>
                    <span className="tracking-[0.2em] text-white/90">
                      README
                    </span>

                    <span className="text-white/20">|</span>

                    <ViewIcon className="h-3.5 w-3.5 " />

                    <span>
                      {reads === undefined
                        ? "..."
                        : `${formatReads(reads)} Viewers`}
                    </span>
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </Link>
        </div>

        <ul
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl"
          onMouseLeave={() => setHovered(null)}
        >
          {SECTIONS.map((section) => {
            const Icon = section.icon;

            const content = (
              <>
                <Icon className="h-3.5 w-3.5 transition-transform duration-150 group-active:scale-90" />
                <span>{section.label}</span>
              </>
            );

            return (
              <li key={section.href} className="relative">
                {hovered === section.href && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                <Link
                  href={section.href}
                  onMouseEnter={() => setHovered(section.href)}
                  className={`${NAV_ITEM_CLASS} group`}
                >
                  {content}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
