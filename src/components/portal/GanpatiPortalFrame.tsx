"use client";

import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mask, useMask } from "@react-three/drei";
import * as THREE from "three";
import {
  GANPATI_ASSETS,
  GANPATI_PORTAL,
  PORTAL_SIZE,
  PORTAL_LAYERS,
} from "@/lib/ganpati-portal-config";
import { PortalInnerWorld } from "@/components/portal/PortalInnerWorld";
import { usePortalEntranceProgress } from "@/components/portal/PortalEntranceContext";

const MASK_ID = 1;

type GanpatiPortalFrameProps = {
  isMobile: boolean;
  entering: boolean;
  parallax: { x: number; y: number };
};

/**
 * Ganpati portal — supplied artwork with transparent background.
 * Artwork stays spatially anchored; camera dolly creates the approach illusion.
 */
export function GanpatiPortalFrame({
  isMobile,
  entering,
  parallax,
}: GanpatiPortalFrameProps) {
  const progressRef = usePortalEntranceProgress();
  const artworkRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const backGlowRef = useRef<THREE.Mesh>(null);
  const haloMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const maskTex = useLoader(THREE.TextureLoader, GANPATI_ASSETS.interiorMask);
  const artworkTex = useLoader(THREE.TextureLoader, GANPATI_ASSETS.artwork);

  maskTex.colorSpace = THREE.SRGBColorSpace;
  artworkTex.colorSpace = THREE.SRGBColorSpace;

  const stencil = useMask(MASK_ID);

  const artworkMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: artworkTex,
        transparent: true,
        alphaTest: 0.04,
        depthWrite: true,
        toneMapped: true,
      }),
    [artworkTex],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { light: lightBoost } = progressRef.current;
    const breathe = 1 + Math.sin(t * 0.45) * 0.006;

    if (groupRef.current) {
      /* Idle parallax only — freeze rotation once entrance begins */
      if (!entering) {
        groupRef.current.rotation.y = parallax.x * 0.035;
        groupRef.current.rotation.x = parallax.y * 0.02;
      }
      groupRef.current.scale.setScalar(breathe);
    }

    if (backGlowRef.current) {
      const s = 1.1 + lightBoost * 0.35 + Math.sin(t * 0.4) * 0.025;
      backGlowRef.current.scale.set(s, s, 1);
      (backGlowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.14 + lightBoost * 0.28 + Math.sin(t * 0.5) * 0.02;
    }

    /* Artwork Z stays fixed — size change comes from camera dolly only */
    if (artworkRef.current) {
      artworkRef.current.position.z = PORTAL_LAYERS.rimGlow;
    }

    if (haloMatRef.current) {
      haloMatRef.current.opacity = 0.06 + lightBoost * 0.1;
    }
  });

  const planeScale: [number, number, number] = [
    PORTAL_SIZE.width,
    PORTAL_SIZE.height,
    1,
  ];

  return (
    <group ref={groupRef} position={[0, 0.08, PORTAL_LAYERS.portalPlane]}>
      <mesh ref={backGlowRef} position={[0, 0, PORTAL_LAYERS.artworkGlow]}>
        <circleGeometry args={[1.55, 48]} />
        <meshBasicMaterial
          color={GANPATI_PORTAL.amber}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <Mask id={MASK_ID} position={[0, 0, 0]}>
        <mesh scale={planeScale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={maskTex} alphaTest={0.12} transparent />
        </mesh>
      </Mask>

      <group {...stencil}>
        <PortalInnerWorld isMobile={isMobile} entering={entering} />
      </group>

      <mesh ref={artworkRef} scale={planeScale} material={artworkMat}>
        <planeGeometry args={[1, 1]} />
      </mesh>

      <mesh scale={[PORTAL_SIZE.width * 1.06, PORTAL_SIZE.height * 1.06, 1]} position={[0, 0, -0.03]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={haloMatRef}
          map={artworkTex}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
