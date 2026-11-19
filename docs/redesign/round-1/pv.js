/* Preview runtime for the five tanawat.dev directions. Runs inside the sheet (one device) and inside each Devices iframe.
   Every fact here comes from the current site (components/sections/*.tsx) or VTX Labs (content/apps.ts, content/app-shots.ts). */
(() => {
"use strict";
const PF = window.PF || (window.PF = {});

/* ---------------- data ---------------- */
const APPS = [
  { id: "lapis", n: "Lapis", el: "Stone", job: "Databases", sym: "Lp", shot: "lapis-1", kw: "sql postgres mysql mariadb sqlite mongodb redis database db", line: "PostgreSQL, MySQL / MariaDB, SQLite, SQL Server, MongoDB and Redis in one window. Every write is kept with the SQL that reverses it." },
  { id: "fulmen", n: "Fulmen", el: "Lightning", job: "APIs", sym: "Fu", shot: "fulmen-1", kw: "api http rest graphql grpc websocket curl mcp", line: "HTTP, GraphQL, WebSocket, gRPC, SSE and MCP. Requests leave from Rust, not a browser.", cas: 1 },
  { id: "silva", n: "Silva", el: "Wood", job: "Git", sym: "Sv", shot: "silva-1", kw: "git commit branch merge", line: "A Git graph where every action can be undone. Runs your own git, so hooks, LFS and signing behave as in your terminal." },
  { id: "ventus", n: "Ventus", el: "Wind", job: "SSH", sym: "Vn", shot: "ventus-1", kw: "ssh terminal sftp server", line: "Reads your ~/.ssh/config, known_hosts and agent, and checks the host key before sending anything." },
  { id: "ignis", n: "Ignis", el: "Fire", job: "Dev tools", sym: "Ig", shot: "ignis-1", kw: "json jwt base64 cron curl timestamp tools", line: "Paste anything and it knows what it is: JSON, JWT, Base64, timestamps, cron, cURL. Nothing leaves your Mac." },
  { id: "aqua", n: "Aqua", el: "Water", job: "Mac cleaning", sym: "Aq", shot: "aqua-1", kw: "clean disk cache docker xcode", line: "Knows a developer's disk: build folders, tool caches, simulators, Docker. Says why each item is safe to remove." },
  { id: "cuprum", n: "Cuprum", el: "Copper", job: "Code editor", sym: "Cu", shot: "cuprum-1", kw: "code editor ide", line: "Traces where your data goes across a codebase, and opens a repo already knowing its stack.", own: 1 },
  { id: "lux", n: "Lux", el: "Light", job: "Video", sym: "Lx", shot: "lux-1", kw: "video script", line: "Short videos made from a script, with a live preview of every scene.", own: 1 },
  { id: "mercurius", n: "Mercurius", el: "Quicksilver", job: "Mail", sym: "Hg", shot: "mercurius-1", kw: "mail gmail email inbox", line: "Every Gmail account in one inbox, stored on your Mac. A send is held for ten seconds, just in case.", own: 1 },
  { id: "crystallum", n: "Crystallum", el: "Crystal", job: "Remote desktop", sym: "Cy", shot: "crystallum-1", kw: "rdp remote windows desktop", line: "Your Mac to a Windows PC. The PC's certificate is checked before you sign in.", own: 1 },
  { id: "ros", n: "Ros", el: "Dew", job: "Notes", sym: "Rs", shot: "ros-1", kw: "notes markdown", line: "Notes as plain Markdown files in a folder you own. The other apps write into it." },
];
const BY = Object.fromEntries(APPS.map((a) => [a.id, a]));
const WEB = [
  { id: "labs", n: "VTX Labs", url: "vtxlabs.app", shot: null, line: "Free developer tools in the browser, and the whole VTX family in one place." },
  { id: "craftcv", n: "CraftCV", url: "craftcv.vtxlabs.app", shot: "craftcv-1", line: "Build a resume in your browser and export it as a PDF or PNG. Free, no account, and your CVs stay in your browser." },
];
const PAIRS = [
  { id: "fulmen", cmd: "curl", shot: "fulmen-1", t: "Fulmen · Flows", b: "Before · curl and a loop",
    cap: "<b>The same checkout, as a flow on Fulmen's canvas.</b> Create an order, pay it, wait until it is paid, then clean up. The run log shows every try.",
    term: [["c", "# create an order, pay it, wait until it is paid, clean up"], ["p", "ORDER=$(curl -s -X POST https://api.example.com/orders \\\n    -H \"Authorization: Bearer $TOKEN\" -d @order.json | jq -r .id)"], ["p", "curl -s -X POST https://api.example.com/orders/$ORDER/pay"], ["p", "for i in 1 2 3 4 5 6; do\n  s=$(curl -s https://api.example.com/orders/$ORDER | jq -r .status)\n  [ \"$s\" = \"PAID\" ] && break; sleep 0.5\ndone"], ["p", "curl -s -X DELETE https://api.example.com/orders/$ORDER"], ["o", "{\"deleted\":true}"]] },
  { id: "silva", cmd: "git", shot: "silva-2", t: "Silva · single lines", b: "Before · git add -p",
    cap: "<b>Pick lines in the diff and stage, stash or discard only those.</b> The Git console lists every git command Silva ran, and every action can be undone.",
    term: [["p", "git add -p src/orders.ts"], ["o", "@@ -12,7 +12,9 @@ export async function refund(id) {"], ["o", "Stage this hunk [y,n,q,a,d,s,e,?]? s\nSplit into 3 hunks."], ["o", "Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? e"], ["c", "# an editor opens. delete the lines you don't want. hope."], ["p", "git reset --hard HEAD~1"], ["o", "HEAD is now at 51ab7d0 Validate coupon codes"], ["c", "# that was the wrong one"]] },
  { id: "lapis", cmd: "psql", shot: "lapis-1", t: "Lapis · data grid", b: "Before · psql",
    cap: "<b>Sort, page and filter a table, and edit cells in place.</b> Every write is kept with the SQL that reverses it.",
    term: [["p", "psql -h localhost -U app shop"], ["o", "shop=> SELECT id, order_no, status, total\nshop->   FROM orders ORDER BY id LIMIT 4;\n  id  |   order_no    | status  |  total\n------+---------------+---------+---------\n 1043 | SO-2026-01043 | paid    | 6524.50\n 1044 | SO-2026-01044 | paid    | 5732.00\n 1045 | SO-2026-01045 | paid    | 4940.25\n 1046 | SO-2026-01046 | shipped | 4148.75\n(4 rows)"], ["o", "shop=> UPDATE orders SET status = 'refunded' WHERE id = 1046;\nUPDATE 1"], ["c", "# and the old value was…?"]] },
  { id: "ignis", cmd: "base64", shot: "ignis-1", t: "Ignis · paste anything", b: "Before · cut | base64 | jq",
    cap: "<b>Ignis says what the text is and opens the tool for it.</b> A JWT shows its header, payload and times, and its signature is checked on your computer.",
    term: [["p", "echo \"$JWT\" | cut -d. -f2 | base64 -d | jq ."], ["o", "parse error: Unfinished JSON term at EOF at line 1, column 61"], ["c", "# base64url, no padding. again"], ["p", "echo \"$JWT\" | cut -d. -f2 | tr '_-' '/+' | base64 -d | jq ."], ["o", "{ \"sub\": \"demo\", \"iat\": 1763510400, \"exp\": 1763514000 }"], ["p", "date -r 1763514000"], ["c", "# is it expired? which zone is that?"]] },
];
const PBY = Object.fromEntries(PAIRS.map((p) => [p.id, p]));
const FUL = {
  ver: "v0.57", runs: "macOS · Windows · Linux",
  why: ["I test APIs every day, so I built the client I wanted. Requests leave from Rust, not a browser: no CORS, any header you like, and self-signed certificates work.",
    "Collections, environments and history live in SQLite on your Mac, and a collection can sit in Git as YAML files. It grew from a request sender into flows, checks without a script, and <code>arccc run</code> for CI."],
  shots: [
    { k: "fulmen-1", t: "Flows", x: "Chain requests on a canvas: create an order, pay it, wait until it is paid, and finally clean up. The run log shows every try." },
    { k: "fulmen-2", t: "Checks without a script", x: "Say what the answer must be, and keep a value for the next request, from a table. A contract test checks the answer against the API description." },
    { k: "fulmen-3", t: "Run a whole collection", x: "Every request and its cases, one after another, with what passed and what failed. Reports keep each run." },
  ],
  feats: ["<b>HTTP, GraphQL, WebSocket and Socket.IO, SSE, gRPC, SOAP and MCP.</b>", "Requests leave from Rust, not a browser: <b>no CORS, any header you like</b>, and self-signed certificates work.", "Collections, environments and history in <b>SQLite on your Mac</b>. Keep a collection in Git as YAML files.", "Checks without writing a script, scripts when you want them, and <b>arccc run</b> for CI."],
};
const INSIDE = [
  ["Six database engines, exactly", "Lapis reads and writes values byte for byte on six engines. A value it cannot read exactly is refused, never shown wrong.", "Lapis"],
  ["Restores that cannot half-happen", "Backups restore in one transaction where the engine allows it, and prove every DROP first where it does not.", "Lapis"],
  ["Security before convenience", "SSH host keys checked before a byte is sent, TLS spoken through tunnels, secrets only in the Keychain.", "Ventus · Lapis"],
  ["One kit, eleven apps", "A shared kit gives every app the same themes, motion, update check and a way to hand work to each other.", "vtx-kit"],
  ["Undo for everything", "Silva can undo any Git action, and Lapis keeps the SQL that reverses each write. Mistakes come back.", "Silva · Lapis"],
  ["Tested against real servers", "Live tests run each feature on real Postgres, MySQL, MariaDB, SQL Server, SQLite, MongoDB and Redis.", "Lapis"],
];
const CVS = [["Modern", "Full", "Complete work history and project highlights"], ["Modern", "Short", "One page"], ["Minimal", "Full", "All the details, plain layout"], ["Minimal", "Short", "Just the highlights"]];
const YEARS = Math.floor((Date.now() - Date.UTC(2017, 6, 24)) / (365.25 * 864e5));
PF.data = { APPS, WEB, PAIRS, FUL, YEARS };

/* ---------------- helpers ---------------- */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const BIG = new Set(["lapis-1", "fulmen-1", "silva-2", "ignis-1"]);
const shotURL = (k, mode, w) => `assets/shots/${k}-${mode}-${w || 800}.webp`;
const icon = (id) => `assets/icons/${id}.png`;
const ARR = `<span class="p-arr" aria-hidden="true">→</span>`;
const EXT = `<span class="p-arr" aria-hidden="true">↗</span>`;
const SUN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg>`;
const MOON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>`;
const GRIP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg>`;
const img = (k, alt, cls) => `<img${cls ? ` class="${cls}"` : ""} data-shot="${k}" alt="${esc(alt)}" decoding="async">`;
const paintShots = (root, mode) => root.querySelectorAll("img[data-shot]").forEach((el) => {
  const k = el.dataset.shot; el.src = shotURL(k, mode);
  if (BIG.has(k)) { el.srcset = `${shotURL(k, mode)} 800w, ${shotURL(k, mode, 1600)} 1600w`; el.sizes = el.dataset.sizes || "(min-width: 900px) 60vw, 100vw"; } else el.removeAttribute("srcset");
});
const term = (lines) => lines.map(([t, s]) => t === "p" ? `<span class="p">$ </span><span class="s">${esc(s).replace(/\n/g, "\n  ")}</span>` : `<span class="${t}">${esc(s)}</span>`).join("\n");

/* ---------------- shared blocks (each direction styles them) ---------------- */
const B = {};
B.nav = (d, o) => {
  const home = o.page !== "case", h = (id) => home ? `href="#${d}-${id}"` : `href="#" data-go="home" data-to="${d}-${id}"`;
  return `<header class="p-nav"><div class="p-nav-in">
<a class="p-mark" href="#" data-go="home" aria-label="Tanawat Pinthongpan, home"><span class="p-mark-b">TP</span><span>Tanawat</span></a>
<nav class="p-links" aria-label="Main"><a ${h("work")}${home ? "" : ` aria-current="page"`}>Work</a><a ${h("about")}>About</a><a ${h("cv")}>Resume</a><a href="#" lang="th" data-inert="ภาษาไทย อยู่ที่ /th (ข้อ 3)">TH</a></nav>
<button class="p-tg" type="button" data-tg aria-label="Switch light or dark">${o.mode === "light" ? MOON : SUN}</button>
<a class="p-btn p-btn-ink p-btn-sm" ${h("hire")}>Work with me</a>
<button class="p-menu" type="button" aria-label="Open menu"><i></i><i></i></button>
</div></header>`;
};
B.proof = () => `<ul class="p-proof">
<li><b>${YEARS}</b><span>years shipping web apps, since July 2017</span></li>
<li><b>11</b><span>desktop apps in Rust + Tauri, built solo</span></li>
<li><b>6</b><span>database engines in one window (Lapis)</span></li>
<li><b>2</b><span>web apps live today: VTX Labs, CraftCV</span></li></ul>`;
B.head = (k, t, h, lead, more) => `<div class="p-sh rv"><div><p class="p-eye"><span class="p-k">${k}</span>${t}</p><h2 class="p-h2">${h}</h2>${lead ? `<p class="p-lead">${lead}</p>` : ""}</div>${more || ""}</div>`;
B.hd = (d, o) => B.head(o.k, o.t, o.h, o.l, o.m === "labs" ? `<a class="p-more" href="https://vtxlabs.app">All on VTX Labs ${EXT}</a>` : "");
B.inside = (d) => d === "c"
  ? `<ul class="c-bento">${INSIDE.map(([t, x, w]) => `<li class="cardb hov rv"><p class="p-eye" style="margin-bottom:12px"><span class="p-k">${w}</span></p><b>${t}</b><p>${x}</p></li>`).join("")}</ul>`
  : `<ul class="b-inside">${INSIDE.map(([t, x, w]) => `<li class="rv"><small>${w}</small><b>${t}</b><p>${x}</p></li>`).join("")}</ul>`;
B.fam = (d) => `<ul class="p-fam">${APPS.map((a) => `<li class="p-app cardb hov lift rv" id="${d}-app-${a.id}"><div class="p-app-top"><img src="${icon(a.id)}" alt="" width="48" height="48"><div><h3>${a.n}</h3><span class="m">${a.el} · ${a.job}</span></div></div><p>${esc(a.line)}</p>${a.own ? `<span class="p-tag">Personal build</span>` : a.cas ? `<a class="p-more stretch" href="#" data-go="case">Read the case ${ARR}</a>` : ""}</li>`).join("")}
<li class="p-app p-app-more cardb hov lift rv"><img src="${icon("labs")}" alt="" width="48" height="48"><h3>See them all on VTX Labs</h3><p>Screens, what each one does, and when it ships.</p><a class="p-more stretch" href="https://vtxlabs.app">vtxlabs.app ${EXT}</a></li></ul>`;
B.ba = (d, o) => {
  const ids = (o.pairs || "fulmen,silva,lapis,ignis").split(","), p = PBY[ids[0]];
  const tabs = ids.length > 1 ? `<div class="ba-tabs" role="group" aria-label="Pick a tool">${ids.map((id, i) => `<button type="button" class="ba-tab" data-k="${id}" aria-pressed="${i ? "false" : "true"}"><img src="${icon(id)}" alt="" width="28" height="28"><code>${PBY[id].cmd} →</code> ${BY[id].n}</button>`).join("")}</div>` : "";
  return `<div class="ba-wrap">${tabs}<div class="ba" data-k="${p.id}"><div class="ba-b"><pre class="term">${term(p.term)}</pre></div><div class="ba-a">${img(p.shot, BY[p.id].n + ": " + p.t, "")}</div>
<span class="ba-l l">${esc(p.b)}</span><span class="ba-l r">${esc(p.t)}</span>
<div class="ba-h"><button type="button" class="ba-k" role="slider" aria-label="Before and after: drag or use the arrow keys" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">${GRIP}</button></div></div>
<p class="ba-cap">${p.cap}</p></div>`;
};
B.about = (d) => `<div class="p-about"><div class="p-me rv" aria-hidden="true"><b>TP</b><small>photo: your pick, Q6</small></div><div class="rv">
<p class="p-eye"><span class="p-k">about</span>The person</p>
<h2>Hi, I'm Tanawat.</h2>
<p>A fullstack developer in Thailand. I've shipped web apps for teams since 2017: as a developer, then a senior, then a lead. Leading meant more meetings than code, so I went back to the keyboard.</p>
<p>This year I started VTX: the tools I use every day, built the way I want them. Eleven desktop apps in Rust + Tauri, each named after an element, all built solo. AI is part of how I code, review and ship.</p>
<p class="p-th" lang="th">เขียนเว็บให้ทีมมาตั้งแต่ 2017 ปีนี้ทำเครื่องมือที่ใช้เองทุกวัน 11 ตัว</p>
<dl class="p-stack"><div><dt>Desktop</dt><dd>Rust, Tauri 2, React, TypeScript</dd></div><div><dt>Web</dt><dd>Next.js, React, Tailwind, shadcn/ui</dd></div><div><dt>Data &amp; infra</dt><dd>PostgreSQL, SQLite, Supabase, Vercel, Bun, Docker</dd></div><div><dt>Also shipped</dt><dd>Go, NestJS, Laravel, React Native, Flutter, Swift</dd></div><div><dt>Every day</dt><dd>Claude, Gemini, GPT, Cursor</dd></div></dl></div></div>`;
B.web = () => `<div class="p-web">${WEB.map((w) => `<article class="p-wcard cardb hov lift rv"><figure>${w.shot ? img(w.shot, w.n) : `<img src="${icon("labs")}" alt="" style="width:30%;margin:auto;height:auto;object-fit:contain;padding-top:12%">`}</figure><div><img src="${icon(w.id)}" alt="" width="40" height="40"><span><h3>${w.n}<span class="p-live">live</span></h3><p>${esc(w.line)}</p></span></div><a class="stretch" href="https://${w.url}" aria-label="Open ${w.n}"></a></article>`).join("")}</div>
<div class="p-oss rv"><span>Open source on GitHub:</span><a href="https://github.com/tanawat011/golang-boilerplate">golang-boilerplate</a><a href="https://github.com/tanawat011/nodejs-boilerplate">nodejs-boilerplate</a><a href="https://github.com/tanawat011/nestjs-boilerplate">nestjs-boilerplate</a></div>`;
B.cv = () => `<ul class="p-cv">${CVS.map(([t, l, x]) => `<li class="p-cvc cardb hov rv"><div class="sheet" aria-hidden="true"><i></i><i></i><i></i><i style="width:70%"></i>${l === "Full" ? `<i></i><i style="width:84%"></i>` : ""}</div><h3>${t} · ${l}</h3><span>${x}</span><nav><a href="https://craftcv.vtxlabs.app">View</a><a href="#" data-inert="PDF ดาวน์โหลดจากเว็บจริง">PDF</a></nav></li>`).join("")}</ul>`;
B.hire = (d) => `<div class="p-hire rv"><div><h2>Need something built for your business?</h2><p>Client work goes through VTX Studio: back offices, web apps, mobile apps and LINE bots, from a prototype you can click to a handover with documents.</p>
<div class="acts"><a class="p-btn p-btn-inv" href="#" data-inert="ลิงก์ไป studio.vithi.tech เมื่อเปิดแล้ว (ข้อ 9)">VTX Studio ${ARR}</a><span class="p-soon">opening soon</span><a class="p-btn p-btn-gh" href="#" data-inert="อีเมลจริงอยู่ในเว็บจริง">Email me</a></div></div><div class="orbc" aria-hidden="true"></div></div>`;
B.ft = () => `<footer class="p-ft"><div class="p-in"><div class="p-ft-in"><a class="p-mark" href="#" data-go="home" aria-label="Home"><span class="p-mark-b">TP</span><span>Tanawat</span></a><p class="p-ft-c">© 2026 Tanawat Pinthongpan</p><nav class="p-ft-l" aria-label="Elsewhere"><a href="https://github.com/tanawat011">GitHub</a><a href="#" data-inert="LinkedIn">LinkedIn</a><a href="#" data-inert="อีเมล">Email</a><a href="#" data-inert="LINE">LINE</a><a href="https://vtxlabs.app">VTX Labs</a></nav></div></div></footer>`;
B.gal = () => `<div class="gal"><figure class="gal-fig rv">${img(FUL.shots[0].k, "Fulmen: " + FUL.shots[0].t)}</figure><div class="gal-tabs" role="group" aria-label="Screens">${FUL.shots.map((s, i) => `<button type="button" class="gal-tab" data-k="${s.k}" aria-pressed="${i ? "false" : "true"}"><b>${s.t}</b><span>${s.x}</span></button>`).join("")}</div></div>`;
B.feats = () => `<ul class="feats">${FUL.feats.map((f) => `<li class="feat cardb rv"><i aria-hidden="true"></i><p>${f}</p></li>`).join("")}</ul>`;
B.why = () => `<div class="c-why rv"><h2 class="p-h2">Why I built it</h2><div>${FUL.why.map((p) => `<p>${p}</p>`).join("")}</div></div>`;
B.getit = () => `<div class="getit rv"><div><h2>Fulmen is on VTX Labs</h2><p>${FUL.runs} · a preview build, free while it grows.</p><a class="p-btn p-btn-inv" href="https://vtxlabs.app/apps/fulmen">Open on vtxlabs.app ${EXT}</a></div><img src="${icon("fulmen")}" alt="" width="132" height="132"></div>`;
B.next = () => `<div class="nextc"><a href="#" data-go="home" data-to="$-work"><span class="p-arr" aria-hidden="true">←</span> All work</a><a href="#" data-inert="หน้าเคสของ Lapis (ข้อ 5)"><span>Next</span> <img src="${icon("lapis")}" alt="" width="36" height="36">Lapis ${ARR}</a></div>`;
B.meta = () => `<div class="c-meta"><span>${FUL.ver}</span><span>${FUL.runs}</span><span>Lightning · APIs</span><span>Rust + Tauri 2</span></div>`;
B.sec = (d, o) => `<section class="p-sec"${o.id ? ` id="${d}-${o.id}"` : ""}${o.pt ? ` style="padding-top:0"` : ""}><div class="p-in">${o.inner}</div></section>`;
PF.blocks = B;

/* expand [data-b] placeholders */
const expand = (pv, d, ctx) => {
  pv.querySelectorAll("[data-b]").forEach((el) => {
    const f = B[el.dataset.b]; if (!f) return;
    const o = Object.assign({}, el.dataset, { page: el.closest(".page")?.dataset.p, mode: ctx.mode });
    el.outerHTML = f(d, o).replace(/\$-/g, d + "-");
  });
};

/* ---------------- scroller: the sheet's window, or the iframe's page ---------------- */
const mkScroll = (ctx) => {
  const el = ctx.scroller || null;
  const k = () => { if (!el) return 1; const r = el.getBoundingClientRect(); return r.height / (el.offsetHeight || r.height) || 1; };
  return {
    root: el, k,
    top: () => el ? el.scrollTop : window.scrollY,
    h: () => el ? el.clientHeight : window.innerHeight,
    to: (y, smooth) => (el || window).scrollTo({ top: Math.max(0, y), behavior: smooth && !ctx.reduced ? "smooth" : "auto" }),
    on: (fn) => { const t = el || window; t.addEventListener("scroll", fn, { passive: true }); return () => t.removeEventListener("scroll", fn); },
    yOf: (n) => { if (!el) return n.getBoundingClientRect().top + window.scrollY; const r = el.getBoundingClientRect(); return (n.getBoundingClientRect().top - r.top) / k() + el.scrollTop; },
    vTop: () => el ? el.getBoundingClientRect().top : 0,
  };
};
const io = (S, fn, opts) => new IntersectionObserver(fn, Object.assign({ root: S.root }, opts || {}));
const loop = (S, el, step, add) => {
  /* a frame loop that runs only while el is on screen and the tab is visible */
  let raf = 0, run = false, vis = false, last = 0;
  const frame = (now) => { raf = 0; if (!run) return; const dt = last ? Math.min(.05, (now - last) / 1000) : 1 / 60; last = now; step(dt); raf = requestAnimationFrame(frame); };
  const set = () => { const want = vis && !document.hidden; if (want && !run) { run = true; last = 0; raf = requestAnimationFrame(frame); } else if (!want && run) { run = false; cancelAnimationFrame(raf); raf = 0; } };
  const ob = io(S, (es) => { vis = es[es.length - 1].isIntersecting; set(); }, { threshold: 0 }); ob.observe(el);
  document.addEventListener("visibilitychange", set);
  add(() => { run = false; cancelAnimationFrame(raf); ob.disconnect(); document.removeEventListener("visibilitychange", set); });
};

/* ---------------- shared behaviour ---------------- */
const toast = (pv, msg) => {
  let t = pv.querySelector(".pf-toast");
  if (!t) { t = document.createElement("div"); t.className = "pf-toast"; t.setAttribute("role", "status"); t.style.cssText = "position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:99;max-width:min(92vw,520px);padding:10px 14px;border-radius:12px;background:#15171c;color:#e8eaee;font:500 13.5px/1.45 'Noto Sans Thai','Plus Jakarta Sans',sans-serif;box-shadow:0 0 0 1px rgba(255,255,255,.12),0 16px 36px -16px rgba(0,0,0,.8);pointer-events:none;transition:opacity .2s"; pv.appendChild(t); }
  t.textContent = msg; t.style.opacity = "1"; clearTimeout(t._h); t._h = setTimeout(() => { t.style.opacity = "0"; }, 2200);
};
const baInit = (wrap, ctx, S, add) => {
  const box = wrap.querySelector(".ba"); if (!box) return;
  const knob = box.querySelector(".ba-k"); let x = 50, touched = false, hintDone = false;
  const set = (v) => { x = Math.max(0, Math.min(100, v)); box.style.setProperty("--x", x.toFixed(2) + "%"); knob.setAttribute("aria-valuenow", String(Math.round(x))); };
  const fromE = (e) => { const r = box.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
  let drag = false;
  const down = (e) => { if (e.button > 0) return; drag = true; touched = true; try { box.setPointerCapture(e.pointerId); } catch (er) { /* fine */ } fromE(e); };
  const move = (e) => { if (drag) fromE(e); };
  const up = () => { drag = false; };
  box.addEventListener("pointerdown", down); box.addEventListener("pointermove", move); box.addEventListener("pointerup", up); box.addEventListener("pointercancel", up);
  knob.addEventListener("keydown", (e) => { const st = e.shiftKey ? 20 : 5; let v = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") v = x - st; else if (e.key === "ArrowRight" || e.key === "ArrowUp") v = x + st; else if (e.key === "Home") v = 0; else if (e.key === "End") v = 100;
    if (v != null) { e.preventDefault(); touched = true; set(v); } });
  const show = (id) => { const p = PBY[id]; if (!p) return;
    box.dataset.k = id; box.querySelector(".term").innerHTML = term(p.term);
    const im = box.querySelector(".ba-a img"); im.dataset.shot = p.shot; im.alt = BY[id].n + ": " + p.t; paintShots(box, ctx.mode);
    box.querySelector(".ba-l.l").textContent = p.b; box.querySelector(".ba-l.r").textContent = p.t; wrap.querySelector(".ba-cap").innerHTML = p.cap;
    wrap.querySelectorAll(".ba-tab").forEach((t) => t.setAttribute("aria-pressed", t.dataset.k === id ? "true" : "false")); set(50); };
  wrap.querySelectorAll(".ba-tab").forEach((t) => t.addEventListener("click", () => show(t.dataset.k)));
  if (ctx.reduced) return;
  /* one hint, once, when it first comes into view: the handle leans left and back */
  const ob = io(S, (es) => { if (!es[es.length - 1].isIntersecting || hintDone || touched) return; hintDone = true; ob.disconnect();
    const t0 = performance.now(); const f = (now) => { if (touched) return; const p = Math.min(1, (now - t0) / 1600); set(50 - Math.sin(p * Math.PI) * 14); if (p < 1) requestAnimationFrame(f); };
    setTimeout(() => requestAnimationFrame(f), 500); }, { threshold: .6 });
  ob.observe(box); add(() => ob.disconnect());
};
const galInit = (g, ctx) => {
  const im = g.querySelector(".gal-fig img");
  g.querySelectorAll(".gal-tab").forEach((t) => t.addEventListener("click", () => {
    g.querySelectorAll(".gal-tab").forEach((b) => b.setAttribute("aria-pressed", b === t ? "true" : "false"));
    const s = FUL.shots.find((x) => x.k === t.dataset.k);
    const go = () => { im.dataset.shot = s.k; im.alt = "Fulmen: " + s.t; paintShots(g, ctx.mode); im.classList.remove("is-swap"); };
    if (ctx.reduced) go(); else { im.classList.add("is-swap"); setTimeout(go, 180); }
  }));
};
const common = (pv, ctx, S, add) => {
  const onClick = (e) => {
    const a = e.target.closest("a,button"); if (!a || !pv.contains(a)) return;
    if (a.hasAttribute("data-tg")) { e.preventDefault(); ctx.toggle && ctx.toggle(); return; }
    if (a.dataset.go) { e.preventDefault(); ctx.go && ctx.go(a.dataset.go, a.dataset.to || null); return; }
    if (a.dataset.inert) { e.preventDefault(); toast(pv, "ในพรีวิว: " + a.dataset.inert); return; }
    const h = a.getAttribute("href");
    if (h && h.charAt(0) === "#") { e.preventDefault(); if (h.length > 1) { const t = pv.querySelector(h); if (t) S.to(S.yOf(t) - 88, true); } return; }
    if (h && /^https?:/.test(h)) { e.preventDefault(); toast(pv, "ลิงก์จริง: " + h.replace(/^https?:\/\//, "") + " (พรีวิวไม่เปิดออกไป)"); }
  };
  pv.addEventListener("click", onClick); add(() => pv.removeEventListener("click", onClick));
  const onMove = (e) => { const c = e.target.closest && e.target.closest(".hov"); if (!c) return; const r = c.getBoundingClientRect(), k = r.width / (c.offsetWidth || r.width) || 1, x = (e.clientX - r.left) / k, y = (e.clientY - r.top) / k;
    c.style.setProperty("--mx", x.toFixed(0) + "px"); c.style.setProperty("--my", y.toFixed(0) + "px"); c.style.setProperty("--ma", (Math.atan2(y - r.height / k / 2, x - r.width / k / 2) * 180 / Math.PI + 90).toFixed(0) + "deg"); };
  if (!ctx.touch) { pv.addEventListener("pointermove", onMove, { passive: true }); add(() => pv.removeEventListener("pointermove", onMove)); }
  const rv = [...pv.querySelectorAll(`.page[data-p="${ctx.page}"] .rv`)];
  if (ctx.reduced || !("IntersectionObserver" in window)) rv.forEach((el) => el.classList.add("is-in"));
  else { const ob = io(S, (es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); ob.unobserve(en.target); } }), { rootMargin: "0px 0px -6% 0px" }); rv.forEach((el) => ob.observe(el)); add(() => ob.disconnect()); }
  pv.querySelectorAll(`.page[data-p="${ctx.page}"] .ba-wrap`).forEach((w) => baInit(w, ctx, S, add));
  pv.querySelectorAll(`.page[data-p="${ctx.page}"] .gal`).forEach((g) => galInit(g, ctx));
};

/* =============== A · Constellation: one lit orb, the eleven app icons on a tilted orbit =============== */
const A = (() => {
  const FOV = 26, ORB = .7, ORB_Y = .16, RING_Y = -.1, TILT = .36, TH0 = 1.05, SPD = Math.PI * 2 / 96, N = APPS.length, IC = .5;
  const FRAMES = { wide: { Rx: 2.75, Rz: 1.45, ex: 4.05, ey: 1.9, fy: -1.62 }, mid: { Rx: 2.3, Rz: 1.35, ex: 3.45, ey: 2.0, fy: -1.55 }, narrow: { Rx: 1.95, Rz: 1.2, ex: 3.0, ey: 2.05, fy: -1.45 } };
  const geo = (W, H, kind) => { const g = Object.assign({}, FRAMES[kind] || FRAMES.wide); W = Math.max(1, W); H = Math.max(1, H);
    g.W = W; g.H = H; g.asp = W / H; g.tn = Math.tan(FOV * Math.PI / 360); g.d = Math.max(g.ex / (g.tn * g.asp), g.ey / g.tn); g.cam = [0, g.d * .075, g.d]; return g; };
  const bob = (i, t) => Math.sin(t * .6 + i * 1.7) * .05;
  const onRing = (g, th, yb) => { const x = Math.cos(th) * g.Rx, z = Math.sin(th) * g.Rz, c = Math.cos(TILT), s = Math.sin(TILT); return [x, yb * c - z * s + RING_Y, yb * s + z * c]; };
  const project = (g, p) => { const c = g.cam, fl = Math.hypot(c[0], c[1], c[2]), f = [-c[0] / fl, -c[1] / fl, -c[2] / fl];
    const rl = Math.hypot(f[2], f[0]), r = [-f[2] / rl, 0, f[0] / rl], u = [r[1] * f[2] - r[2] * f[1], r[2] * f[0] - r[0] * f[2], r[0] * f[1] - r[1] * f[0]];
    const v = [p[0] - c[0], p[1] - c[1], p[2] - c[2]], z = v[0] * f[0] + v[1] * f[1] + v[2] * f[2], x = v[0] * r[0] + v[1] * r[1] + v[2] * r[2], y = v[0] * u[0] + v[1] * u[1] + v[2] * u[2];
    return { x: (x / (z * g.tn * g.asp) + 1) / 2 * g.W, y: (1 - y / (z * g.tn)) / 2 * g.H, k: (g.H / 2) / (z * g.tn), z }; };
  const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const fogOf = (g, depth) => smooth(g.d - .6, g.d + 2.6, depth);
  const stops = `<stop offset="0" stop-color="#7cc8ff"/><stop offset=".35" stop-color="#8e97ff"/><stop offset=".7" stop-color="#eef5ff"/><stop offset="1" stop-color="#8e97ff"/>`;
  const still = (stage, g, hits) => {
    const st = stage.querySelector(".a-still"); if (!st || !(g.W > 1 && g.H > 1 && isFinite(g.d))) return; const f2 = (n) => n.toFixed(1);
    const o = project(g, [0, ORB_Y, 0]), od = 2 * ORB * o.k;
    st.querySelector(".a-orbS").style.cssText = `left:${f2(o.x - od / 2)}px;top:${f2(o.y - od / 2)}px;width:${f2(od)}px;z-index:5`;
    const gd = od * 2.9; st.querySelector(".a-glow").style.cssText = `left:${f2(o.x - gd / 2)}px;top:${f2(o.y - gd / 2)}px;width:${f2(gd)}px;height:${f2(gd)}px;z-index:1`;
    const s0 = project(g, [0, g.fy, 0]), sx = project(g, [g.Rx, g.fy, 0]), sf = project(g, [0, g.fy, g.Rz]), sb = project(g, [0, g.fy, -g.Rz]), fw = (sx.x - s0.x) * 2, fh = Math.abs(sf.y - sb.y);
    st.querySelector(".a-floor").style.cssText = `left:${f2(s0.x - fw / 2)}px;top:${f2((sf.y + sb.y) / 2 - fh / 2)}px;width:${f2(fw)}px;height:${f2(fh)}px;z-index:0`;
    let dB = "", dF = "", lb = false, lf = false; const M = 120, pts = [];
    for (let i = 0; i <= M; i++) { const p = onRing(g, i / M * Math.PI * 2, 0); pts.push([project(g, p), p[2]]); }
    for (let i = 0; i < M; i++) { const a = pts[i], b = pts[i + 1], fr = (a[1] + b[1]) / 2 >= 0, m = `M${f2(a[0].x)} ${f2(a[0].y)}`, l = `L${f2(b[0].x)} ${f2(b[0].y)}`;
      if (fr) { dF += (lf ? "" : m) + l; lf = true; lb = false; } else { dB += (lb ? "" : m) + l; lb = true; lf = false; } }
    const ring = (el, d, id, op) => { el.setAttribute("viewBox", `0 0 ${g.W} ${g.H}`); el.innerHTML = `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${g.W}" y2="0">${stops}</linearGradient></defs><path d="${d}" fill="none" stroke="url(#${id})" stroke-width="1.5" stroke-opacity="${op}"/>`; };
    ring(st.querySelector(".a-ring-b"), dB, "a-rgb", .32); ring(st.querySelector(".a-ring-f"), dF, "a-rgf", .75);
    st.querySelector(".a-ring-b").style.zIndex = 1; st.querySelector(".a-ring-f").style.zIndex = 6;
    hits.length = 0;
    st.querySelectorAll(".a-ic").forEach((el, i) => { const p = onRing(g, TH0 + i * Math.PI * 2 / N, bob(i, 0)), q = project(g, p), w = IC * q.k, fog = fogOf(g, q.z);
      el.style.cssText = `left:${f2(q.x)}px;top:${f2(q.y)}px;width:${f2(w)}px;opacity:${(1 - fog * .62).toFixed(3)};z-index:${p[2] >= 0 ? 7 : 2}`;
      hits.push({ id: APPS[i].id, x: q.x, y: q.y, r: w / 2, z: p[2] }); });
  };
  const VS = `varying vec3 vN; varying vec3 vV; varying vec3 vP; varying vec2 vU; varying float vD;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vP = position; vU = uv; vD = -mv.z; gl_Position = projectionMatrix * mv; }`;
  const HEAD = `uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform float uT; uniform vec3 uFogC; uniform vec2 uFog; uniform float uFogA;
varying vec3 vN; varying vec3 vV; varying vec3 vP; varying vec2 vU; varying float vD;
vec3 pal(float t){ float k = abs(fract(t) * 2.0 - 1.0); vec3 c = mix(uA, uB, smoothstep(0.0, 0.5, k)); return mix(c, uC, smoothstep(0.5, 1.0, k)); }
vec3 fogit(vec3 c){ return mix(c, uFogC, smoothstep(uFog.x, uFog.y, vD) * uFogA); }
`;
  const FS_ORB = `uniform vec3 uBase; uniform float uIri; uniform float uSpec;
void main(){ vec3 n = normalize(vN), v = normalize(vV); vec3 L = normalize(vec3(-.45, .72, .53)), Rl = normalize(vec3(.75, .2, -.6));
 float ndv = clamp(dot(n, v), 0.0, 1.0); float fr = pow(1.0 - ndv, 1.8);
 float sw = sin(vP.x * 3.1 + uT * .35) * .10 + sin(vP.y * 3.7 - uT * .27) * .09 + sin((vP.x + vP.z) * 2.3 + uT * .2) * .07;
 vec3 r = reflect(-v, n); vec3 iri = pal(fr * .9 + r.y * .25 + sw + uT * .015); float dif = clamp(dot(n, L), 0.0, 1.0);
 vec3 col = uBase * (.32 + .68 * dif); col = mix(col, iri, clamp(.10 + fr * 1.15, 0.0, 1.0) * uIri); col += iri * smoothstep(.2, .7, r.y) * .10;
 vec3 h = reflect(-L, n); col += vec3(pow(max(dot(h, v), 0.0), 90.0)) * uSpec + vec3(pow(max(dot(h, v), 0.0), 10.0)) * .06;
 col += pal(.35 + n.y * .2) * pow(1.0 - ndv, 3.0) * clamp(dot(n, Rl) * .6 + .5, 0.0, 1.0) * .55; gl_FragColor = vec4(fogit(col), 1.0); }`;
  const FS_RING = `uniform float uO; uniform float uMid;
void main(){ float a = uO * mix(.3, 1.0, smoothstep(uMid + 1.4, uMid - 1.4, vD)); gl_FragColor = vec4(pal(vU.x * 2.0 + uT * .02), a); }`;
  const FS_GLOW = `uniform float uO;
void main(){ vec2 p = vU * 2.0 - 1.0; float a = smoothstep(1.0, 0.0, length(p)); a *= a; vec3 c = mix(vec3(.78, .88, 1.0), pal(atan(p.y, p.x) / 6.2832 + uT * .01), .45); gl_FragColor = vec4(c, a * uO); }`;
  const FS_FLOOR = `uniform float uO; uniform vec3 uCol;
void main(){ vec2 p = vU * 2.0 - 1.0; float a = smoothstep(1.0, 0.0, length(p)); a *= a; gl_FragColor = vec4(mix(uCol, pal(p.x * .5 + .2), .5 * step(.5, uO)), a * uO); }`;
  const FS_IC = `uniform sampler2D uMap; uniform float uO;
void main(){ vec4 c = texture2D(uMap, vU); gl_FragColor = vec4(fogit(c.rgb), c.a * uO); }`;

  const gl = (stage, hero, ctx, S, kind, hits, api, add) => {
    const T = window.THREE; if (!T) return null;
    const host = stage.querySelector(".a-stage-in"), dark = ctx.mode !== "light", lite = !!ctx.phone;
    let alive = true, rend = null, scene = null, cam = null, canvas = null, g = null, t = 0, ts = 1, root, U, ringM, icons = [], bottom = 1;
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 }, wp = new T.Vector3(), qi = new T.Quaternion(), pv3 = new T.Vector3();
    const onPtr = (e) => { const r = hero.getBoundingClientRect(); ptr.tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)); ptr.ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)); };
    const onLeave = () => { ptr.tx = 0; ptr.ty = 0; };
    const draw = () => {
      const sp = Math.min(1, Math.max(0, S.top() / bottom));
      root.rotation.y = ptr.x * .16 + Math.sin(t * .13) * .05; root.rotation.x = ptr.y * .08 + sp * .18; root.position.y = sp * .35; root.updateMatrixWorld();
      U.uT.value = t; qi.copy(root.quaternion).invert();
      const k = (g.H / 2) / g.tn, rect = stage.getBoundingClientRect(), sk = rect.width / (stage.offsetWidth || rect.width) || 1;
      hits.length = 0;
      icons.forEach((m, i) => { const th = TH0 + i * Math.PI * 2 / N + t * SPD, p = onRing(g, th, bob(i, t)); m.position.set(p[0], p[1], p[2]);
        m.quaternion.copy(qi).multiply(cam.quaternion);
        const want = api.hot === APPS[i].id ? 1.32 : api.hot ? .92 : 1; m.scale.setScalar(m.scale.x + (want - m.scale.x) * .18);
        m.getWorldPosition(wp); const dist = wp.distanceTo(cam.position); pv3.copy(wp).project(cam);
        hits.push({ id: APPS[i].id, x: (pv3.x + 1) / 2 * g.W, y: (1 - pv3.y) / 2 * g.H, r: IC * m.scale.x * k / dist / 2, z: wp.z }); });
      if (api.onFrame) api.onFrame(sk);
      rend.render(scene, cam);
      if (!stage.classList.contains("is-live")) stage.classList.add("is-live");
    };
    const fit = () => { const W = stage.clientWidth, H = stage.clientHeight; if (!W || !H || !rend) return;
      g = geo(W, H, kind); rend.setSize(W, H, false); cam.aspect = W / H; cam.position.set(g.cam[0], g.cam[1], g.cam[2]); cam.lookAt(0, 0, 0); cam.updateProjectionMatrix();
      U.uFog.value.set(g.d - .6, g.d + 2.6); ringM.uniforms.uMid.value = g.d; bottom = Math.max(1, stage.offsetTop + H); draw(); };
    const dispose = () => { alive = false; hero.removeEventListener("pointermove", onPtr); hero.removeEventListener("pointerleave", onLeave);
      if (scene) scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) { const u = o.material.uniforms; if (u && u.uMap && u.uMap.value) u.uMap.value.dispose(); o.material.dispose(); } });
      if (rend) { rend.dispose(); rend.forceContextLoss(); } if (canvas) canvas.remove(); scene = rend = canvas = null; stage.classList.remove("is-live"); };
    const build = () => {
      canvas = document.createElement("canvas"); canvas.className = "a-gl"; canvas.setAttribute("aria-hidden", "true");
      const attrs = { alpha: true, antialias: true, depth: true, stencil: false, premultipliedAlpha: true, powerPreference: "low-power" };
      const Q = lite ? { dpr: 1, sph: [40, 28], tube: [160, 4] } : { dpr: Math.min(window.devicePixelRatio || 1, 1.5), sph: [64, 48], tube: [360, 5] };
      const ctxGL = canvas.getContext("webgl2", attrs) || canvas.getContext("webgl", attrs); if (!ctxGL) { canvas = null; return; }
      rend = new T.WebGLRenderer({ canvas, context: ctxGL, alpha: true, antialias: true }); rend.setPixelRatio(Q.dpr); rend.setClearColor(0x000000, 0);
      scene = new T.Scene(); cam = new T.PerspectiveCamera(FOV, 1, .1, 80);
      const C = (h) => new T.Color(h);
      U = { uT: { value: 0 }, uA: { value: C("#7cc8ff") }, uB: { value: C("#8e97ff") }, uC: { value: C("#eef5ff") }, uFogC: { value: C(dark ? "#0b0c0f" : "#f5f6f8") }, uFog: { value: new T.Vector2(8, 11) }, uFogA: { value: dark ? .62 : .5 } };
      const mat = (fs, extra, opts) => new T.ShaderMaterial(Object.assign({ uniforms: Object.assign({}, U, extra), vertexShader: VS, fragmentShader: HEAD + fs }, opts || {}));
      ringM = mat(FS_RING, { uO: { value: dark ? .8 : .75 }, uMid: { value: 8 } }, { transparent: true, depthWrite: false });
      root = new T.Group(); scene.add(root); g = geo(stage.clientWidth || 800, stage.clientHeight || 400, kind);
      const orb = new T.Mesh(new T.SphereGeometry(ORB, Q.sph[0], Q.sph[1]), mat(FS_ORB, { uBase: { value: C(dark ? "#1b1d23" : "#eef0f4") }, uIri: { value: dark ? 1 : .8 }, uSpec: { value: dark ? 1.1 : .9 } }));
      orb.position.y = ORB_Y; root.add(orb);
      const glow = new T.Mesh(new T.PlaneGeometry(ORB * 5.8, ORB * 5.8), mat(FS_GLOW, { uO: { value: dark ? .32 : .22 } }, { transparent: true, depthWrite: false, blending: dark ? T.AdditiveBlending : T.NormalBlending }));
      glow.position.set(0, ORB_Y, -.9); root.add(glow);
      const ring = new T.Group(); ring.rotation.x = TILT; ring.position.y = RING_Y; root.add(ring);
      const pts = []; for (let i = 0; i < 128; i++) { const a = i / 128 * Math.PI * 2; pts.push(new T.Vector3(Math.cos(a) * g.Rx, 0, Math.sin(a) * g.Rz)); }
      ring.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts, true), Q.tube[0], .007, Q.tube[1], true), ringM));
      const ld = new T.TextureLoader(), plane = new T.PlaneGeometry(IC, IC);
      icons = APPS.map((a) => { const tx = ld.load(icon(a.id)); tx.anisotropy = Math.min(4, rend.capabilities.getMaxAnisotropy());
        const m = new T.Mesh(plane, mat(FS_IC, { uMap: { value: tx }, uO: { value: 1 } }, { transparent: true, depthWrite: false })); root.add(m); return m; });
      const floor = new T.Mesh(new T.PlaneGeometry(1, 1), mat(FS_FLOOR, { uO: { value: dark ? .55 : .16 }, uCol: { value: C(dark ? "#7cb4ff" : "#0d0f14") } }, { transparent: true, depthWrite: false, blending: dark ? T.AdditiveBlending : T.NormalBlending }));
      floor.rotation.x = -Math.PI / 2; floor.position.y = g.fy; floor.scale.set(g.Rx * 2, g.Rz * 2, 1); scene.add(floor);
      host.appendChild(canvas); fit();
      loop(S, stage, (dt) => { const k = 1 - Math.exp(-dt * 3); ptr.x += (ptr.tx - ptr.x) * k; ptr.y += (ptr.ty - ptr.y) * k; ts += ((api.hot ? .18 : 1) - ts) * k; t += dt * ts; draw(); }, add);
      if (!ctx.touch) { hero.addEventListener("pointermove", onPtr, { passive: true }); hero.addEventListener("pointerleave", onLeave); }
    };
    add(dispose);
    let tm = 0; const r0 = requestAnimationFrame(() => { tm = setTimeout(() => { if (!alive) return; try { build(); } catch (e) { console.error(e); dispose(); } }, 0); });
    add(() => { cancelAnimationFrame(r0); clearTimeout(tm); });
    return { fit: () => { if (rend) fit(); } };
  };

  const home = (pv, ctx, S, add) => {
    const stage = pv.querySelector(".a-stage"), hero = pv.querySelector(".a-hero"); if (!stage) return;
    const st = stage.querySelector(".a-still"); st.insertAdjacentHTML("beforeend", APPS.map((a) => `<img class="a-ic" src="${icon(a.id)}" alt="">`).join(""));
    const W0 = stage.clientWidth, H0 = stage.clientHeight, kind = ctx.phone || W0 < 640 ? "narrow" : W0 < 900 || W0 / Math.max(1, H0) < 1.35 ? "mid" : "wide";
    const hits = [], api = { hot: null }, tip = stage.querySelector(".a-tip"), hit = stage.querySelector(".a-hit");
    if (W0 && H0) still(stage, geo(W0, H0, kind), hits);
    const showTip = () => { const h = hits.find((x) => x.id === api.hot); if (!h) { tip.classList.remove("is-on"); return; } const a = BY[h.id];
      if (tip.dataset.id !== h.id) { tip.dataset.id = h.id; tip.innerHTML = `<b>${a.n}</b>${a.el} · ${a.job}${a.cas ? " · click for the case" : ""}`; }
      tip.style.left = h.x.toFixed(1) + "px"; tip.style.top = (h.y - h.r).toFixed(1) + "px"; tip.classList.add("is-on"); };
    api.onFrame = () => { if (api.hot) showTip(); };
    const pick = (e) => { const r = stage.getBoundingClientRect(), k = r.width / (stage.offsetWidth || r.width) || 1, x = (e.clientX - r.left) / k, y = (e.clientY - r.top) / k;
      let best = null, bd = 1e9; hits.forEach((h) => { const d = Math.hypot(h.x - x, h.y - y); if (d < h.r * 1.1 + 6 && (d < bd || (best && h.z > best.z && d < h.r))) { best = h; bd = d; } }); return best ? best.id : null; };
    const onMove = (e) => { const id = pick(e); if (id !== api.hot) { api.hot = id; hit.style.cursor = id ? "pointer" : ""; } showTip(); };
    const onLeave = () => { api.hot = null; showTip(); };
    const onTap = (e) => { const id = pick(e); if (!id) return; if (ctx.touch && api.hot !== id) { api.hot = id; showTip(); return; }
      if (BY[id].cas) { ctx.go && ctx.go("case"); return; }
      const card = pv.querySelector(`#a-app-${id}`); if (card) { S.to(S.yOf(card) - 120, true); card.classList.add("is-sel"); setTimeout(() => card.classList.remove("is-sel"), 1600); } };
    hit.addEventListener("pointermove", onMove, { passive: true }); hit.addEventListener("pointerleave", onLeave); hit.addEventListener("click", onTap);
    add(() => { hit.removeEventListener("pointermove", onMove); hit.removeEventListener("pointerleave", onLeave); hit.removeEventListener("click", onTap); });
    const glApi = ctx.reduced ? null : gl(stage, hero, ctx, S, kind, hits, api, add);
    const ro = new ResizeObserver(() => { const W = stage.clientWidth, H = stage.clientHeight; if (W && H && !stage.classList.contains("is-live")) still(stage, geo(W, H, kind), hits); if (glApi) glApi.fit(); });
    ro.observe(stage); add(() => ro.disconnect());
  };
  const caseP = (pv) => {
    const svg = pv.querySelector(".a-cho svg"); if (!svg) return;
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.innerHTML = `<defs><linearGradient id="a-cr" x1="0" x2="1"><stop offset="0" stop-color="#7cc8ff"/><stop offset=".5" stop-color="#8e97ff"/><stop offset="1" stop-color="#eef5ff"/></linearGradient></defs><ellipse cx="50" cy="56" rx="47" ry="15" fill="none" stroke="url(#a-cr)" stroke-width=".5" opacity=".7" transform="rotate(-8 50 56)"/>`;
  };
  return { home, caseP };
})();

