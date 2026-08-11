import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Terminal, ExternalLink, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import MagneticButton from '../components/ui/MagneticButton';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePointerParallax } from '../hooks/usePointerParallax';
import {
  staggerContainer,
  staggerItem,
  portraitReveal,
  heroRoleReveal,
  heroCharReveal,
  blurReveal,
} from '../motion/variants';

// ─── Single-line character reveal for RAHUL NALLA ────────────────────────────
function SingleLineHeroName({ firstName, lastName, delay = 0.15, stagger = 0.038 }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <span className="inline-block">
        <span className="text-steel-100">{firstName} </span>
        <span className="text-amber-500">{lastName}</span>
      </span>
    );
  }

  const firstChars = [...firstName];
  const lastChars = [...lastName];

  return (
    <span className="inline-flex flex-wrap items-center gap-x-[0.3em] leading-none select-none">
      {/* First Name: RAHUL (White) */}
      <span className="inline-flex overflow-hidden">
        <motion.span
          className="inline-flex"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
          }}
        >
          {firstChars.map((char, i) => (
            <motion.span
              key={`first-${i}`}
              className="inline-block text-steel-100"
              variants={heroCharReveal}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </span>

      {/* Last Name: NALLA (Amber) */}
      <span className="inline-flex overflow-hidden">
        <motion.span
          className="inline-flex"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: stagger, delayChildren: delay + (firstChars.length * stagger) } },
          }}
        >
          {lastChars.map((char, i) => (
            <motion.span
              key={`last-${i}`}
              className="inline-block text-amber-500"
              variants={heroCharReveal}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </span>
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  // Portrait pointer parallax — subtle shift on mouse position
  const { x: ptrX, y: ptrY } = usePointerParallax({
    stiffness: 60,
    damping: 18,
    disabled: prefersReduced,
  });
  const portraitOffsetX = useTransform(ptrX, [-1, 1], [-5, 5]);
  const portraitOffsetY = useTransform(ptrY, [-1, 1], [-4, 4]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative pt-20 sm:pt-24 pb-16 flex items-center border-b border-bg-border/50 overflow-hidden min-h-[85vh]"
    >
      {/* Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e202e12_1px,transparent_1px),linear-gradient(to_bottom,#1e202e12_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* ── Top Metadata Strip ── */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
          className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-steel-400 pb-6 mb-8 border-b border-bg-border/40"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-steel-100 font-semibold">{portfolioData.personal.name}</span>
            <span className="text-steel-400">// SOFTWARE DEVELOPER</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-[11px]">
            <span>Location: {portfolioData.personal.location}</span>
            <span className="text-amber-500">STATUS: {portfolioData.personal.status}</span>
          </div>
        </motion.div>

        {/* ── Hero Grid aligned vertically ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── Left Column: Single Line Typography & Action CTAs ── */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">

            {/* Display Name — single line RAHUL NALLA matching section heading typography */}
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4">
              <SingleLineHeroName firstName="RAHUL" lastName="NALLA" delay={0.15} stagger={0.038} />
            </h1>

            {/* Role — horizontal clip wipe */}
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              animate="visible"
              variants={{
                ...heroRoleReveal,
                visible: {
                  ...heroRoleReveal.visible,
                  transition: { ...heroRoleReveal.visible.transition, delay: 0.55 },
                },
              }}
              className="font-mono text-sm sm:text-base text-steel-300 font-medium mb-5 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>SOFTWARE DEVELOPER &amp; SYSTEM ARCHITECT</span>
            </motion.div>

            {/* Tagline description */}
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              animate="visible"
              variants={{
                ...blurReveal,
                visible: {
                  ...blurReveal.visible,
                  transition: { ...blurReveal.visible.transition, delay: 0.72 },
                },
              }}
              className="text-base sm:text-lg text-steel-400 max-w-xl leading-relaxed mb-8 font-body"
            >
              {portfolioData.personal.tagline}
            </motion.div>

            {/* CTAs — Resume button linking to Google Drive */}
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              animate="visible"
              variants={staggerContainer(0.1, 0.88)}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Resume Button */}
              <motion.div variants={staggerItem}>
                <MagneticButton
                  as="a"
                  href={portfolioData.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.25}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-bg-dark font-mono font-bold text-xs uppercase tracking-wider transition-colors duration-200 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </MagneticButton>
              </motion.div>

              {/* Initiate Contact Button */}
              <motion.div variants={staggerItem}>
                <MagneticButton
                  as="a"
                  href="#contact"
                  strength={0.2}
                  className="px-6 py-3.5 bg-bg-surface hover:bg-bg-border/50 text-steel-100 border border-bg-border font-mono font-medium text-xs tracking-wide transition-colors duration-200"
                >
                  Initiate Contact
                </MagneticButton>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={staggerItem} className="flex items-center gap-3 font-mono text-xs text-steel-400 ml-2">
                <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">GitHub</a>
                <span>/</span>
                <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">LinkedIn</a>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right Column: Portrait Card ── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 relative flex items-start justify-center"
          >
            {/* Ambient glow behind the card so it integrates with the dark background */}
            <div className="absolute -inset-4 rounded-2xl bg-amber-500/5 blur-2xl pointer-events-none" />

            <div className="relative w-full border border-bg-border/60 bg-bg-dark rounded-xl shadow-2xl overflow-hidden">
              {/* Amber accent line at top of card */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

              {/* Portrait image — fills card with no background colour mismatch */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-dark">
                <motion.div
                  className="w-full h-full"
                  initial={prefersReduced ? false : 'hidden'}
                  animate="visible"
                  variants={portraitReveal}
                >
                  <motion.div
                    className="w-full h-full"
                    style={prefersReduced ? {} : { x: portraitOffsetX, y: portraitOffsetY }}
                  >
                    <img
                      src="/my-img.jpg"
                      alt={portfolioData.personal.avatarAlt}
                      className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700 ease-out"
                      loading="eager"
                    />
                  </motion.div>
                </motion.div>

                {/* Bottom gradient fades the image edge into the card background seamlessly */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/30 to-transparent pointer-events-none" />

                {/* Portrait metadata badge */}
                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-4 left-4 right-4 font-mono text-xs flex justify-between items-end"
                >
                  <div>
                    <span className="text-steel-400 text-[10px] block">ENGINEERING PORTRAIT</span>
                    <span className="text-steel-100 font-semibold">RAHUL NALLA</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
