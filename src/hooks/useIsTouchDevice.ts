"use client";

import { useEffect, useState } from "react";

/** True on phones/tablets — disables cursor effects and magnetic buttons. */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);
  }, []);

  return isTouch;
}
