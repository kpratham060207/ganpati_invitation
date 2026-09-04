"use client";

import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { Ganpati3DParallax } from "@/components/ui/Ganpati3DParallax";
import { EASE } from "@/lib/motion";

/** Final closing — energetic Ganpati Bappa Morya with 3D murti. */
export function BlessingsSection() {
  const { language } = useLanguage();
  const { blessing, blessingMeaning, ui } = invitationConfig;

  return (
    <AnimatedSection id="blessings" className="relative px-4 py-20 sm:px-6 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.1)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-2xl text-center">
        <motion.div
          className="mb-10 flex justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE.smooth }}
        >
          <Ganpati3DParallax size="sm" />
        </motion.div>

        <motion.h2
          className="font-display mb-8 text-2xl text-festive-yellow md:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE.smooth }}
        >
          {ui.blessings[language]}
        </motion.h2>

        <blockquote className="font-devanagari mb-6 text-lg leading-relaxed text-cream md:text-xl">
          &ldquo;{blessing[language]}&rdquo;
        </blockquote>

        <p className="mb-12 text-sm text-cream-muted italic">{blessingMeaning[language]}</p>

        <motion.p
          className="font-display text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-celebration-rose md:text-4xl"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE.smooth }}
        >
          Ganpati Bappa Morya! 🎉
        </motion.p>
      </div>
    </AnimatedSection>
  );
}
