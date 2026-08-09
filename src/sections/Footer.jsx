import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { staggerContainer, staggerItem } from '../motion/variants';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Footer() {
  const prefersReduced = useReducedMotion();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <motion.footer
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 bg-bg-dark border-t border-bg-border/60 relative z-10 font-mono text-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-bg-surface border border-bg-border flex items-center justify-center font-bold text-steel-100">
            RN<span className="text-amber-500">.</span>
          </div>
          <div>
            <span className="block font-heading text-sm font-semibold text-steel-100">{portfolioData.personal.name}</span>
            <span className="block text-steel-400 text-[11px]">© {new Date().getFullYear()} — All rights reserved.</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-steel-400">
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">GitHub</a>
          <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">LinkedIn</a>
          <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-amber-500 transition-colors">Email</a>
        </div>

        <button onClick={scrollToTop} className="flex items-center gap-2 px-3 py-1.5 rounded bg-bg-surface border border-bg-border text-steel-300 hover:text-amber-500 hover:border-amber-500/40 transition-colors">
          <span>Back to Top</span><ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.footer>
  );
}
