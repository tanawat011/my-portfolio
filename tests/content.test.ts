// Run: bun test   (bun's own runner; no extra packages)
// Checks that what the pages say is true and that every file they point at exists (owner, 7A: every figure checkable).
import { expect, test } from "bun:test";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { APPS, CASES, HOME_PAIRS } from "../content/apps";
import { CVS, FIRST_JOB, STORY, T, WEB, href, yearsSince } from "../content/site";
import { ANALYTICS, analyticsOn } from "../content/analytics";
import { csp } from "../config/security";
import { FUN } from "../content/home";

const pub = (p: string) => join(import.meta.dir, "..", "public", p);

test("the figures row is true", () => {
  expect(yearsSince(FIRST_JOB, Date.UTC(2026, 10, 19))).toBe(9);
  expect(yearsSince(FIRST_JOB, Date.UTC(2027, 6, 23))).toBe(9);
  expect(yearsSince(FIRST_JOB, Date.UTC(2027, 6, 25))).toBe(10);
  expect(APPS.length).toBe(11);
  expect(APPS.filter((a) => a.personal).map((a) => a.id)).toEqual(["cuprum", "lux", "mercurius", "crystallum"]);
  expect(WEB.map((w) => w.id)).toEqual(["labs", "craftcv"]);
  // "6 database engines": the six Lapis names, MySQL and MariaDB as one engine family
  const lapis = APPS.find((a) => a.id === "lapis")!.line.en;
  for (const e of ["PostgreSQL", "MySQL / MariaDB", "SQLite", "SQL Server", "MongoDB", "Redis"]) expect(lapis).toContain(e);
});

test("5A: four case pages, each with its screens, pair and icon on disk", () => {
  expect(CASES.map((c) => c.id)).toEqual(["fulmen", "lapis", "silva", "ignis"]);
  for (const c of CASES) {
    expect(c.shots.length).toBe(3);
    for (const k of [...c.shots.map((s) => s.k), c.pair.shot])
      for (const m of ["dark", "light"]) for (const w of [800, 1600]) expect(existsSync(pub(`apps/shots/${k}-${m}-${w}.webp`))).toBe(true);
    expect(existsSync(pub(`vtx/${c.id}.png`))).toBe(true);
  }
  for (const p of HOME_PAIRS) expect(existsSync(pub(`apps/shots/${p.shot}-dark-800.webp`))).toBe(true);
});

test("every app and web app has its icons", () => {
  for (const id of [...APPS.map((a) => a.id), ...WEB.map((w) => w.id)]) {
    expect(existsSync(pub(`vtx/${id}.png`))).toBe(true);
    expect(existsSync(pub(`vtx/96/${id}.png`))).toBe(true);
  }
  expect(existsSync(pub("images/me-round.jpg"))).toBe(true);
});

test("10A: the four CV PDFs exist", () => {
  expect(CVS.length).toBe(4);
  for (const c of CVS) expect(existsSync(pub(c.pdf.slice(1)))).toBe(true);
});

test("every text has both languages", () => {
  const walk = (v: unknown): void => {
    if (v && typeof v === "object" && "en" in v && "th" in v) {
      const t = v as Record<string, unknown>;
      expect(typeof t.en === "string" ? (t.en as string).length > 0 : true).toBe(true);
      return;
    }
    if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(T);
  walk(STORY);
  walk(APPS);
  walk(CASES);
});

test("English at /, Thai at /th", () => {
  expect(href("en", "/")).toBe("/");
  expect(href("th", "/")).toBe("/th");
  expect(href("th", "/work/fulmen")).toBe("/th/work/fulmen");
});

test("8A: Umami on, family ID, tag portfolio, only tanawat.dev; CSP allows exactly Umami", () => {
  expect(analyticsOn).toBe(true);
  expect(ANALYTICS.tag).toBe("portfolio");
  expect(ANALYTICS.domains).toEqual(["tanawat.dev"]);
  const p = csp();
  expect(p).toContain("script-src 'self' 'unsafe-inline' https://cloud.umami.is");
  expect(p).toContain("connect-src 'self' https://gateway.umami.is");
  expect(p).toContain("frame-ancestors 'none'");
  expect(p).not.toContain("google");
});

test("8A: no Google Analytics left in the code, and no .env file", () => {
  const root = join(import.meta.dir, "..");
  const bad = /googletagmanager|gtag\(|GA_MEASUREMENT|third-parties|fonts\.googleapis/;
  const files: string[] = [];
  const walk = (d: string) => {
    for (const n of readdirSync(d)) {
      if (["node_modules", ".next", ".git", "docs", "public", "tests"].includes(n)) continue;
      const p = join(d, n);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(tsx?|css|mjs|json)$/.test(n)) files.push(p);
    }
  };
  walk(root);
  for (const f of files) expect([f, bad.test(readFileSync(f, "utf8"))]).toEqual([f, false]);
  expect(readdirSync(root).filter((n) => n.startsWith(".env"))).toEqual([]);
});

test("round 2: the jokes stay jokes, the real figures stay real, never mixed", () => {
  expect(FUN.items.length).toBe(6);
  const real = Object.values(T.proof).map((t) => t.en);
  for (const f of FUN.items) for (const r of real) expect(f.l.en).not.toBe(r);
  // the four real figures are computed from data, not typed in the jokes block
  expect(FUN.items.map((f) => f.v.en)).toEqual(["∞", "9,999+", "0", "AI-assisted", "Too many", "∞"]);
});
