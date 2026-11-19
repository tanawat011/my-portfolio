import type { Text } from "./site";

/**
 * Round 2 (owner, 19 Nov 2026): the old site is the base, in his own playful voice, with round 1's band, story rail
 * and hire card kept. English copy is the old site's own wherever it still holds (components/sections/*.tsx before
 * ebad5a2); Thai is written in the same tone. The jokes live only in FUN; real figures live only in site.ts.
 */

export const HERO = {
  tagline: { en: "Fullstack developer. I build the tools I use.", th: "Fullstack developer ที่ทำเครื่องมือไว้ใช้เอง" },
  line: {
    en: "{y} years of shipping web apps. Lately: <b>11 desktop apps in Rust + Tauri</b>, built solo.",
    th: "ทำเว็บแอปมา {y} ปี ช่วงนี้: <b>แอป desktop 11 ตัวด้วย Rust + Tauri</b> ทำคนเดียว",
  },
  vtx: { en: "Meet the VTX family", th: "รู้จักครอบครัว VTX" },
  who: { en: "Who am I?", th: "ผมคือใคร?" },
  cv: { en: "📄 My Resume", th: "📄 Resume ของผม" },
  scroll: { en: "Scroll down", th: "เลื่อนลง" },
};

export const UPTIME = {
  k: "> uptime",
  pre: { en: "From hello_world to", th: "จาก hello_world สู่" },
  grad: { en: "eleven apps", th: "แอป 11 ตัว" },
  sub: { en: "Drawn to scale. Yes, that's a lot of 2026.", th: "วาดตามสเกลจริง ใช่ ปี 2026 มันเยอะจริง ๆ" },
};

export const ABOUT = {
  pre: { en: "About", th: "รู้จัก" },
  grad: { en: "This Guy", th: "หมอนี่" },
  hey: { en: "Hey, that's me! 👋", th: "หวัดดี นี่ผมเอง 👋" },
  p1: {
    en: "A Fullstack Developer with <b>{y}+ years</b> of turning coffee into code. Been a Senior Dev, tried being a Lead — but meetings aren't my love language. Coding is. So here I am, happily typing away. ⌨️",
    th: "Fullstack developer ที่เปลี่ยนกาแฟเป็นโค้ดมา <b>{y}+ ปี</b> เคยเป็น Senior Dev ลองเป็น Lead แล้ว แต่การประชุมไม่ใช่ทางของผม โค้ดต่างหาก เลยกลับมานั่งพิมพ์อย่างมีความสุข ⌨️",
  },
  p2: {
    en: "Open source contributor by passion. My English speaking? Let's just say I'm better at writing code than writing essays. But I'm working on it — one awkward conversation at a time. 😅",
    th: "รัก open source เป็นทุนเดิม ภาษาอังกฤษพูดได้ไหม? บอกได้แค่ว่าเขียนโค้ดเก่งกว่าเขียนเรียงความ แต่ก็ฝึกอยู่ ทีละบทสนทนาเขิน ๆ 😅",
  },
  photo: { en: "Tanawat, smiling, in glasses", th: "Tanawat ยิ้มแป้น ใส่แว่น" },
  storyH: { en: "How I got here", th: "มาถึงตรงนี้ได้ยังไง" },
  weaponsPre: { en: "My", th: "อาวุธ" },
  weaponsGrad: { en: "Weapons", th: "ประจำตัว" },
  weaponsSub: { en: "Everything I've shipped with, sorted by how often it saves me.", th: "ทุกอย่างที่เคยใช้ส่งงาน เรียงตามความถี่ที่มันช่วยชีวิต" },
};

