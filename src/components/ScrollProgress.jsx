import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Ultra-Smooth ScrollProgress
 * Uses Framer Motion GPU-accelerated scaleX compositor transform & spring physics
 * Bypasses React state re-renders and CSS layout reflows for liquid-smooth 60/120fps progress.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.0001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[100000] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 shadow-[0_0_10px_#f59e0b,0_0_4px_#f59e0b]"
        style={{
          scaleX,
          transformOrigin: '0%',
        }}
      />
    </div>
  );
}
