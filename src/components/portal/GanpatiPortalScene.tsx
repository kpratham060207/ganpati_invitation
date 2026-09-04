"use client";

import { Suspense } from "react";
import { GanpatiPortalCamera, type PortalPhase } from "@/components/portal/GanpatiPortalCamera";
import { GanpatiPortalFrame } from "@/components/portal/GanpatiPortalFrame";
import { PortalForeground } from "@/components/portal/PortalForeground";
import { PortalDiyas } from "@/components/portal/PortalDiyas";
import { EntranceLights } from "@/components/portal/EntranceLights";
import { GANPATI_PORTAL } from "@/lib/ganpati-portal-config";
import type { ParallaxPoint } from "@/hooks/useMouseParallax";

type GanpatiPortalSceneProps = {
  phase: PortalPhase;
  parallaxRef: React.MutableRefObject<ParallaxPoint>;
  isMobile: boolean;
  reducedMotion: boolean;
  onCrossfadeStart: () => void;
  onCameraComplete: () => void;
};

/** Ganpati IS the portal — single central composition */
export function GanpatiPortalScene({
  phase,
  parallaxRef,
  isMobile,
  reducedMotion,
  onCrossfadeStart,
  onCameraComplete,
}: GanpatiPortalSceneProps) {
  const entering = phase === "entering";

  return (
    <>
      <color attach="background" args={[GANPATI_PORTAL.void]} />
      <fog attach="fog" args={[GANPATI_PORTAL.deep, 5.5, 18]} />

      <EntranceLights />

      <GanpatiPortalCamera
        phase={phase}
        liveParallaxRef={parallaxRef}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        onCrossfadeStart={onCrossfadeStart}
        onCameraComplete={onCameraComplete}
      />

      <Suspense fallback={null}>
        <GanpatiPortalFrame
          isMobile={isMobile}
          entering={entering}
          parallaxRef={parallaxRef}
        />
      </Suspense>

      <PortalDiyas entering={entering} />
      <PortalForeground isMobile={isMobile} entering={entering} />
    </>
  );
}