/** The old site's four "abilities", his jokes included. icon: one of the paths in components/Icons.tsx. */
export const ABILITIES: { icon: string; t: Text; d: Text }[] = [
  { icon: "learn", t: { en: "Fast Learner", th: "เรียนรู้ไว" },
    d: { en: "I ask AI before I ask Google. Stack Overflow? That's so 2020. But hey, I still RTFM — when AI gets confused.", th: "ถาม AI ก่อนถาม Google Stack Overflow เหรอ นั่นมันยุค 2020 แต่ก็ยังอ่าน docs นะ ตอนที่ AI งงเอง" } },
  { icon: "lead", t: { en: "Ex-Lead, By Choice", th: "อดีต Lead โดยสมัครใจ" },
    d: { en: "Tried management. Too many meetings, not enough coding. Went back to the keyboard. No regrets.", th: "ลองเป็นหัวหน้าแล้ว ประชุมเยอะ ได้เขียนโค้ดน้อย เลยกลับมาจับคีย์บอร์ด ไม่เสียใจเลย" } },
  { icon: "team", t: { en: "Team Player", th: "เล่นเป็นทีม" },
    d: { en: "I may code alone at 2 AM, but I play nice with others during office hours. Mostly.", th: "ตีสองอาจเขียนโค้ดคนเดียว แต่เวลางานก็เข้ากับคนอื่นได้ดีนะ ส่วนใหญ่" } },
  { icon: "bug", t: { en: "Bug Slayer", th: "นักล่าบั๊ก" },
    d: { en: "console.log is my debugger. Don't judge — it works.", th: "console.log คือ debugger ของผม อย่าตัดสิน มันใช้ได้จริง" } },
];

/** The old site's skills cards, as they were (About.tsx). */
export const WEAPONS: { t: Text; d: Text; items: { k: Text; v: string }[] }[] = [
  { t: { en: "AI — Always On", th: "AI เปิดตลอด" }, d: { en: "AI is part of my daily workflow — coding, reviewing, and shipping with it.", th: "AI อยู่ในงานทุกวัน ทั้งเขียนโค้ด รีวิว และส่งงาน" },
    // Round 3b (owner): only what he really uses, and no "Models" label: "ไอ่พวกนี้ไม่น่าใช่ Models นะ"
    items: [{ k: { en: "What I actually use", th: "ที่ใช้จริง ๆ" }, v: "Claude Code, Copilot, Gemini, GPT" }] },
  { t: { en: "Current Stack", th: "Stack ตอนนี้" }, d: { en: "My daily driver — what I'm actively building with right now. 🔥", th: "ของที่ขับทุกวัน กำลังสร้างด้วยอยู่ตอนนี้ 🔥" },
    items: [{ k: { en: "Desktop", th: "เดสก์ท็อป" }, v: "Rust, Tauri 2, React, TypeScript" }, { k: { en: "Web", th: "เว็บ" }, v: "Next.js, React, Tailwind, shadcn/ui" }, { k: { en: "Backend & Infra", th: "Backend และ Infra" }, v: "Supabase, PostgreSQL, SQLite, Vercel, Bun, Docker" }] },
  { t: { en: "Languages", th: "ภาษา" }, d: { en: "The weapons I fight with.", th: "อาวุธที่ใช้ออกรบ" },
    items: [{ k: { en: "Primary", th: "หลัก" }, v: "TypeScript, Rust" }, { k: { en: "Also speak", th: "พูดได้อีก" }, v: "JavaScript, Go, Java, Kotlin, Python, PHP, Swift, Dart" }, { k: { en: "Markup & Style", th: "Markup และ Style" }, v: "HTML5, CSS3" }] },
  { t: { en: "Desktop", th: "เดสก์ท็อป" }, d: { en: "Apps that live on your Mac, not in a tab. 🖥️", th: "แอปที่อยู่บน Mac ไม่ใช่ในแท็บเบราว์เซอร์ 🖥️" },
    items: [{ k: { en: "Core", th: "หลัก" }, v: "Tauri 2, Rust (tokio, sqlx), React" }, { k: { en: "Native bits", th: "ของ native" }, v: "Keychain, URL schemes, SSH, RDP, SwiftUI" }] },
  { t: { en: "Web Frameworks & UI", th: "เว็บและ UI" }, d: { en: "Building pixel-perfect UIs since forever.", th: "ไล่ pixel ให้ตรงมาตั้งแต่ไหนแต่ไร" },
    items: [{ k: { en: "Core", th: "หลัก" }, v: "Next.js, React, NestJS, Node.js" }, { k: { en: "Also used", th: "เคยใช้" }, v: "Laravel, RedwoodJS, GraphQL" }, { k: { en: "Styling", th: "Styling" }, v: "Tailwind, Bootstrap, DaisyUI, HeroUI, Ant Design" }] },
  { t: { en: "Mobile", th: "มือถือ" }, d: { en: "Apps that actually ship to the App Store.", th: "แอปที่ขึ้น App Store ได้จริง" },
    items: [{ k: { en: "Cross-platform", th: "Cross-platform" }, v: "React Native, Flutter" }, { k: { en: "Native", th: "Native" }, v: "Swift" }] },
  { t: { en: "Databases & ORM", th: "Database และ ORM" }, d: { en: "Where the data lives (and sometimes dies).", th: "ที่ที่ข้อมูลอาศัยอยู่ (และบางทีก็ตายไป)" },
    items: [{ k: { en: "SQL", th: "SQL" }, v: "PostgreSQL, MySQL, MariaDB, SQL Server, SQLite" }, { k: { en: "NoSQL & Cache", th: "NoSQL และ Cache" }, v: "MongoDB, Redis" }, { k: { en: "ORM", th: "ORM" }, v: "Prisma, TypeORM" }] },
  { t: { en: "Cloud & Platforms", th: "Cloud และ Platform" }, d: { en: "Deploying things to the cloud at 3 AM.", th: "deploy ขึ้น cloud ตอนตีสาม" },
    items: [{ k: { en: "Providers", th: "ผู้ให้บริการ" }, v: "GCP, Firebase, Supabase, Vercel" }, { k: { en: "Infra", th: "Infra" }, v: "Nginx, WordPress" }] },
  { t: { en: "DevOps & Tools", th: "DevOps และเครื่องมือ" }, d: { en: "The toolbox behind the scenes.", th: "กล่องเครื่องมือหลังบ้าน" },
    items: [{ k: { en: "Containers", th: "Containers" }, v: "Docker, Nginx" }, { k: { en: "Package & Runtime", th: "Package และ Runtime" }, v: "Git, npm, Yarn, Bun" }, { k: { en: "Dev Tools", th: "Dev Tools" }, v: "VS Code, IntelliJ IDEA, Xcode" }, { k: { en: "Services", th: "Services" }, v: "Sentry, Resend, ngrok, Line OA" }] },
];

