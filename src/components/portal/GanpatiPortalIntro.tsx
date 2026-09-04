"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PortalCTA } from "@/components/portal/PortalCTA";
import { GoldenTransitionOverlay } from "@/components/portal/GoldenTransitionOverlay";
import type { PortalPhase } from "@/components/portal/GanpatiPortalCamera";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMouseParallaxRef } from "@/hooks/useMouseParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GANPATI_PORTAL } from "@/lib/ganpati-portal-config";
import { createEntranceProgress, ENTRANCE_TIMING } from "@/lib/portal-entrance";

const GanpatiPortalCanvas = dynamic(
  () =>
    import("@/components/portal/GanpatiPortalCanvas").then(
      (m) => m.GanpatiPortalCanvas,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0" style={{ background: GANPATI_PORTAL.void }} />
    ),
  },
);

type GanpatiPortalIntroProps = {
  /** Fires when golden crossfade to main page should begin */
  onCrossfadeStart?: () => void;
  /** Fires when entire entrance sequence is complete — safe to unmount intro */
  onComplete?: () => void;
};

/**
 * GanpatiPortalIntro — Ganpati IS the portal.
 * One GSAP-driven cinematic sequence after "Tap to Enter".
 */
export function GanpatiPortalIntro({
  onCrossfadeStart,
  onComplete,
}: GanpatiPortalIntroProps) {
  const [phase, setPhase] = useState<PortalPhase>("idle");
  const [isEntering, setIsEntering] = useState(false);

  const lockedRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(createEntranceProgress());
  const crossfadeStartedRef = useRef(false);

  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  /* Ref-based parallax — no re-renders while the pointer moves */
  const parallaxRef = useMouseParallaxRef(!isMobile && phase === "idle");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleCrossfadeStart = useCallback(() => {
    if (crossfadeStartedRef.current) return;
    crossfadeStartedRef.current = true;
    onCrossfadeStart?.();

    /* Intro dissolves into the warm maroon page underneath */
    gsap.to(rootRef.current, {
      opacity: 0,
      duration: ENTRANCE_TIMING.crossfadeDuration,
      ease: "power2.inOut",
    });
  }, [onCrossfadeStart]);

  const handleCameraComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  const handleEnter = () => {
    if (lockedRef.current || phase !== "idle") return;
    lockedRef.current = true;
    setIsEntering(true);

    if (ctaRef.current) {
      gsap.to(ctaRef.current, {
        opacity: 0,
        y: 8,
        duration: ENTRANCE_TIMING.ctaExit,
        ease: "power2.out",
      });
    }

    if (reducedMotion) {
      progressRef.current.pass = 1;
      progressRef.current.light = 1;
      setPhase("entering");
      gsap.delayedCall(0.35, () => {
        handleCrossfadeStart();
        gsap.delayedCall(ENTRANCE_TIMING.crossfadeDuration, handleCameraComplete);
      });
      return;
    }

    setPhase("entering");
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ background: GANPATI_PORTAL.void }}
    >
      <GanpatiPortalCanvas
        phase={phase}
        parallaxRef={parallaxRef}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        progressRef={progressRef}
        onCrossfadeStart={handleCrossfadeStart}
        onCameraComplete={handleCameraComplete}
      />

      <GoldenTransitionOverlay
        progressRef={progressRef}
        active={phase === "entering"}
        reducedMotion={reducedMotion}
      />

      <PortalCTA
        ref={ctaRef}
        visible={phase === "idle"}
        disabled={isEntering}
        onEnter={handleEnter}
      />
    </div>
  );
}

/** Backward-compatible alias */
export { GanpatiPortalIntro as SacredPortalIntro };
