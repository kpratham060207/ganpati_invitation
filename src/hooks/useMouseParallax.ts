"use client";

import { useEffect, useRef } from "react";

/** Normalised pointer position (-1…1) for subtle 3D parallax */
export type ParallaxPoint = { x: number; y: number };

/**
 * Tracks pointer as a mutable ref — no React re-renders on mousemove.
 * Camera / parallax consumers read this inside rAF / useFrame.
 */
export function useMouseParallaxRef(enabled: boolean) {
  const pointRef = useRef<ParallaxPoint>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      pointRef.current = { x: 0, y: 0 };
      return;
    }

    const handleMove = (event: MouseEvent) => {
      pointRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled]);

  return pointRef;
}

/**
 * Legacy state-based hook — prefer useMouseParallaxRef for 3D scenes.
 * Kept for any lightweight UI that still wants reactive parallax.
 */
export function useMouseParallax(enabled: boolean): ParallaxPoint {
  const ref = useMouseParallaxRef(enabled);
  /* Expose a frozen snapshot only when enabled toggles — callers should migrate to the ref. */
  return enabled ? ref.current : { x: 0, y: 0 };
}
