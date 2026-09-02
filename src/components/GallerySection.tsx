"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { RevealText } from "@/components/motion/RevealText";
import { Lightbox } from "@/components/ui/Lightbox";
import { staggerContainer, staggerItem } from "@/lib/motion";

/** Premium gallery with hover zoom, stagger reveal, and lightbox. */
export function GallerySection() {
  const { language } = useLanguage();
  const { gallery, ui } = invitationConfig;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <AnimatedSection id="gallery" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <RevealText as="h2" className="font-display mb-4 text-center text-2xl text-gold md:text-3xl">
          {ui.gallery[language]}
        </RevealText>
        <div className="section-ornament mx-auto mb-14" />

        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {gallery.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              variants={staggerItem}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-gold/15 bg-ink-card focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              onClick={() => setLightboxIndex(index)}
              aria-label={`View ${image.alt}`}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
            >
              <div className="absolute inset-0 z-10 bg-ink-deep/0 transition-colors duration-300 group-hover:bg-ink-deep/20" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute bottom-3 right-3 z-20 rounded-full bg-ink-deep/70 px-2 py-1 text-[10px] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                View
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <Lightbox
        images={gallery}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </AnimatedSection>
  );
}
