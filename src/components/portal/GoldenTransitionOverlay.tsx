"use client";

import { useEffect, useRef } from "react";
import type { PortalEntranceProgress } from "@/lib/portal-entrance";

type GoldenTransitionOverlayProps = {
  progressRef: React.MutableRefObject<PortalEntranceProgress>;
  active: boolean;
  reducedMotion: boolean;
};

/**
 * Warm golden illumination driven directly from GSAP progress ref.
 * Uses rAF DOM updates — no Framer Motion fighting the camera timeline.
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
        const opacity = reducedMotion
          ? light > 0.1 ? 0.88 : 0
          : Math.min(0.95, Math.max(0, light * 0.92 - 0.05));
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
        background:
          "radial-gradient(ellipse 75% 70% at 50% 42%, rgba(240,220,170,0.65) 0%, rgba(201,168,76,0.4) 30%, rgba(42,15,20,0.2) 65%, transparent 100%)",
      }}
    />
  );
}
