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

## X1, scroll effects (19 Nov 2026)

The owner, on VTX Studio's motion preview (through VTX Develop): "ดูดีเลยครับ Studio motion 1 2 3 4 5 6". All six, applied
here the way Studio's preview does them (vtx-studio, branch `motion-preview`, e80e93b), with the same numbers.

1. **Staged fade and rise:** heading, then text, then cards, 70 ms apart (50 on phones). It replaces the old `.rv`
   fade-up, so there's one entrance, never two.
2. **Zoom:** the hero recedes as you scroll away from it; a case page's screens (before/after, the gallery) grow from
   0.92 to full size as they come in. Phones get less of both.
3. **Parallax:** the hero's light pools, and the glows of the hire card and the Labs card, move slower than the page.
   The orb drifts. Off on phones.
4. **Pinned story:** "How I got here" stays put while the page's own scroll moves through its four chapters; the rail
   and dot follow, and the photo card stays beside it. Only on screens ≥ 1100 px wide with a mouse or trackpad.
5. **Count-up:** only the four real figures (9 / 11 / 6 / 2), once. Never the Fun Facts.
6. **Headings word by word:** a Thai phrase and the gradient word are one piece each.

Guards, the same as Studio's:
- Reduce motion turns all of it off.
- Text is never hidden if script fails. Only the runtime hides anything, and only what's below the fold. If it
  never starts, the head script's classes go after 8 s.
- Native scroll speed: sticky and scroll-driven CSS only; nothing takes over the wheel.
- Measured in headless Chrome on his Mac (scratch scripts):
  - CLS while scrolling the whole page: 0.0002 on desktop, 0.0007 on a phone.
  - Frame time during a full-page scroll gesture: ~16.7 ms mean and ~17.5 ms p95 with all six on, the same as with
    all off (one frame over 25 ms in ~950).
- Fixed on the way: the story rail's dot moved by changing `top`, which counted as layout shift (0.007–0.037). It
  now moves by transform, and the line scales.

## Round 3c (19 Nov 2026)

The owner, verbatim (through VTX Develop): "จุดในภาพอ่ะ ผมว่าทำแบบเดิมเถอะ 555 แม่งอารมเหมือนค้างเลื่อนไม่ไปอ่ะ / Package & Runtime
เพิ่ม pnpm, brew ไปหน่อย", about the pinned "How I got here".

- **Effect 4 is off here.** The story scrolls normally again with round 2's rail: the dot travels down as you read,
  chapters at their natural spacing. The dot keeps the transform fix, so it's still no layout shift. Effects 1, 2, 3,
  5 and 6 stay.
- **Package & Runtime:** Git, npm, pnpm, Yarn, Bun, Homebrew.
- The skills audit waits for his answer.

## Last notes (19 Nov 2026)

The owner, verbatim (through VTX Develop): "Portfolio ผมว่าน่าจะผ่านแล้วล่ะ / ภาพแรกปุ่มพวกนั้นปรับให้เป็นการกดแล้ว scroll ลงมา
ไม่ใช่แว้บมาเลย / ภาพสองคือน่าจะต้องเป็นตัวเลขอื่นมีไม๊คับ ไม่เอาแบบเจาะจงระบบเดียวแบบนี้ / ภาพสาม ถ้าอันไหนที่เราทำไว้ใช้เองไม่ได้แจก
ก็แปะไปสักหน่อยให้รู้ว่าคุณไม่มีโอกาสได้ใช้หรอก 555 และอย่าลืมบอกหน่อยนะว่าทุกระบบ เรา offline แท้บ 100% ทุกอย่างอยู่ในเครื่องคุณเอง
และอีกเรื่องคือบอกไปสักหน่อยแล้วกันว่าใช้ AI ช่วยซะเยอะเลย 555 เราต้องยอมรับความจริงใจยุคใหม่นี้ / ภาพที่สี่คือเปลี่ยนไม๊
มันไม่เกี่ยวกับเว็บเราอ่ะ / จริง ๆ คือเราก็เอาโปรเจก Studio เราไปแปะใน Live Project เราก็ได้นี่ใช่มะ"

1. **In-page links glide.** The hero's three buttons, the nav, the scroll cue, the skip link and the terminal's
   "hire card" link scroll smoothly to their place instead of jumping (components/Behaviours.tsx). The heading lands
   below the glass bar (scroll-padding-top). The address gets its `#part`, Back returns, and focus moves to the
   section, so Tab carries on from there. Reduce motion: the plain jump.
2. **The third figure is VTX Labs's tool count (85),** "free tools on VTX Labs, all in your browser", in place of
   "6 database engines in one window (Lapis)". It's read from vtxlabs.app's home page while the page is built
   (lib/labs.ts), so it follows Labs. If Labs can't be read, the count last checked by hand stands (85, 19 Nov 2026,
   `LABS_TOOLS`). It counts up like the other three.
3. **The family:**
   - Each personal build (Cuprum, Lux, Mercurius, Crystallum, as Labs lists them) says "Sorry, you'll probably never
     get to use this one 😏" / "ไม่แจกนะจ๊ะ คงไม่มีโอกาสได้ใช้หรอก 😏". "Probably", because Labs says not for sale,
     maybe not for a long time.
   - Under the stack: "No account. No cloud. No tracking." He asked for "offline 100%", which isn't true today, so
     it's worded the way Labs words it after reading each app's code (vtx-labs content/offline.ts). Everything they
     keep stays on your machine; they go online only for what you connect them to or ask them to do; four of them
     (Lapis, Fulmen, Silva, Ventus) check for updates once a day, which you can turn off. When those four's releases
     ask first (Labs's O1C), drop that clause.
   - Beside it: "Built with a LOT of AI help. Claude Code and friends. It's 2026, I'm not hiding it." The footer now
     says "a lot of help from my AI friends".
4. **The hire card's orb is gone** (it's VTX Studio's motif). In its place, his hello_world terminal types the easter
   egg's `sudo hire-me` → "✓ Access granted. Let's talk." It's drawn finished and types once as the card comes into
   view, only with script and without Reduce motion. On phones it sits under the email. The orb's parallax went with it.
5. **VTX Studio in Live projects,** across both columns, marked "opening soon", with the hire card's words, its stack
   from its package.json, and its own orb. No link and no address: it has no domain and nothing deployed yet. It
   isn't counted in "2 web apps live today". The day it goes live it moves into `WEB`, with its link. The live
   section's line adds "(and one opening soon)".

Checked in headless Chrome on his Mac:
- Smooth scroll on all three hero buttons, the nav and the scroll cue, in both languages. Keyboard (Enter, then Tab
  lands inside the section), Back, and Reduce motion (at the place within 40 ms).
- CLS while scrolling the whole page: 0 on desktop, 0.0008 on a phone. Frame time unchanged (~16.7 ms mean, with
  everything on or off).
- No console errors. No horizontal overflow at 1280 / 1024 / 768 / 390 in either theme. Nothing animates under Reduce
  motion.

