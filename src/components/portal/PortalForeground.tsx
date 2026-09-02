"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GANPATI_PORTAL, PORTAL_LAYERS, PORTAL_PARTICLE_COUNTS } from "@/lib/ganpati-portal-config";
import { usePortalEntranceProgress } from "@/components/portal/PortalEntranceContext";

type PortalForegroundProps = {
  isMobile: boolean;
  entering: boolean;
};

/** Foreground motes — drift past camera during dolly for depth parallax */
export function PortalForeground({ isMobile, entering }: PortalForegroundProps) {
  const progressRef = usePortalEntranceProgress();
  const groupRef = useRef<THREE.Group>(null);
  const count = isMobile
    ? PORTAL_PARTICLE_COUNTS.foreground.mobile
    : PORTAL_PARTICLE_COUNTS.foreground.desktop;

  const { geometry, base } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const basePos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 3.5;
      const z = PORTAL_LAYERS.foregroundMotes + Math.random() * 0.8;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, base: basePos };
  }, [count]);

  useFrame((state) => {
    const pts = groupRef.current?.children[0] as THREE.Points | undefined;
    if (!pts) return;
    const pos = pts.geometry.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    const passProgress = entering ? progressRef.current.pass : 0;

    for (let i = 0; i < count; i++) {
      pos.array[i * 3] = base[i * 3] + Math.sin(t * 0.22 + i) * 0.05;
      pos.array[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.18 + i) * 0.04;
      /* Foreground moves faster than midground — reinforces camera motion */
      pos.array[i * 3 + 2] =
        base[i * 3 + 2] - passProgress * 3.5 + Math.sin(t * 0.15 + i) * 0.04;
    }
    pos.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          color={GANPATI_PORTAL.goldLight}
          size={isMobile ? 0.022 : 0.03}
          transparent
          opacity={0.22}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
