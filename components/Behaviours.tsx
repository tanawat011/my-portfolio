"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Two small page-wide behaviours. Reveals: a .rv block rises 22 px once, the first time it scrolls into view (CSS only
 * arms it when the head script ran, and Reduce motion skips it). Cards: a .hov card's light edge turns with the pointer,
 * on devices that hover.
 */
export function Behaviours() {
  const path = usePathname();

  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>(".rv:not(.is-in)")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          reveal.unobserve(en.target);
        }
      }),
      { rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => reveal.observe(el));
    return () => reveal.disconnect();
  }, [path]);

  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(".hov") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty("--mx", `${x.toFixed(0)}px`);
      card.style.setProperty("--my", `${y.toFixed(0)}px`);
      card.style.setProperty("--ma", `${((Math.atan2(y - r.height / 2, x - r.width / 2) * 180) / Math.PI + 90).toFixed(0)}deg`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
