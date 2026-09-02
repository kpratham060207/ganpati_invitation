"use client";

import { useEffect, useState } from "react";

/** Normalised pointer position (-1…1) for subtle 3D parallax */
export type ParallaxPoint = { x: number; y: number };

/**
 * Tracks mouse/touch position as normalised coordinates for camera parallax.
 * Returns {0,0} on touch-only devices — mobile uses auto-drift instead.
 */
export function useMouseParallax(enabled: boolean): ParallaxPoint {
  const [point, setPoint] = useState<ParallaxPoint>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      setPoint({ x: 0, y: 0 });
      return;
    }

    const handleMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setPoint({ x, y });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled]);

  return point;
}
