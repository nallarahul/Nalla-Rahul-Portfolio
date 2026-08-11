import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import BlurReveal from '../components/ui/BlurReveal';
import ClipReveal from '../components/ui/ClipReveal';
import { staggerContainer, staggerItem, springPop, drawLine } from '../motion/variants';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function ExperienceSection() {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.08 });
  const lineInView = useInView(lineRef, { once: true, amount: 0.08 });
  const certsRef = useRef(null);
  const certsInView = useInView(certsRef, { once: true, amount: 0.2 });
  const prefersReduced = useReducedMotion();

  return (
    <section id="experience" className="py-18 relative bg-bg-card/20 border-b border-bg-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClipReveal className="flex items-center gap-3 font-mono text-xs text-amber-500 mb-8">
          <span className="w-8 h-[1px] bg-amber-500/50" /><span>03. JOURNEY &amp; MILESTONES</span>
        </ClipReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <BlurReveal as="h2" delay={0.1} className="font-heading text-3xl sm:text-4xl font-bold text-steel-100 tracking-tight mb-10">
              Education &amp; Development Timeline
            </BlurReveal>

            {/* Timeline wrapper — line draws in from top */}
            <div className="relative pl-6 sm:pl-8">
              {/* Animated vertical line */}
              <motion.div
                ref={lineRef}
                initial={prefersReduced ? false : 'hidden'}
                animate={lineInView ? 'visible' : 'hidden'}
                variants={drawLine}
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-bg-border/80 origin-top"
                style={{ transformOrigin: 'top' }}
              />

              <motion.div
                ref={timelineRef}
                initial={prefersReduced ? false : 'hidden'}
                animate={timelineInView ? 'visible' : 'hidden'}
                variants={staggerContainer(0.15, 0.2)}
                className="space-y-12"
              >
                {portfolioData.experienceTimeline.map((item, idx) => (
                  <motion.div key={idx} variants={staggerItem} className="relative group">
                    {/* Timeline node dot — spring pop */}
                    <motion.span
                      initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
                      animate={timelineInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.25 + idx * 0.15 }}
                      className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-bg-dark border-2 border-amber-500 group-hover:bg-amber-500 group-hover:border-amber-400 transition-colors duration-200"
                    />

                    {/* Period badge — clip-path wipe */}
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-amber-500 mb-2">
                      <motion.span
                        initial={prefersReduced ? false : { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 }}
                        animate={timelineInView ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } : {}}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 + idx * 0.15 }}
                        className="px-2 py-0.5 rounded bg-bg-surface border border-bg-border font-semibold"
                      >
                        {item.period}
                      </motion.span>
                      <span className="text-steel-400">// {item.type}</span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-steel-100 group-hover:text-amber-500 transition-colors">{item.role}</h3>
                    <div className="font-mono text-xs text-steel-400 mb-3">{item.institution}</div>
                    <p className="text-sm text-steel-300 font-body leading-relaxed mb-4">{item.description}</p>

                    <div className="space-y-2">
                      {item.keyAchievements.map((achieve, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs text-steel-400 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{achieve}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Certifications — springPop entry */}
          <motion.div
            ref={certsRef}
            initial={prefersReduced ? false : 'hidden'}
            animate={certsInView ? 'visible' : 'hidden'}
            variants={staggerContainer(0.1, 0.1)}
            className="lg:col-span-4"
          >
            <motion.div variants={staggerItem} className="p-6 rounded-xl bg-bg-surface border border-bg-border/80">
              <div className="flex items-center gap-2 font-mono text-xs text-amber-500 font-semibold mb-4">
                <Award className="w-4 h-4" /><span>CERTIFICATIONS &amp; FOCUS</span>
              </div>
              <div className="space-y-4">
                {portfolioData.certificationsAndMilestones.map((cert, cIdx) => (
                  <motion.div
                    key={cIdx}
                    variants={springPop}
                    className="p-3 rounded bg-bg-dark border border-bg-border/60 font-mono text-xs"
                  >
                    <h4 className="text-steel-100 font-semibold mb-1">{cert.title}</h4>
                    <div className="text-[11px] text-steel-400 flex items-center justify-between">
                      <span>{cert.issuer}</span>
                      <span className="text-amber-500 font-bold">{cert.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
