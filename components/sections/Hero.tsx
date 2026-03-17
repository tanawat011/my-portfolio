'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const particles = useMemo<Particle[]>(() => {
    // Use seeded pseudo-random so it's consistent
    const seed = (n: number) => ((n * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: 40 }, (_, i) => ({
      left: seed(i * 3) * 100,
      top: seed(i * 7 + 1) * 100,
      opacity: seed(i * 11 + 2) * 0.4 + 0.1,
      duration: seed(i * 13 + 3) * 3 + 2,
      delay: seed(i * 17 + 4) * 2,
    }));
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[var(--color-primary)]"
              style={{ left: `${p.left}%`, top: `${p.top}%`, opacity: p.opacity }}
              animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            />
          ))}
        </div>
      )}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary-light text-sm md:text-base font-mono tracking-widest mb-4"
        >
          {'> '}hello_world<span className="animate-pulse">_</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          <span className="gradient-text">Tanawat</span>{' '}
            <span className="text-text-primary">Pinthongpan</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-text-secondary mb-3 max-w-xl mx-auto"
        >
          Fullstack Developer · Open Source Lover · Coffee Addict
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm text-text-secondary/60 font-mono mb-8"
        >
          I write code, mass break things, mass fix them, and mass ship it. Repeat. 🔁
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToAbout}
            className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25"
          >
            Who am I?
          </button>
          <a
            href="#resume"
            onClick={(e) => { e.preventDefault(); document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 rounded-full border border-primary/30 text-primary-light font-medium hover:bg-primary/10 hover:scale-105 transition-all duration-200"
          >
            📄 My Resume
          </a>
          <a
            href="#portfolio"
            className="px-8 py-3 rounded-full border border-white/10 text-text-primary font-medium hover:bg-white/5 hover:scale-105 transition-all duration-200"
          >
            See My Code
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-[var(--color-primary)]" />
        </div>
      </motion.div>
    </section>
  );
}
