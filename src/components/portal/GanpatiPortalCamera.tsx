"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { PORTAL_CAMERA } from "@/lib/ganpati-portal-config";
import { ENTRANCE_EASE, ENTRANCE_TIMING } from "@/lib/portal-entrance";
import { usePortalEntranceProgress } from "@/components/portal/PortalEntranceContext";

export type PortalPhase = "idle" | "entering";

type GanpatiPortalCameraProps = {
  phase: PortalPhase;
  liveParallax: { x: number; y: number };
  isMobile: boolean;
  reducedMotion: boolean;
  onCrossfadeStart: () => void;
  onCameraComplete: () => void;
};

function log(msg: string) {
  console.log(`[ENTER] ${msg}`);
}

/**
 * Single GSAP timeline for camera dolly — one continuous cinematic motion.
 * Progress values written to a ref (no React setState per frame).
 */
export function GanpatiPortalCamera({
  phase,
  liveParallax,
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
  const loggedHalfRef = useRef(false);

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
    if (reducedMotion) return; /* Reduced-motion path handled in GanpatiPortalIntro */
    startedRef.current = true;
    log("camera animation start");

    const tl = gsap.timeline();

    /* Smoothly centre camera from idle parallax before dolly */
    tl.to(camera.position, {
      x: 0,
      duration: ENTRANCE_TIMING.cameraDelay,
      ease: "sine.out",
    }, 0);

    /* Single continuous dolly — Ganpati grows via perspective, not scale */
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

    /* Golden light ramps in during final ~650ms */
    tl.to(
      progressRef.current,
      {
        light: 1,
        duration: ENTRANCE_TIMING.lightRampDuration,
        ease: "sine.inOut",
      },
      ENTRANCE_TIMING.lightRampStart,
    );

    tl.call(
      () => {
        if (!crossfadeFiredRef.current) {
          crossfadeFiredRef.current = true;
          log("transition start");
          onCrossfadeStart();
        }
      },
      undefined,
      ENTRANCE_TIMING.crossfadeStart,
    );

    /* Wait for crossfade to finish before signalling navigation */
    tl.call(
      () => {
        log("camera animation complete");
        onCameraComplete();
      },
      undefined,
      ENTRANCE_TIMING.crossfadeStart + ENTRANCE_TIMING.crossfadeDuration,
    );

    tl.eventCallback("onUpdate", () => {
      const p = progressRef.current.pass;
      if (!loggedHalfRef.current && p >= 0.5) {
        loggedHalfRef.current = true;
        log("camera animation 50%");
      }
    });
  }, [phase, reducedMotion, camera, progressRef, onCrossfadeStart, onCameraComplete]);

  useFrame(() => {
    if (phase === "entering") {
      camera.lookAt(lookAt.current);
      return;
    }

    if (reducedMotion) return;

    const t = performance.now() * 0.001;
    const px = isMobile ? Math.sin(t * 0.2) * 0.06 : liveParallax.x * 0.1;
    const py = isMobile
      ? PORTAL_CAMERA.startY + Math.cos(t * 0.16) * 0.025
      : PORTAL_CAMERA.startY + liveParallax.y * 0.06;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, px, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, py, 0.03);
    camera.lookAt(lookAt.current);
  });

  return null;
}
