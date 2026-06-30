"use client";

import { useMutation, useQuery } from "convex/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { api } from "@/convex/_generated/api";
import { DURATION, EASE } from "@/lib/animation";
import { useChapterStore } from "@/store/chapter";
import {
  CloseIcon,
  ContactIcon,
  type IconComponent,
  JourneyIcon,
  MenuIcon,
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
  "relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs tracking-wide text-white/60 transition-all duration-150 hover:text-white active:scale-90 active:text-white/80 sm:px-3.5 sm:py-1 sm:text-sm";

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
      <nav className="mx-auto flex items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5 lg:px-20 xl:px-[185px]">
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
                        : `${formatReads(reads)} Views`}
                    </span>
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open navigation"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-xl transition-colors duration-150 hover:text-white active:scale-90 sm:hidden"
            >
              <MenuIcon className="h-4 w-4" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            showCloseButton={false}
            className="border-white/12 bg-white/[0.08] text-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />

            <SheetClose asChild>
              <button
                type="button"
                aria-label="Close navigation"
                className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors duration-150 hover:text-white active:scale-90"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </SheetClose>

            <SheetHeader>
              <SheetTitle className="tracking-[0.2em] text-white/90">
                README
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-3 pb-6">
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                return (
                  <SheetClose asChild key={section.href}>
                    <Link
                      href={section.href}
                      className="flex items-center gap-3 rounded-full px-4 py-2.5 text-sm tracking-wide text-white/60 transition-all duration-150 hover:bg-white/10 hover:text-white active:scale-[0.98]"
                    >
                      <Icon className="h-4 w-4" />
                      {section.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop: inline pill nav */}
        <ul
          className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl sm:flex sm:gap-2"
          onMouseLeave={() => setHovered(null)}
        >
          {SECTIONS.map((section) => {
            const Icon = section.icon;

            const content = (
              <>
                <Icon className="h-3.5 w-3.5 transition-transform duration-150 group-active:scale-90" />
                <span className="hidden sm:inline">{section.label}</span>
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
