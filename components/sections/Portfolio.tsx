'use client';

import { AnimatedSection } from '@/components/AnimatedSection';

const projects = [
  {
    title: 'Golang Boilerplate',
    desc: 'Production-ready Go REST API boilerplate with Clean Architecture, Gin, GORM, JWT, and Docker.',
    tags: ['Go', 'Gin', 'GORM', 'JWT', 'Docker', 'PostgreSQL'],
    github: 'https://github.com/tanawat011/golang-boilerplate',
    icon: '🔷',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Node.js Boilerplate',
    desc: 'Production-ready Node.js REST API boilerplate with TypeScript, Express, Prisma, JWT, and MySQL.',
    tags: ['TypeScript', 'Express', 'Prisma', 'JWT', 'Docker', 'MySQL'],
    github: 'https://github.com/tanawat011/nodejs-boilerplate',
    icon: '🟢',
    gradient: 'from-emerald-500 to-green-400',
  },
  {
    title: 'NestJS Boilerplate',
    desc: 'Production-ready NestJS 11 boilerplate with TypeORM, PostgreSQL, JWT auth, Swagger, and Docker.',
    tags: ['NestJS', 'TypeScript', 'TypeORM', 'PostgreSQL', 'JWT', 'Docker', 'Swagger'],
    github: 'https://github.com/tanawat011/nestjs-boilerplate',
    icon: '🔴',
    gradient: 'from-red-500 to-rose-400',
  },
  {
    title: 'My Portfolio',
    desc: 'This very website you\'re looking at right now. Built with Next.js 15, Tailwind CSS, and a little help from AI friends. 🤖',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vercel'],
    github: 'https://github.com/tanawat011/my-portfolio',
    icon: '🌐',
    gradient: 'from-violet-500 to-purple-400',
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-divider" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map(({ title, desc, tags, github, icon, gradient }, i) => (
            <AnimatedSection key={title} delay={i * 0.15}>
              <a href={github} target="_blank" rel="noreferrer" className="group block h-full">
                <div className="glass-card overflow-hidden h-full hover:scale-[1.03] transition-all duration-300">
                  {/* Gradient top bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

                  <div className="p-7">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{icon}</span>
                        <h3 className="text-xl font-bold group-hover:text-primary-light transition-colors">
                          {title}
                        </h3>
                      </div>
                      <svg
                        className="w-5 h-5 text-text-secondary group-hover:text-primary-light group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 mt-1"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>

                    <p className="text-sm text-text-secondary mb-5 leading-relaxed">
                      {desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="skill-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
