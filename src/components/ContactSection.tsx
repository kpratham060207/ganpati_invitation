"use client";

import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { RevealText } from "@/components/motion/RevealText";
import { AnimatedButton } from "@/components/motion/AnimatedButton";

/** Host contact — call, WhatsApp, and share invitation link. */
export function ContactSection() {
  const { language } = useLanguage();
  const { contactPhone, contactPhoneDisplay, whatsappNumber, familyName, ui } =
    invitationConfig;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Namaste! I received your Ganpati invitation.",
  )}`;

  const handleShare = async () => {
    const shareData = {
      title: invitationConfig.meta.title,
      text: invitationConfig.meta.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* guest cancelled */
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <AnimatedSection id="contact" className="px-6 py-16 pb-8">
      <div className="mx-auto max-w-2xl">
        <div className="glass-card rounded-2xl p-8 text-center">
          <RevealText as="h2" className="font-display mb-2 text-2xl text-gold">
            {ui.contact[language]}
          </RevealText>
          <p className="mb-8 text-sm text-cream-muted">{familyName[language]}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <AnimatedButton href={`tel:${contactPhone}`} variant="outline">
              📞 {contactPhoneDisplay}
            </AnimatedButton>
            <AnimatedButton href={whatsappUrl} variant="primary">
              {ui.whatsapp[language]}
            </AnimatedButton>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="mt-6 text-xs text-gold-muted transition hover:text-gold"
          >
            {ui.share[language]}
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}
