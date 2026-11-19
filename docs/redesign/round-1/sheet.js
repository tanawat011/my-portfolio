/* The sheet: direction cards, the Devices viewer, the GitHub profile preview, and the questions. */
{
const PF = window.PF;

/* ---------------- viewer ---------------- */
const DEVICES = {
  full: { kind: "desktop", label: "Desktop", w: null, h: null },
  "1024": { kind: "tablet", label: "Tablet แนวนอน 1024 × 768", w: 1024, h: 768 },
  "768": { kind: "tablet", label: "Tablet แนวตั้ง 768 × 1024", w: 768, h: 1024 },
  "390": { kind: "phone", label: "Mobile 390 × 844", w: 390, h: 844 },
};
const PAL = [["#0b0c0f", "graphite night (ค่าตั้งต้น)"], ["#f5f6f8", "porcelain day"], ["#8d929b", "ตัวรอง"], ["#7cc8ff", "ice แสงหลัก"], ["#8e97ff", "periwinkle แสงขอบ"], ["#eef5ff", "frost ไฮไลต์"], ["#0d0f14", "ink ปุ่มหลัก (day)"]];
const pv = document.getElementById("pv"), win = document.getElementById("win"), screen = document.getElementById("screen"), scaler = document.getElementById("scaler"), spec = document.getElementById("spec"), devices = document.getElementById("devices"), stageWrap = document.querySelector(".stage").parentElement;
const sysReduced = matchMedia("(prefers-reduced-motion: reduce)");
const state = { dir: "a", page: "home", w: "full", mode: "dark", motion: sysReduced.matches ? "reduced" : "full", view: "all", tabletW: "768" };
let cleanup = null, pendingTo = null;
const tpl = (d, part) => document.querySelector(`template[data-dir="${d}"][data-part="${part}"]`);
const ctxFor = (w) => { const k = DEVICES[w].kind; return { page: state.page, mode: state.mode, reduced: state.motion === "reduced", phone: k === "phone", tablet: k === "tablet", touch: k !== "desktop" }; };
const fit = () => {
  const dev = DEVICES[state.w], lab = document.getElementById("devlabel");
  if (!dev.w) { win.style.cssText = ""; scaler.style.cssText = ""; lab.hidden = true; return; }
  const availW = screen.clientWidth - 40, availH = Math.max(420, window.innerHeight * 0.8), s = Math.max(0.25, Math.min(1, availW / dev.w, availH / dev.h));
  win.style.width = dev.w + "px"; win.style.height = dev.h + "px"; win.style.transform = s < 1 ? `scale(${s})` : "";
  scaler.style.width = Math.round(dev.w * s) + "px"; scaler.style.height = Math.round(dev.h * s) + "px";
  lab.hidden = false; lab.textContent = dev.label + (s < 1 ? ` · ย่อเหลือ ${Math.round(s * 100)}% ให้พอดีจอ` : " · ขนาดจริง");
};
const mount = () => {
  if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
  const d = state.dir, D = PF.DIRS[d]; if (!D) return;
  const dev = DEVICES[state.w];
  stageWrap.classList.toggle("view-all", state.view === "all");
  screen.dataset.w = state.w; screen.dataset.kind = dev.kind; fit();
  pv.className = "pv d" + d; pv.dataset.page = state.page; pv.dataset.mode = state.mode;
  if (state.motion === "reduced") pv.dataset.reduced = ""; else delete pv.dataset.reduced;
  if (dev.kind !== "desktop") pv.dataset.touch = ""; else delete pv.dataset.touch;
  const s = tpl(d, "spec"); spec.innerHTML = s ? s.innerHTML : "";
  spec.querySelectorAll("[data-pal]").forEach((el) => { el.innerHTML = `<div class="pal">${PAL.map(([c, n]) => `<span><i style="background:${c}"></i>${c}<br>${n}</span>`).join("")}</div>`; });
  spec.insertAdjacentHTML("beforeend", `<dl><dt>ฟอนต์ (ทุกทาง, next/font)</dt><dd>หัวข้อ Plus Jakarta Sans + Kanit (ไทย) 500 สำหรับ h1, 600 หัวข้อรอง · เนื้อความ Plus Jakarta Sans + Noto Sans Thai 400 ระยะบรรทัด 1.72 · ป้าย JetBrains Mono 500 · ทั้งหมด SIL OFL เหมือน Studio G</dd></dl>`);
  document.getElementById("addr").textContent = "tanawat.dev" + (state.page === "case" ? "/work/fulmen" : "");
  win.scrollTop = 0;
  if (state.view === "one") {
    const t = tpl(d, "pv"); pv.innerHTML = t ? t.innerHTML : "";
    const to = pendingTo; pendingTo = null;
    try { const c = D.init(pv, Object.assign(ctxFor(state.w), { scroller: win, to, go: (p, t2) => { state.page = p; pendingTo = t2; mount(); }, toggle: () => { state.mode = state.mode === "light" ? "dark" : "light"; mount(); } })); if (typeof c === "function") cleanup = c; } catch (e) { console.error(e); }
  } else pv.innerHTML = "";
  paintCtrls();
  if (state.view === "all") mountDevices();
};

/* Devices view: three isolated pages, each its own document and its own scroll */
const THREE_URL = document.getElementById("three-src").src, FONTS = document.getElementById("pv-fonts").href;
const soloDoc = (d, cfg) => `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="${FONTS}"><link rel="stylesheet" href="pv.css"><style>html,body{margin:0}body{min-height:100vh;overflow-x:hidden}</style>${PF.DIRS[d].three && !cfg.reduced ? `<script src="${THREE_URL}"><\/script>` : ""}</head><body><div class="pv" id="pv"></div><template id="tpl">${tpl(d, "pv").innerHTML}</template><script>window.PF_CFG=${JSON.stringify(cfg).replace(/</g, "\\u003c")};<\/script><script src="pv.js"><\/script><script>PF.boot()<\/script></body></html>`;
let devGen = 0, readyFrames = 0;
window.addEventListener("message", (e) => { if (e.data && e.data.pf === "ready") readyFrames++; });
const mountDevices = () => {
  const gen = ++devGen; readyFrames = 0;
  const tw = DEVICES[state.tabletW];
  const frames = [["full", 1280, 800, "Desktop 1280 × 800"], [state.tabletW, tw.w, tw.h, tw.label + ` <button type="button" class="rot" aria-label="หมุนแท็บเล็ต">⟲ หมุน</button>`], ["390", 390, 844, "Mobile 390 × 844"]];
  devices.innerHTML = frames.map(([w, , , label], i) => `<div class="dev" data-kind="${DEVICES[w].kind}" data-i="${i}"><div class="frame"></div><b>${label}</b></div>`).join("");
  const avail = devices.clientWidth - 36, maxH = Math.min(window.innerHeight * 0.78, 760);
  const ratio = frames.reduce((a, [, fw, fh]) => a + fw / fh, 0);
  const H = Math.min(maxH, (avail - 48) / ratio), twoRows = H < 360;
  devices.querySelectorAll(".dev").forEach((el, i) => {
    const [w, fw, fh] = frames[i];
    const h = twoRows ? (i === 0 ? Math.min(maxH, avail / (fw / fh)) : Math.min(maxH, (avail - 24) / ((frames[1][1] / frames[1][2]) + (frames[2][1] / frames[2][2])))) : H;
    const sc = h / fh, fr = el.querySelector(".frame");
    fr.style.width = Math.round(fw * sc) + "px"; fr.style.height = Math.round(h) + "px";
    const cfg = Object.assign({ dir: state.dir, w }, ctxFor(w));
    const ifr = document.createElement("iframe");
    ifr.title = `${DEVICES[w].label}: ${state.dir.toUpperCase()}`; ifr.style.width = fw + "px"; ifr.style.height = fh + "px"; ifr.style.transform = `scale(${sc})`;
    ifr.style.background = state.mode === "light" ? "#f5f6f8" : "#0b0c0f";
    ifr.srcdoc = soloDoc(state.dir, cfg); fr.appendChild(ifr);
  });
  devices.querySelector(".rot")?.addEventListener("click", () => { state.tabletW = state.tabletW === "768" ? "1024" : "768"; mountDevices(); });
  const note = document.getElementById("devnote"); note.style.display = "none";
  setTimeout(() => { if (gen === devGen && readyFrames < 1) note.style.display = "block"; }, 7000);
};
const paintCtrls = () => {
  const set = (id, val) => document.querySelectorAll(`#${id} button`).forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === val ? "true" : "false"));
  set("pSeg", state.page); set("wSeg", state.view === "one" ? state.w : ""); set("mSeg", state.mode); set("rSeg", state.motion); set("vSeg", state.view);
  document.querySelectorAll(".dirc").forEach((c) => c.setAttribute("aria-pressed", c.dataset.d === state.dir ? "true" : "false"));
};
const pick = (d) => { if (!PF.DIRS[d]) return; state.dir = d; mount(); try { history.replaceState(null, "", "#dir-" + d); } catch (e) { /* sandbox */ } };
document.getElementById("cards").innerHTML = Object.keys(PF.DIRS).map((d) => { const D = PF.DIRS[d];
  return `<button type="button" class="dirc" data-d="${d}"><div class="sw">${D.swatches.map((c) => `<i style="background:${c}"></i>`).join("")}</div><b>${d.toUpperCase()} · ${D.name}</b><span>${D.tag}</span><span>${D.fonts}</span>${d === "a" ? "<em>แนะนำ</em>" : ""}</button>`; }).join("");
