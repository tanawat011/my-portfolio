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
