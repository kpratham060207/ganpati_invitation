"use client";

import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { RevealText } from "@/components/motion/RevealText";
import { staggerContainer, staggerItem } from "@/lib/motion";

/** Timeline of home puja events — cards stagger in on scroll. */
export function ScheduleSection() {
  const { language } = useLanguage();
  const { events, ui } = invitationConfig;

  return (
    <AnimatedSection id="schedule" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <RevealText as="h2" className="font-display mb-4 text-center text-2xl text-gold md:text-3xl">
          {ui.schedule[language]}
        </RevealText>
        <div className="section-ornament mx-auto mb-14" />

        <div className="relative">
          <div className="absolute top-4 bottom-4 left-[1.125rem] w-px bg-gradient-to-b from-gold/40 via-gold/15 to-gold/40" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {events.map((event, index) => (
              <motion.article
                key={event.id}
                variants={staggerItem}
                className="relative pl-12 pb-10 last:pb-0"
              >
                <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-ink-deep text-xs font-medium text-gold">
                  {index + 1}
                </div>

                <motion.div
                  className="glass-card rounded-2xl p-5"
                  whileHover={{ y: -3, transition: { duration: 0.22 } }}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gold/10 px-3 py-0.5 text-xs text-gold">
                      {event.date}
                    </span>
                    <span className="text-sm text-gold-light">{event.time}</span>
                  </div>
                  <h3 className="font-display mb-2 text-lg text-cream">
                    {event.title[language]}
                  </h3>
                  <p className="text-sm leading-relaxed text-cream/70">
                    {event.description[language]}
                  </p>
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
