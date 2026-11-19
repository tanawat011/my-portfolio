# Decisions

The owner's answers, as given. The proposal page is the private Artifact "Portfolio Directions"
(source in `docs/redesign/round-1/`).

## Round 1 (19 Nov 2026)

`1D 2A 3A 4A 5A 6A 7A 8A 9A 10A 11A 12A 13A 14A 15A`, then: "OK ครับตามนั้นสำหรับ portfolio ถ้ามันออกมาแล้วมีอะไรต้องปรับไว้ค่อยมาคุยกันอีกทีเนอะ"

| # | Answer | What it means here |
|---|---|---|
| 1 | D | Story: the person first, a true-scale band of 2017 → now, a story whose rail follows the scroll, in VTX Studio's direction G colours and type |
| 2 | A | No mixing |
| 3 | A | English at `/`, Thai at `/th` |
| 4 | A | Dark by default, a switch in the header |
| 5 | A | Case pages for Fulmen, Lapis, Silva, Ignis; the other seven link to their VTX Labs pages |
| 6 | A | One real photo in About: the old site's photo, cropped to the face (`public/images/portrait.jpg`; the full photo had a passer-by and is removed), toned cool in CSS |
| 7 | A | Fun Facts gone; the figures row is 9 years (computed, rebuilt daily) · 11 apps · 6 engines · 2 webs (`tests/content.test.ts`) |
| 8 | A | Umami (the family's website, tag `portfolio`, tanawat.dev only); Google Analytics removed, code and `.env.local` |
| 9 | A | "Work with me" → VTX Studio, marked "opening soon" and not linked until it exists; email is the second button |
| 10 | A | The four CVs. Only the PDFs: the old "view online" CraftCV links return 404 since CraftCV 2.0 (checked 19 Nov 2026) |
| 11 | A | Labs and CraftCV as cards with a screen, the three boilerplates as a row; the "My Portfolio" card is gone |
| 12 | A | Footer: GitHub, LinkedIn, email, LINE (plus VTX Labs and Privacy); Facebook, Steam, Telegram removed |
| 13 | A | GitHub profile: the Orbit README, in `tanawat011` (committed there, not pushed) |
| 14 | A | "I build the tools I use." in place of "Solo Developer In the Shadow" |
| 15 | A | No stats cards or view counter |

Also from the owner, through VTX Develop: no GitHub-activity section (the VTX repos are private, the stats services are
flaky, and they count rather than show work); no section of past client or company work.

## Made while building (19 Nov 2026), for the owner to check

- **Studio's patterns:** the same CSP, theme script, font set and kit analytics module as VTX Studio.
- **A Privacy page** (`/privacy`, `/th/privacy`), because the kit's analytics doc asks for one while counting is on.
  It also carries the credits (fonts, Next.js, React).
- **No version numbers** on case pages: they change with every release. The case pages say what Labs says
  (a preview build for Lapis and Fulmen, "download later" for Silva and Ignis).
- **The middle years** (senior, lead) carry no year, because the old site gives none. Tell me the years to add them.
- **Tailwind, framer-motion, next-themes and @next/third-parties** are removed; the old sections, icons and unused
  images are deleted (git keeps them).

## Round 2 (19 Nov 2026)

After running round 1, the owner, verbatim (through VTX Develop): "ผมว่าแบบเก่ายังดูน่าสนใจกว่าเยอะมาก ๆ เลยครับ … เอาจริง ๆ
ผมยังชอบ hero แบบเดิมอยู่นะ … แต่ในของใหม่ผมชอบลูกเล่น timeline ที่มันเลื่อนตาม scroll นะ … Fun Facts ผมก็หายไปเลยแห้ะ
ความกวนผมหายไปเลยอ่ะ … หลัก ๆ จุดที่ผมชอบ 3 ภาพหลังอ่ะ" (the band and figures, the scroll story, the hire card).

So the old site is the base again, in G's colours and type, with those three kept:

- **Hero:** the old one as it was: `<Ta />`, `> hello_world_` typed once, the name with "Tanawat" lit, the tagline, the
  years line, the three buttons, the drifting dots and the scroll mouse. The dots and the mouse rest off screen and under
  Reduce motion.
- **Order:** hero → uptime (the band + the 9 / 11 / 6 / 2 row) → About This Guy (the four abilities, the round photo card,
  the story rail, the weapons) → the VTX family (+ what's inside) → resume → projects → live projects → Fun Facts → hire.
  About moved before VTX: the portfolio sells him first, the work is the proof.
- **Photo:** round, like the old site, but a wider head-and-shoulders crop of the same photo (`me-round.jpg`); the old round
  crop still showed the passer-by.
- **Voice:** the old site's copy wherever it still holds, Thai written in the same tone; the case pages open playfully.
- **Fun Facts are back,** as the old jokes, only in their own block; the real figures stay computed and tested apart.
- **Still out:** GitHub stats (round 1), the dead CraftCV view links (PDFs only), the "My Portfolio" card (11A), the
  "coming" web apps.

## Round 3a (19 Nov 2026)

The owner, verbatim (through VTX Develop): "portfolio ตอนนี้แจ่มเลย … ส่วน skill, ตั้งแต่มาอยู่ [ที่ทำงานปัจจุบัน] ก็ได้จับ java kotlin เพิ่มครับ
ฝากใส่เพิ่มไปให้หน่อยนะ / เอา OpenClaw ออกไปซะ / Dev Tools แปะ vscode กับ intelij ไปด้วย / และไอ่กล่องในภาพนั่นทำให้มันดูน่าสนใจกว่านี้ได้ไม๊นะ".

- **Skills:** Java and Kotlin join "Also speak". OpenClaw is gone from AI Tools. VS Code and IntelliJ IDEA join Dev
  Tools. Nothing says where he uses them (the no-client-names rule still holds; the workplace is redacted from the quote).
- **Resume box:** one card per style with a Full ⇄ Short switch. The paper is each PDF's real first page, and the sheets
  behind it match its real page count; it lifts out of a sleeve on hover. Each card has a one-liner, plus the PDF's own
  page count, size and creation date. `scripts/cv-meta.py` reads all of these from the PDFs, and a test fails if a PDF
  changes without it being re-run.
  - The preview is 240 px tall on purpose. At a readable size, page one shows his phone number and the names of past
    employers and client products. The PDFs themselves still carry them, so that's the owner's call.
  - The short versions are 2 pages, not one, so the old "One-page" label is gone.
- **Projects box:** each card has its stack's mark (Simple Icons, CC0) and pills tinted by kind (language, framework,
  data, auth & ops). GitHub's own stars, last push date and language bar are read at build time and once a day after,
  never from the visitor's browser; anything that fails to load is left out. Each card also has a `git clone` line with
  Copy, and a "Peek inside" panel showing the repo's real top-level folders.
- **Fixed in passing:** state toggles now use a data attribute, never the class list. React had been rewriting the class
  list of cards that fade in on scroll, so "Peek inside" and the case-page screenshot tabs made their own card vanish.
  A test now guards this.

## Round 3b (19 Nov 2026)

The owner, verbatim (through VTX Develop): "X1 X2 X4 X6 X7 + F2 F3 F4 F5 / ai tool ตอนนี้เอาแค่ที่เราใช้จริงดีกว่า / Claude Code,
Copilot, Gemini, GPT ไอ่พวกนี้ไม่น่าใช่ Models นะ เอาคำว่า Models ออกด้วย".

- **AI card (X7):** one list, "What I actually use": Claude Code, Copilot, Gemini, GPT. The "Models" label is gone, and
  so are Cursor and Antigravity. Asked about Dev Tools too, he said "เอาออกด้วย", so Dev Tools is VS Code, IntelliJ IDEA
  and Xcode, and neither name appears anywhere on the site (round 1's unused STACK list went too).
- **X1 (scroll effects like Studio's):** not built. It waits for his picks on Studio's motion preview.
- **The hello_world terminal (X2):** `> hello_world_` is a button. Clicking it, or focusing it and typing, opens a small
  terminal over the hero, so nothing moves.
  - `help`, `whoami`, `ls apps`, `cat resume`, `sudo hire-me`, `clear`, `exit`, and a few unlisted ones (`coffee`,
    `sleep`, `rm -rf`, `vim`, `hire-me` without sudo).
  - Everything it prints is real: his name, years and line, the eleven apps, the four PDFs, his email and the hire card.
  - Esc, `exit`, × or a click elsewhere closes it, and focus returns to the button. ↑/↓ recall earlier commands.
  - Under Reduce motion the replies appear at once.
- **Now shipping (X4):** the newest release, from each `vtx-<app>-release` repo's labs.json.
  - Read at build time through github.com's latest-download link: no API, no token, no call from the visitor.
  - A 404 means no public release yet. Any other failure hides the strip, because a partial answer could show an
    older release as the newest.
  - When two apps ship the same day, both show (today: Lapis 0.4.0 and Fulmen 0.58.0, both 19 Nov 2026).
- **Share image and icons (X6):** a 1200×630 card in English and in Thai: the hero's look, his name and line, three
  plain facts and the round photo. The icon is "Ta" from the `<Ta />` logo, in G's gradient, as favicon.ico
  (16/32/48), a 192 px icon and a 180 px Apple icon. `scripts/brand-images.ts` draws them with the site's own fonts.
  Round 1's "TP" icon.svg and the old 640×640 og-image.png are gone.
- **Four true Fun Facts (F2–F5),** in their own row, "…and four that are actually true", each stamped ✓ true. The six
  jokes are untouched.
  - **F2, 142 GB:** `du -sk` on Lapis's `src-tauri/target` on 19 Nov 2026 gave 149,201,132 KiB = 142 GiB. VTX Develop's
    earlier reading was ~140. Labelled "measured once".
  - **F3, ~88 %:** vtx-kit's dark-theme rule (strongest text at 84–90 % white; Silva and Ignis ~88, Ventus ~87).
  - **F4, 11:** the app count, computed.
  - **F5, 7 %:** share of his commits made between 00:00 and 05:59 in each commit's own local time.
    - Measured by `scripts/night-commits.py` over every VTX repo on his Mac: non-merge commits on any branch, his
      author name only (so "Claude"-authored commits are out), each counted once.
    - 3,099 commits as of 19 Nov 2026. Only that aggregate is committed, in `content/night-commits.json`.