export const VTX = {
  k: "> ls ~/vtx",
  pre: { en: "The", th: "ครอบครัว" },
  grad: { en: "VTX", th: "VTX" },
  post: { en: "family", th: "" },
  lead: {
    en: "I use these tools every day, so I built my own. Eleven desktop apps in Rust + Tauri, each one named after an element, all built solo.",
    th: "ใช้เครื่องมือพวกนี้ทุกวัน เลยทำเองซะเลย แอป desktop 11 ตัวด้วย Rust + Tauri ตั้งชื่อตามธาตุ ทำคนเดียวทั้งหมด",
  },
  chips: ["Rust", "Tauri 2", "React", "TypeScript", "macOS first"],
  /** X4: the newest public release, read from its labs.json when the site is built (lib/releases.ts) */
  ship: { en: "Now shipping", th: "เพิ่งปล่อย" },
  preview: { en: "Preview", th: "Preview" },
  personal: { en: "Personal build", th: "ทำไว้ใช้เอง" },
  readCase: { en: "Read the case", th: "อ่านเคส" },
  onLabs: { en: "On VTX Labs", th: "ดูบน VTX Labs" },
  moreK: "> open vtxlabs.app",
  moreT: { en: "See them all", th: "ดูทั้งหมด" },
  moreP: { en: "Screens, what each one does, and when it ships.", th: "ภาพหน้าจอ แต่ละตัวทำอะไร และจะออกเมื่อไร" },
  insidePre: { en: "What's", th: "ข้างใน" },
  insideGrad: { en: "inside", th: "มีอะไร" },
  insidePost: { en: "them", th: "" },
  insideSub: { en: "The parts I'm proudest of, the ones nobody sees.", th: "ส่วนที่ภูมิใจที่สุด และไม่มีใครเห็น" },
};

