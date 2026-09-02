"use client";

import { Suspense } from "react";
import { GanpatiPortalCamera, type PortalPhase } from "@/components/portal/GanpatiPortalCamera";
import { GanpatiPortalFrame } from "@/components/portal/GanpatiPortalFrame";
import { PortalForeground } from "@/components/portal/PortalForeground";
import { PortalDiyas } from "@/components/portal/PortalDiyas";
import { EntranceLights } from "@/components/portal/EntranceLights";
import { GANPATI_PORTAL } from "@/lib/ganpati-portal-config";

type GanpatiPortalSceneProps = {
  phase: PortalPhase;
  parallax: { x: number; y: number };
  isMobile: boolean;
  reducedMotion: boolean;
  onCrossfadeStart: () => void;
  onCameraComplete: () => void;
};

/** Ganpati IS the portal — single central composition, no corridor */
export function GanpatiPortalScene({
  phase,
  parallax,
  isMobile,
  reducedMotion,
  onCrossfadeStart,
  onCameraComplete,
}: GanpatiPortalSceneProps) {
  const entering = phase === "entering";

  return (
    <>
      <color attach="background" args={[GANPATI_PORTAL.void]} />
      <fog attach="fog" args={[GANPATI_PORTAL.deep, 5, 16]} />

      <EntranceLights />

      <GanpatiPortalCamera
        phase={phase}
        liveParallax={parallax}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        onCrossfadeStart={onCrossfadeStart}
        onCameraComplete={onCameraComplete}
      />

      <Suspense fallback={null}>
        <GanpatiPortalFrame
          isMobile={isMobile}
          entering={entering}
          parallax={parallax}
        />
      </Suspense>

      <PortalDiyas entering={entering} />
      <PortalForeground isMobile={isMobile} entering={entering} />
    </>
  );
}
