"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { sectionReveal, VIEWPORT_ONCE, reducedMotionTransition } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type AnimatedSectionProps = HTMLMotionProps<"section"> & {
  /** Optional delay before the section animates in. */
  delay?: number;
};

/**
 * Wraps a page section with a consistent scroll-triggered reveal.
 * Respects prefers-reduced-motion by showing content immediately.
 */
export function AnimatedSection({
  children,
  delay = 0,
  className,
  ...props
}: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={reducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={sectionReveal}
      transition={reducedMotion ? reducedMotionTransition : { delay }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
