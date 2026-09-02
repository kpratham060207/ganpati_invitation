/** Supported display languages for the invitation copy. */
export type Language = "en" | "gu" | "hi";

/** Human-readable labels shown on the language switcher buttons. */
export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  gu: "ગુજરાતી",
  hi: "हिन्दी",
};

/** Localized string bundle — every user-facing line exists in all three languages. */
export type LocalizedText = Record<Language, string>;
