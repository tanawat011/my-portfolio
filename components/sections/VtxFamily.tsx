'use client';

import Image from 'next/image';
import { AnimatedSection } from '@/components/AnimatedSection';

type DesktopApp = {
  id: string;
  name: string;
  element: string;
  job: string;
  line: string;
  /** OKLCH hue of the app's element colour, as the family's own site uses. */
  hue: number;
  note?: string;
};

const desktop: DesktopApp[] = [
  { id: 'lapis', name: 'Lapis', element: 'Stone', job: 'Databases', hue: 273, line: 'PostgreSQL, MySQL / MariaDB, SQLite, SQL Server, MongoDB and Redis in one window. Every write can be reviewed before it goes out.' },
  { id: 'fulmen', name: 'Fulmen', element: 'Lightning', job: 'APIs', hue: 288, line: 'HTTP, GraphQL, WebSocket, gRPC, SSE and MCP. Requests leave from Rust, not a browser, so no CORS and any header you like.' },
  { id: 'silva', name: 'Silva', element: 'Wood', job: 'Git', hue: 148, line: 'A Git graph whose every action can be undone. Runs your own git, so hooks, LFS and signing behave as in your terminal.' },
  { id: 'ventus', name: 'Ventus', element: 'Wind', job: 'SSH', hue: 206, line: 'Reads your ~/.ssh/config, known_hosts and agent, and checks the host key before sending anything.' },
  { id: 'ignis', name: 'Ignis', element: 'Fire', job: 'Dev tools', hue: 35, line: 'Paste anything and it knows what it is: JSON, JWT, Base64, timestamps, cron, cURL. Nothing leaves your Mac.' },
  { id: 'aqua', name: 'Aqua', element: 'Water', job: 'Mac cleaning', hue: 245, line: "Knows a developer's disk: build folders, tool caches, simulators, Docker. Says why each item is safe to remove." },
  { id: 'cuprum', name: 'Cuprum', element: 'Copper', job: 'Code editor', hue: 54, line: 'Traces where your data goes across a codebase, and opens a repo already knowing its stack.', note: 'Personal build' },
  { id: 'lux', name: 'Lux', element: 'Light', job: 'Video', hue: 85, line: 'Short videos made from a script, with a live preview of the scene, the characters, the shots and the voices.', note: 'Personal build' },
  { id: 'mercurius', name: 'Mercurius', element: 'Quicksilver', job: 'Mail', hue: 262, line: 'Every Gmail account in one inbox, stored on your Mac. A send is held for ten seconds, just in case.', note: 'Personal build' },
  { id: 'crystallum', name: 'Crystallum', element: 'Crystal', job: 'Remote desktop', hue: 236, line: "Your Mac to a Windows PC, mouse and keyboard included. The PC's certificate is checked before you sign in.", note: 'Personal build' },
  { id: 'ros', name: 'Ros', element: 'Dew', job: 'Notes', hue: 172, line: 'Notes as plain Markdown files in a folder you own. The other apps write into it, and a note can hand work back to them.' },
];

const inside = [
  { title: 'Six database engines, exactly', body: 'Lapis reads and writes values byte for byte on six engines. A value it cannot read exactly is refused, never shown wrong.' },
  { title: 'Restores that cannot half-happen', body: 'Backups restore in one transaction where the engine allows it, and prove every DROP first where it does not.' },
  { title: 'Security before convenience', body: 'SSH host keys checked before a byte is sent, TLS spoken through tunnels, secrets only in the Keychain.' },
  { title: 'One kit, eleven apps', body: 'A shared kit gives every app the same themes, motion, update check and a way to hand work to each other.' },
  { title: 'Undo for everything', body: 'Silva can undo any Git action and Lapis keeps the SQL that reverses each write. Mistakes come back.' },
  { title: 'Tested against real servers', body: 'Live tests run each feature on real Postgres, MySQL, MariaDB, SQL Server, SQLite, MongoDB and Redis.' },
];

const web = [
  { name: 'VTX Labs', line: 'Free dev tools, and the whole family in one place.', url: 'https://vtxlabs.app' },
  { name: 'CraftCV', line: 'An AI resume builder with ATS-friendly templates.', url: 'https://craftcv.vtxlabs.app' },
  { name: 'Magnes', line: 'A virtual office you walk around in.' },
  { name: 'Botstrap', line: 'An idle game about running an AI company.' },
  { name: 'KhamKai', line: 'English vocabulary games for Thai learners.' },
  { name: 'DocFlow', line: 'Thai invoices and tax invoices, ready to print.' },
];

export function VtxFamily() {
  return (
    <section id="vtx" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 vtx-grid pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="font-mono text-sm tracking-widest text-primary-light mb-3">{'> ls ~/vtx'}</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            The <span className="gradient-text">VTX</span> family
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            I use these tools every day, so I built my own. Eleven desktop apps in Rust + Tauri, each one named after an
            element, all built solo.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Rust', 'Tauri 2', 'React', 'TypeScript', 'macOS first'].map((t) => (
              <span key={t} className="skill-tag">{t}</span>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {desktop.map((app, i) => (
            <AnimatedSection key={app.id} delay={(i % 3) * 0.08}>
              <article className="el-card h-full p-6" style={{ '--h': app.hue } as React.CSSProperties}>
                <div className="flex items-center gap-4 mb-4">
                  <Image src={`/vtx/${app.id}.png`} alt={`VTX ${app.name} icon`} width={56} height={56} className="el-icon" />
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-tight">
                      <span className="text-text-secondary font-medium text-sm mr-1">VTX</span>{app.name}
                    </h3>
                    <p className="text-xs font-mono el-text">{app.element} · {app.job}</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{app.line}</p>
                {app.note && (
                  <p className="mt-4"><span className="text-[10px] uppercase tracking-wider el-chip">{app.note}</span></p>
                )}
              </article>
            </AnimatedSection>
          ))}
          <AnimatedSection delay={0.16}>
            <a href="https://vtxlabs.app" target="_blank" rel="noreferrer" className="el-card el-more h-full p-6 flex flex-col justify-center group">
              <p className="font-mono text-xs text-primary-light mb-2">{'> open vtxlabs.app'}</p>
              <p className="text-lg font-bold mb-1">See them all</p>
              <p className="text-sm text-text-secondary">Screens, what each one does, and when it ships.</p>
              <span className="mt-4 text-primary-light group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-24 mb-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">
            What&apos;s <span className="gradient-text">inside</span> them
          </h3>
          <p className="text-sm text-text-secondary mt-3">The parts I&apos;m proudest of, the ones nobody sees.</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {inside.map(({ title, body }, i) => (
            <AnimatedSection key={title} delay={(i % 3) * 0.08}>
              <div className="glass-card p-6 h-full">
                <p className="font-mono text-xs text-accent mb-2">{String(i + 1).padStart(2, '0')}</p>
                <h4 className="font-semibold mb-2">{title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{body}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-24 mb-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">
            On the <span className="gradient-text">web</span>
          </h3>
          <p className="text-sm text-text-secondary mt-3">Things you can open in a browser and play with.</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {web.map(({ name, line, url }) => {
            const body = (
              <>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold">{name}</h4>
                  {url ? (
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400">Live ↗</span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider text-text-secondary">Coming</span>
                  )}
                </div>
                <p className="text-sm text-text-secondary">{line}</p>
              </>
            );
            return url ? (
              <a key={name} href={url} target="_blank" rel="noreferrer" className="glass-card p-5 block hover:scale-[1.02]">
                {body}
              </a>
            ) : (
              <div key={name} className="glass-card p-5 opacity-80">{body}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