export const INSIDE: { t: Text; b: Text }[] = [
  { t: { en: "Six database engines, exactly", th: "database 6 แบบ แบบเป๊ะ ๆ" }, b: { en: "Lapis reads and writes values byte for byte on six engines. A value it cannot read exactly is refused, never shown wrong.", th: "Lapis อ่านและเขียนค่าตรงทุกไบต์บน engine 6 แบบ ค่าไหนอ่านไม่ตรง มันไม่แสดง ไม่ยอมโชว์ผิด" } },
  { t: { en: "Restores that cannot half-happen", th: "restore ที่ไม่มีทางค้างครึ่งทาง" }, b: { en: "Backups restore in one transaction where the engine allows it, and prove every DROP first where it does not.", th: "restore backup ใน transaction เดียวถ้า engine ยอม ถ้าไม่ยอมก็พิสูจน์ทุก DROP ก่อน" } },
  { t: { en: "Security before convenience", th: "ความปลอดภัยมาก่อนความสะดวก" }, b: { en: "SSH host keys checked before a byte is sent, TLS spoken through tunnels, secrets only in the Keychain.", th: "ตรวจ SSH host key ก่อนส่งแม้แต่ไบต์เดียว คุย TLS ผ่าน tunnel และเก็บความลับไว้ใน Keychain เท่านั้น" } },
  { t: { en: "One kit, eleven apps", th: "kit เดียว 11 แอป" }, b: { en: "A shared kit gives every app the same themes, motion, update check and a way to hand work to each other.", th: "kit ชุดเดียวให้ทุกแอปมีธีม การเคลื่อนไหว การเช็กอัปเดต และส่งงานต่อกันได้เหมือนกัน" } },
  { t: { en: "Undo for everything", th: "ย้อนได้ทุกอย่าง" }, b: { en: "Silva can undo any Git action and Lapis keeps the SQL that reverses each write. Mistakes come back.", th: "Silva ย้อนได้ทุกคำสั่ง Git และ Lapis เก็บ SQL ที่ย้อนทุกการแก้ไว้ พลาดแล้วก็เอาคืนได้" } },
  { t: { en: "Tested against real servers", th: "ทดสอบกับ server จริง" }, b: { en: "Live tests run each feature on real Postgres, MySQL, MariaDB, SQL Server, SQLite, MongoDB and Redis.", th: "test ทุกฟีเจอร์บน Postgres, MySQL, MariaDB, SQL Server, SQLite, MongoDB และ Redis ของจริง" } },
];

export const RESUME = {
  pre: { en: "My", th: "Resume" },
  grad: { en: "Resume", th: "ของผม" },
  sub: { en: "Pick a style, pick a length. Grab the PDF — your call. 🤙", th: "เลือกแบบ เลือกความยาว แล้วโหลด PDF ไปเลย ตามสะดวก 🤙" },
  len: { full: { en: "Full", th: "เต็ม" }, short: { en: "Short", th: "สั้น" } },
  lenLabel: { en: "Length", th: "ความยาว" },
  dl: { en: "Download PDF", th: "โหลด PDF" },
  pages: { en: "pages", th: "หน้า" },
  made: { en: "made", th: "ทำเมื่อ" },
  preview: { en: "First page of the {s} resume, {l} version", th: "หน้าแรกของ resume แบบ {s} ฉบับ{l}" },
  styles: {
    Modern: { en: "Dark sidebar, a splash of green.", th: "แถบข้างสีเข้ม แต้มเขียวนิดหน่อย" },
    Minimal: { en: "Black on white. Nothing else.", th: "ดำบนขาว แค่นั้นเลย" },
  } as Record<string, Text>,
  quips: {
    "Modern-full": { en: "The director's cut. Every job, every stack, three pages of it.", th: "ฉบับ director's cut ครบทุกงาน ทุก stack จัดเต็มสามหน้า" },
    "Modern-short": { en: "The trailer. Same story, one page less.", th: "ฉบับตัวอย่างหนัง เรื่องเดิม สั้นลงหนึ่งหน้า" },
    "Minimal-full": { en: "All the details, none of the decoration.", th: "รายละเอียดครบ ไม่มีของตกแต่ง" },
    "Minimal-short": { en: "For recruiters with a coffee in the other hand.", th: "สำหรับ HR ที่ถือกาแฟอยู่อีกมือ" },
  } as Record<string, Text>,
};

