'use client';

import { AnimatedSection } from '@/components/AnimatedSection';

const facts = [
  // Developer's coffee addiction — relatable humor
  { emoji: '☕', label: 'Coffee consumed', value: '∞', desc: 'And counting...' },
  // Self-deprecating joke about creating bugs while fixing them
  { emoji: '🐛', label: 'Bugs created & fixed', value: '9,999+', desc: 'The 10,000th one is still in production' },
  // Stack Overflow visits dropped to zero since AI took over
  { emoji: '🔥', label: 'Stack Overflow visits', value: '0', desc: 'Since 2024. Thanks, AI.' },
  // Honest credit: AI helped build this portfolio — hidden in plain sight 🤫
  { emoji: '🤖', label: 'This website', value: 'AI-assisted', desc: 'Yes, AI helped. No, I\'m not ashamed.' },
  // The classic "works on my machine" — every dev's excuse
  { emoji: '🌙', label: 'Late night deploys', value: 'Too many', desc: '"It works on my machine"' },
  // The lie every developer tells themselves
  { emoji: '🔄', label: 'Times said "one more fix"', value: '∞', desc: '3 hours later...' },
];

export function FunFacts() {
  return (
    <section className="py-24 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fun <span className="gradient-text">Facts</span>
          </h2>
          <div className="section-divider" />
          <p className="text-sm text-text-secondary mt-4 font-mono">
            // stats that no one asked for, but here they are
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {facts.map(({ emoji, label, value, desc }, i) => (
            <AnimatedSection key={label} delay={i * 0.08}>
              <div className="glass-card p-5 text-center hover:scale-105 transition-transform duration-300">
                <span className="text-3xl mb-2 block">{emoji}</span>
                <p className="text-2xl font-bold gradient-text">{value}</p>
                <p className="text-sm font-semibold text-text-primary mt-1">{label}</p>
                <p className="text-xs text-text-secondary mt-1 italic">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
