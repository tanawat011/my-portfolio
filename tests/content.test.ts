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

test("round 3a: the resume cards' facts and previews come from the PDFs as they are now", async () => {
  const meta = (await import("../content/cvs.json")).default as Record<string, { pdf: string; pages: number; bytes: number; sha256: string; thumb: string }>;
  const { createHash } = await import("node:crypto");
  expect(Object.keys(meta).sort()).toEqual(["Minimal-full", "Minimal-short", "Modern-full", "Modern-short"]);
  for (const m of Object.values(meta)) {
    const data = readFileSync(pub(m.pdf.slice(1)));
    expect([m.pdf, createHash("sha256").update(data).digest("hex")]).toEqual([m.pdf, m.sha256]); // re-run scripts/cv-meta.py
    expect(m.bytes).toBe(data.length);
    expect(existsSync(pub(m.thumb.slice(1)))).toBe(true);
    expect(m.pages).toBeGreaterThan(0);
  }
});

test("round 3a: the skills he asked for", async () => {
  const { WEAPONS } = await import("../content/home");
  const all = JSON.stringify(WEAPONS);
  expect(all).not.toContain("OpenClaw");
  for (const s of ["Java", "Kotlin", "VS Code", "IntelliJ IDEA"]) expect(all).toContain(s);
});

