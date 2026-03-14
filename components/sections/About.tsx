'use client';

import Image from 'next/image';
import { AnimatedSection } from '@/components/AnimatedSection';

const abilities = [
  { icon: '/icons/graduation-cap-solid.svg', title: 'Fast Learner', desc: 'I ask AI before I ask Google. Stack Overflow? That\'s so 2020. But hey, I still RTFM — when AI gets confused.', color: 'from-indigo-500 to-blue-500' },
  { icon: '/icons/people-group-solid.svg', title: 'Ex-Lead, By Choice', desc: 'Tried management. Too many meetings, not enough coding. Went back to the keyboard. No regrets.', color: 'from-purple-500 to-pink-500' },
  { icon: '/icons/people-carry-box-solid.svg', title: 'Team Player', desc: 'I may code alone at 2 AM, but I play nice with others during office hours. Mostly.', color: 'from-cyan-500 to-teal-500' },
  { icon: '/icons/bug-slash-solid.svg', title: 'Bug Slayer', desc: 'console.log is my debugger. Don\'t judge — it works.', color: 'from-amber-500 to-orange-500' },
];

const skills = [
  {
    title: 'AI — Always On',
    icon: '/icons/handshake-simple-solid.svg',
    desc: 'AI is part of my daily workflow — coding, reviewing, and shipping with it.',
    color: '#facc15',
    items: [
      { label: 'Models', value: 'Claude Opus, Claude Sonnet, Gemini, GPT' },
      { label: 'Tools', value: 'OpenClaw, Cursor, Antigravity' },
    ],
  },
  {
    title: 'Current Stack',
    icon: '/icons/code-solid.svg',
    desc: 'My daily driver — what I\'m actively building with right now. 🔥',
    color: '#f97316',
    items: [
      { label: 'Frontend', value: 'Next.js, React, React Native, Flutter, Swift, Tailwind' },
      { label: 'Backend & Infra', value: 'Supabase, PostgreSQL, Vercel, Bun, Docker' },
    ],
  },
  {
    title: 'Languages',
    icon: '/icons/code-solid.svg',
    desc: 'The weapons I fight with.',
    color: '#818cf8',
    items: [
      { label: 'Primary', value: 'TypeScript, JavaScript' },
      { label: 'Also speak', value: 'Python, PHP, Swift, Dart' },
      { label: 'Markup & Style', value: 'HTML5, CSS3' },
    ],
  },
  {
    title: 'Web Frameworks & UI',
    icon: '/icons/code-solid.svg',
    desc: 'Building pixel-perfect UIs since forever.',
    color: '#22d3ee',
    items: [
      { label: 'Core', value: 'Next.js, React, NestJS, Node.js' },
      { label: 'Also used', value: 'Laravel, RedwoodJS, GraphQL' },
      { label: 'Styling', value: 'Tailwind, Bootstrap, DaisyUI, HeroUI, Ant Design' },
    ],
  },
  {
    title: 'Mobile',
    icon: '/icons/laptop-code-solid.svg',
    desc: 'Apps that actually ship to the App Store.',
    color: '#f472b6',
    items: [
      { label: 'Cross-platform', value: 'React Native, Flutter' },
      { label: 'Native', value: 'Swift' },
    ],
  },
  {
    title: 'Databases & ORM',
    icon: '/icons/terminal-solid.svg',
    desc: 'Where the data lives (and sometimes dies).',
    color: '#fb923c',
    items: [
      { label: 'SQL', value: 'PostgreSQL, MySQL' },
      { label: 'NoSQL & Cache', value: 'MongoDB, Redis' },
      { label: 'ORM', value: 'Prisma, TypeORM' },
    ],
  },
  {
    title: 'Cloud & Platforms',
    icon: '/icons/terminal-solid.svg',
    desc: 'Deploying things to the cloud at 3 AM.',
    color: '#a78bfa',
    items: [
      { label: 'Providers', value: 'GCP, Firebase, Supabase, Vercel' },
      { label: 'Infra', value: 'Nginx, WordPress' },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: '/icons/terminal-solid.svg',
    desc: 'The toolbox behind the scenes.',
    color: '#34d399',
    items: [
      { label: 'Containers', value: 'Docker, Nginx' },
      { label: 'Package & Runtime', value: 'Git, npm, Yarn, Bun' },
      { label: 'Dev Tools', value: 'Xcode' },
      { label: 'Services', value: 'Sentry, Resend, ngrok, Line OA' },
    ],
  },
];

function diffYears(from: Date, to: Date): number {
  const diff = to.getTime() - from.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

export function About() {
  const yearsOfWork = diffYears(new Date('2017-07-24'), new Date());

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">This Guy</span>
          </h2>
          <div className="section-divider" />
        </AnimatedSection>

        {/* Abilities — colorful gradient icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {abilities.map(({ icon, title, desc, color }, i) => (
            <AnimatedSection key={title} delay={i * 0.1}>
              <div className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300 h-full flex flex-col items-center justify-start">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${color} p-0.5`}>
                  <div className="w-full h-full rounded-2xl bg-surface-2 flex items-center justify-center">
                    <Image src={icon} alt={title} width={26} height={26} style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                </div>
                <h3 className="font-semibold mb-2 text-text-primary">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Who am I + Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AnimatedSection>
              <div className="gradient-border-card p-8 text-center">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 blur-md opacity-40" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/30">
                  <Image src="/images/me.jpg" alt="Tanawat" width={160} height={160} className="object-cover" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Hey, that&apos;s me! 👋</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                A Fullstack Developer with{' '}
                <span className="gradient-text font-bold">{yearsOfWork}+ years</span>{' '}
                of turning coffee into code. Been a Senior Dev, tried being a Lead — 
                but meetings aren&apos;t my love language. Coding is. So here I am, happily typing away. ⌨️
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mt-3">
                Open source contributor by passion.
                My English speaking? Let&apos;s just say I&apos;m better at writing code than writing essays.
                But I&apos;m working on it — one awkward conversation at a time. 😅
              </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Skills */}
          <div className="lg:col-span-2 grid gap-6">
            {skills.map(({ title, icon, desc, color, items }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="glass-card p-6 hover:glow transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${color}20, ${color}10)`, border: `1px solid ${color}30` }}
                    >
                      <Image src={icon} alt={title} width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ color }}>{title}</h3>
                      <p className="text-xs text-text-secondary">{desc}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map(({ label, value }) => (
                      <div key={label} className="bg-white/[0.03] rounded-xl p-3">
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>{label}</span>
                        <p className="text-sm text-text-secondary mt-1">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
