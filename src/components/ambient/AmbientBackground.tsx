"use client";

import { ParallaxElement } from "@/components/motion/ParallaxElement";

/** Subtle maroon & gold ambient depth for the main invitation page. */
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(201,168,76,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(184,74,98,0.06)_0%,transparent_50%)]" />

      <ParallaxElement speed={0.08} className="absolute -top-20 -right-20 opacity-15">
        <div className="h-72 w-72 rounded-full bg-gold blur-3xl" />
      </ParallaxElement>

      <ParallaxElement speed={0.06} className="absolute -bottom-24 -left-16 opacity-12">
        <div className="h-80 w-80 rounded-full bg-celebration-rose blur-3xl" />
      </ParallaxElement>

      {/* Delicate gold mandala ring */}
      <ParallaxElement speed={0.05} className="absolute top-1/4 right-1/4 opacity-[0.04]">
        <div
          className="h-64 w-64 rounded-full border border-gold"
          style={{
            backgroundImage:
              "repeating-conic-gradient(from 0deg, transparent 0deg 12deg, rgba(201,168,76,0.4) 12deg 13deg)",
          }}
        />
      </ParallaxElement>
    </div>
  );
}
