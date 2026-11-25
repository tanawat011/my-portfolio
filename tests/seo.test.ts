// Run: bun test. The SEO pass and the privacy page of 25 Nov 2026: only true things, every page its own words.
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pageMeta, personLd, PRIVACY_DESC } from "../lib/meta";

const root = join(import.meta.dir, "..");

test("the Person data says only what the site shows: no address, phone, employer, rating or price", () => {
  for (const lang of ["en", "th"] as const) {
    const ld = personLd(lang);
    expect(ld["@type"]).toBe("Person");
    expect(ld.url).toBe(lang === "en" ? "https://tanawat.dev" : "https://tanawat.dev/th");
    expect(JSON.stringify(ld)).not.toMatch(/address|telephone|worksFor|rating|review|offers|price/i);
  }
  for (const p of ["app/(en)/page.tsx", "app/(th)/th/page.tsx"]) expect(readFileSync(join(root, p), "utf8")).toContain("personLd(");
});

test("the privacy page has its own description in both languages, not the home page's", () => {
  for (const lang of ["en", "th"] as const) {
    expect(pageMeta(lang, "/privacy", "Privacy", PRIVACY_DESC[lang]).description).not.toBe(pageMeta(lang, "/").description);
  }
});

test("the privacy page keeps its parts in both languages: rights, the PDPC, an effective date", () => {
  const src = readFileSync(join(root, "components/Privacy.tsx"), "utf8");
  for (const s of ["7. Changes", "7. การเปลี่ยนแปลง", "pdpc.or.th", "within 30 days", "ภายใน 30 วัน", "Effective "]) expect(src).toContain(s);
});