test("a reveal (.rv) element never gets a className that React changes later", () => {
  // The scroll effects (components/motion/run.ts) add classes to .rv boxes by hand while they come in; if React
  // rewrote that className (a state toggle), they'd be lost mid-entrance. Toggle state with a data attribute instead.
  const dir = join(import.meta.dir, "..", "components");
  for (const f of readdirSync(dir).filter((n) => n.endsWith(".tsx"))) {
    const dynamicRv = [...readFileSync(join(dir, f), "utf8").matchAll(/className=\{`([^`]*)`\}/g)].filter((m) => /(^|\s)rv(\s|$|\$)/.test(m[1]) && /\$\{[^}]*\?/.test(m[1]));
    expect([f, dynamicRv.map((m) => m[1])]).toEqual([f, []]);
  }
});

test("round 3b: the AI card lists only what he really uses, with no Models label", async () => {
  const { WEAPONS } = await import("../content/home");
  const ai = WEAPONS[0];
  expect(ai.items.map((i) => i.v)).toEqual(["Claude Code, Copilot, Gemini, GPT"]);
  expect(JSON.stringify(WEAPONS)).not.toContain("Models");
  expect(JSON.stringify(ai)).not.toMatch(/Cursor|Antigravity|OpenClaw/);
  // and, his answer: "เอาออกด้วย": no Cursor or Antigravity anywhere, Dev Tools included
  const dev = WEAPONS.flatMap((w) => w.items).find((i) => i.k.en === "Dev Tools")!;
  expect(dev.v).toBe("VS Code, IntelliJ IDEA, Xcode");
  const dir = join(import.meta.dir, "..", "content");
  for (const f of readdirSync(dir)) expect([f, /\b(Cursor|Antigravity)\b/.test(readFileSync(join(dir, f), "utf8"))]).toEqual([f, false]);
});

test("round 3b: the true facts are measured, apart from the jokes, and publish only the aggregate", async () => {
  const { TRUE_FACTS } = await import("../content/home");
  const night = (await import("../content/night-commits.json")).default;
  expect(Object.keys(night).sort()).toEqual(["asOf", "commits", "pct", "window"]);
  expect(night.pct).toBeGreaterThan(0);
  expect(night.pct).toBeLessThan(100);
  expect(night.asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(night.window).toBe("00:00-05:59");
  // the app count and the night share are computed on the page, never typed into the copy
  expect("v" in TRUE_FACTS.elements).toBe(false);
  expect("v" in TRUE_FACTS.night).toBe(false);
  expect(TRUE_FACTS.build.d.en).toContain("Measured once");
  const jokes = FUN.items.map((f) => f.l.en);
  for (const f of [TRUE_FACTS.build, TRUE_FACTS.white, TRUE_FACTS.elements, TRUE_FACTS.night]) expect(jokes).not.toContain(f.l.en);
});

test("round 3b: Now shipping reads labs.json and never guesses", async () => {
  const { parseLabs, newest } = await import("../lib/releases");
  const ok = { schema: 1, app: "lapis", version: "0.4.0", date: "2026-11-19", preview: true };
  expect(parseLabs(ok, "lapis")).toEqual({ id: "lapis", version: "0.4.0", date: "2026-11-19", preview: true });
  expect(parseLabs(ok, "fulmen")).toBeNull();
  expect(parseLabs({ ...ok, schema: 2 }, "lapis")).toBeNull();
  expect(parseLabs({ ...ok, version: "latest" }, "lapis")).toBeNull();
  expect(parseLabs({ ...ok, date: "19 Nov" }, "lapis")).toBeNull();
  expect(newest([])).toBeNull();
  const a = { id: "lapis", version: "0.4.0", date: "2026-11-19", preview: true };
  const b = { id: "fulmen", version: "0.58.0", date: "2026-11-19", preview: true };
  const c = { id: "silva", version: "1.0.0", date: "2026-11-02", preview: false };
  expect(newest([c, a, b])).toEqual([a, b]);
});

test("round 3b: the share images and icons are there, at their sizes", () => {
  const png = (p: string) => {
    const b = readFileSync(join(import.meta.dir, "..", p));
    expect(b.subarray(1, 4).toString()).toBe("PNG");
    return [b.readUInt32BE(16), b.readUInt32BE(20)];
  };
  expect(png("public/images/share-en.png")).toEqual([1200, 630]);
  expect(png("public/images/share-th.png")).toEqual([1200, 630]);
  expect(png("app/icon.png")).toEqual([192, 192]);
  expect(png("app/apple-icon.png")).toEqual([180, 180]);
  expect(png("public/apple-touch-icon.png")).toEqual([180, 180]);
  const ico = readFileSync(join(import.meta.dir, "..", "app/favicon.ico"));
  expect(ico.readUInt16LE(4)).toBe(3);
  expect([0, 1, 2].map((i) => ico.readUInt8(6 + 16 * i))).toEqual([16, 32, 48]);
  expect(readFileSync(join(import.meta.dir, "..", "lib/meta.ts"), "utf8")).toContain("/images/share-${lang}.png");
});

test("round 3b: one failed release read hides the whole strip; a 404 just means no release yet", async () => {
  const { nowShipping } = await import("../lib/releases");
  const real = globalThis.fetch;
  const lapis = { schema: 1, app: "lapis", version: "0.4.0", date: "2026-11-19", preview: true };
  const answer = (status: Record<string, number>) =>
    (async (url: string) => {
      const id = String(url).match(/vtx-(\w+)-release/)![1];
      const code = status[id] ?? 404;
      return new Response(code === 200 ? JSON.stringify(lapis) : "", { status: code });
    }) as unknown as typeof fetch;
  try {
    globalThis.fetch = answer({ lapis: 200 });
    expect(await nowShipping(["lapis", "fulmen", "silva"])).toEqual([{ id: "lapis", version: "0.4.0", date: "2026-11-19", preview: true }]);
    globalThis.fetch = answer({ lapis: 200, fulmen: 503 });
    expect(await nowShipping(["lapis", "fulmen", "silva"])).toBeNull();
    globalThis.fetch = answer({});
    expect(await nowShipping(["lapis", "fulmen"])).toBeNull();
  } finally {
    globalThis.fetch = real;
  }
});

test("X1: the six effects, what turns them off, and the head script that sets them before the first paint", async () => {
  const { effectsOn, parseMotion, PIN_MEDIA } = await import("../components/motion/config");
  const { themeScript } = await import("../components/theme-key");
  expect(effectsOn("", false)).toEqual([1, 2, 3, 4, 5, 6]);
  expect(effectsOn("?motion=none", false)).toEqual([]);
  expect(effectsOn("?motion=1,5", false)).toEqual([1, 5]);
  expect(effectsOn("", true)).toEqual([]); // Reduce motion: none of it
  expect(parseMotion("banana")).toBeNull();
  // run the real head script against a pretend page
  const run = (search: string, media: Record<string, boolean>, live: boolean) => {
    const cls = new Set<string>();
    let later: (() => void) | null = null;
    const html = { dataset: {} as Record<string, string>, classList: { add: (c: string) => cls.add(c), remove: (c: string) => cls.delete(c) } };
    const win = { matchMedia: (q: string) => ({ matches: !!media[q] }), __mpLive: false };
    new Function("document", "localStorage", "location", "window", "matchMedia", "setTimeout", themeScript)(
      { documentElement: html },
      { getItem: () => null },
      { search },
      win,
      win.matchMedia,
      (f: () => void) => (later = f),
    );
    const first = [...cls].sort();
    win.__mpLive = live;
    (later as (() => void) | null)?.();
    return { first, after: [...cls].sort(), theme: html.dataset.theme };
  };
  const desk = run("", { [PIN_MEDIA]: true }, true);
  expect(desk.first).toEqual(["js", "mp-1", "mp-2", "mp-3", "mp-4", "mp-5", "mp-6", "mp-pin"]);
  expect(desk.after).toEqual(desk.first);
  expect(desk.theme).toBe("dark");
  expect(run("", {}, true).first).not.toContain("mp-pin"); // phones and tablets: no pinned story
  expect(run("", { "(prefers-reduced-motion: reduce)": true }, true).first).toEqual(["js"]);
  expect(run("?motion=none", {}, true).first).toEqual(["js"]);
  // the runtime never started (its script failed): the classes go again, so nothing waits on it
  expect(run("", { [PIN_MEDIA]: true }, false).after).toEqual(["js"]);
});

test("X1: the numbers behind the effects", async () => {
  const { countAt, pinnedState, splitWords, staggerDelays, trackProgress } = await import("../components/motion/math");
  expect(countAt(11, 0, 1100)).toBe(0);
  expect(countAt(11, 1100, 1100)).toBe(11);
  expect(countAt(9, 5000, 1100)).toBe(9);
  expect(staggerDelays(8, 70)).toEqual([0, 70, 140, 210, 280, 350, 420, 420]);
  expect(splitWords("Resume ของผม")).toEqual(["Resume", " ", "ของผม"]);
  expect(splitWords("ครอบครัวVTX")).toEqual(["ครอบครัวVTX"]);
  const start = pinnedState(0, 4), end = pinnedState(1, 4);
  expect([start.s, start.on, start.cards[0].opacity, start.cards[1].opacity]).toEqual([0, 0, 1, 0]);
  expect([end.s, end.on, end.cards[3].opacity]).toEqual([3, 3, 1]);
  expect(trackProgress(96, 2000, 96, 700)).toBe(0);
  expect(trackProgress(96 - 1300, 2000, 96, 700)).toBe(1);
});

test("X1: count-up runs on the four real figures only, never on the Fun Facts", () => {
  const src = readFileSync(join(import.meta.dir, "..", "components/motion/run.ts"), "utf8");
  const sel = src.match(/querySelectorAll<HTMLElement>\("([^"]+)"\)\]\.filter\(\(b\) => \/\^\\d\+\$\//)![1];
  expect(sel).toBe("main .p-proof b");
  expect(src.slice(src.indexOf("function counts()"))).not.toMatch(/o-fun|o-true/);
});
