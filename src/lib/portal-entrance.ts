/** Shared entrance animation progress — updated by GSAP, read in useFrame (no React re-renders). */
export type PortalEntranceProgress = {
  /** Camera dolly 0 → 1 */
  pass: number;
  /** Golden illumination 0 → 1 (ramps into the page handoff) */
  light: number;
};

/**
 * One continuous cinematic beat.
 * Light and crossfade overlap so colour never “cuts” to the main page.
 */
export const ENTRANCE_TIMING = {
  ctaExit: 0.28,
  cameraDelay: 0.15,
  cameraDuration: 2.2,
  /** Golden wash begins mid-dolly so warmth builds continuously */
  lightRampStart: 1.35,
  lightRampDuration: 1.1,
  /** Crossfade begins while camera is still finishing — no dead pause */
  crossfadeStart: 2.05,
  crossfadeDuration: 0.75,
  totalDuration: 2.8,
} as const;

/** Soft cinematic ease — same family as main-page motion (gentle in & out) */
export const ENTRANCE_EASE = "power2.inOut";

export function createEntranceProgress(): PortalEntranceProgress {
  return { pass: 0, light: 0 };
}