/** Tags are checked against each repo (go.mod, package.json, prisma/schema.prisma), grouped by kind. */
export type TagKind = "lang" | "framework" | "data" | "ops";
export const PROJECTS = {
  pre: { en: "My", th: "โปรเจกต์" },
  grad: { en: "Projects", th: "ของผม" },
  sub: { en: "Open source, on GitHub. Clone away.", th: "Open source บน GitHub เอาไปใช้ได้เลย" },
  kinds: { lang: { en: "language", th: "ภาษา" }, framework: { en: "framework", th: "framework" }, data: { en: "data", th: "ข้อมูล" }, ops: { en: "auth & ops", th: "auth และ ops" } } as Record<TagKind, Text>,
  updated: { en: "Updated", th: "อัปเดต" },
  stars: { en: "stars on GitHub", th: "ดาวบน GitHub" },
  open: { en: "Open on GitHub", th: "เปิดบน GitHub" },
  copy: { en: "Copy", th: "ก๊อป" },
  copied: { en: "Copied", th: "ก๊อปแล้ว" },
  peek: { en: "Peek inside", th: "แอบดูข้างใน" },
  close: { en: "Close", th: "ปิด" },
  langs: { en: "Languages", th: "ภาษาในโปรเจกต์" },
  items: [
    { name: "Golang Boilerplate", repo: "golang-boilerplate", mark: "go",
      tags: [["Go", "lang"], ["Gin", "framework"], ["GORM", "data"], ["PostgreSQL", "data"], ["JWT", "ops"], ["Docker", "ops"]] as [string, TagKind][],
      d: { en: "Production-ready Go REST API boilerplate with Clean Architecture, Gin, GORM, JWT, and Docker.", th: "Go REST API boilerplate พร้อมใช้งานจริง Clean Architecture, Gin, GORM, JWT และ Docker" } },
    { name: "Node.js Boilerplate", repo: "nodejs-boilerplate", mark: "node",
      tags: [["TypeScript", "lang"], ["Express", "framework"], ["Prisma", "data"], ["MySQL", "data"], ["JWT", "ops"], ["Docker", "ops"]] as [string, TagKind][],
      d: { en: "Production-ready Node.js REST API boilerplate with TypeScript, Express, Prisma, JWT, and MySQL.", th: "Node.js REST API boilerplate พร้อมใช้งานจริง TypeScript, Express, Prisma, JWT และ MySQL" } },
    { name: "NestJS Boilerplate", repo: "nestjs-boilerplate", mark: "nest",
      tags: [["TypeScript", "lang"], ["NestJS", "framework"], ["TypeORM", "data"], ["PostgreSQL", "data"], ["JWT", "ops"], ["Swagger", "ops"], ["Docker", "ops"]] as [string, TagKind][],
      d: { en: "Production-ready NestJS 11 boilerplate with TypeORM, PostgreSQL, JWT auth, Swagger, and Docker.", th: "NestJS 11 boilerplate พร้อมใช้งานจริง TypeORM, PostgreSQL, JWT auth, Swagger และ Docker" } },
  ],
};

export const LIVE = {
  pre: { en: "Live", th: "เปิดใช้" },
  grad: { en: "Projects", th: "อยู่จริง" },
  sub: { en: "Things I built that are actually running in production 🚀", th: "ของที่ทำแล้วรันอยู่บน production จริง ๆ 🚀" },
  live: { en: "Live", th: "Live" },
  tags: { labs: ["Next.js", "React", "TypeScript", "Vercel"], craftcv: ["Next.js", "React", "TypeScript", "PDF"] } as Record<string, string[]>,
};

