import { motionHeadScript } from "./motion/config";

export const THEME_KEY = "tanawat-theme";

export type Theme = "dark" | "light";

/** 4A (owner, 19 Nov 2026): graphite night by default, with a switch in the header. */
export const DEFAULT_THEME: Theme = "dark";

export function readTheme(stored: string | null | undefined): Theme {
  return stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
}

export function nextTheme(now: string | null | undefined): Theme {
  return readTheme(now) === "dark" ? "light" : "dark";
}

/** The browser bar's colour per theme (the page ground). */
export const THEME_COLOR: Record<Theme, string> = { dark: "#0b0c0f", light: "#f5f6f8" };

/**
 * Runs in <head> before the first paint, so a light page never flashes dark. Always sets data-theme and the "js"
 * class, then puts the scroll effects that apply on <html> (components/motion/config.ts), so their layout is there
 * from the first frame.
 */
export const themeScript = `(function(){var d=document.documentElement,t="${DEFAULT_THEME}";try{var s=localStorage.getItem("${THEME_KEY}");if(s==="light"||s==="dark")t=s}catch(e){}d.dataset.theme=t;d.classList.add("js");${motionHeadScript}})()`;
