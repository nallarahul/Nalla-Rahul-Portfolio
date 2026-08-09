import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { clipReveal } from '../../motion/variants';

/**
 * ClipReveal — bottom-to-top clip-path wipe reveal.
 * once: false allows re-triggering smoothly on scroll up and down.
 */
export default function ClipReveal({
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
        ...clipReveal,
        visible: {
          ...clipReveal.visible,
          transition: { ...clipReveal.visible.transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
