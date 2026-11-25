import type { Text } from "./site";

/**
 * The VTX family, as the old site (VtxFamily.tsx) and VTX Labs (vtx-labs content/apps.ts, content/app-shots.ts) say it.
 * Case pages (5A): Fulmen, Lapis, Silva, Ignis. Every other app links to its page on VTX Labs.
 * Screens are Labs' own (real frontends, made-up data, already public) in public/apps/shots.
 */
export interface App { id: string; name: string; el: Text; job: Text; line: Text; personal?: boolean; /** OKLCH hue of its element colour (the old site and Labs) */ hue: number }

export const APPS: App[] = [
  { id: "lapis", hue: 273, name: "Lapis", el: { en: "Stone", th: "หิน" }, job: { en: "Databases", th: "ฐานข้อมูล" },
    line: { en: "PostgreSQL, MySQL / MariaDB, SQLite, SQL Server, MongoDB and Redis in one window. Every write is kept with the SQL that reverses it.", th: "PostgreSQL, MySQL / MariaDB, SQLite, SQL Server, MongoDB และ Redis ในหน้าต่างเดียว ทุกการแก้ข้อมูลเก็บ SQL ที่ย้อนกลับได้ไว้ด้วย" } },
  { id: "fulmen", hue: 288, name: "Fulmen", el: { en: "Lightning", th: "สายฟ้า" }, job: { en: "APIs", th: "API" },
    line: { en: "HTTP, GraphQL, WebSocket, gRPC, SSE and MCP. Requests leave from Rust, not a browser.", th: "HTTP, GraphQL, WebSocket, gRPC, SSE และ MCP ส่ง request จาก Rust ไม่ใช่จากเบราว์เซอร์" } },
  { id: "silva", hue: 148, name: "Silva", el: { en: "Wood", th: "ไม้" }, job: { en: "Git", th: "Git" },
    line: { en: "A Git graph where every action can be undone. Runs your own git, so hooks, LFS and signing behave as in your terminal.", th: "Git graph ที่ย้อนได้ทุกคำสั่ง ใช้ git ของคุณเอง hooks, LFS และการเซ็น commit จึงทำงานเหมือนใน terminal" } },
  { id: "ventus", hue: 206, name: "Ventus", el: { en: "Wind", th: "ลม" }, job: { en: "SSH", th: "SSH" },
    line: { en: "Reads your ~/.ssh/config, known_hosts and agent, and checks the host key before sending anything.", th: "อ่าน ~/.ssh/config, known_hosts และ agent ของคุณ และตรวจ host key ก่อนส่งอะไรออกไป" } },
  { id: "ignis", hue: 35, name: "Ignis", el: { en: "Fire", th: "ไฟ" }, job: { en: "Dev tools", th: "เครื่องมือ dev" },
    line: { en: "Paste anything and it knows what it is: JSON, JWT, Base64, timestamps, cron, cURL. Nothing leaves your computer.", th: "วางอะไรก็ได้ มันรู้ว่าคืออะไร: JSON, JWT, Base64, timestamp, cron, cURL ข้อมูลไม่ออกจากเครื่อง" } },
  { id: "aqua", hue: 245, name: "Aqua", el: { en: "Water", th: "น้ำ" }, job: { en: "Mac cleaning", th: "ล้างเครื่อง Mac" },
    line: { en: "Knows a developer's disk: build folders, tool caches, simulators, Docker. Says why each item is safe to remove.", th: "รู้จักดิสก์ของ developer: build folder, cache ของเครื่องมือ, simulator, Docker และบอกว่าทำไมแต่ละอย่างลบได้" } },
  { id: "cuprum", hue: 54, name: "Cuprum", el: { en: "Copper", th: "ทองแดง" }, job: { en: "Code editor", th: "โปรแกรมเขียนโค้ด" }, personal: true,
    line: { en: "Traces where your data goes across a codebase, and opens a repo already knowing its stack.", th: "ไล่ดูว่าข้อมูลไหลไปไหนทั้ง codebase และเปิด repo มาก็รู้ stack ทันที" } },
  { id: "lux", hue: 85, name: "Lux", el: { en: "Light", th: "แสง" }, job: { en: "Video", th: "วิดีโอ" }, personal: true,
    line: { en: "Short videos made from a script, with a live preview of every scene.", th: "ทำวิดีโอสั้นจากบท เห็นตัวอย่างทุกฉากสด ๆ" } },
  { id: "mercurius", hue: 262, name: "Mercurius", el: { en: "Quicksilver", th: "ปรอท" }, job: { en: "Mail", th: "อีเมล" }, personal: true,
    line: { en: "Every Gmail account in one inbox, stored on your Mac. A send is held for ten seconds, just in case.", th: "ทุกบัญชี Gmail ในกล่องเดียว เก็บไว้ใน Mac ส่งแล้วรอ 10 วินาที เผื่อเปลี่ยนใจ" } },
  { id: "crystallum", hue: 236, name: "Crystallum", el: { en: "Crystal", th: "คริสตัล" }, job: { en: "Remote desktop", th: "รีโมตเดสก์ท็อป" }, personal: true,
    line: { en: "Your Mac to a Windows PC. The PC's certificate is checked before you sign in.", th: "จาก Mac ไปเครื่อง Windows ตรวจใบรับรองของเครื่องก่อนเข้าสู่ระบบ" } },
  { id: "ros", hue: 172, name: "Ros", el: { en: "Dew", th: "น้ำค้าง" }, job: { en: "Notes", th: "โน้ต" },
    line: { en: "Notes as plain Markdown files in a folder you own. The other apps write into it.", th: "โน้ตเป็นไฟล์ Markdown ธรรมดาในโฟลเดอร์ของคุณ แอปอื่นในครอบครัวเขียนลงมาได้" } },
];

