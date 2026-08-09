import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Terminal, CheckCircle2, Cpu, Activity } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import BlurReveal from '../components/ui/BlurReveal';
import ClipReveal from '../components/ui/ClipReveal';
import WordStagger from '../components/ui/WordStagger';
import MagneticButton from '../components/ui/MagneticButton';
import { staggerContainer, staggerItem, springPop, scaleIn } from '../motion/variants';
import { useReducedMotion } from '../hooks/useReducedMotion';

// ─── Animated terminal lines — staggered typewriter ─────────────────────────
const LOG_LINES = [
  { text: '[SYSTEM] Initializing distributed scheduler cluster...', color: 'text-steel-400' },
  { text: '[POSTGRES] Connected to primary task_state instance', color: 'text-steel-400' },
  { text: '[SPRING] Spawning 4 thread pool instances', color: 'text-amber-500/80' },
  { text: '[WEBSOCKET] Streaming metrics to React visualizer', color: 'text-steel-400' },
  { text: '[WORKER #1] Execution completed payload #99401', color: 'text-steel-400' },
];

function TelemetryTerminal({ visible, prefersReduced }) {
  const [visibleLines, setVisibleLines] = useState(prefersReduced ? LOG_LINES.length : 0);

  useEffect(() => {
    if (!visible) return;
    if (prefersReduced) { setVisibleLines(LOG_LINES.length); return; }
    let i = 0;
    const timers = [];
    LOG_LINES.forEach((_, idx) => {
      const t = setTimeout(() => setVisibleLines(idx + 1), 300 + idx * 280);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [visible, prefersReduced]);

  return (
    <div className="border border-bg-border/90 bg-bg-dark rounded overflow-hidden font-mono text-xs text-steel-300 shadow-2xl">
      <div className="px-4 py-3 bg-bg-surface border-b border-bg-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-500" />
          <span className="text-steel-100 font-semibold">NEXUS.ORCHESTRATOR.LOG</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] text-amber-500">LIVE</span>
        </div>
      </div>

      <div className="p-5 space-y-2.5 text-[11px] leading-relaxed min-h-[160px]">
        {LOG_LINES.map((line, i) => (
          <AnimatePresence key={i}>
            {i < visibleLines && (
              <motion.p
                initial={prefersReduced ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={line.color}
              >
                {line.text}
              </motion.p>
            )}
          </AnimatePresence>
        ))}
        {/* Status block */}
        {visibleLines >= 3 && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-3 rounded bg-bg-surface border border-amber-500/30 text-amber-400 font-mono text-xs mt-1"
          >
            <div>STATUS: 100% HEALTHY</div>
            <div>PROCESSED: 1,420 JOBS</div>
            <div>LATENCY: 14MS (OPTIMAL)</div>
          </motion.div>
        )}
      </div>

      <div className="px-4 py-3 bg-bg-surface/50 border-t border-bg-border/60 text-[10px] text-steel-400 flex justify-between">
        <span>DOCKER: OK</span><span>REST API: READY</span>
      </div>
    </div>
  );
}

export default function FeaturedProject() {
  const project = portfolioData.featuredProject;
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, amount: 0.2 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();

  // Scroll parallax on telemetry panel
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const panelY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  // Subtle section fade-in scale
  const sectionScale = useTransform(scrollYProgress, [0, 0.2], [0.985, 1]);

  return (
    <motion.section
      id="featured"
      ref={sectionRef}
      style={prefersReduced ? {} : { scale: sectionScale }}
      className="py-28 relative border-b border-bg-border/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Marker */}
        <ClipReveal className="flex items-center gap-3 font-mono text-xs text-amber-500 mb-6">
          <span className="w-8 h-[1px] bg-amber-500/50" />
          <span>03. CENTERPIECE NARRATIVE CASE STUDY</span>
        </ClipReveal>

        {/* Category pill */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-bg-surface border border-bg-border font-mono text-xs text-amber-500 font-semibold mb-4"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>{project.category}</span>
        </motion.div>

        {/* Large title — more dramatic WordStagger */}
        <div className="max-w-5xl mb-16">
          <div className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-steel-100 tracking-tight leading-[0.98] mb-6">
            <div className="overflow-hidden">
              {prefersReduced
                ? <span>{project.title}</span>
                : <WordStagger text={project.title} stagger={0.07} delay={0.05} className="text-steel-100" />
              }
            </div>
            <div className="overflow-hidden mt-1 text-amber-500">
              {prefersReduced
                ? <span>{project.subtitle}</span>
                : <WordStagger text={project.subtitle} stagger={0.05} delay={0.32} className="text-amber-500" />
              }
            </div>
          </div>
          <BlurReveal delay={0.55} className="text-lg sm:text-xl text-steel-300 font-body leading-relaxed">
            {project.summary}
          </BlurReveal>
        </div>

        {/* Two-column narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">

          {/* Story blocks */}
          <motion.div
            ref={contentRef}
            initial={prefersReduced ? false : 'hidden'}
            animate={contentInView ? 'visible' : 'hidden'}
            variants={staggerContainer(0.13, 0.08)}
            className="lg:col-span-7 space-y-6 font-body"
          >
            <motion.div variants={staggerItem} className="p-6 sm:p-8 rounded bg-bg-surface border border-bg-border/80">
              <div className="font-mono text-xs text-amber-500 font-semibold mb-3">01 // THE ARCHITECTURAL CHALLENGE</div>
              <h3 className="font-heading text-xl font-bold text-steel-100 mb-3">Decoupling Monolithic Task Execution</h3>
              <p className="text-sm text-steel-300 leading-relaxed">{project.problemSolved}</p>
            </motion.div>

            <motion.div variants={staggerItem} className="p-6 sm:p-8 rounded bg-bg-surface border border-bg-border/80">
              <div className="font-mono text-xs text-amber-500 font-semibold mb-3">02 // THE ENGINEERING SOLUTION</div>
              <h3 className="font-heading text-xl font-bold text-steel-100 mb-3">Thread-Safe Synchronization &amp; Worker Pools</h3>
              <p className="text-sm text-steel-300 leading-relaxed mb-4">{project.technicalChallenge}</p>
              <motion.div
                className="space-y-2 font-mono text-xs text-steel-400"
                variants={staggerContainer(0.07, 0.1)}
                initial="hidden"
                animate={contentInView ? 'visible' : 'hidden'}
              >
                {project.highlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
                    }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Tech stack + CTAs */}
            <motion.div variants={staggerItem} className="pt-2 flex flex-wrap items-center justify-between gap-6">
              <motion.div
                className="flex flex-wrap items-center gap-2"
                variants={staggerContainer(0.05, 0.1)}
                initial="hidden"
                animate={contentInView ? 'visible' : 'hidden'}
              >
                {project.techStack.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    variants={springPop}
                    className="px-3 py-1 rounded bg-bg-card border border-bg-border font-mono text-xs text-steel-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
              <div className="flex items-center gap-4">
                <MagneticButton
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-bg-surface hover:bg-bg-border/50 text-steel-100 border border-bg-border font-mono text-xs transition-colors"
                >
                  <Github className="w-4 h-4" /><span>Repository</span>
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-600 text-bg-dark font-mono font-bold text-xs transition-colors"
                >
                  <span>Live Demo</span><ExternalLink className="w-4 h-4" />
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>

          {/* Telemetry panel — parallax + typewriter terminal */}
          <motion.div
            ref={panelRef}
            style={prefersReduced ? {} : { y: panelY }}
            initial={prefersReduced ? false : { opacity: 0, x: 24 }}
            animate={panelInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="lg:col-span-5 sticky top-28"
          >
            <TelemetryTerminal visible={panelInView} prefersReduced={prefersReduced} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
