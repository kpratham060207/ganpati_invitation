"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";

type LightboxProps = {
  images: { src: string; alt: string }[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/** Full-screen image lightbox with keyboard navigation. */
export function Lightbox({ images, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = activeIndex !== null;
  const current = activeIndex !== null ? images[activeIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && activeIndex !== null) {
        onNavigate((activeIndex + 1) % images.length);
      }
      if (event.key === "ArrowLeft" && activeIndex !== null) {
        onNavigate((activeIndex - 1 + images.length) % images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, activeIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-ink-deep/95 p-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE.smooth }}
          onClick={onClose}
          role="dialog"
          aria-modal
          aria-label="Image gallery lightbox"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10"
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  if (activeIndex !== null) onNavigate((activeIndex - 1 + images.length) % images.length);
                }}
                className="absolute left-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold md:flex"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  if (activeIndex !== null) onNavigate((activeIndex + 1) % images.length);
                }}
                className="absolute right-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold md:flex"
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}

          <motion.div
            className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl border border-gold/20 shadow-2xl"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE.smooth }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} alt={current.alt} className="max-h-[85vh] w-full object-contain" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
