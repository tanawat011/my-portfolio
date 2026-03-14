'use client';

import Image from 'next/image';
import { AnimatedSection } from '@/components/AnimatedSection';

const liveProjects = [
  {
    title: 'VTX Labs',
    desc: 'A modular developer utility platform with plug-and-play tools. Built with Next.js, Supabase, and Stripe.',
    url: 'https://vtxlabs.app',
    tags: ['Next.js', 'React', 'Tailwind', 'Supabase', 'Stripe'],
    gradient: 'from-violet-500 to-purple-600',
    emoji: '🧪',
  },
];

export function Showcase() {
  return (
    <section id="showcase" className="py-24 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Live <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-divider" />
          <p className="text-sm text-text-secondary mt-4">
            Things I built that are actually running in production 🚀
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {liveProjects.map(({ title, desc, url, tags, gradient, emoji }, i) => (
            <AnimatedSection key={title} delay={i * 0.15}>
              <a href={url} target="_blank" rel="noreferrer" className="group block h-full">
                <div className="glass-card overflow-hidden h-full hover:scale-[1.03] transition-all duration-300">
                  {/* Gradient header */}
                  <div className={`h-32 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
                    <span className="text-5xl">{emoji}</span>
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-surface-2 to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold group-hover:text-primary-light transition-colors">
                        {title}
                      </h3>
                      <svg
                        className="w-5 h-5 text-text-secondary group-hover:text-primary-light group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 mt-1"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>

                    <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                      {desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="skill-tag">{tag}</span>
                      ))}
                    </div>

                    {/* Live indicator */}
                    <div className="flex items-center gap-2 mt-4 text-xs text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      Live
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