document.getElementById("cards").addEventListener("click", (e) => { const c = e.target.closest(".dirc"); if (c) pick(c.dataset.d); });
const seg = (id, key) => document.getElementById(id).addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; state[key] = b.dataset.v; if (key === "w") state.view = "one"; mount(); });
seg("pSeg", "page"); seg("wSeg", "w"); seg("mSeg", "mode"); seg("rSeg", "motion"); seg("vSeg", "view");
let rt = 0; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (state.view === "all") mountDevices(); else fit(); }, 220); });
const fromHash = () => { const m = location.hash.match(/^#dir-([a-e])$/); if (m) state.dir = m[1]; mount(); };
window.addEventListener("hashchange", () => { if (/^#dir-/.test(location.hash)) fromHash(); });
window.PF_TEST = { state, mount, pick };
fromHash();

/* ---------------- GitHub profile, as GitHub shows it ---------------- */
const MD = { a: JSON.parse(document.getElementById("md-a").textContent), b: JSON.parse(document.getElementById("md-b").textContent), c: JSON.parse(document.getElementById("md-c").textContent) };
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const inline = (s) => {
  const keep = []; s = s.replace(/`([^`]+)`/g, (m, c) => { keep.push(`<code>${esc(c)}</code>`); return `\u0000${keep.length - 1}\u0000`; });
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/(^|[\s(>])_([^_\s][^_]*?)_(?=[\s.,;:)!?<]|$)/g, "$1<em>$2</em>");
  return s.replace(/\u0000(\d+)\u0000/g, (m, i) => keep[+i]);
};
const md = (src) => {
  const out = [], lines = src.replace(/\r/g, "").split("\n"); let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    if (/^```/.test(l)) { const buf = []; i++; while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]); i++; out.push(`<pre><code>${esc(buf.join("\n"))}</code></pre>`); continue; }
    if (/^#{1,6} /.test(l)) { const n = l.match(/^#+/)[0].length; out.push(`<h${n}>${inline(l.slice(n + 1))}</h${n}>`); i++; continue; }
    if (/^\s*</.test(l)) { const buf = []; while (i < lines.length && lines[i].trim()) buf.push(lines[i++]); out.push(buf.join("\n")); continue; }
    if (/^\|/.test(l)) { const rows = []; while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()), al = cells(rows[1]).map((c) => /^:-+:$/.test(c) ? "center" : /-+:$/.test(c) ? "right" : "");
      const td = (t, c, j) => `<${t}${al[j] ? ` align="${al[j]}"` : ""}>${inline(c)}</${t}>`;
      out.push(`<table><thead><tr>${cells(rows[0]).map((c, j) => td("th", c, j)).join("")}</tr></thead><tbody>${rows.slice(2).map((r) => `<tr>${cells(r).map((c, j) => td("td", c, j)).join("")}</tr>`).join("")}</tbody></table>`); continue; }
    if (/^> /.test(l)) { const buf = []; while (i < lines.length && /^>/.test(lines[i])) buf.push(lines[i++].replace(/^> ?/, "")); out.push(`<blockquote><p>${inline(buf.join(" "))}</p></blockquote>`); continue; }
    if (/^- /.test(l)) { const buf = []; while (i < lines.length && /^- /.test(lines[i])) buf.push(lines[i++].slice(2)); out.push(`<ul>${buf.map((x) => `<li>${inline(x)}</li>`).join("")}</ul>`); continue; }
    const buf = []; while (i < lines.length && lines[i].trim() && !/^(#|\||```|- |> |\s*<(?!br|sub|a |b>|strong|em|code|img))/.test(lines[i])) buf.push(lines[i++]);
    if (!buf.length) buf.push(lines[i++]);
    out.push(`<p>${inline(buf.join("\n"))}</p>`);
  }
  return out.join("\n");
};
const standIn = (src) => {
  if (/img\.shields\.io\/badge\//.test(src)) { const m = src.match(/badge\/([^?]+)/), name = m ? decodeURIComponent(m[1].replace(/-[0-9a-fA-F]{6}$/, "").replace(/_/g, " ")) : "badge"; return [name + " (shields.io)", false]; }
  if (/capsule-render/.test(src)) return ["ภาพหัว capsule-render (บริการภายนอก)", true];
  if (/readme-typing-svg/.test(src)) return ["ตัวหนังสือพิมพ์เอง readme-typing-svg (บริการภายนอก)", true];
  if (/komarev/.test(src)) return ["ตัวนับ profile views (komarev.com)", false];
  if (/streak-stats/.test(src)) return ["streak stats (herokuapp, ข้อมูลสด)", true];
  if (/activity-graph/.test(src)) return ["activity graph (vercel, ข้อมูลสด)", true];
  if (/readme-stats/.test(src)) return ["github-readme-stats (vercel, ข้อมูลสด)", true];
  return ["ภาพภายนอก", true];
};
const gh = { v: "a", t: "dark", w: "desk" };
const NOTES = {
  a: [["ไฟล์ที่เพิ่มใน repo tanawat011", "README.md, assets/banner-dark.svg, assets/banner-light.svg (ไฟล์ละ ~8 KB) และ assets/icons/*.png 11 ไฟล์ (ไอคอนเดียวกับเว็บ)"], ["การเคลื่อนไหว", "จุด 11 จุด (แอปละจุด) โคจรรอบลูกแก้ว รอบละ 84 วิ ด้วย SMIL ใน SVG · ถ้าเครื่องตั้ง Reduce motion จุดจะนิ่ง · ไม่มี JavaScript"], ["บริการภายนอก", "ไม่มี · ตัดตัวนับ profile views และ stats card ออก (ข้อ 15)"]],
  b: [["ไฟล์ที่เพิ่มใน repo tanawat011", "README.md, assets/header-dark.svg, assets/header-light.svg (ไฟล์ละ ~4 KB) และ assets/icons/*.png 12 ไฟล์"], ["การเคลื่อนไหว", "ไม่มีเลย หัวเป็นภาพนิ่ง · ตารางการ์ด 3 คอลัมน์: บนมือถือ GitHub ให้เลื่อนตารางข้าง"], ["บริการภายนอก", "ไม่มี"]],
  c: [["เปลี่ยนจากของเดิม", "เปลี่ยนแค่สีเป็น G (graphite, periwinkle, ice) ทุกบรรทัดอื่นเหมือนเดิม รวมทั้ง \"In the Shadow\" (ข้อ 14)"], ["การเคลื่อนไหว", "ตัวหนังสือพิมพ์เองของ readme-typing-svg และภาพหัว fadeIn"], ["บริการภายนอก", "capsule-render, readme-typing-svg, shields.io, komarev, github-readme-stats, streak-stats (herokuapp), activity-graph · การ์ดสถิติเป็นสีมืดอย่างเดียว ในธีมสว่างของ GitHub จะเป็นกล่องมืด"]],
};
const paintGH = () => {
  const box = document.getElementById("ghmd"), frame = document.getElementById("ghp");
  frame.dataset.t = gh.t; frame.dataset.w = gh.w;
  box.innerHTML = md(MD[gh.v]);
  box.querySelectorAll("picture").forEach((p) => { const s = p.querySelector('source[media*="dark"]'), im = p.querySelector("img"); if (gh.t === "dark" && s) im.setAttribute("src", s.getAttribute("srcset")); p.replaceWith(im); });
  box.querySelectorAll("img").forEach((im) => { const src = im.getAttribute("src") || "";
    if (/^https?:/.test(src)) { const [label, big] = standIn(src), sp = document.createElement("span"); sp.className = "stand" + (big ? " big" : ""); sp.textContent = label; im.replaceWith(sp); return; }
    im.src = src.replace(/^assets\/(banner|header)-/, "gh/$1-"); });
  box.querySelectorAll("a").forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));
  document.getElementById("gSrc").textContent = MD[gh.v];
  document.getElementById("gSrcT").textContent = `README.md · แบบ ${gh.v.toUpperCase()} · ${MD[gh.v].split("\n").length} บรรทัด`;
  document.getElementById("gNote").innerHTML = NOTES[gh.v].map(([t, x]) => `<div><b>${t}</b>${x}</div>`).join("");
  [["gV", gh.v], ["gT", gh.t], ["gW", gh.w]].forEach(([id, v]) => document.querySelectorAll(`#${id} button`).forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === v ? "true" : "false")));
};
[["gV", "v"], ["gT", "t"], ["gW", "w"]].forEach(([id, k]) => document.getElementById(id).addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; gh[k] = b.dataset.v; paintGH(); }));
const copyText = async (text, btn, fallbackEl) => { const old = btn.textContent;
  try { await navigator.clipboard.writeText(text); btn.textContent = "ก๊อปแล้ว"; }
  catch (err) { const r = document.createRange(); r.selectNodeContents(fallbackEl); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = "เลือกให้แล้ว กด Cmd+C"; }
  setTimeout(() => { btn.textContent = old; }, 1800); };
