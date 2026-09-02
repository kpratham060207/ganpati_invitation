"use client";

import { createContext, useContext } from "react";
import type { PortalEntranceProgress } from "@/lib/portal-entrance";

export const PortalEntranceContext = createContext<
  React.MutableRefObject<PortalEntranceProgress> | null
>(null);

/** Read GSAP-driven progress inside R3F useFrame — avoids per-frame React updates. */
export function usePortalEntranceProgress() {
  const ctx = useContext(PortalEntranceContext);
  if (!ctx) {
    throw new Error("usePortalEntranceProgress must be used within PortalEntranceContext");
  }
  return ctx;
}