/** Jokes, and only jokes: never a real figure in here, never a joke in the real row. */
export const FUN = {
  pre: { en: "Fun", th: "เรื่อง" },
  grad: { en: "Facts", th: "ไร้สาระ" },
  sub: { en: "// stats that no one asked for, but here they are", th: "// สถิติที่ไม่มีใครถาม แต่ก็จัดให้" },
  items: [
    { e: "☕", v: { en: "∞", th: "∞" }, l: { en: "Coffee consumed", th: "กาแฟที่ดื่มไป" }, d: { en: "And counting...", th: "และยังนับต่อ..." } },
    { e: "🐛", v: { en: "9,999+", th: "9,999+" }, l: { en: "Bugs created & fixed", th: "บั๊กที่สร้างและแก้" }, d: { en: "The 10,000th one is still in production", th: "ตัวที่ 10,000 ยังอยู่บน production" } },
    { e: "🔥", v: { en: "0", th: "0" }, l: { en: "Stack Overflow visits", th: "เข้า Stack Overflow" }, d: { en: "Since 2024. Thanks, AI.", th: "ตั้งแต่ 2024 ขอบคุณ AI" } },
    { e: "🤖", v: { en: "AI-assisted", th: "AI ช่วย" }, l: { en: "This website", th: "เว็บนี้" }, d: { en: "Yes, AI helped. No, I'm not ashamed.", th: "ใช่ AI ช่วย ไม่ ไม่อายเลย" } },
    { e: "🌙", v: { en: "Too many", th: "เยอะเกิน" }, l: { en: "Late night deploys", th: "deploy ตอนดึก" }, d: { en: "\"It works on my machine\"", th: "\"เครื่องผมรันได้นะ\"" } },
    { e: "🔄", v: { en: "∞", th: "∞" }, l: { en: "Times said \"one more fix\"", th: "พูดว่า \"แก้อีกนิดเดียว\"" }, d: { en: "3 hours later...", th: "3 ชั่วโมงต่อมา..." } },
  ],
};

/**
 * Round 3b (F2–F5): four that are true, kept apart from the jokes above. The wording can joke; the numbers can't.
 * The figures come from: F2, `du -sk src-tauri/target` in Lapis's repo on 19 Nov 2026, 149,201,132 KiB = 142 GiB,
 * measured once; F3, vtx-kit's dark-theme rule (the strongest text sits at 84–90 % white; Silva and Ignis ~88,
 * Ventus ~87); F4, APPS.length; F5, content/night-commits.json, written by scripts/night-commits.py.
 */
export const TRUE_FACTS = {
  h: { en: "…and four that are actually true", th: "…กับอีก 4 ข้อที่จริงล้วน ๆ" },
  stamp: { en: "true", th: "จริง" },
  build: {
    e: "📦", v: "142 GB",
    l: { en: "Lapis's Rust build folder", th: "โฟลเดอร์ build ของ Lapis (Rust)" },
    d: { en: "Just target/. Measured once, on 19 Nov 2026. My SSD would like a word.", th: "แค่ target/ อย่างเดียว วัดไว้ครั้งเดียวเมื่อ 19 พ.ย. 2026 SSD ผมขอคุยด้วยหน่อย" },
  },
  white: {
    e: "🎨", v: "~88 %",
    l: { en: "White, at the brightest", th: "ความขาวสูงสุด" },
    d: { en: "The strongest text in my dark themes stops at about 88 % white. Tuned all day so your eyes don't burn.", th: "ตัวหนังสือที่สว่างสุดใน dark theme ของผมหยุดที่ขาวประมาณ 88 % นั่งปรับทั้งวัน ให้ตาคุณไม่ไหม้" },
  },
  elements: {
    e: "🧪",
    l: { en: "Apps named after elements", th: "แอปที่ตั้งชื่อตามธาตุ" },
    d: { en: "Still missing one element: enough sleep.", th: "ยังขาดอยู่ธาตุเดียว: ธาตุนอนพอ" },
  },
  night: {
    e: "🌙",
    l: { en: "Of my commits land between midnight and 6 AM", th: "ของ commit ผมเกิดระหว่างเที่ยงคืนถึงตีหก" },
    d: { en: "{n} commits across the VTX repos, as of {date}. The other ones aren't exactly early either.", th: "จาก {n} commit ใน repo ของ VTX ณ {date} ที่เหลือก็ใช่ว่าจะเช้านะ" },
  },
};

