'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Showcase', href: '#showcase' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => handleClick('#home')}
          className="text-xl font-bold gradient-text tracking-tight"
        >
          {'<Ta />'}
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleClick(href)}
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-colors duration-200"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-surface)]/95 backdrop-blur-xl border-b border-white/5"
          >
            <ul className="flex flex-col items-center py-4 gap-4">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => handleClick(href)}
                    className="text-lg font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
