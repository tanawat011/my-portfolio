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
  // the third figure is Labs's tool count, for the whole family (lib/labs.ts), no longer Lapis's six engines
  expect(Object.keys(T.proof)).toEqual(["years", "apps", "tools", "webs"]);
  // "Six database engines, exactly" (What's inside): the six Lapis names, MySQL and MariaDB as one engine family
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
  const { effectsOn, parseMotion } = await import("../components/motion/config");
  const { themeScript } = await import("../components/theme-key");
  // effect 4 (the pinned story) is off here: "แม่งอารมเหมือนค้างเลื่อนไม่ไปอ่ะ"
  expect(effectsOn("", false)).toEqual([1, 2, 3, 5, 6]);
  expect(effectsOn("?motion=4", false)).toEqual([1, 2, 3, 5, 6]);
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
  const desk = run("", { "(min-width: 1100px) and (pointer: fine)": true }, true);
  expect(desk.first).toEqual(["js", "mp-1", "mp-2", "mp-3", "mp-5", "mp-6"]);
  expect(desk.after).toEqual(desk.first);
  expect(desk.theme).toBe("dark");
  expect(run("", { "(prefers-reduced-motion: reduce)": true }, true).first).toEqual(["js"]);
  expect(run("?motion=none", {}, true).first).toEqual(["js"]);
  // the runtime never started (its script failed): the classes go again, so nothing waits on it
  expect(run("", {}, false).after).toEqual(["js"]);
});

test("X1: the numbers behind the effects", async () => {
  const { countAt, splitWords, staggerDelays } = await import("../components/motion/math");
  expect(countAt(11, 0, 1100)).toBe(0);
  expect(countAt(11, 1100, 1100)).toBe(11);
  expect(countAt(9, 5000, 1100)).toBe(9);
  expect(staggerDelays(8, 70)).toEqual([0, 70, 140, 210, 280, 350, 420, 420]);
  expect(splitWords("Resume ของผม")).toEqual(["Resume", " ", "ของผม"]);
  expect(splitWords("ครอบครัวVTX")).toEqual(["ครอบครัวVTX"]);
});

test("X1: count-up runs on the four real figures only, never on the Fun Facts", () => {
  const src = readFileSync(join(import.meta.dir, "..", "components/motion/run.ts"), "utf8");
  const sel = src.match(/querySelectorAll<HTMLElement>\("([^"]+)"\)\]\.filter\(\(b\) => \/\^\\d\+\$\//)![1];
  expect(sel).toBe("main .p-proof b");
  expect(src.slice(src.indexOf("function counts()"))).not.toMatch(/o-fun|o-true/);
});

