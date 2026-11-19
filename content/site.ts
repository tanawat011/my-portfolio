/**
 * The site's words, links and figures, in English (at /) and Thai (at /th): the owner's answers of 19 Nov 2026,
 * "Portfolio 1D 2A 3A … 15A" (docs/decisions.md). Every figure here is checkable; tests/content.test.ts checks them.
 */
export type Lang = "en" | "th";
export type Text = Record<Lang, string>;

export const SITE_URL = "https://tanawat.dev";
export const NAME = "Tanawat Pinthongpan";

/** The first job, the date the old site counted from (Hero.tsx / About.tsx). */
export const FIRST_JOB = Date.UTC(2017, 6, 24);
export function yearsSince(start = FIRST_JOB, now = Date.now()): number {
  return Math.floor((now - start) / (365.25 * 86_400_000));
}

/** A path in the visitor's language: English at the root, Thai under /th. */
export function href(lang: Lang, path = "/"): string {
  if (lang === "en") return path;
  return path === "/" ? "/th" : `/th${path}`;
}
/** The same page in the other language. */
export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "th" : "en";
}

/** 12A: work channels only. All four were on the old site's footer. */
export const LINKS = {
  github: "https://github.com/tanawat011",
  linkedin: "https://www.linkedin.com/in/tanawat-pinthongpan-683a84167/",
  email: "tanawat.works@gmail.com",
  line: "https://line.me/ti/p/zl5L3eSW0B",
  labs: "https://vtxlabs.app",
  craftcv: "https://craftcv.vtxlabs.app",
} as const;

/** 11A: the open-source boilerplates on GitHub (the old site's Portfolio section). */
export const OSS = ["golang-boilerplate", "nodejs-boilerplate", "nestjs-boilerplate"].map((n) => ({ name: n, url: `${LINKS.github}/${n}` }));

/**
 * 10A: the four CVs (the old site's Resume section). Only the PDFs: the old "view online" links on CraftCV return 404
 * since CraftCV 2.0 keeps CVs in the visitor's browser (checked 19 Nov 2026), so they are not linked.
 */
export const CVS = [
  { style: "Modern", len: "full", pdf: "/Modern.pdf" },
  { style: "Modern", len: "short", pdf: "/Modern Short.pdf" },
  { style: "Minimal", len: "full", pdf: "/minimal.pdf" },
  { style: "Minimal", len: "short", pdf: "/minimal short.pdf" },
] as const;

/** The web apps that are live today (11A): VTX Labs and CraftCV. */
export const WEB = [
  { id: "labs", name: "VTX Labs", url: LINKS.labs, host: "vtxlabs.app", shot: null,
    line: { en: "Free developer tools in the browser, and the whole VTX family in one place.", th: "เครื่องมือฟรีสำหรับ developer ที่ใช้ในเบราว์เซอร์ และแอปทั้งครอบครัว VTX ในที่เดียว" } },
  { id: "craftcv", name: "CraftCV", url: LINKS.craftcv, host: "craftcv.vtxlabs.app", shot: "craftcv-1",
    line: { en: "Build a resume in your browser and export it as a PDF or PNG. Free, no account, and your CVs stay in your browser.", th: "สร้าง resume ในเบราว์เซอร์ แล้ว export เป็น PDF หรือ PNG ฟรี ไม่ต้องมีบัญชี และ CV อยู่ในเบราว์เซอร์ของคุณเท่านั้น" } },
] as const;

/**
 * VTX Labs's tool count as last checked by hand (vtxlabs.app's home page: "85 free tools that run in your browser").
 * The page reads the live count while it's built (lib/labs.ts); this stands only when Labs can't be read.
 */
export const LABS_TOOLS = { n: 85, asOf: "2026-11-19" } as const;

/**
 * Opening soon (owner, 19 Nov 2026: "เราก็เอาโปรเจก Studio เราไปแปะใน Live Project เราก็ได้นี่ใช่มะ"). Studio has no
 * domain and nothing deployed yet, so it has no link and no address here until the day it goes live; then it moves
 * into WEB. Its words are the hire card's (T.hireP). It is not counted among the web apps that are live.
 */
