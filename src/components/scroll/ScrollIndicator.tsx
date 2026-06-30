"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/animation";

/**
 * Minimal scroll cue: a slim vertical track with a dot that drifts down and
 * fades, hinting that the story is revealed by scrolling.
 */
export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-10 w-px overflow-hidden bg-white/15">
        <motion.span
          className="absolute left-0 top-0 h-3 w-px bg-white/70"
          animate={{ y: [40, -12], opacity: [0, 1, 0] }}
          transition={{
            duration: 0.5,
            ease: EASE.inOut,
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        />
      </div>
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
        Scroll
      </span>
    </div>
  );
}