/* =============== B · Launcher =============== */
const Bd = (() => {
  const home = (pv, ctx, S, add) => {
    const pal = pv.querySelector(".b-pal"); if (!pal) return;
    const list = pal.querySelector(".b-list"), input = pal.querySelector("input"), win = pal.querySelector(".b-win img"), info = pal.querySelector(".b-info");
    const items = APPS.map((a) => ({ id: a.id, n: a.n, sub: `${a.el} · ${a.job}`, kw: (a.n + " " + a.el + " " + a.job + " " + a.kw).toLowerCase(), grp: "Desktop apps · Rust + Tauri" }))
      .concat(WEB.map((w) => ({ id: w.id, n: w.n, sub: w.id === "labs" ? "Free tools · web" : "Resumes · web", kw: (w.n + " web " + w.line).toLowerCase(), grp: "On the web", web: 1 })));
    let shown = items, sel = "fulmen";
    const render = () => {
      if (!shown.length) { list.innerHTML = `<p class="b-empty">No app called “${esc(input.value)}”. Try “sql”, “git” or “mail”.</p>`; return; }
      let g = ""; list.innerHTML = shown.map((it) => { const head = it.grp !== g ? `<p class="b-grp">${(g = it.grp)}</p>` : "";
        return `${head}<button type="button" class="b-it" role="option" id="b-it-${it.id}" data-id="${it.id}" aria-selected="${it.id === sel ? "true" : "false"}"><img src="${icon(it.id)}" alt="" width="30" height="30"><span><b>${it.n}</b><span>${it.sub}</span></span><em>↵</em></button>`; }).join("");
    };
    const show = (id, instant) => {
      sel = id; list.querySelectorAll(".b-it").forEach((b) => b.setAttribute("aria-selected", b.dataset.id === id ? "true" : "false"));
      input.setAttribute("aria-activedescendant", "b-it-" + id);
      const a = BY[id], w = WEB.find((x) => x.id === id), k = a ? a.shot : w && w.shot ? w.shot : "craftcv-1";
      const go = () => { win.dataset.shot = k; win.alt = (a ? a.n : w.n) + ": a real screen"; paintShots(pal, ctx.mode); win.classList.remove("is-swap"); };
      if (instant || ctx.reduced) go(); else { win.classList.add("is-swap"); clearTimeout(show._t); show._t = setTimeout(go, 150); }
      info.innerHTML = a ? `<div><h3>${a.n}<small>${a.el} · ${a.job}</small></h3><p>${esc(a.line)}</p></div><nav>${a.cas ? `<a class="p-btn p-btn-ink p-btn-sm" href="#" data-go="case">Read the case ${ARR}</a>` : ""}<a class="p-btn p-btn-gh p-btn-sm" href="https://vtxlabs.app">On VTX Labs ${EXT}</a></nav>`
        : `<div><h3>${w.n}<small>web · live</small></h3><p>${esc(w.line)}</p></div><nav><a class="p-btn p-btn-gh p-btn-sm" href="https://${w.url}">${w.url} ${EXT}</a></nav>`;
    };
    render(); show(sel, true);
    list.addEventListener("click", (e) => { const b = e.target.closest(".b-it"); if (!b) return; if (b.dataset.id === sel && BY[sel] && BY[sel].cas) { ctx.go && ctx.go("case"); return; } show(b.dataset.id); });
    if (!ctx.touch) list.addEventListener("pointerover", (e) => { const b = e.target.closest(".b-it"); if (b && b.dataset.id !== sel) show(b.dataset.id); });
    input.addEventListener("input", () => { const q = input.value.trim().toLowerCase(); shown = q ? items.filter((it) => q.split(/\s+/).every((w) => it.kw.includes(w))) : items;
      if (shown.length && !shown.some((it) => it.id === sel)) sel = shown[0].id; render(); if (shown.length) show(sel); });
    input.addEventListener("keydown", (e) => { if (!shown.length) return; const i = shown.findIndex((it) => it.id === sel);
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); const n = shown[(i + (e.key === "ArrowDown" ? 1 : -1) + shown.length) % shown.length]; show(n.id); list.querySelector(`#b-it-${n.id}`)?.scrollIntoView({ block: "nearest" }); }
      else if (e.key === "Enter") { e.preventDefault(); if (BY[sel] && BY[sel].cas) ctx.go && ctx.go("case"); else toast(pv, "ในพรีวิว: เปิดหน้า " + (BY[sel] ? BY[sel].n : sel) + " บน vtxlabs.app"); }
      else if (e.key === "Escape") { input.value = ""; shown = items; render(); show(sel); } });
    if (!ctx.reduced && !ctx.touch) { const wrap = pv.querySelector(".b-palw");
      const mv = (e) => { const r = wrap.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; pal.style.transform = `perspective(1600px) rotateX(${(-y * 2.4).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`; };
      const lv = () => { pal.style.transform = ""; };
      wrap.addEventListener("pointermove", mv, { passive: true }); wrap.addEventListener("pointerleave", lv); add(() => { wrap.removeEventListener("pointermove", mv); wrap.removeEventListener("pointerleave", lv); }); }
  };
  const caseP = (pv, ctx, S, add) => {
    const toc = pv.querySelector(".b-toc"); if (!toc) return; const links = [...toc.querySelectorAll("a")];
    const secs = links.map((a) => pv.querySelector(a.getAttribute("href"))).filter(Boolean);
    const ob = io(S, (es) => es.forEach((en) => { if (en.isIntersecting) links.forEach((a) => a.classList.toggle("is-on", a.getAttribute("href") === "#" + en.target.id)); }), { rootMargin: "-30% 0px -60% 0px" });
    secs.forEach((s) => ob.observe(s)); add(() => ob.disconnect());
  };
  return { home, caseP };
})();

