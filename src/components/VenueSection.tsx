"use client";

import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { RevealText } from "@/components/motion/RevealText";
import { AnimatedButton } from "@/components/motion/AnimatedButton";
import { ParallaxElement } from "@/components/motion/ParallaxElement";

/** Location section with map embed area and Get Directions CTA. */
export function VenueSection() {
  const { language } = useLanguage();
  const { address, googleMapsUrl, ui } = invitationConfig;

  return (
    <AnimatedSection id="location" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <RevealText as="h2" className="font-display mb-4 text-center text-2xl text-gold md:text-3xl">
          {ui.venue[language]}
        </RevealText>
        <div className="section-ornament mx-auto mb-14" />

        <ParallaxElement speed={0.06}>
          <motion.div
            className="glass-card overflow-hidden rounded-2xl shadow-xl"
            whileHover={{ boxShadow: "0 16px 48px rgba(196,165,116,0.08)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Map placeholder — replace iframe src with your embed URL */}
            <div className="relative aspect-[16/9] bg-ink-surface">
              <iframe
                title="Event location map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address.en)}&output=embed`}
                className="absolute inset-0 h-full w-full border-0 opacity-80 grayscale-[30%] contrast-[1.1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-card/80 via-transparent to-transparent" />
            </div>

            <div className="p-8 text-center">
              <p className="mb-6 text-sm leading-relaxed text-cream/85">{address[language]}</p>
              <AnimatedButton href={googleMapsUrl} variant="primary">
                {ui.getDirections[language]} ↗
              </AnimatedButton>
            </div>
          </motion.div>
        </ParallaxElement>
      </div>
    </AnimatedSection>
  );
}
