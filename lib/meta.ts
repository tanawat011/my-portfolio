import type { Metadata, Viewport } from "next";
import { href, LINKS, NAME, SITE_URL, type Lang } from "@/content/site";

export const viewport: Viewport = { themeColor: "#0b0c0f", colorScheme: "dark light", width: "device-width", initialScale: 1 };

const DESC: Record<Lang, string> = {
  en: "Fullstack developer in Thailand. Web apps for teams since 2017; in 2026, the VTX family: eleven desktop apps in Rust + Tauri, built solo.",
  th: "Fullstack developer ในประเทศไทย ทำเว็บแอปให้ทีมมาตั้งแต่ 2017 ปี 2026 ทำครอบครัว VTX: แอป desktop 11 ตัวด้วย Rust + Tauri คนเดียว",
};
/** The share card, drawn in G by scripts/brand-images.ts (round 3b, X6). */
const OG = (lang: Lang) => ({ url: `/images/share-${lang}.png`, width: 1200, height: 630, alt: lang === "th" ? `${NAME} fullstack developer ที่ทำเครื่องมือไว้ใช้เอง` : `${NAME}, fullstack developer. I build the tools I use.` });

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
    openGraph: { type: "website", url: href(lang, path), siteName: NAME, title: full, description: desc, locale: lang === "th" ? "th_TH" : "en_US", images: [OG(lang)] },
    twitter: { card: "summary_large_image", title: full, description: desc, images: [OG(lang).url] },
  };
}

/**
 * Who the site is about, for search engines (SEO pass, 25 Nov 2026): name, address, role, the photo the page shows, and
 * the two work profiles the footer links. Nothing else: no address, no phone, no employer, no rating.
 */
export function personLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: NAME,
    url: `${SITE_URL}${href(lang, "/") === "/" ? "" : href(lang, "/")}`,
    jobTitle: "Fullstack developer",
    description: DESC[lang],
    image: `${SITE_URL}/images/me-round.jpg`,
    sameAs: [LINKS.github, LINKS.linkedin],
  };
}

/** The privacy page's description, in each language (it fell back to the home page's, so two pages said the same). */
export const PRIVACY_DESC: Record<Lang, string> = {
  en: "What tanawat.dev keeps and who sees it: no accounts, no forms, no cookies; visits counted without cookies; your rights under Thailand's PDPA.",
  th: "tanawat.dev เก็บอะไรและใครเห็นบ้าง: ไม่มีบัญชี ไม่มีฟอร์ม ไม่ใช้ cookie นับคนเข้าโดยไม่ใช้ cookie และสิทธิ์ของคุณตาม PDPA",
};
