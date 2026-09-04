"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

type Ganpati3DParallaxProps = {
  className?: string;
  /** Overall size — sm for opening, lg for hero */
  size?: "sm" | "lg";
};

/**
 * Layered 3D Ganpati scene with smooth spring parallax —
 * motion values avoid React re-renders on every pointer move.
 */
export function Ganpati3DParallax({ className = "", size = "lg" }: Ganpati3DParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  /* Soft spring — continuous, not snappy jumps */
  const springX = useSpring(rotateX, { stiffness: 90, damping: 22, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 90, damping: 22, mass: 0.6 });

  const dimensions =
    size === "lg"
      ? "h-60 w-52 sm:h-72 sm:w-64 md:h-96 md:w-80"
      : "h-48 w-40 sm:h-56 sm:w-48 md:h-72 md:w-64";

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (reducedMotion || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxTilt = isTouch ? 6 : 12;

      rotateX.set(((clientY - centerY) / rect.height) * -maxTilt);
      rotateY.set(((clientX - centerX) / rect.width) * maxTilt);
    },
    [reducedMotion, isTouch, rotateX, rotateY],
  );

  const handleMouseMove = (event: React.MouseEvent) => {
    handleMove(event.clientX, event.clientY);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (touch) handleMove(touch.clientX, touch.clientY);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const layer = (z: number, extra = "") =>
    reducedMotion ? "" : `translateZ(${z}px) ${extra}`;

  return (
    <div
      ref={containerRef}
      className={`relative ${dimensions} ${className}`}
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTilt}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d", rotateX: springX, rotateY: springY }}
      >
        {/* Back — warm golden halo */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: layer(-100) }}
        >
          <div className="h-56 w-56 rounded-full bg-gradient-to-br from-festive-yellow/40 via-festive-orange/30 to-festive-pink/20 blur-2xl md:h-72 md:w-72" />
        </div>

        {/* Home mandap arch — toran frame */}
        <div
          className="absolute inset-x-4 top-2 flex justify-center"
          style={{ transform: layer(-60) }}
        >
          <svg viewBox="0 0 200 80" className="w-full max-w-[220px]" aria-hidden>
            <path
              d="M10 70 Q100 0 190 70"
              fill="none"
              stroke="#FFD93D"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M25 65 Q100 15 175 65"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="2"
              opacity="0.7"
            />
            {/* Marigold dots along toran */}
            {[30, 60, 100, 140, 170].map((cx) => (
              <circle key={cx} cx={cx} cy={cx === 100 ? 22 : 38} r="5" fill="#FF9500" />
            ))}
          </svg>
        </div>

        {/* Mid — colorful Ganpati murti */}
        <div
          className="absolute inset-0 flex items-center justify-center pt-4"
          style={{ transform: layer(0) }}
        >
          <ColorfulGanpati className="h-full w-auto drop-shadow-[0_20px_40px_rgba(255,107,53,0.4)]" />
        </div>

        {/* Front left — floating diya */}
        <motion.div
          className="absolute bottom-8 left-0 text-3xl md:text-4xl"
          style={{ transform: layer(70) }}
          animate={reducedMotion ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          🪔
        </motion.div>

        {/* Front right — modak */}
        <motion.div
          className="absolute top-16 right-0 text-2xl md:text-3xl"
          style={{ transform: layer(90) }}
          animate={reducedMotion ? {} : { y: [0, 6, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          aria-hidden
        >
          🍬
        </motion.div>

        {/* Front — marigold petal */}
        <motion.div
          className="absolute top-4 left-6 text-xl"
          style={{ transform: layer(110) }}
          animate={reducedMotion ? {} : { y: [0, -12, 0], x: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          🌼
        </motion.div>

        {/* Front bottom — home rangoli hint */}
        <div
          className="absolute -bottom-2 left-1/2 h-3 w-32 -translate-x-1/2 rounded-full bg-gradient-to-r from-festive-pink via-festive-yellow to-festive-teal opacity-80 blur-sm"
          style={{ transform: layer(50) }}
          aria-hidden
        />
      </motion.div>

      {/* 3D platform shadow */}
      <div className="absolute -bottom-4 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-[100%] bg-black/25 blur-md" />
    </div>
  );
}

/** Vibrant multi-color Ganpati illustration for the 3D scene. */
function ColorfulGanpati({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* Lotus base */}
      <ellipse cx="100" cy="238" rx="70" ry="14" fill="#FF9500" fillOpacity="0.5" />
      <path d="M100 220 C70 220 50 235 40 248 C60 242 80 238 100 238 C120 238 140 242 160 248 C150 235 130 220 100 220Z" fill="#FFD93D" fillOpacity="0.8" />

      {/* Body — warm orange */}
      <ellipse cx="100" cy="175" rx="55" ry="45" fill="#FF6B35" />
      <ellipse cx="100" cy="175" rx="55" ry="45" fill="url(#bodyShine)" />

      {/* Dhoti — bright yellow */}
      <path d="M52 175 C48 200 58 218 100 225 C142 218 152 200 148 175 Z" fill="#FFD93D" />

      {/* Head — saffron */}
      <ellipse cx="100" cy="105" rx="58" ry="52" fill="#FF9500" stroke="#E85D04" strokeWidth="1.5" />

      {/* Ears */}
      <ellipse cx="48" cy="100" rx="18" ry="22" fill="#FF6B35" transform="rotate(-15 48 100)" />
      <ellipse cx="152" cy="100" rx="18" ry="22" fill="#FF6B35" transform="rotate(15 152 100)" />

      {/* Crown */}
      <path d="M100 30 C85 45 75 52 70 62 C68 68 74 72 82 68 C90 64 96 55 100 48 C104 55 110 64 118 68 C126 72 132 68 130 62 C125 52 115 45 100 30Z" fill="#FFD93D" stroke="#FF9500" strokeWidth="1" />
      <circle cx="100" cy="42" r="6" fill="#E91E8C" />

      {/* Trunk — curved, friendly */}
      <path
        d="M100 118 C112 128 118 145 108 162 C100 172 88 176 82 168 C78 162 84 156 94 154 C102 152 106 142 106 132 C106 124 102 118 100 118Z"
        fill="#FF6B35"
        stroke="#E85D04"
        strokeWidth="1"
      />

      {/* Eyes — happy */}
      <path d="M72 98 Q78 92 84 98" stroke="#4A1942" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M116 98 Q122 92 128 98" stroke="#4A1942" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="78" cy="102" r="2" fill="#4A1942" />
      <circle cx="122" cy="102" r="2" fill="#4A1942" />

      {/* Smile */}
      <path d="M88 118 Q100 128 112 118" stroke="#4A1942" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Blessing hand + modak hand */}
      <ellipse cx="52" cy="168" rx="14" ry="18" fill="#FF9500" />
      <circle cx="148" cy="158" r="12" fill="#FFD93D" stroke="#FF9500" strokeWidth="1" />

      {/* Tilak */}
      <circle cx="100" cy="88" r="5" fill="#E91E8C" />
      <path d="M100 83 L100 76" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" />

      <defs>
        <radialGradient id="bodyShine" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFB347" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
