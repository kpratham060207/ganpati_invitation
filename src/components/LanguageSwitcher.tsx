"use client";

import { LANGUAGE_LABELS, type Language } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Fixed language switcher — positioned below the navbar on all screen sizes.
 */
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const languages: Language[] = ["en", "gu", "hi"];

  return (
    <div
      className="fixed right-3 z-50 flex gap-0.5 rounded-full border border-gold/30 bg-ink-deep/80 p-1 pr-safe shadow-lg backdrop-blur-md sm:right-4 md:top-20"
      style={{ top: "max(4.25rem, calc(env(safe-area-inset-top, 0px) + 3.75rem))" }}
      role="group"
      aria-label="Choose language"
    >
      {languages.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={`rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide transition-all md:px-3 md:py-1.5 md:text-xs ${
            language === lang
              ? "bg-gold text-ink-deep shadow-sm"
              : "text-cream-muted hover:bg-gold/15 hover:text-cream"
          }`}
          aria-pressed={language === lang}
        >
          {LANGUAGE_LABELS[lang]}
        </button>
      ))}
    </div>
  );
}
