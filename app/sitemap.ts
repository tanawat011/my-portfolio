import type { MetadataRoute } from "next";
import { CASES } from "@/content/apps";
import { href, SITE_URL, type Lang } from "@/content/site";

/** Every page, in both languages (kit web-checklist § 6). */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...CASES.map((c) => `/work/${c.id}`), "/privacy"];
  const langs: Lang[] = ["en", "th"];
  return paths.flatMap((p) =>
    langs.map((l) => ({
      url: `${SITE_URL}${href(l, p) === "/" ? "" : href(l, p)}`,
      changeFrequency: p === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "/" ? 1 : p === "/privacy" ? 0.2 : 0.7,
      alternates: { languages: { en: `${SITE_URL}${href("en", p) === "/" ? "" : href("en", p)}`, th: `${SITE_URL}${href("th", p)}` } },
    })),
  );
}
