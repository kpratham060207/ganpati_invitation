"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

function InvitationContent() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMain, setShowMain] = useState(false);
  const [heroEntrance, setHeroEntrance] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const fadedInRef = useRef(false);
  const fontClass = useLocalizedFontClass();
  const isTouch = useIsTouchDevice();
  const isMobile = useIsMobile();

  /**
   * When main mounts, fade it in. Must run in useEffect (after DOM attach) —
   * never race requestAnimationFrame against a deferred setState.
   */
  useEffect(() => {
    if (!showMain || fadedInRef.current) return;
    const el = mainRef.current;
    if (!el) return;

    fadedInRef.current = true;
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: ENTRANCE_TIMING.crossfadeDuration,
        ease: "power2.inOut",
        /* Hard guarantee — never leave the page invisible */
        onComplete: () => {
          el.style.opacity = "1";
        },
      },
    );
  }, [showMain]);

  /** Begin handoff — mount main + start hero while intro still covers */
  const handleCrossfadeStart = useCallback(() => {
    setShowMain(true);
    setHeroEntrance(true);
  }, []);

  /** Intro finished — remove 3D canvas; main page must already be visible */
  const handlePortalComplete = useCallback(() => {
    /* Safety net if GSAP never attached (e.g. missed mount frame) */
    if (mainRef.current) {
      mainRef.current.style.opacity = "1";
    }
    setShowIntro(false);
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
          style={{ opacity: 0, background: "var(--ink-deep)" }}
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