/* =============== C · Elements =============== */
const Cd = (() => {
  const home = (pv, ctx, S, add) => {
    const tbl = pv.querySelector(".c-tbl"), det = pv.querySelector(".c-det"); if (!tbl) return;
    tbl.innerHTML = APPS.map((a, i) => `<button type="button" class="c-el${a.own ? " own" : ""}" data-id="${a.id}" aria-pressed="${a.id === "fulmen" ? "true" : "false"}" aria-label="${a.n}, ${a.el}, ${a.job}"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="s">${a.sym}</span><span><span class="nm">${a.n}</span><span class="j">${a.el} · ${a.job}</span></span><img src="${icon(a.id)}" alt="" width="34" height="34"></button>`).join("")
      + `<button type="button" class="c-el labs" data-id="labs" aria-pressed="false" aria-label="VTX Labs: all of them"><span class="n">+</span><span class="s">Labs</span><span><span class="nm">VTX Labs</span><span class="j">all of them, on the web</span></span></button>`;
    const els = [...tbl.querySelectorAll(".c-el")];
    const show = (id, instant) => {
      els.forEach((b) => b.setAttribute("aria-pressed", b.dataset.id === id ? "true" : "false"));
      const a = BY[id], im = det.querySelector("figure img"), i = APPS.findIndex((x) => x.id === id);
      const fill = () => { im.dataset.shot = a ? a.shot : "craftcv-1"; im.alt = (a ? a.n : "CraftCV") + ": a real screen"; paintShots(det, ctx.mode); im.classList.remove("is-swap"); };
      if (instant || ctx.reduced) fill(); else { im.classList.add("is-swap"); clearTimeout(show._t); show._t = setTimeout(fill, 160); }
      det.querySelector(".tx").innerHTML = a ? `<div class="sy"><b>${a.sym}</b><span class="m">${String(i + 1).padStart(2, "0")} · ${a.el}${a.own ? " · personal build" : ""}</span></div><h3>${a.n} · ${a.job}</h3><p>${esc(a.line)}</p><nav>${a.cas ? `<a class="p-btn p-btn-ink p-btn-sm" href="#" data-go="case">Read the case ${ARR}</a>` : ""}<a class="p-btn p-btn-gh p-btn-sm" href="https://vtxlabs.app">On VTX Labs ${EXT}</a></nav>`
        : `<div class="sy"><b>Labs</b></div><h3>All eleven, on the web</h3><p>VTX Labs has every app's screens, what it does and when it ships, plus free developer tools and CraftCV.</p><nav><a class="p-btn p-btn-gh p-btn-sm" href="https://vtxlabs.app">vtxlabs.app ${EXT}</a></nav>`;
    };
    show("fulmen", true);
    tbl.addEventListener("click", (e) => { const b = e.target.closest(".c-el"); if (b) show(b.dataset.id); });
    if (!ctx.touch) {
      const mv = (e) => { els.forEach((b) => { const r = b.getBoundingClientRect(), k = r.width / (b.offsetWidth || r.width) || 1, cx = r.left + r.width / 2, cy = r.top + r.height / 2, d = Math.hypot(e.clientX - cx, e.clientY - cy) / k;
        b.style.setProperty("--mx", ((e.clientX - r.left) / k).toFixed(0) + "px"); b.style.setProperty("--my", ((e.clientY - r.top) / k).toFixed(0) + "px");
        if (b.getAttribute("aria-pressed") !== "true") b.style.setProperty("--lit", Math.max(0, Math.min(.85, 1 - d / 230)).toFixed(2)); else b.style.removeProperty("--lit"); }); };
      const lv = () => els.forEach((b) => b.style.removeProperty("--lit"));
      tbl.addEventListener("pointermove", mv, { passive: true }); tbl.addEventListener("pointerleave", lv); add(() => { tbl.removeEventListener("pointermove", mv); tbl.removeEventListener("pointerleave", lv); });
    }
  };
  return { home };
})();

