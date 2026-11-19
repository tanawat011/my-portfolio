"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { startMotion } from "./motion/run";

/**
 * Page-wide behaviours. The scroll effects (components/motion: X1, the six Studio effects, of which effect 1 replaces
 * the old .rv fade-up) start on every page. The bar turns to glass on scroll; loops rest off screen. Cards: a .hov
 * card's light edge turns with the pointer, on devices that hover.
 */
export function Behaviours() {
  const path = usePathname();

  useEffect(() => startMotion(), [path]);

  useEffect(() => {
    /*
     * A link to a place on this page glides there instead of jumping (owner, 19 Nov 2026, on the hero's buttons: "ปรับให้
     * เป็นการกดแล้ว scroll ลงมา ไม่ใช่แว้บมาเลย"). The nav, the scroll cue, the skip link and the terminal's links too.
     * scroll-padding-top (globals.css) keeps the place clear of the bar. The address gets its #part, as a jump would,
     * and focus moves to the place, so Tab carries on from there. Reduce motion: the plain jump.
     */
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
      const to = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!to) return;
      e.preventDefault();
      if (location.hash !== url.hash) history.pushState(history.state, "", url.hash);
      to.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (!to.hasAttribute("tabindex")) to.setAttribute("tabindex", "-1");
      to.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    /* The bar is clear over the hero and turns to glass once you scroll (the old site's navbar). */
    const nav = document.querySelector("[data-nav]");
    const onScroll = () => nav?.classList.toggle("is-scrolled", window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    /* Anything that loops (the hero's dots, the scroll cue, the live dot) rests while it is off screen. */
    const loops = [...document.querySelectorAll<HTMLElement>("[data-loop]")];
    const seen = new IntersectionObserver((es) => es.forEach((en) => en.target.classList.toggle("is-off", !en.isIntersecting)));
    loops.forEach((el) => seen.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      seen.disconnect();
    };
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
