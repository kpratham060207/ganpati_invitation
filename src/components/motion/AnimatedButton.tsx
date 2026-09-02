"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE } from "@/lib/motion";

type AnimatedButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "outline" | "ghost";
  href?: string;
};

const variantStyles = {
  primary:
    "bg-gradient-to-r from-gold-muted to-gold text-ink-deep font-semibold shadow-[0_4px_16px_rgba(201,168,76,0.25)] hover:shadow-[0_6px_24px_rgba(201,168,76,0.35)]",
  outline:
    "border border-gold/40 text-gold-light hover:bg-gold/10 hover:border-gold/60",
  ghost: "text-gold-muted hover:text-gold underline-offset-4 hover:underline",
};

/**
 * Premium button with intentional hover — scale, glow, and arrow nudge.
 */
export function AnimatedButton({
  children,
  className = "",
  variant = "primary",
  href,
  ...props
}: AnimatedButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-deep";

  const motionProps = {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.22, ease: EASE.out },
    className: `${base} ${variantStyles[variant]} ${className}`,
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