/* =============== D · Story =============== */
const Dd = (() => {
  const Y0 = 2017, Y1 = 2027, NOW = 2026 + (Date.now() - Date.UTC(2026, 0, 1)) / (365.25 * 864e5);
  const pct = (y) => ((Math.min(Y1, y) - Y0) / (Y1 - Y0) * 100).toFixed(2) + "%";
  const band = (pv, ctx) => {
    const ax = pv.querySelector(".d-axis"); if (!ax) return;
    const now = Math.min(2026.95, Math.max(2026.05, NOW));
    let h = `<div class="d-line"></div><div class="d-seg web" style="left:${pct(2017.56)};width:calc(${pct(2026)} - ${pct(2017.56)})"></div><div class="d-seg vtx" style="left:${pct(2026.36)};width:calc(${pct(now)} - ${pct(2026.36)})"></div>`;
    for (let y = Y0; y <= Y1; y++) if (!(ctx.phone && y % 2 === 0)) h += `<span class="d-tick" style="left:${pct(y)}">${ctx.phone ? "’" + String(y).slice(2) : y}</span>`;
    h += `<p class="d-lab" style="left:${pct(2017.56)}"><b>2017 · first job</b>Web apps for teams: developer, senior, then lead</p>`;
    h += `<p class="d-lab r" style="right:0;text-align:right"><b>2026 · VTX</b>11 desktop apps, solo</p>`;
    /* the eleven rise from the 2026 point itself and fan up and to the left, so the point stays true to scale */
    const W = ax.clientWidth || 600, R0 = W < 560 ? 40 : 70, R1 = W < 560 ? 22 : 36, mid = (2026.36 + now) / 2, cx = Math.min(W - 24, (mid - Y0) / (Y1 - Y0) * W);
    h += `<div class="d-burst" style="left:${cx.toFixed(1)}px">${APPS.map((a, i) => { const ang = (-176 + i * 82 / (APPS.length - 1)) * Math.PI / 180, rr = R0 + (i % 3) * R1;
      return `<img src="${icon(a.id)}" alt="${a.n}" title="${a.n} · ${a.job}" style="left:${(Math.cos(ang) * rr).toFixed(1)}px;top:${(Math.sin(ang) * rr * .62).toFixed(1)}px">`; }).join("")}</div>`;
    ax.innerHTML = h;
  };
  const story = (pv, ctx, S, add) => {
    const wrap = pv.querySelector(".d-story"); if (!wrap) return;
    const rail = wrap.querySelector(".d-rail"), chs = [...wrap.querySelectorAll(".d-chp")];
    if (ctx.reduced) { rail.style.setProperty("--fill", "calc(100% - 16px)"); chs.forEach((c) => c.classList.add("is-on")); rail.querySelector(".d-dot")?.remove(); return; }
    let raf = 0; const paint = () => { raf = 0;
      const k = S.k(), mid = S.h() * .55, r = wrap.getBoundingClientRect(), top = (r.top - S.vTop()) / k, hgt = r.height / k;
      const p = Math.max(0, Math.min(1, (mid - top) / hgt)), fill = p * (hgt - 16);
      rail.style.setProperty("--fill", fill.toFixed(1) + "px");
      chs.forEach((c) => { const cr = c.getBoundingClientRect(); c.classList.toggle("is-on", (cr.top - S.vTop()) / k < mid + 40); }); };
    const on = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint(); const off = S.on(on); add(() => { off(); cancelAnimationFrame(raf); });
  };
  const fam = (pv) => { const l = pv.querySelector(".d-fam"); if (!l) return;
    l.innerHTML = APPS.map((a) => `<li class="d-fr" id="d-app-${a.id}"><img src="${icon(a.id)}" alt="" width="40" height="40"><b>${a.n}</b><span class="m">${a.el} · ${a.job}${a.own ? " · personal" : ""}</span><p>${esc(a.line)}</p><a class="go stretch" href="${a.cas ? "#" : "https://vtxlabs.app"}"${a.cas ? ` data-go="case"` : ""} aria-label="${a.n}">${a.cas ? "→" : "↗"}</a></li>`).join(""); };
  const prog = (pv, ctx, S, add) => { const bar = pv.querySelector(".d-prog i"), art = pv.querySelector(".page[data-p=case] main"); if (!bar || !art) return;
    let raf = 0; const paint = () => { raf = 0; const k = S.k(), r = art.getBoundingClientRect(), top = (r.top - S.vTop()) / k, h = r.height / k - S.h();
      bar.style.setProperty("--p", (Math.max(0, Math.min(1, -top / Math.max(1, h))) * 100).toFixed(1) + "%"); };
    paint(); const off = S.on(() => { if (!raf) raf = requestAnimationFrame(paint); }); add(() => { off(); cancelAnimationFrame(raf); }); };
  return { home: (pv, ctx, S, add) => { band(pv, ctx); const ax = pv.querySelector(".d-axis"); if (ax) { let w0 = ax.clientWidth; const ro = new ResizeObserver(() => { if (Math.abs(ax.clientWidth - w0) > 2) { w0 = ax.clientWidth; band(pv, ctx); } }); ro.observe(ax); add(() => ro.disconnect()); } story(pv, ctx, S, add); fam(pv); }, caseP: prog };
})();

