import type { Transition, Variants } from "framer-motion";

/**
 * One shared motion language for the whole invite —
 * soft ease-out curves, short travel distances, continuous stagger.
 */
export const EASE = {
  /** Primary page / reveal motion */
  smooth: [0.22, 1, 0.36, 1] as const,
  /** Snappy UI feedback (buttons, hover) */
  out: [0.16, 1, 0.3, 1] as const,
  /** Balanced in-out for loops and overlays */
  inOut: [0.45, 0, 0.2, 1] as const,
};

/** Default viewport — slightly earlier start so sections feel continuous while scrolling */
export const VIEWPORT_ONCE = { once: true, margin: "-48px" as const, amount: 0.18 };

/** Shared reveal timing so every section breathes the same way */
const REVEAL_DURATION = 0.7;
const REVEAL_Y = 22;

/** Section reveal — gentle rise + fade */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: REVEAL_DURATION, ease: EASE.smooth },
  },
};

/** Staggered children — tight enough to feel like one phrase */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

/** Individual item in a stagger group */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE.smooth },
  },
};

/** Text line reveal */
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE.out },
  },
};

/** Hero entrance after portal crossfade — continues the golden handoff */
export const heroEntranceTitle: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE.smooth },
  },
};

export const heroEntranceSubtitle: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE.smooth, delay: 0.08 },
  },
};

export const heroEntranceStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

/** Hero entrance — ceremonial but still in the same curve family */
export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE.smooth },
  },
};

/** Card hover — light lift, shared duration */
export const cardHover = {
  y: -3,
  transition: { duration: 0.28, ease: EASE.out },
};

/** Instant transition when reduced motion is preferred */
export const reducedMotionTransition: Transition = { duration: 0.01 };
