"use client";

import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { RevealText } from "@/components/motion/RevealText";
import { staggerContainer, staggerItem } from "@/lib/motion";

/**
 * Heartfelt family message — warm personal invitation copy.
 * Swap the placeholder portrait with /public/family.jpg when ready.
 */
export function FamilySection() {
  const { language } = useLanguage();
  const { familyName, welcomeMessage, ui } = invitationConfig;

  return (
    <AnimatedSection id="message" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <RevealText as="h2" className="font-display mb-4 text-2xl text-gold md:text-3xl">
          {ui.familyIntro[language]}
        </RevealText>

        <div className="section-ornament mx-auto mb-12" />

        <motion.div
          className="flex flex-col items-center gap-8 md:flex-row md:text-left"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Family portrait placeholder */}
          <motion.div
            variants={staggerItem}
            className="group relative shrink-0"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold/30 to-transparent opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border border-gold/25 bg-ink-card shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <span className="text-5xl opacity-80" role="img" aria-hidden>
                🙏
              </span>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="flex-1">
            <h3 className="font-display mb-4 text-2xl text-cream">{familyName[language]}</h3>
            <p className="font-body text-base leading-relaxed text-cream/80 md:text-lg">
              {welcomeMessage[language]}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
