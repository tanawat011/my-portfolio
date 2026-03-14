# 🌐 My Portfolio

> *"I write code, break things, fix them, and ship it. Repeat."*

Personal portfolio website built with modern web tech — and a little help from my AI friends 🤖

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tanawat011/my-portfolio)

## ✨ Features

- 🎨 Dark theme with glassmorphism & gradient effects
- ⚡ Smooth scroll-triggered animations (Framer Motion)
- 📱 Fully responsive (mobile → desktop)
- 📄 Download CV button
- 📊 GitHub Stats & Streak cards
- 🎮 Fun Facts with developer humor
- 🚀 Live project showcase
- 🔗 Social links (GitHub, LinkedIn, Facebook, Steam, Telegram, Line, Email)

## 🛠 Tech Stack

| Category | Tech |
|----------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion 11 |
| Deployment | Vercel |

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── page.tsx            # Main page (all sections)
│   └── globals.css         # Design tokens & global styles
├── components/
│   ├── Navbar.tsx           # Sticky glassmorphic navbar
│   ├── Footer.tsx           # Social links & credits
│   ├── ScrollToTop.tsx      # Floating scroll button
│   ├── AnimatedSection.tsx  # Reusable scroll animation
│   └── sections/
│       ├── Hero.tsx         # Intro + CTA buttons
│       ├── About.tsx        # Profile, abilities & skills
│       ├── Portfolio.tsx    # GitHub projects
│       ├── Showcase.tsx     # Live production projects
│       ├── GitHubStats.tsx  # GitHub stats cards
│       └── FunFacts.tsx     # Developer humor stats
└── public/
    ├── icons/               # SVG icons
    ├── images/              # Profile image
    └── resume.pdf           # Downloadable CV
```

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Run dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deploy

Push to `main` branch → Vercel auto-deploys. That's it. 🎯

## 📄 CV Setup

Place your resume PDF at `public/resume.pdf` — the download button in Hero links to it.

## 🤝 Credits

Built with ❤️ by [Tanawat Pinthongpan](https://github.com/tanawat011)

AI-assisted development — because transparency is cool 🤖

## 📝 License

MIT
