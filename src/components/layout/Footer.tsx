"use client";

import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";

/** Minimal footer — family name and closing line. */
export function Footer() {
  const { language } = useLanguage();
  const { familyName } = invitationConfig;

  return (
    <footer className="border-t border-gold/10 px-6 py-10 text-center">
      <p className="font-display text-sm tracking-widest text-gold/70">
        {familyName[language]}
      </p>
      <p className="mt-2 text-xs text-cream-muted">
        ॥ Ganpati Bappa Morya ॥
      </p>
    </footer>
  );
}
