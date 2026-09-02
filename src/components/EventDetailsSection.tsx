"use client";

import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { RevealText } from "@/components/motion/RevealText";
import { staggerContainer, staggerItem } from "@/lib/motion";

/** Elegant animated cards for date, time, and location. */
export function EventDetailsSection() {
  const { language } = useLanguage();
  const { eventDetails, address, ui } = invitationConfig;

  const cards = [
    {
      icon: "📅",
      label: { en: "Date", gu: "તારીખ", hi: "तारीख" },
      value: eventDetails.date[language],
    },
    {
      icon: "🕉",
      label: { en: "Time", gu: "સમય", hi: "समय" },
      value: eventDetails.time[language],
    },
    {
      icon: "🏠",
      label: { en: "Location", gu: "સ્થળ", hi: "स्थान" },
      value: eventDetails.locationLabel[language],
    },
  ];

  return (
    <AnimatedSection id="details" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <RevealText as="h2" className="font-display mb-4 text-center text-2xl text-gold md:text-3xl">
          {ui.eventDetails[language]}
        </RevealText>
        <div className="section-ornament mx-auto mb-14" />

        <motion.div
          className="grid gap-5 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {cards.map((card) => (
            <motion.article
              key={card.label.en}
              variants={staggerItem}
              className="glass-card group rounded-2xl p-6 text-center transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(196,165,116,0.08)]"
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
            >
              <span className="mb-4 inline-block text-2xl opacity-80" role="img" aria-hidden>
                {card.icon}
              </span>
              <p className="mb-2 text-xs tracking-[0.2em] text-gold-muted uppercase">
                {card.label[language]}
              </p>
              <p className="font-display text-base text-cream">{card.value}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          className="mt-10 text-center text-sm leading-relaxed text-cream-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {address[language]}
        </motion.p>
      </div>
    </AnimatedSection>
  );
}
