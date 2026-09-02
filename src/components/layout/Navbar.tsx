"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageContext";
import { invitationConfig } from "@/config/invitation";

const navLinks = [
  { id: "hero", key: "hero" as const },
  { id: "message", key: "message" as const },
  { id: "details", key: "details" as const },
  { id: "schedule", key: "schedule" as const },
  { id: "gallery", key: "gallery" as const },
  { id: "location", key: "location" as const },
  { id: "rsvp", key: "rsvp" as const },
];

/**
 * Sticky transparent navbar — gains backdrop blur after scrolling.
 * Mobile hamburger with smooth drawer entrance.
 */
export function Navbar() {
  const { language } = useLanguage();
  const { ui } = invitationConfig;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const labels = {
    hero: { en: "Home", gu: "હોમ", hi: "होम" },
    message: ui.familyIntro,
    details: { en: "Details", gu: "વિગતો", hi: "विवरण" },
    schedule: ui.schedule,
    gallery: ui.gallery,
    location: ui.venue,
    rsvp: ui.rsvp,
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 pt-safe transition-all duration-350 ${
          scrolled
            ? "border-b border-gold/15 bg-ink-deep/90 py-3 backdrop-blur-md shadow-lg"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
          <a
            href="#hero"
            className="font-display text-sm tracking-[0.25em] text-gold-light uppercase"
          >
            Ganpati
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
            {navLinks.map(({ id, key }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group relative text-xs tracking-wider text-cream/70 transition hover:text-gold"
              >
                {labels[key][language]}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-px w-5 bg-gold transition-transform duration-300 ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-gold transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-gold transition-transform duration-300 ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink-deep/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE.smooth }}
          >
            <nav
              className="flex h-full flex-col items-center justify-center gap-8"
              aria-label="Mobile"
            >
              {navLinks.map(({ id, key }, index) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl text-cream/90"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: index * 0.05, duration: 0.35, ease: EASE.out }}
                >
                  {labels[key][language]}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
