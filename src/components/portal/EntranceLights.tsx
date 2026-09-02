"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GANPATI_PORTAL } from "@/lib/ganpati-portal-config";
import { usePortalEntranceProgress } from "@/components/portal/PortalEntranceContext";

/** Updates light intensities from GSAP progress ref — no React re-renders. */
export function EntranceLights() {
  const progressRef = usePortalEntranceProgress();
  const pointRef = useRef<THREE.PointLight>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    const light = progressRef.current.light;
    if (pointRef.current) pointRef.current.intensity = 0.35 + light * 0.9;
    if (dirRef.current) dirRef.current.intensity = 0.2 + light * 0.25;
  });

  return (
    <>
      <ambientLight color="#150c0e" intensity={0.22} />
      <pointLight
        ref={pointRef}
        color={GANPATI_PORTAL.goldLight}
        intensity={0.35}
        position={[0, 0.5, 2]}
        distance={12}
      />
      <directionalLight
        ref={dirRef}
        color={GANPATI_PORTAL.amber}
        intensity={0.2}
        position={[0, 2, 4]}
      />
    </>
  );
}
