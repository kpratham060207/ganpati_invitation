"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const GATE_IMAGE = "/doors/mandir-gate.png";

/** Dark wood door region inside the gate art (fractions of image size). */
const DOOR_FRAC = {
  left: 0.235,
  top: 0.335,
  right: 0.765,
  bottom: 0.865,
};

/** Door thickness as a fraction of gate width — gives visible 3D depth. */
const DEPTH_RATIO = 0.032;

type GateSize = { w: number; h: number };

type MandirDoorProps = {
  isOpen: boolean;
};

type DoorLeaf3DProps = {
  side: "left" | "right";
  gateSize: GateSize;
  isOpen: boolean;
  duration: number;
  openAngle: number;
};

/**
 * Front face of one door leaf — background-image stays pixel-aligned with the gate.
 */
function DoorFace({
  side,
  gateW,
  gateH,
  doorLeft,
  doorTop,
  leafW,
}: {
  side: "left" | "right";
  gateW: number;
  gateH: number;
  doorLeft: number;
  doorTop: number;
  leafW: number;
}) {
  const bgOffsetX = side === "left" ? -doorLeft : -(doorLeft + leafW);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backfaceVisibility: "hidden" }}
    >
      <div
        style={{
          width: gateW,
          height: gateH,
          backgroundImage: `url(${GATE_IMAGE})`,
          backgroundSize: `${gateW}px ${gateH}px`,
          backgroundRepeat: "no-repeat",
          transform: `translate(${bgOffsetX}px, ${-doorTop}px)`,
        }}
      />
    </div>
  );
}

/**
 * One hinged door leaf with front face + side edge + back — reads as thick wood in 3D.
 */
