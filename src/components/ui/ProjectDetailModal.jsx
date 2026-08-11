import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Terminal, CheckCircle2, Activity, Cpu, Layers, ShieldCheck } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { staggerContainer, staggerItem, springPop } from '../../motion/variants';

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  const prefersReduced = useReducedMotion();
  const [activeLogCount, setActiveLogCount] = useState(0);

  // Keyboard shortcut (ESC) to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Terminal typewriter timer
  useEffect(() => {
    if (!isOpen || !project?.terminalLogs) return;
    if (prefersReduced) {
      setActiveLogCount(project.terminalLogs.length);
      return;
    }
    setActiveLogCount(0);
    const timers = [];
    project.terminalLogs.forEach((_, idx) => {
      const t = setTimeout(() => {
        setActiveLogCount(idx + 1);
      }, 250 + idx * 250);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [isOpen, project, prefersReduced]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg-dark/85 backdrop-blur-md z-[-1]"
          />

          {/* Modal Card */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20, filter: 'blur(8px)' }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 15, filter: 'blur(6px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl bg-bg-card border border-bg-border/90 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto relative"
          >
            {/* Modal Header */}
            <div className="px-6 py-5 bg-bg-surface border-b border-bg-border flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                  {project.badge || project.categoryLabel || 'CASE STUDY'}
                </span>
                <span className="font-mono text-xs text-steel-400 font-semibold uppercase tracking-wide hidden sm:inline">
                  {project.categoryLabel || project.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-steel-400 hidden sm:inline mr-2">[ESC TO CLOSE]</span>
                <button
                  onClick={onClose}
                  className="p-2 rounded bg-bg-dark border border-bg-border text-steel-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-8 font-body">
              {/* Title & Subtitle */}
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-steel-100 tracking-tight mb-2">
                  {project.title}
                </h2>
                <p className="font-mono text-sm text-amber-500 font-medium">{project.subtitle}</p>
              </div>

              {/* Grid: Details & Terminal */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Narrative */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Executive Summary */}
                  <div className="p-5 rounded bg-bg-surface border border-bg-border/80">
                    <div className="font-mono text-xs text-amber-500 font-semibold mb-2">OVERVIEW</div>
                    <p className="text-sm text-steel-300 leading-relaxed">{project.summary}</p>
                  </div>

                  {/* Problem & Solution Cards */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-5 rounded bg-bg-surface border border-bg-border/80">
                      <div className="font-mono text-xs text-amber-500 font-semibold mb-2 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>THE CORE CHALLENGE</span>
                      </div>
                      <p className="text-xs text-steel-300 leading-relaxed">{project.problemSolved}</p>
                    </div>

                    <div className="p-5 rounded bg-bg-surface border border-bg-border/80">
                      <div className="font-mono text-xs text-amber-500 font-semibold mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>ENGINEERING OUTCOME</span>
                      </div>
                      <p className="text-xs text-steel-300 leading-relaxed mb-3">{project.outcomeKey}</p>

                      {/* Staggered Highlights */}
                      {project.highlights && project.highlights.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-bg-border/50 font-mono text-[11px] text-steel-400">
                          {project.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack Badges */}
                  <div>
                    <div className="font-mono text-xs text-steel-400 mb-3 font-semibold uppercase tracking-wider">TECHNOLOGIES &amp; TOOLS</div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 rounded bg-bg-dark border border-bg-border font-mono text-xs text-steel-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <MagneticButton
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-bg-surface hover:bg-bg-border/60 text-steel-100 border border-bg-border font-mono text-xs transition-colors"
                    >
                      <Github className="w-4 h-4 text-amber-500" />
                      <span>Source Repository</span>
                    </MagneticButton>

                    {project.liveDemoUrl && (
                      <MagneticButton
                        as="a"
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-600 text-bg-dark font-mono font-bold text-xs transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                      >
                        <span>Interactive Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </MagneticButton>
                    )}
                  </div>
                </div>

                {/* Right: Live Telemetry Terminal */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="border border-bg-border/90 bg-bg-dark rounded-lg overflow-hidden font-mono text-xs text-steel-300 shadow-xl">
                    <div className="px-4 py-3 bg-bg-surface border-b border-bg-border flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-amber-500" />
                        <span className="text-steel-100 font-semibold text-[11px]">
                          {project.id.toUpperCase()}.TELEMETRY
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[10px] text-amber-500">LIVE</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2 text-[11px] leading-relaxed min-h-[180px]">
                      {project.terminalLogs ? (
                        project.terminalLogs.map((line, idx) => (
                          <AnimatePresence key={idx}>
                            {idx < activeLogCount && (
                              <motion.p
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.25 }}
                                className={line.color}
                              >
                                {line.text}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        ))
                      ) : (
                        <p className="text-steel-400">[SYSTEM] Live telemetry ready for query stream...</p>
                      )}

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeLogCount >= 2 ? 1 : 0 }}
                        className="p-3 rounded bg-bg-surface border border-amber-500/30 text-amber-400 font-mono text-[10px] space-y-1 mt-3"
                      >
                        <div>STATUS: VERIFIED &amp; DEPLOYED</div>
                        <div>LATENCY: &lt;20MS</div>
                        <div>CONTAINER: OCI COMPLIANT</div>
                      </motion.div>
                    </div>

                    <div className="px-4 py-2.5 bg-bg-surface/50 border-t border-bg-border/60 text-[10px] text-steel-400 flex justify-between">
                      <span>BUILD: OK</span>
                      <span>RAHUL NALLA // SPEC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