document.getElementById("gCopy").addEventListener("click", (e) => copyText(MD[gh.v], e.currentTarget, document.getElementById("gSrc")));
paintGH();

/* ---------------- questions ---------------- */
const QS = [
  ["ทางหลักของ tanawat.dev", "เลือกหลังจากกดดูครบ 5 ทาง ทั้งหน้าแรกและหน้าเคส ในทุกอุปกรณ์ · ทุกทางใช้สีและตัวหนังสือของ G เหมือนกัน", [["A", "A · Constellation: ลูกแก้ว 3D กับไอคอนแอป 11 ตัวโคจรรอบ ชี้แล้วเห็นชื่อ · ครอบครัวเดียวกับ Studio ทันที และ \"11 แอป\" เห็นได้ในวินาทีแรก", 1], ["B", "B · Launcher: หน้าแรกเป็น launcher พิมพ์ค้นแอปได้ เห็นหน้าจอจริงข้าง ๆ · เร็วที่สุด ไม่มี WebGL"], ["C", "C · Elements: ตารางธาตุ 11 ช่อง แสงตามเมาส์ กดแล้วเห็นหน้าจอจริง"], ["D", "D · Story: ตัวคนนำ แถบปี 2017 → 2026 ตามสเกลจริง เรื่องเล่าที่จุดแสงเดินตาม scroll"], ["E", "E · Before → After: hero คือ slider terminal → แอป 4 คู่ · ตรงกับ kit § 5 ที่สุด"], ["F", "ผสม: บอกในข้อ 2 ว่าเอาอะไรจากทางไหน"]]],
  ["ผสมไหม", "ทุกทางมี slider ก่อน / หลังในหน้าแรกและหน้าเคสอยู่แล้ว ผสมได้ เช่น \"hero ของ A กับรายการแอปแบบ launcher ของ B\"", [["A", "ไม่ผสม: ใช้ทางเดียวทั้งเว็บ", 1], ["B", "ผสม: บอกในข้อความว่าเอาส่วนไหนจากทางไหน"]]],
  ["ภาษา", "เว็บเดิมเป็นอังกฤษอย่างเดียว Studio เป็นไทยก่อนเพราะลูกค้าไทย ส่วน portfolio มีทั้ง HR, developer และลูกค้า", [["A", "อังกฤษที่ / และไทยที่ /th (กลับกันกับ Studio) ปุ่ม TH อยู่ที่หัวเว็บ", 1], ["B", "อังกฤษอย่างเดียว มีประโยคไทยแค่บางจุดแบบในพรีวิว"], ["C", "ไทยที่ / และอังกฤษที่ /en เหมือน Studio"]]],
  ["ธีมมืด / สว่าง", "kit มีกติกาธีมมืด 6 ข้อ ทุกทางผ่านแบบเดียวกับ Studio G", [["A", "มืดเป็นค่าตั้งต้น มีปุ่มสลับที่หัวเว็บ (เหมือน Studio 3A)", 1], ["B", "ตามเครื่องของผู้ชม และมีปุ่มสลับ"], ["C", "ธีมเดียว ไม่มีปุ่ม"]]],
  ["หน้าเคสของแอป", "หน้าเคส = ทำไมสร้าง → ก่อน / หลัง → หน้าจอจริง → ทำอะไรได้ → ไปโหลดที่ Labs · พรีวิวทำ Fulmen ให้ดู", [["A", "เริ่ม 4 ตัว: Fulmen, Lapis, Silva, Ignis (มี slider ก่อน / หลังแล้ว) ตัวอื่นลิงก์ไป Labs", 1], ["B", "ครบ 11 ตัว"], ["C", "ไม่มีหน้าเคส ลิงก์ไป Labs อย่างเดียว"]]],
  ["รูปตัวเอง", "เว็บเดิมมีรูปใน About · Studio ตอบว่าไม่มีรูปคน (10C) แต่ที่นั่นเป็นของ VTX ไม่ใช่ตัวคุณ · พรีวิวใช้ monogram TP แทนรูป", [["A", "รูปจริง 1 รูปในส่วน About ปรับโทนเย็นให้เข้ากับ G", 1], ["B", "ไม่มีรูป ใช้ monogram TP แบบในพรีวิว"], ["C", "รูปจริงใน hero"]]],
  ["Fun Facts เดิม", "∞ กาแฟ, 9,999+ bugs, 0 Stack Overflow เป็นมุก แต่ checklist § 5 ห้ามตัวเลขที่แต่งขึ้น", [["A", "เอาออก แทนด้วยแถวตัวเลขจริง 4 ตัวใต้ hero (9 ปี, 11 แอป, 6 engines, 2 เว็บ)", 1], ["B", "เก็บไว้ ติดป้ายว่าเป็นมุก"], ["C", "เอาออกเฉย ๆ ไม่มีแถวตัวเลข"]]],
  ["การนับคนเข้า", "เว็บเดิมใช้ Google Analytics (ID อยู่ใน .env.local) · ครอบครัวใช้ Umami ID เดียวแยกด้วย tag (checklist § 3)", [["A", "เปลี่ยนเป็น Umami ของครอบครัว tag portfolio และเอา GA ออก ไม่ส่งข้อมูลคนเข้าให้ Google", 1], ["B", "คง GA ไว้"], ["C", "ไม่นับเลย"]]],
  ["ปุ่มจ้างงาน", "Studio ยังไม่เปิด (deploy เมื่อคุณสั่ง) ห้ามลิงก์ไปที่ที่ยังไม่มี (checklist § 5)", [["A", "\"Work with me\" ไป VTX Studio ติดป้าย \"opening soon\" จนกว่า Studio จะเปิด ระหว่างนั้นปุ่มรองเป็นอีเมล", 1], ["B", "อีเมลกับ LINE อย่างเดียว ไม่พูดถึง Studio"], ["C", "ไม่มีส่วนจ้างงาน"]]],
  ["Resume", "ตอนนี้มี 4 แบบบน CraftCV + PDF", [["A", "เก็บทั้ง 4 แบบ (Modern / Minimal × Full / Short) เป็นแถวเล็ก ดูบน CraftCV หรือโหลด PDF", 1], ["B", "แบบเดียว (Modern Short)"], ["C", "ไม่มีส่วน Resume ลิงก์ CraftCV ใน footer"]]],
  ["เว็บและ open source", "CraftCV กับ Labs เปิดอยู่จริง · boilerplate Go / Node / Nest อยู่ใน GitHub สาธารณะ · My Portfolio เป็นการ์ดของตัวเองในเว็บเดิม", [["A", "การ์ดใหญ่ 2 ใบ (Labs, CraftCV) พร้อมหน้าจอ + แถวเล็กของ boilerplate 3 ตัว · ตัดการ์ด \"My Portfolio\" ออก", 1], ["B", "ใส่ Magnes, Botstrap, KhamKai, DocFlow ที่ Labs แสดงไว้ด้วย"], ["C", "ไม่มี boilerplate"]]],
  ["ลิงก์ติดต่อใน footer", "เว็บเดิมมี 7 ทาง: GitHub, LinkedIn, Facebook, Steam, Telegram, LINE, อีเมล", [["A", "ทางงานล้วน: GitHub, LinkedIn, อีเมล, LINE · เอา Facebook, Steam, Telegram ออก", 1], ["B", "เก็บครบ 7 ทางแบบเดิม"]]],
  ["GitHub profile แบบไหน", "ทั้ง 3 แบบอยู่ในหัวข้อ GitHub ข้างบน ดูทั้ง Dark / Light และมือถือ", [["A", "A · Orbit: banner SVG ที่จุด 11 จุดโคจรรอบลูกแก้ว + ตารางแอปพร้อมไอคอน + stack เป็นตัวหนังสือ ไม่พึ่งบริการภายนอก", 1], ["B", "B · Cards: หัวนิ่ง + การ์ดแอป 3 คอลัมน์ สั้นที่สุด"], ["C", "C · ของเดิม เปลี่ยนสีเป็น G ทุกอย่างเหมือนเดิม"]]],
  ["\"Solo Developer In the Shadow\" กับธีมเงามืด 🌑", "อยู่ใน README และภาพหัวตอนนี้ แต่ G เป็นแสงเย็นและความสงบ คนละอารมณ์กัน", [["A", "เลิกธีมเงามืด ใช้ \"I build the tools I use.\" ทั้ง README และภาพหัว", 1], ["B", "เก็บไว้ใน README อย่างเดียว"], ["C", "เก็บทั้งใน README และเว็บ"]]],
  ["การ์ดสถิติ GitHub และตัวนับ profile views", "เป็นภาพจากบริการฟรีภายนอก ล่มหรือติด rate limit บ่อย และเป็นตัวเลขอวดมากกว่าบอกงาน", [["A", "เอาออก", 1], ["B", "เก็บไว้ เปลี่ยนสีเป็น G (แบบ C)"]]],
];
const st = {}, rec = {};
const list = document.getElementById("qList");
list.innerHTML = QS.map(([t, why, opts], i) => `<div class="q" data-n="${i + 1}"><div><h3><span class="qn">${i + 1}</span>${t}</h3><p class="why">${why}</p></div><div class="opts">${opts.map(([v, l, r]) => `<button type="button" class="opt" data-v="${v}"><b>${v}</b><span>${l}</span>${r ? "<em>แนะนำ</em>" : ""}</button>`).join("")}</div></div>`).join("");
QS.forEach(([, , opts], i) => { rec[i + 1] = (opts.find((x) => x[2]) || opts[0])[0]; st[i + 1] = rec[i + 1]; });
const KEY = "tanawat-portfolio-r1";
try { const s = JSON.parse(localStorage.getItem(KEY) || "{}"); for (const k in s) if (k in st && typeof s[k] === "string") st[k] = s[k]; } catch (e) { /* no storage */ }
const ans = document.getElementById("ans"), diff = document.getElementById("diff");
document.getElementById("recAns").textContent = Object.keys(rec).map((k) => k + rec[k]).join(" ");
const paint = () => {
  list.querySelectorAll(".q").forEach((q) => q.querySelectorAll(".opt").forEach((b) => b.setAttribute("aria-pressed", st[q.dataset.n] === b.dataset.v ? "true" : "false")));
  ans.textContent = Object.keys(st).map((k) => k + st[k]).join(" ");
  const n = Object.keys(st).filter((k) => st[k] !== rec[k]).length;
  diff.textContent = n ? "ต่างจากที่แนะนำ " + n + " ข้อ" : "ตรงกับที่แนะนำทุกข้อ";
  try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* no storage */ }
};
list.addEventListener("click", (e) => { const b = e.target.closest(".opt"); if (!b) return; st[b.closest(".q").dataset.n] = b.dataset.v; paint(); });
document.getElementById("reset").addEventListener("click", () => { Object.assign(st, rec); paint(); });
document.getElementById("copy").addEventListener("click", (e) => copyText(ans.textContent, e.currentTarget, ans));
paint();
}