/** X2: the terminal behind "> hello_world_". Commands are typed in English; what they print is in the page's language. */
export const TERM = {
  open: { en: "Open the terminal", th: "เปิด terminal" },
  title: { en: "Terminal", th: "Terminal" },
  input: { en: "Command", th: "คำสั่ง" },
  close: { en: "Close the terminal", th: "ปิด terminal" },
  hello: { en: "Welcome in. Type help, or just poke around.", th: "เข้ามาเลย พิมพ์ help หรือจะลองมั่ว ๆ ดูก็ได้" },
  help: {
    en: ["whoami        who's this guy", "ls apps       the VTX family", "cat resume    the PDFs", "sudo hire-me  you know you want to", "clear         wipe the screen", "exit          back to the page", "(there are a few more. no, I won't list them.)"],
    th: ["whoami        หมอนี่คือใคร", "ls apps       ครอบครัว VTX", "cat resume    ไฟล์ PDF", "sudo hire-me  รู้นะว่าอยากกด", "clear         ล้างจอ", "exit          กลับไปที่หน้าเว็บ", "(มีคำสั่งลับอีกนิดหน่อย ไม่บอกหรอก)"],
  },
  whoami: {
    en: ["Tanawat Pinthongpan", "Fullstack developer. I build the tools I use.", "{y} years of shipping web apps, since 2017.", "Lately: {n} desktop apps in Rust + Tauri, built solo."],
    th: ["Tanawat Pinthongpan", "Fullstack developer ที่ทำเครื่องมือไว้ใช้เอง", "ทำเว็บแอปมา {y} ปี ตั้งแต่ 2017", "ช่วงนี้: แอป desktop {n} ตัวด้วย Rust + Tauri ทำคนเดียว"],
  },
  resume: { en: "Pick one. They're all me.", th: "เลือกเอาเลย ทุกไฟล์คือผม" },
  pages: { en: "pages", th: "หน้า" },
  hire: {
    en: ["[sudo] password for recruiter: ********", "Access granted. Good choice. 🎉"],
    th: ["[sudo] password for recruiter: ********", "ผ่าน! ตัดสินใจถูกแล้ว 🎉"],
  },
  hireCard: { en: "or jump to the hire card", th: "หรือไปที่การ์ดจ้างงาน" },
  noSudo: { en: "hire-me: permission denied. Maybe try sudo?", th: "hire-me: permission denied ลอง sudo ดูสิ" },
  coffee: { en: "☕ Brewing… done. That's ∞ + 1.", th: "☕ กำลังชง… เสร็จ นับเป็นแก้วที่ ∞ + 1" },
  sleep: { en: "sleep: command not found. Still missing that element.", th: "sleep: command not found ยังหาธาตุนี้ไม่เจอ" },
  rmrf: { en: "Nice try. This is a portfolio, not a playground. 😏", th: "เกือบไปละ นี่ portfolio นะ ไม่ใช่สนามเด็กเล่น 😏" },
  vim: { en: "You're in vim now. Kidding. Type exit; it works here.", th: "เข้า vim แล้ว ล้อเล่น พิมพ์ exit ได้เลย ที่นี่ออกได้จริง" },
  notFound: { en: "{c}: command not found. Try help.", th: "{c}: ไม่รู้จักคำสั่งนี้ ลอง help ดู" },
};

export const FOOT = {
  ai: { en: "Built with Next.js & a little help from my AI friends 🤖", th: "สร้างด้วย Next.js และเพื่อน AI อีกนิดหน่อย 🤖" },
  top: { en: "Back to top", th: "กลับขึ้นบนสุด" },
};
