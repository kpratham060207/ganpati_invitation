"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { LanguageProvider } from "@/context/LanguageContext";
import { useLocalizedFontClass } from "@/components/LocalizedText";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { AmbientBackground } from "@/components/ambient/AmbientBackground";
import { FloatingParticles } from "@/components/ambient/FloatingParticles";
import { HomeDecor } from "@/components/ambient/HomeDecor";
import { GanpatiPortalIntro } from "@/components/portal/GanpatiPortalIntro";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MusicToggle } from "@/components/MusicToggle";
import { HeroSection } from "@/components/HeroSection";
import { FamilySection } from "@/components/FamilySection";
import { EventDetailsSection } from "@/components/EventDetailsSection";
import { CountdownSection } from "@/components/CountdownSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { GallerySection } from "@/components/GallerySection";
import { VenueSection } from "@/components/VenueSection";
import { RSVPSection } from "@/components/RSVPSection";
import { BlessingsSection } from "@/components/BlessingsSection";
import { ContactSection } from "@/components/ContactSection";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ENTRANCE_TIMING } from "@/lib/portal-entrance";

function log(msg: string) {
  console.log(`[ENTER] ${msg}`);
}

function InvitationContent() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMain, setShowMain] = useState(false);
  const [heroEntrance, setHeroEntrance] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const fontClass = useLocalizedFontClass();
  const isTouch = useIsTouchDevice();
  const isMobile = useIsMobile();

  /**
   * Crossfade start — mount main page at opacity 0, then fade in
   * while intro layer fades out (handled inside GanpatiPortalIntro).
   */
  const handleCrossfadeStart = useCallback(() => {
    setShowMain(true);
    requestAnimationFrame(() => {
      if (!mainRef.current) return;
      gsap.fromTo(
        mainRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: ENTRANCE_TIMING.crossfadeDuration,
          ease: "power2.inOut",
          onComplete: () => log("next page reveal"),
        },
      );
    });
  }, []);

  /** Entire entrance sequence finished — remove intro layer */
  const handlePortalComplete = useCallback(() => {
    setShowIntro(false);
    setHeroEntrance(true);
  }, []);

  return (
    <>
      {showIntro && (
        <GanpatiPortalIntro
          onCrossfadeStart={handleCrossfadeStart}
          onComplete={handlePortalComplete}
        />
      )}

      {showMain && (
        <div
          ref={mainRef}
          className={`${isTouch ? "" : "custom-cursor-active"} relative z-[50] min-h-screen`}
          style={{ opacity: 0 }}
        >
          <SmoothScroll>
            {!isTouch && <CustomCursor />}
            <AmbientBackground />
            {!isMobile && <FloatingParticles />}
            <Navbar />
            <LanguageSwitcher />
            <MusicToggle />

            <main className={`relative z-10 ${fontClass}`}>
              <HomeDecor />
              <HeroSection playEntrance={heroEntrance} />
              <FamilySection />
              <EventDetailsSection />
              <CountdownSection />
              <ScheduleSection />
              <GallerySection />
              <VenueSection />
              <RSVPSection />
              <BlessingsSection />
              <ContactSection />
              <Footer />
            </main>
          </SmoothScroll>
        </div>
      )}
    </>
  );
}

export function InvitationPage() {
  return (
    <LanguageProvider>
      <InvitationContent />
    </LanguageProvider>
  );
}
