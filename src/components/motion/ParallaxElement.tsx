"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ParallaxElementProps = {
  children: React.ReactNode;
  className?: string;
  /** Parallax intensity — higher means more movement. Keep subtle (0.05–0.2). */
  speed?: number;
};

/**
 * Subtle scroll-linked parallax — GPU-friendly transform only.
 * Disabled when user prefers reduced motion.
 */
export function ParallaxElement({
  children,
  className,
  speed = 0.12,
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40 * speed * 10, 40 * speed * 10]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
