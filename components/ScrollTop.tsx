"use client";

import { useEffect, useState } from "react";

/** The old site's round "back to top" button, shown after 400 px of scroll. Lives outside .pv so `fixed` means the window. */
export function ScrollTop({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const check = () => setOn(window.scrollY > 400);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);
  return (
    <button
      type="button"
      className={`to-top${on ? " is-on" : ""}`}
      aria-label={label}
      tabIndex={on ? 0 : -1}
      aria-hidden={!on}
      onClick={() => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