/* ---------------- directions ---------------- */
const run = (d, fns) => (pv, ctx) => {
  const bin = [], add = (f) => bin.push(f), S = mkScroll(ctx);
  expand(pv, d, ctx); paintShots(pv, ctx.mode); common(pv, ctx, S, add);
  try { if (ctx.page === "home" && fns.home) fns.home(pv, ctx, S, add); if (ctx.page === "case" && fns.caseP) fns.caseP(pv, ctx, S, add); } catch (e) { console.error(e); }
  if (ctx.to) { const id = ctx.to; const r = requestAnimationFrame(() => { const t = pv.querySelector("#" + id); if (t) S.to(S.yOf(t) - 88, false); }); add(() => cancelAnimationFrame(r)); }
  return () => { while (bin.length) { try { bin.pop()(); } catch (e) { /* keep cleaning */ } } };
};
const SW = ["#0b0c0f", "#f5f6f8", "#7cc8ff", "#8e97ff", "#eef5ff"];
PF.DIRS = {
  a: { name: "Constellation", tag: "ลูกแก้ว 3D กับไอคอนแอป 11 ตัวโคจรรอบ ชี้ที่ไอคอนแล้วรู้ว่าตัวไหน", fonts: "WebGL · three.js", swatches: SW, init: run("a", A), three: 1 },
  b: { name: "Launcher", tag: "หน้าแรกเป็น launcher แบบ Raycast พิมพ์ค้นแอปได้ เห็นหน้าจอจริงข้าง ๆ", fonts: "CSS + JS ล้วน", swatches: SW, init: run("b", Bd) },
  c: { name: "Elements", tag: "แอป 11 ตัวเป็นตารางธาตุ แสงเย็นตามเมาส์ กดธาตุแล้วเห็นหน้าจอจริง", fonts: "CSS + JS ล้วน", swatches: SW, init: run("c", Cd) },
  d: { name: "Story", tag: "ตัวคนนำ: แถบปี 2017 → 2026 ตามสเกลจริง และเรื่องเล่าที่จุดแสงเดินตาม scroll", fonts: "CSS + JS ล้วน", swatches: SW, init: run("d", Dd) },
  e: { name: "Before → After", tag: "hero คือ slider: terminal ที่เคยใช้ กับแอปที่ทำขึ้นมาแทน ลากดูได้ 4 คู่", fonts: "CSS + JS ล้วน", swatches: SW, init: run("e", {}) },
};

