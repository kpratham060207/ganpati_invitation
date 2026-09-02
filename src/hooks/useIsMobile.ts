"use client";

import { useEffect, useState } from "react";

/** Matches Tailwind `md` breakpoint — primary mobile cutoff for this invite site. */
const MOBILE_QUERY = "(max-width: 767px)";

/**
 * True on phone-sized viewports (≤767px).
 * Used for lighter gate animation and tighter mobile timings.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}
