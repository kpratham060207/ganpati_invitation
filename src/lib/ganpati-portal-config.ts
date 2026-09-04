/** Ganpati-as-portal — palette tuned to hand off into page ink-deep maroon */
export const GANPATI_PORTAL = {
  void: "#0c0608",
  deep: "#14080c",
  burgundy: "#2A0F14",
  gold: "#C9A84C",
  goldLight: "#E8D5A3",
  goldMuted: "#9A7B3C",
  amber: "#D4842A",
  saffron: "#B8722E",
  flame: "#FFB347",
} as const;

/**
 * Portal Ganpati artwork assets.
 * `original` — untouched upload (replace with licensed asset later).
 * `artwork` — black background removed, RGBA transparency.
 * `interiorMask` — white silhouette for stencil (derived from artwork alpha).
 */
export const GANPATI_ASSETS = {
  original: "/portal/ganpati-portal-original.png",
  artwork: "/portal/ganpati-portal.png",
  interiorMask: "/portal/ganpati-portal-mask.png",
} as const;

/** Native artwork aspect ratio (width / height) — 360×360 source */
export const GANPATI_ASPECT = 1;

/** Portal plane size — width derived from height to preserve aspect ratio */
export const PORTAL_HEIGHT = 3.55;
export const PORTAL_SIZE = {
  width: PORTAL_HEIGHT * GANPATI_ASPECT,
  height: PORTAL_HEIGHT,
} as const;

/** Z-depth layers — camera at +Z approaches portal at ~0 */
export const PORTAL_LAYERS = {
  background: -6,
  deepGlow: -4,
  innerParticles: -2.5,
  innerPetals: -1.8,
  innerHaze: -1.2,
  portalPlane: 0,
  artworkGlow: -0.08,
  rimGlow: 0.02,
  diyas: 0.35,
  foregroundMotes: 2.2,
  foregroundPetals: 2.8,
} as const;

/** Camera dolly — starts outside, passes THROUGH portal plane at z=0 */
export const PORTAL_CAMERA = {
  startZ: 7.5,
  startY: 0.05,
  endZ: -1.8,
  endY: 0,
  lookAtY: 0,
  lookAtZ: 0,
  fov: 42,
  duration: 2.85,
} as const;

export const PORTAL_PARTICLE_COUNTS = {
  inner: { desktop: 18, mobile: 8 },
  foreground: { desktop: 8, mobile: 4 },
  petals: { desktop: 6, mobile: 3 },
} as const;
