import type { Metadata, Viewport } from "next";
import { href, NAME, SITE_URL, type Lang } from "@/content/site";

export const viewport: Viewport = { themeColor: "#0b0c0f", colorScheme: "dark light", width: "device-width", initialScale: 1 };

const DESC: Record<Lang, string> = {
  en: "Fullstack developer in Thailand. Web apps for teams since 2017; in 2026, the VTX family: eleven desktop apps in Rust + Tauri, built solo.",
  th: "Fullstack developer ในประเทศไทย ทำเว็บแอปให้ทีมมาตั้งแต่ 2017 ปี 2026 ทำครอบครัว VTX: แอป desktop 11 ตัวด้วย Rust + Tauri คนเดียว",
};
const OG = { url: "/images/og-image.png", width: 1200, height: 630, alt: `${NAME}, fullstack developer` };

/** For both root layouts: the base the page metadata fills in. */
export function rootMeta(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${NAME} · Fullstack developer`, template: `%s · ${NAME}` },
    description: DESC[lang],
    authors: [{ name: NAME, url: SITE_URL }],
    creator: NAME,
    robots: { index: true, follow: true },
  };
}

/** One page's metadata: its title, both languages, and the share card. */
export function pageMeta(lang: Lang, path: string, title?: string, description?: string): Metadata {
  const full = title ? `${title} · ${NAME}` : `${NAME} · Fullstack developer`;
  const desc = description ?? DESC[lang];
  return {
    title: title ?? { absolute: full },
    description: desc,
    alternates: { canonical: href(lang, path), languages: { en: href("en", path), th: href("th", path), "x-default": href("en", path) } },
    openGraph: { type: "website", url: href(lang, path), siteName: NAME, title: full, description: desc, locale: lang === "th" ? "th_TH" : "en_US", images: [OG] },
    twitter: { card: "summary_large_image", title: full, description: desc, images: [OG.url] },
  };
}
