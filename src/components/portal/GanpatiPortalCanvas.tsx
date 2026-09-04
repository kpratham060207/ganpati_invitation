"use client";

import { Canvas } from "@react-three/fiber";
import { GanpatiPortalScene } from "@/components/portal/GanpatiPortalScene";
import { PortalEntranceContext } from "@/components/portal/PortalEntranceContext";
import type { PortalPhase } from "@/components/portal/GanpatiPortalCamera";
import { GANPATI_PORTAL, PORTAL_CAMERA } from "@/lib/ganpati-portal-config";
import type { PortalEntranceProgress } from "@/lib/portal-entrance";
import type { ParallaxPoint } from "@/hooks/useMouseParallax";

type GanpatiPortalCanvasProps = {
  phase: PortalPhase;
  parallaxRef: React.MutableRefObject<ParallaxPoint>;
  isMobile: boolean;
  reducedMotion: boolean;
  progressRef: React.MutableRefObject<PortalEntranceProgress>;
  onCrossfadeStart: () => void;
  onCameraComplete: () => void;
};

export function GanpatiPortalCanvas({
  phase,
  parallaxRef,
  isMobile,
  reducedMotion,
  progressRef,
  onCrossfadeStart,
  onCameraComplete,
}: GanpatiPortalCanvasProps) {
  return (
    <PortalEntranceContext.Provider value={progressRef}>
      <Canvas
        className="absolute inset-0 touch-none"
        /* Cap pixel ratio — big latency win on retina without visible loss */
        dpr={isMobile ? [1, 1.15] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: "high-performance",
          stencil: true,
        }}
        /* Slightly lower priority when tab is hidden */
        performance={{ min: 0.5 }}
        camera={{
          fov: PORTAL_CAMERA.fov,
          near: 0.1,
          far: 40,
          position: [0, PORTAL_CAMERA.startY, PORTAL_CAMERA.startZ],
        }}
        style={{ background: GANPATI_PORTAL.void }}
      >
        <GanpatiPortalScene
          phase={phase}
          parallaxRef={parallaxRef}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          onCrossfadeStart={onCrossfadeStart}
          onCameraComplete={onCameraComplete}
        />
      </Canvas>
    </PortalEntranceContext.Provider>
  );
}
