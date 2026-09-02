"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

type PortalCTAProps = {
  visible: boolean;
  disabled: boolean;
  onEnter: () => void;
};

/**
 * Elegant invitation CTA — typography integrated into the composition.
 * Exit animation is handled by parent GSAP timeline on the wrapper ref.
 */
export const PortalCTA = forwardRef<HTMLDivElement, PortalCTAProps>(
  function PortalCTA({ visible, disabled, onEnter }, ref) {
    return (
      <div
        ref={ref}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="pointer-events-auto mb-[max(2.5rem,env(safe-area-inset-bottom,0px)+2rem)] flex flex-col items-center text-center">
          <motion.h1
            className="font-display mb-1 text-3xl font-semibold tracking-[0.08em] text-gold-light sm:text-4xl md:text-5xl"
            animate={{ opacity: visible ? [0.88, 1, 0.88] : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Padharo Bappa
          </motion.h1>

          <motion.p
            className="font-devanagari mb-6 text-xs tracking-[0.3em] text-gold/60 sm:text-sm"
            animate={{ opacity: visible ? [0.5, 0.75, 0.5] : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            पधारो बाप्प
          </motion.p>

          <button
            type="button"
            onClick={onEnter}
            disabled={disabled}
            className="group cursor-pointer border-0 bg-transparent focus:outline-none disabled:cursor-default disabled:opacity-60"
            aria-label="Tap to enter"
          >
            <motion.span
              className="font-display block text-[11px] tracking-[0.5em] text-gold/80 uppercase sm:text-xs"
              animate={{ opacity: visible ? [0.65, 0.95, 0.65] : 0 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Tap to enter
            </motion.span>
            <span className="mx-auto mt-2 block h-px w-8 bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-all duration-500 group-hover:w-14 group-hover:via-gold/80" />
          </button>
        </div>
      </div>
    );
  },
);
