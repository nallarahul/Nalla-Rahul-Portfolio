import { useRef, useState, useCallback } from 'react';
import { useSpring } from 'framer-motion';

/**
 * Spring-based magnetic pointer tracking.
 * Returns ref to attach to element, and motionValues x/y.
 * strength: 0.2–0.5 recommended for subtle effect.
 */
export function useMagneticEffect(strength = 0.25) {
  const ref = useRef(null);

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [x, y, strength]);

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x, y, onMouseMove, onMouseLeave };
}