export const labsUrl = (id: string) => `https://vtxlabs.app/apps/${id}`;

/** One line of a terminal: p = a command you type, o = output, c = a comment. */
export type TermLine = ["p" | "o" | "c", string];
export interface Pair { cmd: string; shot: string; before: Text; after: Text; cap: Text; term: TermLine[] }
export interface Shot { k: string; t: Text; x: Text }
export interface Case {
  id: string; title: Text; stand: Text; why: Text[]; pull: Text; runs: string; state: "preview" | "later";
  shots: Shot[]; feats: Text[]; pair: Pair;
}

const PAIRS: Record<string, Pair> = {
  fulmen: {
    cmd: "curl", shot: "fulmen-1", before: { en: "Before · curl and a loop", th: "ก่อน · curl กับ loop" }, after: { en: "Fulmen · Flows", th: "Fulmen · Flows" },
    cap: { en: "<b>The same checkout, as a flow on Fulmen's canvas.</b> Create an order, pay it, wait until it is paid, then clean up. The run log shows every try.", th: "<b>checkout เดียวกัน เป็น flow บน canvas ของ Fulmen</b> สร้าง order จ่ายเงิน รอจนจ่ายสำเร็จ แล้วลบทิ้ง run log เก็บทุกครั้งที่ลอง" },
    term: [["c", "# create an order, pay it, wait until it is paid, clean up"], ["p", "ORDER=$(curl -s -X POST https://api.example.com/orders \\\n    -H \"Authorization: Bearer $TOKEN\" -d @order.json | jq -r .id)"], ["p", "curl -s -X POST https://api.example.com/orders/$ORDER/pay"], ["p", "for i in 1 2 3 4 5 6; do\n  s=$(curl -s https://api.example.com/orders/$ORDER | jq -r .status)\n  [ \"$s\" = \"PAID\" ] && break; sleep 0.5\ndone"], ["p", "curl -s -X DELETE https://api.example.com/orders/$ORDER"], ["o", "{\"deleted\":true}"]],
  },
  silva: {
    cmd: "git", shot: "silva-2", before: { en: "Before · git add -p", th: "ก่อน · git add -p" }, after: { en: "Silva · single lines", th: "Silva · ทีละบรรทัด" },
    cap: { en: "<b>Pick lines in the diff and stage, stash or discard only those.</b> The Git console lists every git command Silva ran, and every action can be undone.", th: "<b>เลือกบรรทัดใน diff แล้ว stage, stash หรือทิ้งเฉพาะบรรทัดนั้น</b> Git console แสดงทุกคำสั่ง git ที่ Silva รัน และทุกคำสั่งย้อนกลับได้" },
    term: [["p", "git add -p src/orders.ts"], ["o", "@@ -12,7 +12,9 @@ export async function refund(id) {"], ["o", "Stage this hunk [y,n,q,a,d,s,e,?]? s\nSplit into 3 hunks."], ["o", "Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? e"], ["c", "# an editor opens. delete the lines you don't want. hope."], ["p", "git reset --hard HEAD~1"], ["o", "HEAD is now at 51ab7d0 Validate coupon codes"], ["c", "# that was the wrong one"]],
  },
  lapis: {
    cmd: "psql", shot: "lapis-1", before: { en: "Before · psql", th: "ก่อน · psql" }, after: { en: "Lapis · data grid", th: "Lapis · ตารางข้อมูล" },
    cap: { en: "<b>Sort, page and filter a table, and edit cells in place.</b> Every write is kept with the SQL that reverses it.", th: "<b>เรียง แบ่งหน้า กรองตาราง และแก้ข้อมูลในช่องได้เลย</b> ทุกการแก้เก็บ SQL ที่ย้อนกลับได้ไว้ด้วย" },
    term: [["p", "psql -h localhost -U app shop"], ["o", "shop=> SELECT id, order_no, status, total\nshop->   FROM orders ORDER BY id LIMIT 4;\n  id  |   order_no    | status  |  total\n------+---------------+---------+---------\n 1043 | SO-2026-01043 | paid    | 6524.50\n 1044 | SO-2026-01044 | paid    | 5732.00\n 1045 | SO-2026-01045 | paid    | 4940.25\n 1046 | SO-2026-01046 | shipped | 4148.75\n(4 rows)"], ["o", "shop=> UPDATE orders SET status = 'refunded' WHERE id = 1046;\nUPDATE 1"], ["c", "# and the old value was…?"]],
  },
  ignis: {
    cmd: "base64", shot: "ignis-1", before: { en: "Before · cut | base64 | jq", th: "ก่อน · cut | base64 | jq" }, after: { en: "Ignis · paste anything", th: "Ignis · วางอะไรก็ได้" },
    cap: { en: "<b>Ignis says what the text is and opens the tool for it.</b> A JWT shows its header, payload and times, and its signature is checked on your computer.", th: "<b>Ignis บอกว่าข้อความคืออะไร แล้วเปิดเครื่องมือที่ใช้ให้</b> JWT แสดง header, payload และเวลา และตรวจลายเซ็นในเครื่องของคุณ" },
    term: [["p", "echo \"$JWT\" | cut -d. -f2 | base64 -d | jq ."], ["o", "parse error: Unfinished JSON term at EOF at line 1, column 61"], ["c", "# base64url, no padding. again"], ["p", "echo \"$JWT\" | cut -d. -f2 | tr '_-' '/+' | base64 -d | jq ."], ["o", "{ \"sub\": \"demo\", \"iat\": 1763510400, \"exp\": 1763514000 }"], ["p", "date -r 1763514000"], ["c", "# is it expired? which zone is that?"]],
  },
};
/** The home page's before → after, in this order. */
export const HOME_PAIRS = ["fulmen", "silva", "lapis", "ignis"].map((id) => ({ id, ...PAIRS[id] }));

