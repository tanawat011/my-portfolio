# tanawat.dev

Tanawat Pinthongpan's personal site: the story, the VTX family of desktop apps, four case pages, the resumes, and the way
to hire. Direction D · Story, in VTX Studio's colours (graphite night, porcelain day, ice and periwinkle light).
The owner's picks are in [docs/decisions.md](docs/decisions.md).

- English at `/`, Thai at `/th` (two root layouts, one 404)
- Static Next.js 15 (App Router), plain CSS in `app/globals.css`, no UI library
- Fonts self-hosted by `next/font`: Plus Jakarta Sans, Kanit, Noto Sans Thai, JetBrains Mono
- Visits counted with Umami (the VTX family's website, tag `portfolio`, only on tanawat.dev); no cookies
- Security headers in `config/security.ts` (kit `web-checklist.md` § 4)
- App screenshots are VTX Labs' own (real screens, made-up data), in `public/apps/shots`

## Run it

```bash
bun install
bun run build && bun run start
```

Then open http://localhost:3000. `bun run dev` works too. `bun test` checks that every figure on the page is true and
that every file it points at exists.

## Where things are

| | |
|---|---|
| `content/site.ts` | every word in English and Thai, the links, the figures |
| `content/apps.ts` | the eleven apps, the four case pages, the before → after pairs |
| `components/Home.tsx`, `CasePage.tsx` | the two page layouts |
| `components/Motion.tsx` | the moving parts: the story rail, before → after, the gallery, the reading line |
| `vendor/vtx-kit/analytics.ts` | the kit's analytics module, unchanged (`vendor/vtx-kit/MANIFEST`) |
| `docs/redesign/round-1/` | the five directions the owner chose from |

Pushing `main` deploys on Vercel: push only on the owner's word.
