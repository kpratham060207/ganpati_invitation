"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
};

/**
 * Primary CTA with subtle magnetic pull on desktop — max ~8px offset.
 * Disabled on touch devices to avoid awkward mobile behavior.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const isTouch = useIsTouchDevice();

  const springX = useSpring(0, { stiffness: 150, damping: 15 });
  const springY = useSpring(0, { stiffness: 150, damping: 15 });

  const sharedClassName = `inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-gradient-to-r from-ink-surface to-celebration-rose/80 px-8 py-3.5 font-display text-sm tracking-wide text-cream shadow-[0_4px_20px_rgba(201,168,76,0.2)] transition-shadow hover:border-gold hover:shadow-[0_8px_28px_rgba(201,168,76,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${className}`;

  const handleMove = (event: React.MouseEvent) => {
    if (isTouch || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const max = 8;

    springX.set(Math.max(-max, Math.min(max, (event.clientX - centerX) * 0.15)));
    springY.set(Math.max(-max, Math.min(max, (event.clientY - centerY) * 0.15)));
  };

  const handleLeave = () => {
    springX.set(0);
    springY.set(0);
  };

  const motionProps = {
    ref,
    "aria-label": ariaLabel,
    className: sharedClassName,
    style: isTouch ? undefined : { x: springX, y: springY },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.22, ease: EASE.out },
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps} ref={ref as React.RefObject<HTMLAnchorElement>}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      {...motionProps}
      ref={ref as React.RefObject<HTMLButtonElement>}
    >
      {children}
    </motion.button>
  );
}
