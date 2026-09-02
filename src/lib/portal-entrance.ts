/** Shared entrance animation progress — updated by GSAP, read in useFrame (no React re-renders). */
export type PortalEntranceProgress = {
  /** Camera dolly 0 → 1 */
  pass: number;
  /** Golden illumination 0 → 1 (ramps in final ~600ms) */
  light: number;
};

export const ENTRANCE_TIMING = {
  ctaExit: 0.32,
  cameraDelay: 0.2,
  cameraDuration: 2.35,
  lightRampStart: 1.75,
  lightRampDuration: 0.65,
  crossfadeStart: 2.25,
  crossfadeDuration: 0.65,
  totalDuration: 2.9,
} as const;

/** Smooth cinematic ease — gentle start/end, no harsh jumps */
export const ENTRANCE_EASE = "power3.inOut";

export function createEntranceProgress(): PortalEntranceProgress {
  return { pass: 0, light: 0 };
}
