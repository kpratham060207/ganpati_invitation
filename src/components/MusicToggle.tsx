"use client";

import { useRef, useState } from "react";
import { invitationConfig } from "@/config/invitation";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Optional ambient aarti music — never autoplays; guest must tap to enable.
 * Add your track at /public/aarti.mp3 to activate playback.
 */
export function MusicToggle() {
  const { language } = useLanguage();
  const { ui } = invitationConfig;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      /* file missing or autoplay blocked */
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Hidden audio element — src optional until user adds /public/aarti.mp3 */}
      <audio ref={audioRef} loop preload="none" src="/aarti.mp3" />

      <button
        type="button"
        onClick={toggleMusic}
        className="fixed bottom-5 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-ink-deep/85 pb-safe pl-safe text-base shadow-lg backdrop-blur-md transition active:scale-95 hover:border-gold/50 hover:bg-gold/10 sm:bottom-6 sm:left-6"
        aria-label={isPlaying ? ui.mute[language] : ui.unmute[language]}
        title={isPlaying ? ui.mute[language] : ui.unmute[language]}
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </>
  );
}
