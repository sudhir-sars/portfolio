"use client";

import { type RefObject, useEffect } from "react";
import { create } from "zustand";

export interface ActiveChapter {
  /** Two-digit chapter number, e.g. "01". */
  number: string;
  /** Chapter name, e.g. "About Me". */
  name: string;
}

interface ChapterState {
  /** The chapter currently in view, or `null` while on the cover. */
  active: ActiveChapter | null;
  setActive: (active: ActiveChapter | null) => void;
}

export const useChapterStore = create<ChapterState>((set) => ({
  active: null,
  setActive: (active) => set({ active }),
}));

/**
 * Marks `value` as the active chapter while `ref`'s element crosses the
 * vertical center of the viewport. Pass `null` for the cover so the nav pill
 * falls back to "README | … Viewers".
 */
export function useTrackActiveChapter(
  ref: RefObject<HTMLElement | null>,
  value: ActiveChapter | null,
) {
  const setActive = useChapterStore((state) => state.setActive);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setActive(value);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, setActive, value]);
}
