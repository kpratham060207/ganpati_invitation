"use client";

import { useEffect, useRef } from "react";
import type { PortalEntranceProgress } from "@/lib/portal-entrance";

type GoldenTransitionOverlayProps = {
  progressRef: React.MutableRefObject<PortalEntranceProgress>;
  active: boolean;
  reducedMotion: boolean;
};

/**
 * Warm golden → maroon wash that bridges portal into the main page.
 * Driven from GSAP progress via rAF — no Framer Motion fighting the timeline.
 * Soft enough that it never leaves a solid purple slab if the handoff glitches.
 */
export function GoldenTransitionOverlay({
  progressRef,
  active,
  reducedMotion,
}: GoldenTransitionOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
      if (overlayRef.current) overlayRef.current.style.opacity = "0";
      return;
    }

    let raf = 0;

    const tick = () => {
      const el = overlayRef.current;
      if (el) {
        const light = progressRef.current.light;
        const opacity = reducedMotion
          ? light > 0.1
            ? 0.55
            : 0
          /* Cap lower so page content can remain readable underneath during crossfade */
          : Math.min(0.72, Math.max(0, light * 0.78));
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
        background: `
          radial-gradient(
            ellipse 80% 70% at 50% 42%,
            rgba(240, 220, 170, 0.55) 0%,
            rgba(201, 168, 76, 0.32) 30%,
            rgba(74, 24, 37, 0.28) 65%,
            transparent 100%
          )
        `,
      }}
    />
  );
}
