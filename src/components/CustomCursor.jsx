import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const coreX = useSpring(-100, { stiffness: 1000, damping: 50 });
  const coreY = useSpring(-100, { stiffness: 1000, damping: 50 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      coreX.set(e.clientX);
      coreY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], .cursor-pointer');
      setIsHovered(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible, coreX, coreY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      style={{
        x: coreX,
        y: coreY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isHovered ? 1.5 : 1,
        opacity: isHovered ? 0.9 : 0.6,
      }}
      transition={{ duration: 0.15 }}
      className="fixed top-0 left-0 w-1.5 h-1.5 bg-amber-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
    />
  );
}
