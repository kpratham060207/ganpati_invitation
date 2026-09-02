"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * Wraps content with the correct script font — Gujarati or Devanagari — based on language.
 */
export function LocalizedText({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  const fontClass =
    language === "gu"
      ? "font-gujarati"
      : language === "hi"
        ? "font-devanagari"
        : "font-body";

  return <span className={fontClass}>{children}</span>;
}

/** Returns CSS class string for the active language's script font. */
export function useLocalizedFontClass() {
  const { language } = useLanguage();
  if (language === "gu") return "font-gujarati";
  if (language === "hi") return "font-devanagari";
  return "font-body";
}