test("last notes: the third figure is VTX Labs's tool count, read from Labs, with the hand-checked count behind it", async () => {
  const { parseToolCount, labsToolCount } = await import("../lib/labs");
  const { LABS_TOOLS } = await import("../content/site");
  // what vtxlabs.app's home page says (its description and its badge), 19 Nov 2026
  expect(parseToolCount('<meta name="description" content="85 free tools that run in your browser: JSON, JWT, cURL, regex, colours, Thai text and more. No sign-up."/>')).toBe(85);
  expect(parseToolCount('<span class="g-badge">91 free tools · no sign-up · runs in your browser</span>')).toBe(91);
  expect(parseToolCount("<p>Free tools</p>")).toBeNull();
  expect(parseToolCount("0 free tools")).toBeNull();
  expect(LABS_TOOLS.n).toBe(85);
  expect(LABS_TOOLS.asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  const real = globalThis.fetch;
  try {
    globalThis.fetch = (async () => new Response("<span>92 free tools · no sign-up</span>", { status: 200 })) as unknown as typeof fetch;
    expect(await labsToolCount()).toBe(92);
    globalThis.fetch = (async () => new Response("", { status: 503 })) as unknown as typeof fetch;
    expect(await labsToolCount()).toBe(LABS_TOOLS.n);
    globalThis.fetch = (async () => new Response("<h1>Labs</h1>", { status: 200 })) as unknown as typeof fetch;
    expect(await labsToolCount()).toBe(LABS_TOOLS.n);
    globalThis.fetch = (async () => {
      throw new Error("offline");
    }) as unknown as typeof fetch;
    expect(await labsToolCount()).toBe(LABS_TOOLS.n);
  } finally {
    globalThis.fetch = real;
  }
});

test("last notes: the family's honest lines stay true", async () => {
  const { VTX, FOOT } = await import("../content/home");
  // personal builds get his line; Labs says they're not for sale, "maybe not for a long time", hence "probably"
  expect(VTX.nope.en).toContain("probably");
  expect(VTX.nope.th).toContain("คง");
  // never "100% offline": four apps check for updates once a day today (vtx-labs content/offline.ts, O1C pending)
  for (const t of [VTX.local.h, VTX.local.p]) for (const l of ["en", "th"] as const) expect(t[l]).not.toMatch(/100|offline|ออฟไลน์/i);
  expect(VTX.local.p.en).toContain("four of them check for updates once a day, and you can turn that off");
  expect(VTX.local.p.th).toContain("สี่ตัวเช็กอัปเดตวันละครั้ง ซึ่งปิดได้");
  // a lot of AI help, said plainly, here and in the footer
  expect(VTX.ai.h.en).toContain("LOT");
  expect(FOOT.ai.en).toContain("a lot of help");
  expect(FOOT.ai.en).not.toContain("a little");
});

test("last notes: Studio is in Live projects as opening soon, with no link, and isn't counted as live", async () => {
  const { STUDIO } = await import("../content/site");
  const { LIVE } = await import("../content/home");
  expect(WEB.map((w) => w.id)).not.toContain("studio");
  expect("url" in STUDIO || "host" in STUDIO).toBe(false);
  // the words the hire card used for Studio, before the card turned to recruiters
  expect(STUDIO.line.en).toContain("back offices, web apps, mobile apps and LINE bots, from a prototype you can click to a handover with documents");
  expect(LIVE.tags[STUDIO.id]).toEqual(["Next.js", "React", "TypeScript", "three.js"]);
  const home = readFileSync(join(import.meta.dir, "..", "components/Home.tsx"), "utf8");
  const card = home.slice(home.indexOf('className="o-card lv-soon'), home.indexOf('id="fun"'));
  expect(card).not.toMatch(/href=|stretch/);
  expect(card).toContain("T.soon[lang]");
});

test("last notes: links to a place on the page glide there, jump under Reduce motion, and move focus", () => {
  const src = readFileSync(join(import.meta.dir, "..", "components/Behaviours.tsx"), "utf8");
  expect(src).toContain('behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"');
  expect(src).toContain("to.focus({ preventScroll: true })");
  expect(readFileSync(join(import.meta.dir, "..", "app/globals.css"), "utf8")).toMatch(/html\{scroll-padding-top:96px/);
});

test("the hire card is for HR, recruiters and headhunters: plainly professional, real facts, real links", async () => {
  const { TERM } = await import("../content/home");
  // "ไม่ใช่ไปทำธุระกิจกับผม 555", then "เอาที่จริงจังแบบจริงเลยเถอะ ติดเล่นไปหน่อย"
  for (const l of ["en", "th"] as const) {
    const card = [T.hireK[l], T.hireH[l], T.hireP[l], T.hireFacts[l]].join(" ");
    expect(card).not.toMatch(/business|client|Studio|ธุรกิจ|ลูกค้า|คุยงาน/i);
    // no joke, no emoji, no "(seriously)"
    expect(card).not.toMatch(/\p{Extended_Pictographic}|seriously|joke|จริงจัง|มุก|555/u);
    // no preferences he hasn't stated
    expect(card).not.toMatch(/remote|onsite|on-site|notice|salary|open to work|ทำงานที่บ้าน|เงินเดือน/i);
    expect(T.hireK[l]).toMatch(/HR/);
    expect(T.hireP[l]).toContain("{y}");
  }
  expect(T.hireH.en).toBe("Hiring? Let's talk.");
  expect(T.hireH.th).toBe("สนใจร่วมงานกัน ติดต่อได้เลยครับ");
  const home = readFileSync(join(import.meta.dir, "..", "components/Home.tsx"), "utf8");
  const hire = home.slice(home.indexOf('id="hire"'));
  expect(hire).not.toMatch(/p-soon|VTX Studio|HireTerm|orbc/);
  for (const a of ["mailto:${LINKS.email}", "LINKS.linkedin", "HIRE_CV.pdf", "fill(T.hireP[lang], y)"]) expect(hire).toContain(a);
  expect(existsSync(pub("Modern.pdf"))).toBe(true);
  // the hero easter egg can joke, and its last link lands on this card
  expect(TERM.hire.en[0]).toContain("recruiter");
  expect(TERM.hireCard.en).toContain("recruiters");
  expect(JSON.stringify(TERM.hire)).not.toMatch(/จริงจัง|I'm serious/);
});

test("skills audit (S1–S12, his \"Skills OK\"): each skill in its right place, once where it should be", async () => {
  const { WEAPONS } = await import("../content/home");
  const card = (t: string) => WEAPONS.find((w) => w.t.en === t)!;
  const line = (t: string, k: string) => card(t).items.find((i) => i.k.en === k)?.v ?? "";
  const words = (v: string) => v.split(/,\s*|\s\+\s/).map((x) => x.trim());
  // S1, S2: a Backend & APIs card; NestJS, Node.js and GraphQL left Web
  expect(words(line("Backend & APIs", "Core"))).toEqual(["Node.js", "NestJS", "Express", "Go (Gin)"]);
  expect(words(line("Backend & APIs", "APIs & auth"))).toEqual(["REST", "GraphQL", "JWT"]);
  expect(JSON.stringify(card("Web Frameworks & UI"))).not.toMatch(/NestJS|Node\.js|GraphQL/);
  // S3, S4, S5, S6
  expect(JSON.stringify(WEAPONS).match(/Nginx/g)?.length).toBe(1);
  expect(line("Cloud & Platforms", "Infra")).toBe("Nginx");
  expect(line("Cloud & Platforms", "CMS")).toBe("WordPress");
  expect(line("DevOps & Tools", "Version control & CI")).toBe("Git, GitHub Actions");
  expect(JSON.stringify(WEAPONS)).not.toContain("Line OA");
  // S7: Current Stack is a summary with nothing twice, and not the Desktop card word for word
  const now = card("Current Stack").items.flatMap((i) => words(i.v));
  expect(new Set(now).size).toBe(now.length);
  expect(line("Current Stack", "Desktop")).not.toBe(line("Desktop", "Core"));
  // S8: RDP stays (Crystallum implements it); S9: no App Store claim
  expect(line("Desktop", "Native bits")).toContain("RDP");
  expect(JSON.stringify(card("Mobile"))).not.toMatch(/App Store|Play Store/);
  // S10, S11, S12
  expect(line("DevOps & Tools", "Testing")).toBe("Vitest, cargo test");
  expect(words(line("Languages", "Also speak"))).toContain("SQL");
  expect(words(line("DevOps & Tools", "Package & Runtime"))).toContain("cargo");
  // ten cards: the AI one runs across the row, so the other nine sit three by three
  expect(WEAPONS.length).toBe(10);
  expect(WEAPONS.filter((w) => w.wide).map((w) => w.t.en)).toEqual(["AI — Always On"]);
});