/* ---------------- standalone page (one Devices frame) ---------------- */
PF.boot = () => {
  const cfg = window.PF_CFG || {}, pv = document.getElementById("pv"), tpl = document.getElementById("tpl"), D = PF.DIRS[cfg.dir]; if (!pv || !D) return;
  const st = { page: cfg.page || "home", mode: cfg.mode || "dark" }; let clean = null;
  const mount = (to) => {
    if (clean) { try { clean(); } catch (e) { /* ignore */ } clean = null; }
    pv.className = "pv d" + cfg.dir; pv.dataset.page = st.page; pv.dataset.mode = st.mode;
    if (cfg.reduced) pv.dataset.reduced = ""; if (cfg.touch) pv.dataset.touch = "";
    document.documentElement.style.background = document.body.style.background = st.mode === "light" ? "#f5f6f8" : "#0b0c0f";
    pv.innerHTML = tpl.innerHTML; window.scrollTo(0, 0);
    clean = D.init(pv, { page: st.page, mode: st.mode, reduced: !!cfg.reduced, touch: !!cfg.touch, phone: !!cfg.phone, tablet: !!cfg.tablet, scroller: null, to,
      go: (p, t) => { st.page = p; mount(t); }, toggle: () => { st.mode = st.mode === "light" ? "dark" : "light"; mount(); } });
  };
  mount(null);
  try { parent.postMessage({ pf: "ready" }, "*"); } catch (e) { /* not framed */ }
};
})();
