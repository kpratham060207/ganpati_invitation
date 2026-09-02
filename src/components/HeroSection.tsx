"use client";

import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";
import { Ganpati3DParallax } from "@/components/ui/Ganpati3DParallax";
import { HomeDecor } from "@/components/ambient/HomeDecor";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { heroEntranceTitle, heroEntranceSubtitle, heroEntranceStagger, staggerItem, EASE } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Energetic hero — 3D Ganpati, darshan invite; optional cinematic entrance after portal intro. */
export function HeroSection({ playEntrance = false }: { playEntrance?: boolean }) {
  const { language } = useLanguage();
  const reducedMotion = useReducedMotion();
  const {
    invocation,
    heroTitle,
    heroSubtitle,
    familyName,
    welcomeMessage,
    eventDetails,
    ui,
  } = invitationConfig;

  const shouldAnimate = playEntrance || reducedMotion;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20"
    >
      <HomeDecor />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* 3D Ganpati — slightly smaller on phones to keep copy above the fold */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: EASE.smooth, delay: 0.05 }}
          >
            <Ganpati3DParallax size="lg" />
          </motion.div>

          {/* Darshan invitation copy */}
          <motion.div
            variants={heroEntranceStagger}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            className="text-center md:text-left"
          >
            <motion.p
              variants={staggerItem}
              className="font-devanagari mb-3 text-xs tracking-[0.3em] text-festive-yellow"
            >
              {invocation[language]}
            </motion.p>

            <motion.h1
              variants={heroEntranceTitle}
              className="font-display mb-3 text-3xl font-bold leading-tight text-cream sm:text-4xl md:text-5xl"
            >
              {heroTitle[language]}
            </motion.h1>

            <motion.p
              variants={heroEntranceSubtitle}
              className="mb-2 text-lg font-semibold text-festive-yellow md:text-xl"
            >
              {heroSubtitle[language]}
            </motion.p>

            <motion.div variants={staggerItem} className="section-ornament mx-auto my-5 md:mx-0" />

            <motion.h2
              variants={staggerItem}
              className="font-display mb-3 text-xl text-celebration-rose md:text-2xl"
            >
              {familyName[language]}
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="mb-8 text-base leading-relaxed text-cream/90"
            >
              {welcomeMessage[language]}
            </motion.p>

            {/* Darshan info card — 3D pop */}
            <motion.div
              variants={staggerItem}
              className="glass-card card-3d mb-8 inline-block rounded-2xl px-6 py-5 text-left"
            >
              <p className="text-xs font-bold tracking-widest text-gold uppercase">
                🏠 Home Darshan
              </p>
              <p className="mt-2 font-display text-cream">{eventDetails.date[language]}</p>
              <p className="mt-1 text-sm text-festive-yellow">{eventDetails.time[language]}</p>
              <p className="mt-2 text-sm text-cream-muted">{eventDetails.locationLabel[language]}</p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <MagneticButton href="#schedule" ariaLabel={ui.viewCelebration[language]}>
                {ui.viewCelebration[language]} 🙏
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bouncy scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pb-safe text-2xl sm:bottom-8"
        animate={reducedMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        👇
      </motion.div>
    </section>
  );
}
