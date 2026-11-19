/**
 * Draws the share images (Open Graph / Twitter, 1200×630, English and Thai) and the icons in G, using the site's own
 * fonts and colours: it opens the built site in headless Chrome, swaps the page for the card, and screenshots it.
 *
 * Run on macOS after changing the name, the tagline, the app count or the look:
 *   bun run build && bun run start -p 3123     (in another terminal)
 *   bun scripts/brand-images.ts http://127.0.0.1:3123
 *
 * Writes public/images/share-en.png, public/images/share-th.png, app/favicon.ico (16, 32, 48), app/icon.png (192),
 * app/apple-icon.png and public/apple-touch-icon.png (180). The images are committed; Vercel's build doesn't draw them.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { APPS } from "../content/apps";
import { HERO } from "../content/home";
import type { Lang } from "../content/site";

const BASE = process.argv[2] ?? "http://127.0.0.1:3123";
const ROOT = join(import.meta.dir, "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9335;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "brand-"))}`, "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
let ws: WebSocket | undefined;
for (let i = 0; i < 40 && !ws; i++) {
  try {
    const page = ((await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()) as { type: string; webSocketDebuggerUrl: string }[]).find((t) => t.type === "page");
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
  } catch {
    /* not up yet */
  }
  await sleep(250);
}
if (!ws) throw new Error("Chrome did not start");
const sock = ws;
if (sock.readyState !== 1) await new Promise((r) => sock.addEventListener("open", r, { once: true }));
let id = 0;
const waits = new Map<number, (m: { result?: { data?: string; result?: { value?: unknown } } }) => void>();
sock.addEventListener("message", (e) => {
  const m = JSON.parse(String(e.data));
  if (m.id && waits.has(m.id)) {
    waits.get(m.id)!(m);
    waits.delete(m.id);
  }
});
const send = (method: string, params: object = {}) =>
  new Promise<{ result?: { data?: string; result?: { value?: unknown } } }>((r) => {
    const i = ++id;
    waits.set(i, r);
    sock.send(JSON.stringify({ id: i, method, params }));
  });
const evalJs = async (expr: string) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;

/** Loads the page in that language (for its fonts), puts `html` in place of everything, and returns a PNG. */
async function draw(lang: Lang, w: number, h: number, html: string): Promise<Buffer> {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: false });
  await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
  await send("Page.navigate", { url: `${BASE}${lang === "th" ? "/th" : "/"}` });
  await sleep(1500);
  await evalJs(`(async () => {
    document.body.innerHTML = ${JSON.stringify(html)};
    document.body.setAttribute("style", "margin:0;background:transparent;overflow:hidden");
    document.documentElement.style.background = "transparent";
    document.body.offsetHeight;
    await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = r; i.onerror = r; })));
    await new Promise((r) => setTimeout(r, 400));
    await document.fonts.ready;
  })()`);
  const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
  return Buffer.from(shot.result!.data!, "base64");
}

const SANS = "var(--font-jakarta),var(--font-noto-thai),system-ui,sans-serif";
const HEAD = "var(--font-jakarta),var(--font-kanit),system-ui,sans-serif";
const MONO = "var(--font-jetbrains),ui-monospace,monospace";
const GRAD = "background:linear-gradient(120deg,#8e97ff,#7cc8ff 70%,#bfe4ff);-webkit-background-clip:text;background-clip:text;color:transparent";

const CHIPS: Record<Lang, string[]> = {
  en: ["Web apps since 2017", `${APPS.length} desktop apps · Rust + Tauri`, "Built solo"],
  th: ["ทำเว็บแอปตั้งแต่ 2017", `แอป desktop ${APPS.length} ตัว · Rust + Tauri`, "ทำคนเดียว"],
};

