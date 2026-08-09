import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { staggerContainer, blurReveal } from '../../motion/variants';

/**
 * WordStagger — splits text into words and staggers their reveal.
 * Best for short important headings. Each word blurs-in with a slight Y offset.
 */
export default function WordStagger({
  text,
  className = '',
  wordClassName = '',
  stagger = 0.07,
  delay = 0,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.4 });
  const prefersReduced = useReducedMotion();

  const words = text.split(' ');

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap gap-x-[0.28em] leading-none ${className}`}
      initial={prefersReduced ? false : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer(stagger, delay)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block ${wordClassName}`}
          variants={blurReveal}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
