import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { blurReveal } from '../../motion/variants';

/**
 * BlurReveal — blur-to-sharp + opacity + Y reveal on scroll entry.
 * once: false allows re-triggering smoothly on scroll up and down.
 */
export default function BlurReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  once = false,
  amount = 0.2,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReduced = useReducedMotion();

  const MotionTag = motion[Tag] ?? motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={prefersReduced ? false : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        ...blurReveal,
        visible: {
          ...blurReveal.visible,
          transition: { ...blurReveal.visible.transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
