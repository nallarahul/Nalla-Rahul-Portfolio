import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * SplitTextReveal — character-level stagger reveal for display headings.
 * Splits text into individual characters, each clips in from below.
 * Best for the largest hero/section titles where you want maximum drama.
 */
export default function SplitTextReveal({
  text,
  className = '',
  charClassName = '',
  stagger = 0.025,
  delay = 0,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const prefersReduced = useReducedMotion();

  const chars = [...text];

  return (
    <span
      ref={ref}
      className={`inline-block overflow-hidden leading-none ${className}`}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`inline-block ${char === ' ' ? 'w-[0.3em]' : ''} ${charClassName}`}
          initial={prefersReduced ? false : { y: '105%', opacity: 0 }}
          animate={isInView ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + i * stagger,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
