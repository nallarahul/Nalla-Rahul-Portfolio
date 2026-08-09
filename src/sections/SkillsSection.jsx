import React from 'react';
import { motion } from 'framer-motion';
import skillsData from '../data/skills.json';
import BlurReveal from '../components/ui/BlurReveal';
import ClipReveal from '../components/ui/ClipReveal';

// Helper component for skill badge card
function SkillBadge({ skill }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl bg-bg-card border border-bg-border/80 hover:border-amber-500/50 hover:bg-bg-surface transition-all duration-300 shadow-md group cursor-pointer">
      <div className="w-8 h-8 flex items-center justify-center rounded-lg">
        <img
          src={skill.iconUrl}
          alt={skill.name}
          className="w-full h-full object-contain filter drop-shadow group-hover:scale-110 transition-transform"
          onError={(e) => {
            // Fallback generic code icon if image path fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <span className="font-mono text-sm text-steel-100 font-medium group-hover:text-amber-400 transition-colors whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
}

export default function SkillsSection() {
  // Split skills into two balanced sets for Row 1 and Row 2
  const midIndex = Math.ceil(skillsData.length / 2);
  const row1Skills = skillsData.slice(0, midIndex);
  const row2Skills = skillsData.slice(midIndex);

  // Duplicate arrays to create a seamless infinite marquee loop
  const row1Loop = [...row1Skills, ...row1Skills, ...row1Skills, ...row1Skills];
  const row2Loop = [...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills];

  return (
    <section id="skills" className="py-24 relative border-b border-bg-border/50 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e202e0a_1px,transparent_1px),linear-gradient(to_bottom,#1e202e0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-bg-border/40 pb-6">
          <div>
            <ClipReveal className="flex items-center gap-3 font-mono text-xs text-amber-500 mb-3">
              <span className="w-8 h-[1px] bg-amber-500/50" />
              <span>01. SKILLS &amp; TECHNICAL CAPABILITIES</span>
            </ClipReveal>
            <BlurReveal as="h2" delay={0.1} className="font-heading text-4xl sm:text-5xl font-bold text-steel-100 tracking-tight">
              Technologies &amp; Tools
            </BlurReveal>
          </div>
          <BlurReveal delay={0.2} className="font-mono text-xs text-steel-400 mt-4 md:mt-0 max-w-md leading-relaxed">
            Loaded dynamically from JSON. Transparent icon logos with automated infinite scrolling across languages, frameworks, databases, and DevOps tools.
          </BlurReveal>
        </div>
      </div>

      {/* ── Marquee Container with Screen Border Fades ── */}
      <div className="relative w-full overflow-hidden space-y-6">
        {/* Side Gradient Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

        {/* ── Row 1: Leftward Infinite Marquee ── */}
        <div className="flex w-max">
          <motion.div
            className="flex gap-4 pr-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 50,
            }}
          >
            {row1Loop.map((skill, idx) => (
              <SkillBadge key={`r1-${skill.id}-${idx}`} skill={skill} />
            ))}
          </motion.div>
        </div>

        {/* ── Row 2: Rightward Infinite Marquee (Opposite Direction) ── */}
        <div className="flex w-max">
          <motion.div
            className="flex gap-4 pr-4"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 50,
            }}
          >
            {row2Loop.map((skill, idx) => (
              <SkillBadge key={`r2-${skill.id}-${idx}`} skill={skill} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
