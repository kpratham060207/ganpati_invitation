"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { RevealText } from "@/components/motion/RevealText";

/** Live countdown to Sthapana with premium card styling. */
export function CountdownSection() {
  const { language } = useLanguage();
  const { countdownTarget, ui } = invitationConfig;
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const target = new Date(countdownTarget).getTime();

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setHasStarted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [countdownTarget]);

  const units = [
    { value: timeLeft.days, label: ui.days[language] },
    { value: timeLeft.hours, label: ui.hours[language] },
    { value: timeLeft.minutes, label: ui.minutes[language] },
    { value: timeLeft.seconds, label: ui.seconds[language] },
  ];

  return (
    <AnimatedSection className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <RevealText as="p" className="mb-8 text-center font-display text-lg text-gold">
          {ui.countdownLabel[language]}
        </RevealText>

        <div className="glass-card rounded-2xl p-8 text-center shadow-xl">
          {hasStarted ? (
            <p className="font-display text-3xl text-cream">Ganpati Bappa Morya 🙏</p>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {units.map(({ value, label }) => (
                <motion.div
                  key={label}
                  className="rounded-xl border border-gold/15 bg-ink-deep/50 py-5"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-display text-2xl text-gold md:text-4xl tabular-nums">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[10px] tracking-wider text-cream-muted uppercase">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
