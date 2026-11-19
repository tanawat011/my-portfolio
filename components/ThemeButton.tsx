"use client";

import { useEffect } from "react";
import { nextTheme, readTheme, THEME_COLOR, THEME_KEY, type Theme } from "./theme-key";

function paintBar(theme: Theme) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
}

/** Night ⇄ day. The choice is kept on this device only (localStorage), never sent anywhere. */
export function flipTheme(root: HTMLElement = document.documentElement): Theme {
  const next = nextTheme(root.dataset.theme);
  root.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    /* private mode: the theme holds for this page only */
  }
  paintBar(next);
  return next;
}

/** A round icon button, or (with `text`) a labelled row for the phone menu. CSS shows the sun at night, the moon by day. */
export function ThemeButton({ label, className = "p-tg", text }: { label: string; className?: string; text?: string }) {
  useEffect(() => paintBar(readTheme(document.documentElement.dataset.theme)), []);
  return (
    <button type="button" className={className} onClick={() => flipTheme()} aria-label={text ? undefined : label} title={label}>
      <svg className="i-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
      <svg className="i-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
      </svg>
      {text && <span>{text}</span>}
    </button>
  );
}
