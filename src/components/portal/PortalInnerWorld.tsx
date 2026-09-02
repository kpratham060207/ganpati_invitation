"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  GANPATI_PORTAL,
  PORTAL_LAYERS,
  PORTAL_PARTICLE_COUNTS,
} from "@/lib/ganpati-portal-config";
import { usePortalEntranceProgress } from "@/components/portal/PortalEntranceContext";

type PortalInnerWorldProps = {
  isMobile: boolean;
  entering: boolean;
};

/**
 * Golden spatial depth INSIDE the Ganpati silhouette —
 * particles, petals, and haze at different Z depths.
 */
export function PortalInnerWorld({ isMobile, entering }: PortalInnerWorldProps) {
  const progressRef = usePortalEntranceProgress();
  const innerRef = useRef<THREE.Group>(null);
  const innerCount = isMobile
    ? PORTAL_PARTICLE_COUNTS.inner.mobile
    : PORTAL_PARTICLE_COUNTS.inner.desktop;
  const petalCount = isMobile
    ? PORTAL_PARTICLE_COUNTS.petals.mobile
    : PORTAL_PARTICLE_COUNTS.petals.desktop;

  const { innerGeo, innerBase, petalMeshes } = useMemo(() => {
    const positions = new Float32Array(innerCount * 3);
    const base = new Float32Array(innerCount * 3);
    for (let i = 0; i < innerCount; i++) {
      const x = (Math.random() - 0.5) * 1.8;
      const y = (Math.random() - 0.5) * 2.4;
      const z = PORTAL_LAYERS.innerParticles - Math.random() * 1.5;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const petals = Array.from({ length: petalCount }).map(() => ({
      x: (Math.random() - 0.5) * 1.6,
      y: (Math.random() - 0.5) * 2,
      z: PORTAL_LAYERS.innerPetals - Math.random(),
      phase: Math.random() * Math.PI * 2,
    }));

    return { innerGeo: geo, innerBase: base, petalMeshes: petals };
  }, [innerCount, petalCount]);

  const hazeTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(232, 180, 100, 0.2)");
    g.addColorStop(0.6, "rgba(180, 120, 60, 0.06)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  const deepGlowRef = useRef<THREE.MeshBasicMaterial>(null);
  const hazeMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const pointsMatRef = useRef<THREE.PointsMaterial>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { pass: passProgress, light: lightBoost } = progressRef.current;
    const pts = innerRef.current?.children.find(
      (c) => c instanceof THREE.Points,
    ) as THREE.Points | undefined;
    if (!pts) return;

    const pos = pts.geometry.attributes.position as THREE.BufferAttribute;
    const drift = entering ? 1 + passProgress * 2.5 : 1;

    for (let i = 0; i < innerCount; i++) {
      const bx = innerBase[i * 3];
      const by = innerBase[i * 3 + 1];
      const bz = innerBase[i * 3 + 2];
      pos.array[i * 3] = bx + Math.sin(t * 0.25 + i) * 0.03;
      pos.array[i * 3 + 1] = by + Math.cos(t * 0.2 + i * 0.7) * 0.025;
      pos.array[i * 3 + 2] =
        bz + (entering ? passProgress * drift * 2.2 : Math.sin(t * 0.15 + i) * 0.06);
    }
    pos.needsUpdate = true;

    if (deepGlowRef.current) deepGlowRef.current.opacity = 0.12 + lightBoost * 0.2;
    if (hazeMatRef.current) hazeMatRef.current.opacity = 0.35 + lightBoost * 0.15;
    if (pointsMatRef.current) pointsMatRef.current.opacity = 0.55 + lightBoost * 0.25;
  });

  return (
    <group ref={innerRef}>
      <mesh position={[0, 0, PORTAL_LAYERS.deepGlow]}>
        <planeGeometry args={[3.2, 4.2]} />
        <meshBasicMaterial
          ref={deepGlowRef}
          color={GANPATI_PORTAL.amber}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, 0, PORTAL_LAYERS.background + 2]}>
        <planeGeometry args={[4, 5]} />
        <meshBasicMaterial color={GANPATI_PORTAL.burgundy} />
      </mesh>

      <mesh position={[0, 0.1, PORTAL_LAYERS.innerHaze]}>
        <planeGeometry args={[2.4, 3.2]} />
        <meshBasicMaterial
          ref={hazeMatRef}
          map={hazeTexture}
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <points geometry={innerGeo} position={[0, 0, 0]}>
        <pointsMaterial
          ref={pointsMatRef}
          color={GANPATI_PORTAL.goldLight}
          size={isMobile ? 0.028 : 0.038}
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {petalMeshes.map((p, i) => (
        <Petal key={`petal-${i}`} {...p} entering={entering} />
      ))}
    </group>
  );
}

function Petal({
  x,
  y,
  z,
  phase,
  entering,
}: {
  x: number;
  y: number;
  z: number;
  phase: number;
  entering: boolean;
}) {
  const progressRef = usePortalEntranceProgress();
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + phase;
    const passProgress = entering ? progressRef.current.pass : 0;
    ref.current.position.y = y + Math.sin(t * 0.35) * 0.06;
    ref.current.position.x = x + Math.cos(t * 0.28) * 0.04;
    ref.current.position.z = z + (entering ? passProgress * 2.5 : Math.sin(t * 0.2) * 0.05);
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <mesh ref={ref} position={[x, y, z]}>
      <circleGeometry args={[0.045, 6]} />
      <meshBasicMaterial
        color={GANPATI_PORTAL.saffron}
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </mesh>
  );
}
