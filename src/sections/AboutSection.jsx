import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, ShieldCheck, Layers, Workflow, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import BlurReveal from '../components/ui/BlurReveal';
import ScrollText from '../components/ui/ScrollText';
import ClipReveal from '../components/ui/ClipReveal';
import { staggerContainer, staggerItem, fadeUp } from '../motion/variants';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function AboutSection() {
  const prefersReduced = useReducedMotion();
  const principlesRef = useRef(null);
  const principlesInView = useInView(principlesRef, { once: true, amount: 0.15 });

  const principles = [
    { icon: Cpu,        title: "Resilient Microservices",  description: "Designing decoupled, fault-tolerant backend architectures engineered for consistent uptime and high throughput." },
    { icon: Layers,     title: "Full-Stack Precision",      description: "Bridging core backend infrastructure with performant, responsive React interfaces for seamless end-to-end applications." },
    { icon: Workflow,   title: "Automated Pipelines",       description: "Integrating containerized Docker workflows and automated CI/CD pipelines for reliable continuous delivery." },
    { icon: ShieldCheck,title: "Maintainable Code",         description: "Prioritizing clean code standards, comprehensive API documentation, and strict architectural discipline." },
  ];

  return (
    <section id="about" className="py-28 relative border-b border-bg-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClipReveal delay={0} className="flex items-center gap-3 font-mono text-xs text-amber-500 mb-10">
          <span className="w-8 h-[1px] bg-amber-500/50" />
          <span>01. ABOUT &amp; ARCHITECTURAL PHILOSOPHY</span>
        </ClipReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            {/* Editorial statement — scroll-linked */}
            <ScrollText className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-steel-100 leading-[1.05] mb-10">
              "{portfolioData.personal.aboutStatement}"
            </ScrollText>

            <BlurReveal delay={0.1} className="text-lg text-steel-300 leading-relaxed font-body mb-8">
              {portfolioData.personal.aboutDetailed}
            </BlurReveal>

            <BlurReveal delay={0.2} className="p-6 rounded bg-bg-surface border border-bg-border/80 font-mono text-xs text-steel-300 leading-relaxed">
              <div className="flex items-center gap-2 text-amber-500 font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>TECHNICAL FOCUS</span>
              </div>
              Engineering resilient backend systems, relational data models, and performant web interfaces with clean architecture and strict quality standards.
            </BlurReveal>
          </div>

          {/* Engineering principles — staggered entry */}
          <motion.div
            ref={principlesRef}
            initial={prefersReduced ? false : 'hidden'}
            animate={principlesInView ? 'visible' : 'hidden'}
            variants={staggerContainer(0.1, 0.1)}
            className="lg:col-span-5 grid grid-cols-1 gap-4"
          >
            {principles.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  className="p-5 rounded bg-bg-surface border border-bg-border/70 hover:border-amber-500/40 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded bg-bg-dark border border-bg-border text-amber-500 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-steel-100 mb-1 group-hover:text-amber-500 transition-colors">{item.title}</h3>
                      <p className="text-xs font-mono text-steel-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
