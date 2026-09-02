"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

/**
 * Minimal custom cursor — small dot that expands over interactive elements.
 * Desktop only; native cursor remains for usability.
 */
export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    const move = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const checkHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='button'], input, textarea, select");
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference"
      animate={{
        x: position.x - (hovering ? 20 : 4),
        y: position.y - (hovering ? 20 : 4),
        width: hovering ? 40 : 8,
        height: hovering ? 40 : 8,
        opacity: hovering ? 0.35 : 0.6,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.4 }}
      aria-hidden
    >
      <div className="h-full w-full rounded-full border border-gold bg-gold/20" />
    </motion.div>
  );
}
