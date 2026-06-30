/**
 * Shared animation language for the README experience.
 *
 * Everything here is tuned to feel calm and deliberate, slow easing,
 * no overshoot, no bounce. Components and hooks should import from here
 * instead of hard-coding magic numbers.
 */

/** Cubic-bezier curves, typed for `motion/react`'s `ease` prop. */
export const EASE = {
  /** Soft, expressive ease-out. Default for reveals. */
  out: [0.16, 1, 0.3, 1],
  /** Symmetric ease for elements that move and settle. */
  inOut: [0.65, 0, 0.35, 1],
} as const;

/** Durations in seconds. Deliberately on the slower side. */
export const DURATION = {
  base: 1,
  slow: 1.4,
} as const;

/**
 * Spring config for cursor-driven paper tilt. High damping relative to
 * stiffness so motion glides to rest without any overshoot.
 */
export const TILT_SPRING = {
  stiffness: 120,
  damping: 26,
  mass: 0.7,
} as const;

/** Maximum paper rotation, in degrees, on either axis. */
export const TILT_MAX_DEG = 3.5;

/** Perspective applied to papers so tilt reads as a true 3D plane. */
export const PAPER_PERSPECTIVE = 1400;
