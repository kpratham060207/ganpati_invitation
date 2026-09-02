"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GANPATI_PORTAL, PORTAL_LAYERS } from "@/lib/ganpati-portal-config";
import { usePortalEntranceProgress } from "@/components/portal/PortalEntranceContext";

type PortalDiyasProps = {
  entering: boolean;
};

/** Two brass diyas flanking the Ganpati portal base */
export function PortalDiyas({ entering }: PortalDiyasProps) {
  return (
    <group>
      <Diya position={[-1.05, -1.55, PORTAL_LAYERS.diyas]} entering={entering} />
      <Diya position={[1.05, -1.55, PORTAL_LAYERS.diyas]} entering={entering} />
    </group>
  );
}

function Diya({
  position,
  entering,
}: {
  position: [number, number, number];
  entering: boolean;
}) {
  const progressRef = usePortalEntranceProgress();
  const flameRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const emissiveMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const phase = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    const t = state.clock.elapsedTime + phase.current;
    const flicker = 0.88 + Math.sin(t * 7) * 0.06 + Math.sin(t * 11) * 0.04;
    const boost = entering ? progressRef.current.light : 0;
    const extra = entering ? boost * 0.5 : 0;

    if (flameRef.current) flameRef.current.scale.y = flicker;
    if (lightRef.current) lightRef.current.intensity = 0.22 + flicker * 0.1 + extra * 0.35;
    if (emissiveMatRef.current) {
      emissiveMatRef.current.emissiveIntensity = 0.45 + boost * 0.3;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.05, 10]} />
        <meshStandardMaterial color="#4A2818" roughness={0.8} metalness={0.3} />
      </mesh>
      <mesh ref={flameRef} position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshStandardMaterial
          ref={emissiveMatRef}
          color={GANPATI_PORTAL.flame}
          emissive={GANPATI_PORTAL.amber}
          emissiveIntensity={0.45}
          transparent
          opacity={0.85}
        />
      </mesh>
      <pointLight
        ref={lightRef}
        color={GANPATI_PORTAL.flame}
        intensity={0.28}
        distance={2.5}
        decay={2}
      />
    </group>
  );
}
