"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Refined home festivity — marigolds and diyas, not overwhelming. */
export function HomeDecor() {
  const reducedMotion = useReducedMotion();

  const float = (duration: number, delay = 0) =>
    reducedMotion
      ? {}
      : {
          y: [0, -6, 0],
          transition: { duration, repeat: Infinity, delay, ease: "easeInOut" as const },
        };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div className="absolute top-20 left-6 text-xl opacity-50" animate={float(3.5)}>
        🌼
      </motion.div>
      <motion.div className="absolute top-24 right-8 text-xl opacity-50" animate={float(4, 0.6)}>
        🌼
      </motion.div>
      <motion.div className="absolute top-1/3 left-10 text-lg opacity-40" animate={float(3, 0.3)}>
        🪔
      </motion.div>
      <motion.div className="absolute top-1/4 right-12 text-lg opacity-40" animate={float(3.8, 0.9)}>
        🪔
      </motion.div>
    </div>
  );
}
