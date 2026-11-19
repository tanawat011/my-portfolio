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
    items: [{ k: { en: "Models", th: "โมเดล" }, v: "Claude, Gemini, GPT" }, { k: { en: "Tools", th: "เครื่องมือ" }, v: "OpenClaw, Cursor, Antigravity" }] },
  { t: { en: "Current Stack", th: "Stack ตอนนี้" }, d: { en: "My daily driver — what I'm actively building with right now. 🔥", th: "ของที่ขับทุกวัน กำลังสร้างด้วยอยู่ตอนนี้ 🔥" },
    items: [{ k: { en: "Desktop", th: "เดสก์ท็อป" }, v: "Rust, Tauri 2, React, TypeScript" }, { k: { en: "Web", th: "เว็บ" }, v: "Next.js, React, Tailwind, shadcn/ui" }, { k: { en: "Backend & Infra", th: "Backend และ Infra" }, v: "Supabase, PostgreSQL, SQLite, Vercel, Bun, Docker" }] },
  { t: { en: "Languages", th: "ภาษา" }, d: { en: "The weapons I fight with.", th: "อาวุธที่ใช้ออกรบ" },
    items: [{ k: { en: "Primary", th: "หลัก" }, v: "TypeScript, Rust" }, { k: { en: "Also speak", th: "พูดได้อีก" }, v: "JavaScript, Go, Python, PHP, Swift, Dart" }, { k: { en: "Markup & Style", th: "Markup และ Style" }, v: "HTML5, CSS3" }] },
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
    items: [{ k: { en: "Containers", th: "Containers" }, v: "Docker, Nginx" }, { k: { en: "Package & Runtime", th: "Package และ Runtime" }, v: "Git, npm, Yarn, Bun" }, { k: { en: "Dev Tools", th: "Dev Tools" }, v: "Antigravity, Cursor, Xcode" }, { k: { en: "Services", th: "Services" }, v: "Sentry, Resend, ngrok, Line OA" }] },
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
  version: { en: "version", th: "" },
  dl: { en: "Download PDF", th: "โหลด PDF" },
  items: {
    "Modern-full": { emoji: "📄", d: { en: "Detailed resume with complete work history, skills breakdown, and project highlights.", th: "resume แบบละเอียด ประวัติการทำงานครบ แยกทักษะ และงานเด่น" } },
    "Modern-short": { emoji: "⚡", d: { en: "One-page summary — quick and clean overview of experience and skills.", th: "สรุปหน้าเดียว ดูประสบการณ์และทักษะได้ไวและสะอาดตา" } },
    "Minimal-full": { emoji: "🧾", d: { en: "Clean, no-nonsense layout with all the details. Let the content do the talking.", th: "เลย์เอาต์เรียบ ไม่อ้อมค้อม รายละเอียดครบ ให้เนื้อหาพูดเอง" } },
    "Minimal-short": { emoji: "📝", d: { en: "Ultra-compact. Just the highlights. Perfect for a quick scan.", th: "สั้นสุด ๆ เฉพาะไฮไลต์ เหมาะกับการกวาดตาดูเร็ว ๆ" } },
  } as Record<string, { emoji: string; d: Text }>,
};

export const PROJECTS = {
  pre: { en: "My", th: "โปรเจกต์" },
  grad: { en: "Projects", th: "ของผม" },
  sub: { en: "Open source, on GitHub. Clone away.", th: "Open source บน GitHub เอาไปใช้ได้เลย" },
  items: [
    { name: "Golang Boilerplate", repo: "golang-boilerplate", emoji: "🔷", tags: ["Go", "Gin", "GORM", "JWT", "Docker", "PostgreSQL"],
      d: { en: "Production-ready Go REST API boilerplate with Clean Architecture, Gin, GORM, JWT, and Docker.", th: "Go REST API boilerplate พร้อมใช้งานจริง Clean Architecture, Gin, GORM, JWT และ Docker" } },
    { name: "Node.js Boilerplate", repo: "nodejs-boilerplate", emoji: "🟢", tags: ["TypeScript", "Express", "Prisma", "JWT", "Docker", "MySQL"],
      d: { en: "Production-ready Node.js REST API boilerplate with TypeScript, Express, Prisma, JWT, and MySQL.", th: "Node.js REST API boilerplate พร้อมใช้งานจริง TypeScript, Express, Prisma, JWT และ MySQL" } },
    { name: "NestJS Boilerplate", repo: "nestjs-boilerplate", emoji: "🔴", tags: ["NestJS", "TypeScript", "TypeORM", "PostgreSQL", "JWT", "Docker", "Swagger"],
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

export const FOOT = {
  ai: { en: "Built with Next.js & a little help from my AI friends 🤖", th: "สร้างด้วย Next.js และเพื่อน AI อีกนิดหน่อย 🤖" },
  top: { en: "Back to top", th: "กลับขึ้นบนสุด" },
};
