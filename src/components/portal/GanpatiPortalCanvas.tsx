"use client";

import { Canvas } from "@react-three/fiber";
import { GanpatiPortalScene } from "@/components/portal/GanpatiPortalScene";
import { PortalEntranceContext } from "@/components/portal/PortalEntranceContext";
import type { PortalPhase } from "@/components/portal/GanpatiPortalCamera";
import { GANPATI_PORTAL, PORTAL_CAMERA } from "@/lib/ganpati-portal-config";
import type { PortalEntranceProgress } from "@/lib/portal-entrance";

type GanpatiPortalCanvasProps = {
  phase: PortalPhase;
  parallax: { x: number; y: number };
  isMobile: boolean;
  reducedMotion: boolean;
  progressRef: React.MutableRefObject<PortalEntranceProgress>;
  onCrossfadeStart: () => void;
  onCameraComplete: () => void;
};

export function GanpatiPortalCanvas({
  phase,
  parallax,
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
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: "high-performance",
        }}
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
          parallax={parallax}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          onCrossfadeStart={onCrossfadeStart}
          onCameraComplete={onCameraComplete}
        />
      </Canvas>
    </PortalEntranceContext.Provider>
  );
}
