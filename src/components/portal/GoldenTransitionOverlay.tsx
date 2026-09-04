"use client";

import { useEffect, useRef } from "react";
import type { PortalEntranceProgress } from "@/lib/portal-entrance";

type GoldenTransitionOverlayProps = {
  progressRef: React.MutableRefObject<PortalEntranceProgress>;
  active: boolean;
  reducedMotion: boolean;
};

/**
 * Warm golden → maroon wash that bridges portal void into the main page palette.
 * Driven from GSAP progress via rAF — no Framer Motion fighting the timeline.
 */
export function GoldenTransitionOverlay({
  progressRef,
  active,
  reducedMotion,
}: GoldenTransitionOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    let raf = 0;

    const tick = () => {
      const el = overlayRef.current;
      if (el) {
        const light = progressRef.current.light;
        /* Soft ramp into a warm wash that already contains page maroon */
        const opacity = reducedMotion
          ? light > 0.1
            ? 0.9
            : 0
          : Math.min(0.92, Math.max(0, light * 0.95));
        el.style.opacity = String(opacity);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, progressRef, reducedMotion]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        opacity: 0,
        /* Gold centre → ink-deep edges so the handoff matches body background */
        background: `
          radial-gradient(
            ellipse 80% 70% at 50% 42%,
            rgba(240, 220, 170, 0.7) 0%,
            rgba(201, 168, 76, 0.45) 28%,
            rgba(74, 24, 37, 0.55) 62%,
            rgba(42, 15, 20, 0.85) 100%
          )
        `,
      }}
    />
  );
}
