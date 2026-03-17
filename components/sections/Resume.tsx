'use client';

import { AnimatedSection } from '@/components/AnimatedSection';

const resumes = [
  {
    theme: 'Modern',
    length: 'Full',
    desc: 'Detailed resume with complete work history, skills breakdown, and project highlights.',
    emoji: '📄',
    gradient: 'from-violet-500 to-indigo-500',
    color: '#818cf8',
    url: 'https://craftcv.vtxlabs.app/tanawat-pinthongpan-74b4c838/b40c2c6c-8efd-4708-8177-13057330aceb',
    pdf: '/Modern.pdf',
  },
  {
    theme: 'Modern',
    length: 'Short',
    desc: 'One-page summary — quick and clean overview of experience and skills.',
    emoji: '⚡',
    gradient: 'from-indigo-500 to-cyan-500',
    color: '#22d3ee',
    url: 'https://craftcv.vtxlabs.app/tanawat-pinthongpan-74b4c838/f2a3d90a-4a7f-444c-b6ae-d0cd8074f794',
    pdf: '/Modern Short.pdf',
  },
  {
    theme: 'Minimal',
    length: 'Full',
    desc: 'Clean, no-nonsense layout with all the details. Let the content do the talking.',
    emoji: '🧾',
    gradient: 'from-teal-500 to-emerald-500',
    color: '#34d399',
    url: 'https://craftcv.vtxlabs.app/tanawat-pinthongpan-74b4c838/d71751ff-4357-48d8-959e-218b7269d4f4',
    pdf: '/minimal.pdf',
  },
  {
    theme: 'Minimal',
    length: 'Short',
    desc: 'Ultra-compact. Just the highlights. Perfect for a quick scan.',
    emoji: '📝',
    gradient: 'from-amber-500 to-orange-500',
    color: '#fb923c',
    url: 'https://craftcv.vtxlabs.app/tanawat-pinthongpan-74b4c838/393cf348-985d-47ac-a6af-e14f1e6d9099',
    pdf: '/minimal short.pdf',
  },
];

export function Resume() {
  return (
    <section id="resume" className="py-24 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>
          <div className="section-divider" />
          <p className="text-text-secondary mt-6 max-w-lg mx-auto text-sm">
            Pick a style, pick a length. View it online or grab the PDF — your call. 🤙
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumes.map(({ theme, length, desc, emoji, gradient, color, url, pdf }, i) => (
            <AnimatedSection key={`${theme}-${length}`} delay={i * 0.12}>
              <div className="glass-card overflow-hidden h-full hover:scale-[1.03] transition-all duration-300 group">
                {/* Gradient top bar */}
                <div className={`h-1.5 bg-linear-to-r ${gradient}`} />

                <div className="p-7">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color }}>
                        {theme}
                      </h3>
                      <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">
                        {length} version
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {desc}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                        border: `1px solid ${color}30`,
                        color,
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Online
                    </a>
                    <a
                      href={pdf}
                      download
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-text-secondary text-sm font-medium hover:bg-white/5 hover:scale-105 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