export const STUDIO = {
  id: "studio",
  name: "VTX Studio",
  line: {
    en: "Client work: back offices, web apps, mobile apps and LINE bots, from a prototype you can click to a handover with documents.",
    th: "รับงานลูกค้า: ระบบหลังบ้าน เว็บแอป แอปมือถือ และ LINE bot ตั้งแต่ prototype ที่กดลองได้จนส่งมอบพร้อมเอกสาร",
  },
} as const;

/** The story, four chapters. The middle years are not on the old site, so they carry no year (owner's call later). */
export const STORY: { y: Text; h: Text; p: Text[] }[] = [
  { y: { en: "July 2017", th: "กรกฎาคม 2017" }, h: { en: "First job", th: "งานแรก" },
    p: [{ en: "I started as a web developer, building web apps for teams.", th: "เริ่มเป็น web developer ทำเว็บแอปให้ทีม" }] },
  { y: { en: "the years after", th: "ปีต่อ ๆ มา" }, h: { en: "Senior, then lead", th: "Senior → Lead" },
    p: [{ en: "I became a senior developer, then tried leading a team. Leading meant more meetings than code, so I went back to the keyboard.", th: "ขึ้นเป็น senior developer แล้วลองเป็นหัวหน้าทีม พอเป็น lead ก็ประชุมมากกว่าได้เขียนโค้ด เลยกลับมาเขียนโค้ดเหมือนเดิม" }] },
  { y: { en: "2026", th: "2026" }, h: { en: "VTX", th: "VTX" },
    p: [{ en: "I use a database client, an API client, Git, SSH and a dev toolbox every day. In 2026 I started building my own: eleven desktop apps in Rust + Tauri, each named after an element, sharing one kit.", th: "ทุกวันต้องใช้ database client, API client, Git, SSH และเครื่องมือ dev ปี 2026 เลยเริ่มทำของตัวเอง: แอป desktop 11 ตัวด้วย Rust + Tauri ตั้งชื่อตามธาตุ และใช้ kit ชุดเดียวกัน" }] },
  { y: { en: "now", th: "ตอนนี้" }, h: { en: "Labs, CraftCV, Studio", th: "Labs, CraftCV, Studio" },
    p: [{ en: "VTX Labs puts the family and free web tools in one place, CraftCV builds resumes in the browser, and VTX Studio, opening soon, will take client work.", th: "VTX Labs รวมแอปทั้งครอบครัวกับเครื่องมือฟรีบนเว็บไว้ที่เดียว CraftCV สร้าง resume ในเบราว์เซอร์ และ VTX Studio ที่กำลังจะเปิด จะรับงานลูกค้า" },
      { en: "AI is part of how I code, review and ship, every day.", th: "ใช้ AI ทุกวัน ทั้งเขียนโค้ด รีวิว และส่งงาน" }] },
];