/** The share card: the hero's look (dark, the two light pools, the dots), his name, his line, and the round photo. */
function card(lang: Lang): string {
  const dots = Array.from({ length: 34 }, (_, i) => {
    const r = (n: number) => ((n * 9301 + 49297) % 233280) / 233280;
    return `<i style="position:absolute;left:${(r(i * 3) * 100).toFixed(1)}%;top:${(r(i * 7 + 1) * 100).toFixed(1)}%;width:3px;height:3px;border-radius:50%;background:#8e97ff;opacity:${(r(i * 11 + 2) * 0.35 + 0.08).toFixed(2)}"></i>`;
  }).join("");
  return `<div style="position:relative;width:1200px;height:630px;overflow:hidden;background:#0b0c0f;font-family:${SANS};color:#f5f6f8">
  <div style="position:absolute;inset:0;background:radial-gradient(34% 46% at 8% 30%,rgba(142,151,255,.2),transparent 70%),radial-gradient(34% 50% at 88% 72%,rgba(124,200,255,.16),transparent 70%)"></div>
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:radial-gradient(70% 80% at 50% 50%,#000,transparent)"></div>
  ${dots}
  <div style="position:absolute;left:72px;top:56px;font:700 30px/1 ${HEAD};color:#7cc8ff;letter-spacing:.01em">&lt;Ta /&gt;</div>
  <div style="position:absolute;right:72px;top:62px;font:500 20px/1 ${MONO};color:#8d929b">tanawat.dev</div>
  <div style="position:absolute;left:72px;top:150px;width:700px">
    <div style="font:500 22px/1 ${MONO};letter-spacing:.18em;color:#a9b0ff">&gt; hello_world<span style="color:#7cc8ff">_</span></div>
    <div style="margin-top:24px;font:800 92px/1.02 ${HEAD};letter-spacing:-.035em"><span style="${GRAD}">Tanawat</span><br>Pinthongpan</div>
    <div style="margin-top:26px;font:500 29px/1.35 ${SANS};color:#d0d4db">${HERO.tagline[lang]}</div>
    <div style="margin-top:34px;display:flex;flex-wrap:wrap;gap:12px">${CHIPS[lang]
      .map((c) => `<span style="padding:9px 18px;border-radius:999px;font:500 20px/1.2 ${SANS};color:#c3c8ff;background:rgba(142,151,255,.12);box-shadow:inset 0 0 0 1px rgba(142,151,255,.28)">${c}</span>`)
      .join("")}</div>
  </div>
  <div style="position:absolute;right:92px;top:176px;width:300px;height:300px;border-radius:50%;padding:7px;background:linear-gradient(140deg,#8e97ff,#7cc8ff 60%,#bfe4ff);box-shadow:0 0 90px -10px rgba(124,200,255,.45)">
    <img src="/images/me-round.jpg" alt="" style="display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;border:6px solid #0b0c0f;box-sizing:border-box">
  </div>
</div>`;
}

/** The mark: "Ta" from the <Ta /> logo, in G's gradient, on the dark tile, with the orbit dot. */
function mark(s: number, bleed = false): string {
  const r = bleed ? 0 : Math.round(s * 0.22);
  const dot = Math.max(3, Math.round(s * 0.2));
  const small = s <= 32;
  return `<div style="position:relative;width:${s}px;height:${s}px;border-radius:${r}px;background:#0b0c0f;overflow:hidden;box-shadow:inset 0 0 0 ${Math.max(1, Math.round(s / 64))}px ${bleed ? "transparent" : "#2b2f37"}">
  <div style="position:absolute;inset:0;background:radial-gradient(70% 70% at 20% 85%,rgba(142,151,255,.28),transparent 70%)"></div>
  <span style="position:absolute;left:0;right:0;top:50%;transform:translateY(-52%);text-align:center;font:800 ${Math.round(s * (small ? 0.6 : 0.5))}px/1 ${HEAD};letter-spacing:-.05em;${GRAD}">Ta</span>
  ${small ? "" : `<i style="position:absolute;right:${Math.round(s * 0.12)}px;top:${Math.round(s * 0.12)}px;width:${dot}px;height:${dot}px;border-radius:50%;background:linear-gradient(140deg,#7cc8ff,#8e97ff 50%,#eef5ff)"></i>`}
</div>`;
}

/** An .ico holding PNGs (Vista and later read PNG entries). */
function ico(pngs: { size: number; png: Buffer }[]): Buffer {
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(pngs.length, 4);
  let offset = head.length;
  pngs.forEach(({ size, png }, i) => {
    const e = 6 + 16 * i;
    head.writeUInt8(size >= 256 ? 0 : size, e);
    head.writeUInt8(size >= 256 ? 0 : size, e + 1);
    head.writeUInt16LE(1, e + 4);
    head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(png.length, e + 8);
    head.writeUInt32LE(offset, e + 12);
    offset += png.length;
  });
  return Buffer.concat([head, ...pngs.map((p) => p.png)]);
}

await send("Page.enable");
for (const lang of ["en", "th"] as const) {
  writeFileSync(join(ROOT, "public", "images", `share-${lang}.png`), await draw(lang, 1200, 630, card(lang)));
  console.log("share", lang);
}
const sizes = [16, 32, 48];
const small = [];
for (const s of sizes) small.push({ size: s, png: await draw("en", s, s, mark(s)) });
writeFileSync(join(ROOT, "app", "favicon.ico"), ico(small));
writeFileSync(join(ROOT, "app", "icon.png"), await draw("en", 192, 192, mark(192)));
const apple = await draw("en", 180, 180, mark(180, true));
writeFileSync(join(ROOT, "app", "apple-icon.png"), apple);
writeFileSync(join(ROOT, "public", "apple-touch-icon.png"), apple);
console.log("icons", sizes.join(", "), "+ 192 + 180");
sock.close();
chrome.kill();
process.exit(0);
