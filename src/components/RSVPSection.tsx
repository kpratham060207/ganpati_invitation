"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { RevealText } from "@/components/motion/RevealText";
import { AnimatedButton } from "@/components/motion/AnimatedButton";
import { staggerContainer, staggerItem } from "@/lib/motion";

/**
 * RSVP form — no backend needed; submits via WhatsApp with pre-filled message.
 * Simple, mobile-friendly, and elegant.
 */
export function RSVPSection() {
  const { language } = useLanguage();
  const { whatsappNumber, familyName, ui } = invitationConfig;
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const text = [
      `🙏 Ganpati RSVP`,
      ``,
      `Name: ${name}`,
      `Guests: ${guests}`,
      message ? `Message: ${message}` : "",
      ``,
      `— Sent via invitation website`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

  const inputClass =
    "w-full rounded-xl border border-gold/15 bg-ink-deep/60 px-4 py-3 text-sm text-cream placeholder:text-cream-muted/50 transition focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/30";

  return (
    <AnimatedSection id="rsvp" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-lg">
        <RevealText as="h2" className="font-display mb-2 text-center text-2xl text-gold md:text-3xl">
          {ui.rsvpTitle[language]}
        </RevealText>
        <RevealText className="mb-10 text-center text-sm text-cream-muted">
          {ui.rsvpSubtitle[language]}
        </RevealText>

        <motion.form
          onSubmit={handleSubmit}
          className="glass-card space-y-5 rounded-2xl p-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={staggerItem}>
            <label htmlFor="rsvp-name" className="mb-2 block text-xs tracking-wider text-gold-muted uppercase">
              {ui.rsvpName[language]}
            </label>
            <input
              id="rsvp-name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
              autoComplete="name"
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <label htmlFor="rsvp-guests" className="mb-2 block text-xs tracking-wider text-gold-muted uppercase">
              {ui.rsvpGuests[language]}
            </label>
            <select
              id="rsvp-guests"
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
              className={inputClass}
            >
              {["1", "2", "3", "4", "5", "6+"].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={staggerItem}>
            <label htmlFor="rsvp-message" className="mb-2 block text-xs tracking-wider text-gold-muted uppercase">
              {ui.rsvpMessage[language]}
            </label>
            <textarea
              id="rsvp-message"
              rows={3}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={`${inputClass} resize-none`}
            />
          </motion.div>

          <motion.div variants={staggerItem} className="pt-2">
            <AnimatedButton type="submit" variant="primary" className="w-full">
              {ui.rsvpSubmit[language]}
            </AnimatedButton>
          </motion.div>

          {submitted && (
            <motion.p
              className="text-center text-xs text-gold-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {familyName[language]} — thank you! 🙏
            </motion.p>
          )}
        </motion.form>
      </div>
    </AnimatedSection>
  );
}
