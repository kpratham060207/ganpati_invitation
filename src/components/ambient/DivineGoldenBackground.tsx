"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Golden divine backdrop for the opening screen —
 * layered 3D mandala rings, light rays, and temple-inspired geometry.
 */
export function DivineGoldenBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Rich golden base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #FFF8E7 0%, #F5D98A 25%, #D4A843 50%, #B8860B 75%, #8B6914 100%)",
        }}
      />

      {/* Soft vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(90,60,10,0.35)_100%)]" />

      {/* 3D perspective container for rotating mandala layers */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "900px" }}
      >
        {/* Outermost ring — slow reverse spin */}
        <motion.div
          className="absolute h-[140vmin] w-[140vmin] rounded-full border border-amber-900/20"
          style={{
            transformStyle: "preserve-3d",
            backgroundImage:
              "repeating-conic-gradient(from 0deg, transparent 0deg 8deg, rgba(139,105,20,0.12) 8deg 9deg)",
          }}
          animate={reducedMotion ? {} : { rotateZ: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />

        {/* Middle ring — forward spin, lifted in 3D */}
        <motion.div
          className="absolute h-[100vmin] w-[100vmin] rounded-full border-2 border-amber-700/25"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(55deg)",
            backgroundImage:
              "repeating-conic-gradient(from 15deg, transparent 0deg 12deg, rgba(184,134,11,0.18) 12deg 13deg)",
            boxShadow: "0 40px 80px rgba(139,105,20,0.25), inset 0 0 60px rgba(255,248,231,0.3)",
          }}
          animate={reducedMotion ? {} : { rotateZ: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner sacred geometry — hex star feel */}
        <motion.div
          className="absolute h-[65vmin] w-[65vmin]"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(45deg) rotateY(10deg)" }}
          animate={reducedMotion ? {} : { rotateZ: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 400 400" className="h-full w-full opacity-30">
            <polygon
              points="200,20 380,300 20,300"
              fill="none"
              stroke="#8B6914"
              strokeWidth="1"
            />
            <polygon
              points="200,380 20,100 380,100"
              fill="none"
              stroke="#8B6914"
              strokeWidth="1"
            />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#B8860B" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="80" fill="none" stroke="#D4A843" strokeWidth="1" />
          </svg>
        </motion.div>
      </div>

      {/* Divine light rays from top center */}
      <div
        className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 opacity-40"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(255,248,231,0.5) 20deg, transparent 40deg, rgba(255,248,231,0.35) 60deg, transparent 80deg, rgba(255,248,231,0.45) 100deg, transparent 120deg, rgba(255,248,231,0.3) 140deg, transparent 160deg, rgba(255,248,231,0.4) 180deg, transparent 200deg, rgba(255,248,231,0.35) 220deg, transparent 240deg, rgba(255,248,231,0.45) 260deg, transparent 280deg, rgba(255,248,231,0.3) 300deg, transparent 320deg, rgba(255,248,231,0.4) 340deg, transparent 360deg)",
        }}
      />

      {/* Floating golden particles */}
      {!reducedMotion &&
        Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-amber-200/70"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${15 + (i * 11) % 70}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Bottom golden glow pool — grounds the 3D scene */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-900/30 to-transparent" />
    </div>
  );
}
