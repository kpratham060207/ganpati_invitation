import type { Transition, Variants } from "framer-motion";

/** Premium easing curves — avoid linear motion for a cinematic feel. */
export const EASE = {
  smooth: [0.22, 1, 0.36, 1] as const,
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

/** Default viewport settings — animate once when section enters view. */
export const VIEWPORT_ONCE = { once: true, margin: "-80px" as const, amount: 0.2 };

/** Section reveal — slides up with opacity fade. */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE.smooth },
  },
};

/** Staggered children inside a section. */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

/** Individual item in a stagger group. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE.smooth },
  },
};

/** Text line reveal — subtle upward motion. */
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE.out },
  },
};

/** Hero entrance after door intro — title rises 25px, subtitle 15px. */
export const heroEntranceTitle: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE.smooth },
  },
};

export const heroEntranceSubtitle: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE.smooth, delay: 0.12 },
  },
};

export const heroEntranceStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

/** Hero entrance — slower, more ceremonial timing. */
export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE.smooth },
  },
};

/** Card hover spring — used via whileHover on cards. */
export const cardHover = {
  y: -4,
  transition: { duration: 0.25, ease: EASE.out },
};

/** Instant transition when reduced motion is preferred. */
export const reducedMotionTransition: Transition = { duration: 0.01 };
