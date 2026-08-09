import { useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * useScrollProgress — reusable scroll-linked transform pairs.
 * Returns smoothed motionValues for parallax, scale, and opacity.
 *
 * @param {React.RefObject} target - Ref to the scrolling section
 * @param {string[]} offset - useScroll offset array, e.g. ['start end', 'end start']
 */
export function useScrollProgress(target, offset = ['start end', 'end start']) {
  const { scrollYProgress } = useScroll({ target, offset });

  // Parallax Y: element scrolls slower than page (subtle depth)
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Strong parallax Y (hero / large elements)
  const parallaxYStrong = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Opacity: fades in as entering, fades out when leaving
  const fadeInOut = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);

  // Scale: subtle grow on scroll entry
  const scaleOnEnter = useTransform(scrollYProgress, [0, 0.3], [0.97, 1]);

  return { scrollYProgress, parallaxY, parallaxYStrong, fadeInOut, scaleOnEnter };
}

/**
 * useParallaxValue — simplified single-axis transform sugar.
 * @param {MotionValue} scrollYProgress
 * @param {[number, number]} output - output range [from, to]
 */
export function useParallaxValue(scrollYProgress, output = [30, -30]) {
  return useTransform(scrollYProgress, [0, 1], output);
}
