# tanawat.dev

Tanawat Pinthongpan's personal site, "about this guy" first: the old site's hero, voice and Fun Facts, in VTX Studio's
colours (graphite night, porcelain day, ice and periwinkle light), with a true-scale band of the years, a scroll-led story,
the VTX family with four case pages, the resumes, and the way to hire. The owner's picks are in
[docs/decisions.md](docs/decisions.md) (round 1, then round 2).

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
| `content/home.ts` | the home page's words in English and Thai (his voice, the Fun Facts jokes) |
| `content/site.ts` | shared words, the links, the real figures |
| `content/apps.ts` | the eleven apps, the four case pages, the before → after pairs |
| `components/Home.tsx`, `CasePage.tsx` | the two page layouts |
| `components/Motion.tsx` | the moving parts: the story rail, before → after, the gallery, the reading line |
| `components/Behaviours.tsx` | starts the scroll effects; the bar's glass, loops that rest off screen |
| `components/motion/` | Studio's scroll effects, all but the pinned scene; `?motion=none` or `?motion=1,5` turns them off for a test |
| `components/Cards.tsx`, `HelloTerm.tsx` | the resume and project cards; the terminal behind `> hello_world_` |
| `lib/github.ts`, `lib/releases.ts`, `lib/labs.ts` | read at build time only: the project cards' GitHub facts, the "Now shipping" release, VTX Labs's tool count |
| `vendor/vtx-kit/analytics.ts` | the kit's analytics module, unchanged (`vendor/vtx-kit/MANIFEST`) |
| `docs/redesign/round-1/` | the five directions the owner chose from |

## Files made by hand on his Mac

Vercel's build can't make these, so they are committed. Re-run the script when its input changes:

| Script | Makes | When |
|---|---|---|
| `python3 -I -B scripts/cv-meta.py` | `content/cvs.json`, `public/cv/*.jpg` | a resume PDF changes (a test fails until you do) |
| `python3 -I -B scripts/night-commits.py <folder holding the VTX repos>` | `content/night-commits.json` | you want a fresh "after midnight" figure |
| `bun scripts/brand-images.ts http://127.0.0.1:3123` | the share images and icons | the name, tagline, app count or look changes (needs the built site running) |
| `node scripts/stack-icons.mjs <simple-icons package> [<tanawat011 repo>]` | `content/stack-icons.ts`, and the profile's `assets/stack/` badges | the core stack changes (untar `npm pack simple-icons` for the first argument) |

Deploys happen by hand, on the owner's word only. `vercel.json` turns Vercel's git auto-deploy off
(`git.deploymentEnabled: false`, as on Studio, Mindloop, Labs and CraftCV), so pushing `main` deploys nothing. To
deploy: push the commit, then create a production deployment of it, either through the Vercel API from the pushed
commit or in the Vercel dashboard under Deployments → Create Deployment.