function DoorLeaf3D({ side, gateSize, isOpen, duration, openAngle }: DoorLeaf3DProps) {
  const { w: gateW, h: gateH } = gateSize;
  const doorLeft = DOOR_FRAC.left * gateW;
  const doorTop = DOOR_FRAC.top * gateH;
  const doorW = (DOOR_FRAC.right - DOOR_FRAC.left) * gateW;
  const doorH = (DOOR_FRAC.bottom - DOOR_FRAC.top) * gateH;
  const leafW = doorW / 2;
  const depth = Math.max(10, Math.round(gateW * DEPTH_RATIO));

  const isLeft = side === "left";
  const hingeOrigin = isLeft ? "left center" : "right center";
  const boxLeft = isLeft ? doorLeft : doorLeft + leafW;

  return (
    <div
      className="absolute"
      style={{
        left: boxLeft,
        top: doorTop,
        width: leafW,
        height: doorH,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: hingeOrigin,
        }}
        initial={false}
        animate={{ rotateY: isOpen ? (isLeft ? -openAngle : openAngle) : 0 }}
        transition={{ duration, ease: EASE.smooth }}
      >
        {/* Front — carved door art */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateZ(${depth / 2}px)`,
            backfaceVisibility: "hidden",
          }}
        >
          <DoorFace
            side={side}
            gateW={gateW}
            gateH={gateH}
            doorLeft={doorLeft}
            doorTop={doorTop}
            leafW={leafW}
          />
        </div>

        {/* Side edge — visible depth when the door swings toward the viewer */}
        <div
          className="absolute top-0"
          style={{
            [isLeft ? "right" : "left"]: 0,
            width: depth,
            height: "100%",
            transformOrigin: isLeft ? "right center" : "left center",
            transform: isLeft
              ? `rotateY(90deg) translateZ(${depth / 2}px)`
              : `rotateY(-90deg) translateZ(${depth / 2}px)`,
            background:
              "linear-gradient(180deg, #1a0e08 0%, #3d2518 18%, #5c3a22 50%, #3d2518 82%, #1a0e08 100%)",
            boxShadow: "inset 2px 0 6px rgba(0,0,0,0.5)",
          }}
        />

        {/* Back — inner face of the door */}
        <div
          className="absolute inset-0"
          style={{
            transform: `rotateY(180deg) translateZ(${depth / 2}px)`,
            backfaceVisibility: "hidden",
            background:
              "linear-gradient(165deg, #2a1810 0%, #1a0e08 40%, #0f0805 100%)",
            boxShadow: "inset 0 0 24px rgba(0,0,0,0.6)",
          }}
        />
      </motion.div>
    </div>
  );
}

/**
 * Dark-theme mandir gate — stone arch fixed, thick wooden doors swing open in 3D.
 */
export function MandirDoor({ isOpen }: MandirDoorProps) {
  const isMobile = useIsMobile();
  const gateRef = useRef<HTMLDivElement>(null);
  const [gateSize, setGateSize] = useState<GateSize>({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);

  const duration = isMobile ? 1.05 : 1.35;
  const openAngle = isMobile ? 78 : 86;

  const measureGate = useCallback(() => {
    const el = gateRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    if (width > 0 && height > 0) {
      setGateSize({ w: width, h: height });
      setReady(true);
    }
  }, []);

  useLayoutEffect(() => {
    measureGate();
    window.addEventListener("resize", measureGate);
    return () => window.removeEventListener("resize", measureGate);
  }, [measureGate]);

  const midX = ((DOOR_FRAC.left + DOOR_FRAC.right) / 2) * 100;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Sanctum glow — hidden in dark theme until doors open */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={false}
        animate={
          isOpen
            ? { opacity: 1, scale: 1.04 }
            : { opacity: 0, scale: 0.98 }
        }
        transition={{ duration: duration * 0.9, ease: EASE.smooth }}
        style={{
          background:
            "radial-gradient(ellipse at 50% 44%, #FFF4D6 0%, #E8C060 22%, #8B6914 48%, #2A0F14 78%, #0a0504 100%)",
        }}
      />

      {/* Golden burst when doors part */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[5]"
        initial={false}
        animate={
          isOpen
            ? { opacity: [0, 0.55, 0.12], scale: [0.88, 1.15, 1.28] }
            : { opacity: 0, scale: 0.88 }
        }
        transition={{ duration: duration * 0.75, ease: EASE.out }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,220,140,0.7) 0%, rgba(201,168,76,0.25) 38%, transparent 70%)",
        }}
      />

      {/* 3D scene — perspective makes the door swing feel volumetric */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={{
          perspective: isMobile ? "1100px" : "1400px",
          perspectiveOrigin: "50% 46%",
        }}
      >
        <motion.div
          ref={gateRef}
          className="relative leading-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE.smooth }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Fallback while measuring */}
          {!ready && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={GATE_IMAGE}
              alt=""
              draggable={false}
              fetchPriority="high"
              loading="eager"
              onLoad={measureGate}
              className="block h-auto max-h-[100dvh] w-auto max-w-[100vw] select-none"
            />
          )}

          {ready && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={GATE_IMAGE}
              alt=""
              aria-hidden
              draggable={false}
              className="block h-auto max-h-[100dvh] w-auto max-w-[100vw] opacity-0 select-none"
            />
          )}

          {ready && gateSize.w > 0 && (
            <div
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Perfect full gate while closed — hides any seam between frame and leaves */}
              {!isOpen && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={GATE_IMAGE}
                  alt=""
                  draggable={false}
                  className="pointer-events-none absolute inset-0 z-40 h-full w-full select-none"
                  style={{ filter: "brightness(0.92) contrast(1.05)" }}
                />
              )}

              {/* STATIC stone arch + pillars — door hole cut out */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GATE_IMAGE}
                alt=""
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full select-none"
                style={{
                  maskImage: "url(#mandir-gate-frame-mask)",
                  WebkitMaskImage: "url(#mandir-gate-frame-mask)",
                  filter: "brightness(0.92) contrast(1.05)",
                }}
              />

              {/* Dark recess behind doors — adds depth in the arch opening */}
              <div
                className="absolute z-[5]"
                style={{
                  left: `${DOOR_FRAC.left * 100}%`,
                  top: `${DOOR_FRAC.top * 100}%`,
                  width: `${(DOOR_FRAC.right - DOOR_FRAC.left) * 100}%`,
                  height: `${(DOOR_FRAC.bottom - DOOR_FRAC.top) * 100}%`,
                  background:
                    "radial-gradient(ellipse at 50% 40%, #1a1008 0%, #0a0604 70%)",
                  transform: "translateZ(-8px)",
                }}
              />

              <DoorLeaf3D
                side="left"
                gateSize={gateSize}
                isOpen={isOpen}
                duration={duration}
                openAngle={openAngle}
              />
              <DoorLeaf3D
                side="right"
                gateSize={gateSize}
                isOpen={isOpen}
                duration={duration}
                openAngle={openAngle}
              />

              {/* Centre seam + soft shadow while closed */}
              {!isOpen && (
                <>
                  <motion.div
                    className="pointer-events-none absolute z-30 w-px"
                    style={{
                      left: `${midX}%`,
                      top: `${DOOR_FRAC.top * 100}%`,
                      height: `${(DOOR_FRAC.bottom - DOOR_FRAC.top) * 100}%`,
                      transform: "translateX(-50%)",
                      background:
                        "linear-gradient(180deg, transparent, rgba(255,210,120,0.5), transparent)",
                    }}
                    animate={{ opacity: [0.3, 0.75, 0.3] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div
                    className="pointer-events-none absolute z-25 w-px bg-black/50"
                    style={{
                      left: `${midX}%`,
                      top: `${DOOR_FRAC.top * 100}%`,
                      height: `${(DOOR_FRAC.bottom - DOOR_FRAC.top) * 100}%`,
                      transform: "translateX(-50%)",
                    }}
                  />
                </>
              )}

              {/* Floor shadow under the gate */}
              <div
                className="pointer-events-none absolute z-[1] rounded-[50%] bg-black/40 blur-md"
                style={{
                  left: "10%",
                  right: "10%",
                  bottom: "-2%",
                  height: "4%",
                  transform: "translateZ(-12px)",
                }}
              />
            </div>
          )}
        </motion.div>
      </div>

      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <defs>
          <mask id="mandir-gate-frame-mask" maskUnits="objectBoundingBox">
            <rect width="1" height="1" fill="white" />
            <rect
              x={DOOR_FRAC.left}
              y={DOOR_FRAC.top}
              width={DOOR_FRAC.right - DOOR_FRAC.left}
              height={DOOR_FRAC.bottom - DOOR_FRAC.top}
              fill="black"
            />
          </mask>
        </defs>
      </svg>
    </div>
  );
}

export function DoorToran() {
  return null;
}
