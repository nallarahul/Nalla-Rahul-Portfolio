import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Central hook for respecting prefers-reduced-motion.
 * Returns true if the user has requested reduced motion.
 */
export function useReducedMotion() {
  return useFramerReducedMotion() ?? false;
}
