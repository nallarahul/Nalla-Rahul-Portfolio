/**
 * Shared Framer Motion variant library.
 * Central place for all animation choreography.
 * All variants should form sequences — not isolated effects.
 */

// ─── Spring Configs ─────────────────────────────────────────────────────────
export const springs = {
  gentle:  { type: 'spring', stiffness: 100, damping: 20 },
  snappy:  { type: 'spring', stiffness: 300, damping: 28 },
  slow:    { type: 'spring', stiffness: 60,  damping: 18 },
  bouncy:  { type: 'spring', stiffness: 380, damping: 26 },
  precise: { type: 'spring', stiffness: 450, damping: 36 },
  magnetic:{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 },
};

// ─── Easing Curves ───────────────────────────────────────────────────────────
export const ease = {
  cinematic:  [0.16, 1, 0.3, 1],
  smooth:     [0.25, 0.46, 0.45, 0.94],
  overshoot:  [0.34, 1.38, 0.64, 1],
};

// ─── Hero: Character reveal (name-level drama) ────────────────────────────────
// Per-character — blur + overshoot Y + spring settle
export const heroCharReveal = {
  hidden:  { y: '110%', opacity: 0, filter: 'blur(8px)' },
  visible: {
    y: '0%', opacity: 1, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 280, damping: 22, mass: 0.7 },
  },
};

// ─── Hero: Role reveal — horizontal clip wipe, distinct from name ────────────
export const heroRoleReveal = {
  hidden:  { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)', opacity: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Blur + Y Reveal (section headings, body text) ───────────────────────────
export const blurReveal = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(10px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Clip-Path Reveal (upward wipe, section markers) ─────────────────────────
export const clipReveal = {
  hidden:  { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)', opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Portrait Mask (clip from bottom + subtle scale) ─────────────────────────
export const portraitReveal = {
  hidden:  { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.06 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)', scale: 1,
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

// ─── Fade Up (generic section entry) ─────────────────────────────────────────
export const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Spring Pop (badges, node dots, small elements) ──────────────────────────
export const springPop = {
  hidden:  { opacity: 0, scale: 0.72 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 380, damping: 22 },
  },
};

// ─── Slide From Edge (asymmetric project cards) ───────────────────────────────
export const slideFromLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideFromRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Timeline line draw (scaleY from top origin) ─────────────────────────────
export const drawLine = {
  hidden:  { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Stagger Container ────────────────────────────────────────────────────────
export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

// ─── Stagger Container (no opacity wrapper — preserves children control) ──────
export const staggerContainerClean = (stagger = 0.08, delay = 0) => ({
  hidden:  {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

// ─── Stagger Item (standard fade up) ─────────────────────────────────────────
export const staggerItem = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Stagger Item with slight X offset (skills/spatial entry) ────────────────
export const staggerItemSpatialized = (direction = 1) => ({
  hidden:  { opacity: 0, x: direction * 8, y: 10 },
  visible: {
    opacity: 1, x: 0, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
});

// ─── Scroll-scale panel ───────────────────────────────────────────────────────
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};
