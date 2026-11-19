# Wrap-up: Portfolio and GitHub profile (19 Nov 2026)

The owner, verbatim (through VTX Develop): "port + profile ขึ้นได้เลยครับ น่าจะถือว่าจบแล้วล่ะ". Both are done; this is
where things stand. The why behind each change is in [decisions.md](decisions.md).

## Live

**tanawat.dev**: my-portfolio `main` at the Studio card (`ddc6430`) and this doc, deployed by Vercel's git
integration (production only).

- English at `/`, Thai at `/th`, four case pages each (Fulmen, Lapis, Silva, Ignis), privacy, a 404.
- The page, top to bottom:
  - the hero with the `> hello_world_` terminal (easter egg; `sudo hire-me` lands on the recruiters' card);
  - uptime with four real figures (9 years, 11 apps, 85 Labs tools read from vtxlabs.app at build, 3 web apps live);
  - about, with the story rail;
  - My Weapons: the core stack (his 19, as logo tiles), then nine skills cards with core items marked;
  - the VTX family, with Now shipping read from the release repos' labs.json at build;
  - resume, projects (GitHub facts at build), Live projects (VTX Labs, CraftCV and VTX Studio, each linked);
  - Fun Facts (jokes, then four true);
  - the card for HR, recruiters and headhunters (plainly professional).
- Scroll motion: Studio's effects 1, 2, 3, 5 and 6, none under Reduce motion. In-page links glide.
- Security headers and CSP on every response; Umami only (no Google Analytics anywhere in the code).
- Share images (EN / TH, 1200×630) and icons are the round-3b ones in G. Their facts still hold, so they don't need
  redoing.

**github.com/tanawat011**: `tanawat011/tanawat011` `main` at `ed69b815`.

- The Orbit banner (dark / light), then:
  - `> whoami`;
  - `> stack --core`, his 19 as self-hosted badges;
  - `> ls ~/vtx`, the family with its icons;
  - `> ai --always-on`, `> weapons --history`, `> stats --honest`;
  - `> git log --shadow`, the snake.
- The snake: `.github/workflows/snake.yml` (Platane/snk, pinned) redraws it into the `output` branch on every push to
  `main` and daily. It's free on a public repo.

## Local only

Nothing: both repos match their remotes.

VTX Studio went live at studio.vtxlabs.app on 19 Nov 2026 and joined the live cards the same day: its link (Thai `/`,
English `/en`), its words, its home as the shot, "3 web apps live today", and a footer link.

## Waiting on the owner

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` is still set in the Vercel project (production). Nothing reads it any more. Removing
  it is cleanup only.

## For later

- **When Lapis, Fulmen, Silva and Ventus ask before checking for updates** (Labs's O1C): drop the update clause from
  the family's "No account. No cloud. No tracking." line (VTX.local in content/home.ts) and from the profile's
  matching line.
- **Studio's shot** (public/apps/shots/studio-1-*) is its live home as of 19 Nov 2026. Retake it if the home changes a
  lot.
- **Hand-run figures:** "7 % of commits after midnight" comes from `scripts/night-commits.py`. The Labs count falls
  back to 85 (`LABS_TOOLS`) only if vtxlabs.app can't be read at build. Lapis's 142 GB was measured once.
- **If the core stack changes:** edit `CORE` in content/home.ts, then run `scripts/stack-icons.mjs`. It rebuilds the
  portfolio's logo data and the profile's badges.
- **Small leftovers, none urgent:**
  - The 404 page still shows the orb (Studio's motif, gone from the hire card).
  - `public/favicon_io/` holds the old site's unused icons.
  - ESLint isn't configured (`next lint` would ask).
  - The profile's `> weapons --history` keeps its own grouping, not the portfolio's audited one. Nothing in it is
    false.
- **GitHub schedules:** a scheduled workflow on a repo with no activity for 60 days gets paused by GitHub. Any push to
  the profile restarts the snake.
