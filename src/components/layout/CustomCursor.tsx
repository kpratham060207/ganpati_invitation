"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

/**
 * Minimal custom cursor — follows the pointer via motion values (no per-frame setState).
 * Desktop only.
 */
export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const [hovering, setHovering] = useState(false);
  const hoveringRef = useRef(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 420, damping: 36, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 420, damping: 36, mass: 0.35 });

  useEffect(() => {
    if (isTouch) return;

    const move = (event: MouseEvent) => {
      const size = hoveringRef.current ? 40 : 8;
      rawX.set(event.clientX - size / 2);
      rawY.set(event.clientY - size / 2);
    };

    const checkHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = !!target?.closest(
        "a, button, [role='button'], input, textarea, select",
      );
      if (interactive !== hoveringRef.current) {
        hoveringRef.current = interactive;
        setHovering(interactive);
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", checkHover, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [isTouch, rawX, rawY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference"
      style={{ x, y }}
      animate={{
        width: hovering ? 40 : 8,
        height: hovering ? 40 : 8,
        opacity: hovering ? 0.35 : 0.6,
      }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <div className="h-full w-full rounded-full border border-gold bg-gold/20" />
    </motion.div>
  );
}
