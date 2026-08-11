import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Cpu, Terminal, ExternalLink, Github, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import BlurReveal from '../components/ui/BlurReveal';
import ClipReveal from '../components/ui/ClipReveal';
import MagneticButton from '../components/ui/MagneticButton';
import ProjectDetailModal from '../components/ui/ProjectDetailModal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { staggerContainer, staggerItem, springPop } from '../motion/variants';

export default function ProjectsSection() {
  const scrollRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const prefersReduced = useReducedMotion();

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web-dev', label: 'Web Development' },
    { id: 'ai', label: 'AI/ML' },
  ];

  // Filter projects by category
  const filteredProjects = selectedCategory === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === selectedCategory);

  // Smooth side scroll handler
  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-28 relative border-b border-bg-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-bg-border/40">
          <div>
            <ClipReveal className="flex items-center gap-3 font-mono text-xs text-amber-500 mb-3">
              <span className="w-8 h-[1px] bg-amber-500/50" />
              <span>02. PROJECTS &amp; ARCHITECTURAL CASE STUDIES</span>
            </ClipReveal>
            <BlurReveal as="h2" delay={0.1} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-steel-100 tracking-tight">
              Projects &amp; Systems
            </BlurReveal>
          </div>
          <BlurReveal delay={0.2} className="font-mono text-xs text-steel-400 mt-4 md:mt-0 max-w-md leading-relaxed">
            A collection of projects where I turn ideas into real, working systems — spanning full-stack development, distributed systems, and AI.
          </BlurReveal>
        </div>

        {/* Category Filters & Scroll Navigation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-bg-dark font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                    : 'bg-bg-surface border border-bg-border/80 text-steel-400 hover:text-steel-100 hover:border-amber-500/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Carousel Control Buttons (< >) */}
          <div className="flex items-center gap-2 font-mono text-xs text-steel-400">
            <span className="text-[10px] mr-2 hidden sm:inline">[DRAG OR USE ARROWS]</span>
            <button
              onClick={() => handleScroll('left')}
              className="p-2.5 rounded-full bg-bg-surface border border-bg-border/80 text-steel-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors focus:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2.5 rounded-full bg-bg-surface border border-bg-border/80 text-steel-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors focus:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Side-Scrolling Horizontal Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={prefersReduced ? false : { opacity: 0, scale: 0.94, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={prefersReduced ? {} : { y: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(project)}
                className="w-[320px] sm:w-[380px] md:w-[410px] flex-shrink-0 snap-start bg-bg-card border border-bg-border/90 hover:border-amber-500/50 rounded-xl p-6 flex flex-col justify-between group transition-colors shadow-lg relative overflow-hidden cursor-pointer"
              >
                {/* Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Bar: Badge + Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      {project.badge || 'PROJECT'}
                    </span>
                    <span className="font-mono text-[11px] text-steel-400 font-semibold uppercase">
                      0{idx + 1} // {project.categoryLabel || project.category}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading text-2xl font-bold text-steel-100 group-hover:text-amber-400 transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-amber-500/90 mb-4 font-medium">
                    {project.subtitle}
                  </p>

                  {/* Excerpt Summary */}
                  <p className="text-xs text-steel-300 font-body leading-relaxed line-clamp-3 mb-6">
                    {project.summary}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded bg-bg-surface border border-bg-border font-mono text-[10px] text-steel-400 group-hover:text-steel-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 font-mono text-[10px] text-amber-500 font-semibold">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Bottom Action CTA */}
                  <div className="pt-4 border-t border-bg-border/60 flex items-center justify-between font-mono text-xs text-steel-300 group-hover:text-amber-400 transition-colors">
                    <span className="font-semibold text-[11px]">Inspect Architecture</span>
                    <div className="p-1.5 rounded bg-bg-surface border border-bg-border group-hover:border-amber-500/40 group-hover:bg-amber-500 group-hover:text-bg-dark transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Scroll Track Indicator Bar */}
        <div className="mt-4 flex items-center justify-between text-mono text-[11px] text-steel-400">
          <span>Showing {filteredProjects.length} of {portfolioData.projects.length} Engineering Projects</span>
          <span className="text-amber-500 font-mono text-xs">CLICK ANY CARD FOR FULL SPECIFICATIONS &amp; LOGS</span>
        </div>
      </div>

      {/* Interactive Detail Modal Drawer */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