export const CASES: Case[] = [
  {
    id: "fulmen", runs: "macOS · Windows · Linux", state: "preview", pair: PAIRS.fulmen,
    title: { en: "Fulmen, an API client that sends from Rust", th: "Fulmen: API client ที่ส่ง request จาก Rust" },
    stand: { en: "I test APIs every day, and browsers kept saying no (hi, CORS). So I built my own, and it sends from Rust.", th: "ทดสอบ API ทุกวัน แล้วเบราว์เซอร์ก็ชอบปฏิเสธ (หวัดดี CORS) เลยทำเองซะ แล้วส่งจาก Rust ไปเลย" },
    why: [
      { en: "Requests leave from Rust, not a browser: no CORS, any header you like, and self-signed certificates work.", th: "request ออกจาก Rust ไม่ใช่จากเบราว์เซอร์: ไม่ติด CORS ใส่ header อะไรก็ได้ และใช้กับ certificate ที่เซ็นเองได้" },
      { en: "Collections, environments and history live in SQLite on your Mac, and a collection can sit in Git as YAML files. It grew from a request sender into flows, checks without a script, and <code>arccc run</code> for CI.", th: "collection, environment และประวัติเก็บใน SQLite บน Mac ของคุณ และเก็บ collection ใน Git เป็นไฟล์ YAML ได้ จากตัวส่ง request ธรรมดา มันโตมาเป็น flow, การตรวจคำตอบโดยไม่ต้องเขียน script และ <code>arccc run</code> สำหรับ CI" },
    ],
    pull: { en: "The same checkout, before and after.", th: "checkout เดียวกัน ก่อนและหลัง" },
    shots: [
      { k: "fulmen-1", t: { en: "Flows", th: "Flows" }, x: { en: "Chain requests on a canvas: create an order, pay it, wait until it is paid, and finally clean up. The run log shows every try.", th: "ต่อ request บน canvas: สร้าง order จ่ายเงิน รอจนจ่ายสำเร็จ แล้วลบทิ้ง run log แสดงทุกครั้งที่ลอง" } },
      { k: "fulmen-2", t: { en: "Checks without a script", th: "ตรวจคำตอบโดยไม่ต้องเขียน script" }, x: { en: "Say what the answer must be, and keep a value for the next request, from a table. A contract test checks the answer against the API description.", th: "บอกว่าคำตอบต้องเป็นอะไร และเก็บค่าไว้ใช้ใน request ถัดไป จากตาราง contract test ตรวจคำตอบกับคำอธิบาย API" } },
      { k: "fulmen-3", t: { en: "Run a whole collection", th: "รันทั้ง collection" }, x: { en: "Every request and its cases, one after another, with what passed and what failed. Reports keep each run.", th: "ทุก request และทุก case ทีละตัว พร้อมผลว่าผ่านหรือไม่ผ่าน report เก็บทุกรอบที่รัน" } },
    ],
    feats: [
      { en: "<b>HTTP, GraphQL, WebSocket and Socket.IO, SSE, gRPC, SOAP and MCP.</b>", th: "<b>HTTP, GraphQL, WebSocket และ Socket.IO, SSE, gRPC, SOAP และ MCP</b>" },
      { en: "Requests leave from Rust, not a browser: <b>no CORS, any header you like</b>, and self-signed certificates work.", th: "request ออกจาก Rust ไม่ใช่เบราว์เซอร์: <b>ไม่ติด CORS ใส่ header ได้ทุกตัว</b> และใช้ certificate ที่เซ็นเองได้" },
      { en: "Collections, environments and history in <b>SQLite on your Mac</b>. Keep a collection in Git as YAML files.", th: "collection, environment และประวัติอยู่ใน <b>SQLite บน Mac ของคุณ</b> เก็บ collection ใน Git เป็นไฟล์ YAML ได้" },
      { en: "Checks without writing a script, scripts when you want them, and <b>arccc run</b> for CI.", th: "ตรวจคำตอบได้โดยไม่ต้องเขียน script เขียน script เมื่ออยากเขียน และ <b>arccc run</b> สำหรับ CI" },
    ],
  },
  {
    id: "lapis", runs: "macOS · Windows · Linux", state: "preview", pair: PAIRS.lapis,
    title: { en: "Lapis, six databases in one window", th: "Lapis: database หกแบบในหน้าต่างเดียว" },
    stand: { en: "Six databases, one window, and no more \"wait, what was the old value?\". I use a database client every day, so I built mine.", th: "database 6 แบบ หน้าต่างเดียว และไม่ต้องถามอีกแล้วว่า \"เมื่อกี้ค่าเดิมมันคืออะไรนะ\" ใช้ database client ทุกวัน เลยทำของตัวเอง" },
    why: [
      { en: "PostgreSQL, MySQL and MariaDB, SQLite, SQL Server, MongoDB and Redis in one window. Values are read and written byte for byte: a value Lapis cannot read exactly is refused, never shown wrong.", th: "PostgreSQL, MySQL และ MariaDB, SQLite, SQL Server, MongoDB และ Redis ในหน้าต่างเดียว อ่านและเขียนค่าตรงทุกไบต์: ค่าไหนที่ Lapis อ่านได้ไม่ตรง มันจะไม่แสดง ไม่ยอมแสดงผิด" },
      { en: "Edit data in a grid, and every write is kept with the SQL that reverses it. SSH tunnels check the host key first, and a PROD connection asks you to type its name before anything destructive.", th: "แก้ข้อมูลในตาราง และทุกการแก้เก็บ SQL ที่ย้อนกลับได้ไว้ SSH tunnel ตรวจ host key ก่อน และการเชื่อมต่อ PROD จะให้พิมพ์ชื่อก่อนทำอะไรที่ลบหรือทำลายข้อมูล" },
    ],
    pull: { en: "Every write keeps the SQL that reverses it.", th: "ทุกการแก้ เก็บ SQL ที่ย้อนกลับได้ไว้เสมอ" },
    shots: [
      { k: "lapis-1", t: { en: "Data in a grid", th: "ข้อมูลในตาราง" }, x: { en: "Sort, page and filter a table, and edit cells in place. Every write is kept with the SQL that reverses it.", th: "เรียง แบ่งหน้า กรองตาราง และแก้ในช่องได้เลย ทุกการแก้เก็บ SQL ที่ย้อนกลับได้ไว้" } },
      { k: "lapis-2", t: { en: "ER diagram", th: "ER diagram" }, x: { en: "Pick the tables, and Lapis draws their columns and the keys between them. A Pro feature, coming later.", th: "เลือกตาราง แล้ว Lapis วาด column และ key ที่เชื่อมกันให้ เป็นฟีเจอร์ Pro ที่จะมาทีหลัง" } },
      { k: "lapis-3", t: { en: "Explain and Analyze", th: "Explain และ Analyze" }, x: { en: "The plan the database chose, step by step: the rows it expected beside the rows it read, and the slowest step marked.", th: "แผนที่ database เลือก ทีละขั้น: จำนวนแถวที่คาดไว้เทียบกับที่อ่านจริง และทำเครื่องหมายขั้นที่ช้าที่สุด" } },
    ],
    feats: [
      { en: "<b>PostgreSQL, MySQL and MariaDB, SQLite, SQL Server, MongoDB and Redis</b> in one window.", th: "<b>PostgreSQL, MySQL และ MariaDB, SQLite, SQL Server, MongoDB และ Redis</b> ในหน้าต่างเดียว" },
      { en: "Edit data in a grid. <b>Every write is kept with the SQL that reverses it.</b>", th: "แก้ข้อมูลในตาราง <b>ทุกการแก้เก็บ SQL ที่ย้อนกลับได้ไว้</b>" },
      { en: "Compare schemas and rows, back up and restore whole databases, and manage users and roles.", th: "เทียบ schema และแถว backup และ restore ทั้ง database และจัดการ user กับ role" },
      { en: "SSH tunnels that check the host key first. <b>A PROD connection asks you to type its name</b> before anything destructive.", th: "SSH tunnel ที่ตรวจ host key ก่อน <b>การเชื่อมต่อ PROD ให้พิมพ์ชื่อก่อน</b> จะทำอะไรที่ทำลายข้อมูล" },
    ],
  },
  {
    id: "silva", runs: "macOS · Windows", state: "preview", pair: PAIRS.silva,
    title: { en: "Silva, a Git client where every action can be undone", th: "Silva: Git client ที่ย้อนได้ทุกคำสั่ง" },
    stand: { en: "I use Git all day, and everyone has a reset --hard story. So in Silva, every action can be undone.", th: "ใช้ Git ทั้งวัน และใคร ๆ ก็มีเรื่องเศร้ากับ reset --hard เลยทำให้ทุกคำสั่งใน Silva ย้อนกลับได้" },
    why: [
      { en: "It runs your own git, so hooks, LFS, commit signing and credential helpers behave as they do in your terminal. The Git console lists every command Silva runs, ready to copy.", th: "มันใช้ git ของคุณเอง hooks, LFS, การเซ็น commit และ credential helper จึงทำงานเหมือนใน terminal และ Git console แสดงทุกคำสั่งที่ Silva รัน ก๊อปไปใช้ต่อได้" },
      { en: "Every action can be undone, and discarded changes are kept. Blame, history across renames, staging single lines, and conflicts settled block by block are all there.", th: "ทุกคำสั่งย้อนกลับได้ และของที่ทิ้งไปยังเก็บไว้ มี blame, ประวัติข้ามการเปลี่ยนชื่อไฟล์, stage ทีละบรรทัด และแก้ conflict ทีละช่วง" },
    ],
    pull: { en: "Every action can be undone.", th: "ทุกคำสั่งย้อนกลับได้" },
    shots: [
      { k: "silva-1", t: { en: "The commit graph", th: "Commit graph" }, x: { en: "Branches, tags and commits in one view. Pick a commit to see who made it, what it changed, and what you can do with it.", th: "branch, tag และ commit ในมุมมองเดียว เลือก commit แล้วเห็นว่าใครทำ เปลี่ยนอะไร และทำอะไรต่อได้บ้าง" } },
      { k: "silva-2", t: { en: "Stage single lines", th: "Stage ทีละบรรทัด" }, x: { en: "Pick lines in the diff and stage, stash or discard only those. The Git console below lists every git command Silva ran.", th: "เลือกบรรทัดใน diff แล้ว stage, stash หรือทิ้งเฉพาะบรรทัดนั้น Git console ด้านล่างแสดงทุกคำสั่ง git ที่ Silva รัน" } },
      { k: "silva-3", t: { en: "Conflicts before you merge", th: "เห็น conflict ก่อน merge" }, x: { en: "A ⚠ on a branch means it would conflict. Silva names the files and offers Compare, Merge or Rebase. A Pro feature, coming later.", th: "⚠ บน branch แปลว่าจะ conflict Silva บอกชื่อไฟล์ และให้เลือก Compare, Merge หรือ Rebase เป็นฟีเจอร์ Pro ที่จะมาทีหลัง" } },
    ],
    feats: [
      { en: "<b>Every action can be undone,</b> and discarded changes are kept.", th: "<b>ทุกคำสั่งย้อนกลับได้</b> และของที่ทิ้งไปยังเก็บไว้" },
      { en: "Runs your own git, so hooks, LFS, commit signing and credential helpers behave as they do in your terminal.", th: "ใช้ git ของคุณเอง hooks, LFS, การเซ็น commit และ credential helper จึงทำงานเหมือนใน terminal" },
      { en: "The Git console lists every command Silva runs, <b>ready to copy</b>.", th: "Git console แสดงทุกคำสั่งที่ Silva รัน <b>ก๊อปไปใช้ได้</b>" },
      { en: "Blame, history across renames, and conflicts settled block by block: this side, that side, both, or the base.", th: "blame, ประวัติข้ามการเปลี่ยนชื่อไฟล์ และแก้ conflict ทีละช่วง เลือกฝั่งนี้ ฝั่งนั้น ทั้งสองฝั่ง หรือ base" },
      { en: "Coming later in Pro: bisect, worktrees, splitting a commit, and typing your own result in the 3-way editor.", th: "จะมาทีหลังในตัว Pro: bisect, worktree, แยก commit และพิมพ์ผลลัพธ์เองในตัวแก้ conflict แบบ 3 ทาง" },
    ],
  },
  {
    id: "ignis", runs: "macOS · Windows · Linux", state: "later", pair: PAIRS.ignis,
    title: { en: "Ignis, a toolbox that knows what you pasted", th: "Ignis: กล่องเครื่องมือที่รู้ว่าคุณวางอะไรลงไป" },
    stand: { en: "I reach for small tools all day, and I'd rather not paste a real token into some random website. So they live in one app that never goes online.", th: "ใช้เครื่องมือเล็ก ๆ ทั้งวัน และไม่อยากวาง token จริงลงเว็บไหนก็ไม่รู้ เลยรวมไว้ในแอปเดียวที่ไม่ออกเน็ตเลย" },
    why: [
      { en: "Paste anything, and Ignis says what it is and opens the tool for it: JSON, JWT, Base64, timestamps, cron, cURL and more. Nothing leaves your computer, so a real token is safe to paste.", th: "วางอะไรก็ได้ Ignis บอกว่ามันคืออะไรแล้วเปิดเครื่องมือที่ใช้ให้: JSON, JWT, Base64, timestamp, cron, cURL และอีกหลายอย่าง ข้อมูลไม่ออกจากเครื่อง วาง token จริงได้อย่างสบายใจ" },
      { en: "A cURL command turns into code in 23 languages, with Open in Fulmen, and SQL opens in Lapis the same way. It also picks a colour or reads text anywhere on screen, and translates Thai and English offline.", th: "คำสั่ง cURL แปลงเป็นโค้ดได้ 23 ภาษา พร้อมปุ่มเปิดใน Fulmen และ SQL เปิดใน Lapis ได้แบบเดียวกัน ดูดสีหรืออ่านข้อความจากตรงไหนบนจอก็ได้ และแปลไทย อังกฤษแบบไม่ต้องต่อเน็ต" },
    ],
    pull: { en: "Nothing leaves your computer.", th: "ข้อมูลไม่ออกจากเครื่อง" },
    shots: [
      { k: "ignis-1", t: { en: "Paste anything", th: "วางอะไรก็ได้" }, x: { en: "Ignis says what the text is and opens the tool for it. A JWT shows its header, payload and times, and its signature is checked on your computer.", th: "Ignis บอกว่าข้อความคืออะไร แล้วเปิดเครื่องมือที่ใช้ให้ JWT แสดง header, payload และเวลา และตรวจลายเซ็นในเครื่องของคุณ" } },
      { k: "ignis-2", t: { en: "Numbers stay as written", th: "ตัวเลขคงเดิมตามที่เขียน" }, x: { en: "JSON as text or a tree, with every number kept exactly as written. Ignis says which ones JavaScript would change.", th: "JSON แบบข้อความหรือแบบ tree ตัวเลขทุกตัวคงเดิมตามที่เขียน และบอกว่าตัวไหน JavaScript จะเปลี่ยนค่า" } },
      { k: "ignis-3", t: { en: "cURL to code", th: "cURL เป็นโค้ด" }, x: { en: "Turn a cURL command into code in the language you pick, with notes on what curl does that the code does not.", th: "แปลงคำสั่ง cURL เป็นโค้ดภาษาที่เลือก พร้อมบอกว่า curl ทำอะไรที่โค้ดไม่ได้ทำ" } },
    ],
    feats: [
      { en: "<b>Paste anything:</b> Ignis says what it is and opens the tool for it. JSON, JWT, Base64, timestamps, cron, cURL and more.", th: "<b>วางอะไรก็ได้:</b> Ignis บอกว่าคืออะไรแล้วเปิดเครื่องมือให้ JSON, JWT, Base64, timestamp, cron, cURL และอื่น ๆ" },
      { en: "<b>Nothing leaves your computer,</b> so a real token or customer record is safe to paste.", th: "<b>ข้อมูลไม่ออกจากเครื่อง</b> วาง token หรือข้อมูลลูกค้าจริงได้อย่างปลอดภัย" },
      { en: "cURL to code in 23 languages, with Open in Fulmen. SQL opens in Lapis the same way.", th: "cURL เป็นโค้ดได้ 23 ภาษา พร้อมเปิดใน Fulmen และ SQL เปิดใน Lapis ได้แบบเดียวกัน" },
      { en: "Pick a colour or read text anywhere on screen, and translate Thai and English offline.", th: "ดูดสีหรืออ่านข้อความจากตรงไหนบนจอก็ได้ และแปลไทย อังกฤษแบบออฟไลน์" },
    ],
  },
];

export const caseById = (id: string) => CASES.find((c) => c.id === id);
export const appById = (id: string) => APPS.find((a) => a.id === id)!;
export const hasCase = (id: string) => CASES.some((c) => c.id === id);
