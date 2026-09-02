"use client";

import { motion } from "framer-motion";
import { textReveal } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealTextProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay when used inside a sequence. */
  delay?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span";
};

/** Animated text reveal — heading or body copy fades up on enter. */
export function RevealText({
  children,
  className,
  delay = 0,
  as: Tag = "p",
}: RevealTextProps) {
  const reducedMotion = useReducedMotion();
  const Component = motion[Tag];

  return (
    <Component
      className={className}
      initial={reducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={textReveal}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
