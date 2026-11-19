"use client";

import { useEffect } from "react";
import { startAnalytics, track } from "@/vendor/vtx-kit/analytics";
import { ANALYTICS, analyticsOn } from "@/content/analytics";

/**
 * Umami's tracker, started once (8A). Besides visits it counts one thing: a click on an element with data-count,
 * sent with that element's data-c-* words (for a CV: style and length). Values pass the kit's safeData.
 */
export function AnalyticsRoot() {
  useEffect(() => {
    if (!analyticsOn) return;
    startAnalytics(ANALYTICS);
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-count]") as HTMLElement | null;
      if (!el?.dataset.count) return;
      const data: Record<string, string> = {};
      for (const [k, v] of Object.entries(el.dataset)) if (k.startsWith("c") && k !== "count" && v) data[k.slice(1).toLowerCase()] = v;
      track(el.dataset.count, data);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
