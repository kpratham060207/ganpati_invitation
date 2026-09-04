"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { PORTAL_CAMERA } from "@/lib/ganpati-portal-config";
import { ENTRANCE_EASE, ENTRANCE_TIMING } from "@/lib/portal-entrance";
import { usePortalEntranceProgress } from "@/components/portal/PortalEntranceContext";
import type { ParallaxPoint } from "@/hooks/useMouseParallax";

export type PortalPhase = "idle" | "entering";

type GanpatiPortalCameraProps = {
  phase: PortalPhase;
  /** Mutable parallax — read in useFrame, never triggers React re-renders */
  liveParallaxRef: React.MutableRefObject<ParallaxPoint>;
  isMobile: boolean;
  reducedMotion: boolean;
  onCrossfadeStart: () => void;
  onCameraComplete: () => void;
};

/**
 * Single GSAP timeline for camera dolly — one continuous cinematic motion.
 * Progress values written to a ref (no React setState per frame).
 */
export function GanpatiPortalCamera({
  phase,
  liveParallaxRef,
  isMobile,
  reducedMotion,
  onCrossfadeStart,
  onCameraComplete,
}: GanpatiPortalCameraProps) {
  const { camera } = useThree();
  const progressRef = usePortalEntranceProgress();
  const lookAt = useRef(new THREE.Vector3(0, PORTAL_CAMERA.lookAtY, PORTAL_CAMERA.lookAtZ));
  const startedRef = useRef(false);
  const crossfadeFiredRef = useRef(false);

  useEffect(() => {
    camera.position.set(0, PORTAL_CAMERA.startY, PORTAL_CAMERA.startZ);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = PORTAL_CAMERA.fov;
      camera.updateProjectionMatrix();
    }
    camera.lookAt(lookAt.current);
  }, [camera]);

  useEffect(() => {
    if (phase !== "entering" || startedRef.current) return;
    if (reducedMotion) return;
    startedRef.current = true;

    const tl = gsap.timeline();

    /* Blend idle parallax into centre — same ease family as the dolly */
    tl.to(
      camera.position,
      {
        x: 0,
        duration: ENTRANCE_TIMING.cameraDelay,
        ease: "power2.out",
      },
      0,
    );

    /* One continuous dolly — Ganpati grows via perspective */
    tl.to(
      camera.position,
      {
        y: PORTAL_CAMERA.endY,
        z: PORTAL_CAMERA.endZ,
        duration: ENTRANCE_TIMING.cameraDuration,
        ease: ENTRANCE_EASE,
      },
      ENTRANCE_TIMING.cameraDelay,
    );

    tl.to(
      progressRef.current,
      {
        pass: 1,
        duration: ENTRANCE_TIMING.cameraDuration,
        ease: ENTRANCE_EASE,
      },
      ENTRANCE_TIMING.cameraDelay,
    );

    /* Warm light builds through the second half into the page handoff */
    tl.to(
      progressRef.current,
      {
        light: 1,
        duration: ENTRANCE_TIMING.lightRampDuration,
        ease: "power1.inOut",
      },
      ENTRANCE_TIMING.lightRampStart,
    );

    tl.call(
      () => {
        if (!crossfadeFiredRef.current) {
          crossfadeFiredRef.current = true;
          onCrossfadeStart();
        }
      },
      undefined,
      ENTRANCE_TIMING.crossfadeStart,
    );

    tl.call(
      () => {
        onCameraComplete();
      },
      undefined,
      ENTRANCE_TIMING.crossfadeStart + ENTRANCE_TIMING.crossfadeDuration,
    );

    return () => {
      tl.kill();
    };
  }, [phase, reducedMotion, camera, progressRef, onCrossfadeStart, onCameraComplete]);

  useFrame(() => {
    if (phase === "entering") {
      camera.lookAt(lookAt.current);
      return;
    }

    if (reducedMotion) return;

    const t = performance.now() * 0.001;
    const live = liveParallaxRef.current;
    const px = isMobile ? Math.sin(t * 0.2) * 0.06 : live.x * 0.1;
    const py = isMobile
      ? PORTAL_CAMERA.startY + Math.cos(t * 0.16) * 0.025
      : PORTAL_CAMERA.startY + live.y * 0.06;

    /* Slightly snappier lerp — responsive idle feel without jitter */
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, px, 0.045);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, py, 0.045);
    camera.lookAt(lookAt.current);
  });

  return null;
}
