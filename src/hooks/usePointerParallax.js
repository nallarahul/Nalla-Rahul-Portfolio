import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * usePointerParallax — spring-smoothed pointer position relative to viewport center.
 * 
 * Returns spring motionValues x, y in range [-1, 1] (normalized to viewport).
 * Multiply by desired pixel offset in your component.
 * 
 * @param {object} config - spring config
 * @param {boolean} disabled - pass true for reduced-motion
 */
export function usePointerParallax({
  stiffness = 80,
  damping = 20,
  disabled = false,
} = {}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness, damping });
  const y = useSpring(rawY, { stiffness, damping });

  useEffect(() => {
    if (disabled) return;

    const handleMove = (e) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [disabled, rawX, rawY]);

  return { x, y };
}