/** UI words. */
export const T = {
  skip: { en: "Skip to content", th: "ข้ามไปที่เนื้อหา" },
  home: { en: "Tanawat Pinthongpan, home", th: "Tanawat Pinthongpan หน้าแรก" },
  nav: { work: { en: "Work", th: "งาน" }, about: { en: "About", th: "เกี่ยวกับ" }, resume: { en: "Resume", th: "Resume" }, hire: { en: "Work with me", th: "คุยงาน" } },
  langLink: { en: "TH", th: "EN" },
  langName: { en: "ภาษาไทย", th: "English" },
  theme: { en: "Switch light or dark", th: "สลับธีมสว่าง / มืด" },
  themeText: { en: "Light or dark", th: "ธีมสว่าง / มืด" },
  menu: { en: "Menu", th: "เมนู" },
  role: { en: "Fullstack developer · Thailand", th: "Fullstack developer · ประเทศไทย" },
  h1a: { en: "Web apps since 2017.", th: "เขียนเว็บมาตั้งแต่ 2017" },
  h1b: { en: "In 2026, eleven tools of my own.", th: "ปี 2026 ทำเครื่องมือของตัวเอง 11 ตัว" },
  sub: {
    en: "I've built web apps for teams since July 2017. In 2026 I started VTX: <b>the database, API, Git and SSH tools I use every day</b>, rebuilt in Rust + Tauri, all solo.",
    th: "ทำเว็บแอปให้ทีมมาตั้งแต่กรกฎาคม 2017 ปี 2026 เริ่มทำ VTX: <b>เครื่องมือ database, API, Git และ SSH ที่ใช้ทุกวัน</b> เขียนใหม่ด้วย Rust + Tauri คนเดียวทั้งหมด",
  },
  subOther: { en: "เขียนเว็บให้ทีมมาตั้งแต่ 2017 ปี 2026 ทำเครื่องมือที่ใช้เองทุกวัน 11 ตัว", th: "" },
  readStory: { en: "Read the story", th: "อ่านเรื่องราว" },
  bandLabel: {
    en: "A timeline from 2017 to 2026 drawn to scale: web apps for teams from July 2017, then the VTX family of eleven desktop apps in 2026.",
    th: "เส้นเวลา 2017 ถึง 2026 ตามสเกลจริง: เว็บแอปให้ทีมตั้งแต่กรกฎาคม 2017 แล้วแอป desktop 11 ตัวของ VTX ในปี 2026",
  },
  bandWeb: { en: ["2017 · first job", "Web apps for teams: developer, senior, then lead"], th: ["2017 · งานแรก", "เว็บแอปให้ทีม: developer, senior แล้วก็ lead"] },
  bandVtx: { en: ["2026 · VTX", "11 desktop apps, solo"], th: ["2026 · VTX", "แอป desktop 11 ตัว ทำคนเดียว"] },
  proof: {
    years: { en: "years shipping web apps, since July 2017", th: "ปีที่ทำเว็บแอป ตั้งแต่กรกฎาคม 2017" },
    apps: { en: "desktop apps in Rust + Tauri, built solo", th: "แอป desktop ด้วย Rust + Tauri ทำคนเดียว" },
    // owner, 19 Nov 2026: a figure for the whole family, not one app (was "6 database engines in one window (Lapis)")
    tools: { en: "free tools on VTX Labs, all in your browser", th: "เครื่องมือฟรีบน VTX Labs ใช้ในเบราว์เซอร์ได้เลย" },
    webs: { en: "web apps live today: VTX Labs, CraftCV", th: "เว็บแอปที่เปิดใช้อยู่: VTX Labs, CraftCV" },
  },
  aboutK: { en: "story", th: "story" }, aboutT: { en: "About", th: "เกี่ยวกับ" }, aboutH: { en: "How I got here", th: "มาถึงตรงนี้ได้ยังไง" },
  photo: { en: "Tanawat, smiling, in glasses", th: "Tanawat ยิ้ม ใส่แว่น" },
  workK: { en: "vtx", th: "vtx" }, workT: { en: "Work", th: "งาน" }, workH: { en: "The VTX family", th: "ครอบครัว VTX" },
  workL: { en: "Eleven desktop apps in Rust + Tauri, each named after an element. Four have a case page here; every one has its page on VTX Labs.", th: "แอป desktop 11 ตัวด้วย Rust + Tauri ตั้งชื่อตามธาตุ สี่ตัวมีหน้าเคสในเว็บนี้ และทุกตัวมีหน้าของตัวเองบน VTX Labs" },
  allLabs: { en: "All on VTX Labs", th: "ทั้งหมดบน VTX Labs" },
  personal: { en: "personal", th: "ใช้เอง" },
  readCase: { en: "Read the case", th: "อ่านเคส" },
  onLabs: { en: "on VTX Labs", th: "บน VTX Labs" },
  baK: { en: "before → after", th: "ก่อน → หลัง" }, baT: { en: "What they replace", th: "มาแทนอะไร" },
  baH: { en: "The terminal I used, and the app I built", th: "terminal ที่เคยใช้ กับแอปที่ทำขึ้นมาแทน" },
  baL: { en: "Pick a tool, then drag the handle.", th: "เลือกเครื่องมือ แล้วลากที่จับ" },
  baPick: { en: "Pick a tool", th: "เลือกเครื่องมือ" },
  baSlider: { en: "Before and after: drag, or use the arrow keys", th: "ก่อนและหลัง: ลาก หรือใช้ปุ่มลูกศร" },
  webK: { en: "web", th: "web" }, webT: { en: "On the web", th: "บนเว็บ" }, webH: { en: "Live today", th: "เปิดใช้อยู่ตอนนี้" },
  live: { en: "live", th: "live" },
  oss: { en: "Open source on GitHub:", th: "Open source บน GitHub:" },
  cvK: { en: "cv", th: "cv" }, cvT: { en: "Resume", th: "Resume" }, cvH: { en: "Pick a style, pick a length", th: "เลือกแบบ เลือกความยาว" },
  cvL: { en: "Made with CraftCV. Each one is a PDF.", th: "ทำด้วย CraftCV ทุกแบบเป็นไฟล์ PDF" },
  cvLen: { full: { en: "Full", th: "เต็ม" }, short: { en: "Short", th: "สั้น" } },
  cvX: {
    full: { en: "Complete work history and project highlights", th: "ประวัติการทำงานครบ พร้อมงานเด่น" },
    short: { en: "One page, just the highlights", th: "หน้าเดียว เฉพาะเรื่องสำคัญ" },
  },
  openPdf: { en: "Open the PDF", th: "เปิด PDF" },
  hireH: { en: "Need something built for your business?", th: "อยากได้ระบบสำหรับธุรกิจของคุณ?" },
  hireP: {
    en: "Client work will go through VTX Studio: back offices, web apps, mobile apps and LINE bots, from a prototype you can click to a handover with documents. It opens soon; until then, email me.",
    th: "งานลูกค้าจะทำผ่าน VTX Studio: ระบบหลังบ้าน เว็บแอป แอปมือถือ และ LINE bot ตั้งแต่ prototype ที่กดลองได้จนส่งมอบพร้อมเอกสาร Studio กำลังจะเปิด ระหว่างนี้ทักทางอีเมลได้เลย",
  },
  soon: { en: "opening soon", th: "กำลังจะเปิด" },
  emailMe: { en: "Email me", th: "ส่งอีเมล" },
  privacy: { en: "Privacy", th: "ความเป็นส่วนตัว" },
  allWork: { en: "All work", th: "งานทั้งหมด" },
  next: { en: "Next", th: "ถัดไป" },
  family: { en: "VTX family", th: "ครอบครัว VTX" },
  lookInside: { en: "A look inside", th: "ข้างในเป็นแบบนี้" },
  whatItDoes: { en: "What it does", th: "ทำอะไรได้บ้าง" },
  onLabsH: { en: "is on VTX Labs", th: "อยู่บน VTX Labs" },
  openLabs: { en: "Open on vtxlabs.app", th: "เปิดบน vtxlabs.app" },
  state: {
    preview: { en: "A preview build you can download now, free while it grows.", th: "มี preview build ให้โหลดแล้ว ฟรีระหว่างที่ยังพัฒนาอยู่" },
    later: { en: "Its download comes later; the page has its screens and what it does.", th: "ยังไม่เปิดให้โหลด หน้าแอปมีภาพหน้าจอและบอกว่าทำอะไรได้" },
  },
  notFoundH: { en: "Page not found", th: "ไม่พบหน้านี้" },
  notFoundP: { en: "This page doesn't exist. It may have moved, or the address may be mistyped.", th: "ไม่มีหน้านี้ อาจย้ายไปแล้ว หรือพิมพ์ที่อยู่ผิด" },
} as const;

export const pick = (t: Text, lang: Lang) => t[lang];
