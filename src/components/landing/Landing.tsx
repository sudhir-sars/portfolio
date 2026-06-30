"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { ScrollIndicator } from "@/components/scroll/ScrollIndicator";
import { DURATION, EASE } from "@/lib/animation";
import { useTrackActiveChapter } from "@/store/chapter";

/**
 * The opening screen. Full viewport, transparent over the background video,
 * with the experience title and a single quiet instruction.
 */
export function Landing() {
  const sectionRef = useRef<HTMLElement>(null);
  // On the cover, the nav pill shows "README | … Viewers" again.
  useTrackActiveChapter(sectionRef, null);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.2 }}
        className="text-6xl font-semibold tracking-[0.18em] text-white sm:text-8xl md:text-9xl"
      >
        README
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.5 }}
        className="mt-6 text-sm font-light uppercase tracking-[0.35em] text-white/55 sm:text-base"
      >
        Start from the beginning.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.base, ease: EASE.out, delay: 1.4 }}
        className="absolute bottom-10"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
