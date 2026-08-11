import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useMagneticEffect } from '../hooks/useMagneticEffect';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { springs } from '../motion/variants';

function NavLink({ link, isActive, onClick }) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagneticEffect(0.3);
  const prefersReduced = useReducedMotion();

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={prefersReduced ? undefined : onMouseMove}
      onMouseLeave={prefersReduced ? undefined : onMouseLeave}
      style={prefersReduced ? {} : { x, y }}
      className={`relative px-3.5 py-1.5 text-xs font-mono transition-colors duration-200 rounded-full ${
        isActive
          ? 'text-amber-500 font-semibold'
          : 'text-steel-400 hover:text-steel-100'
      }`}
    >
      {link.label}

      <AnimatePresence>
        {isActive && (
          <motion.span
            layoutId="nav-indicator"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={springs.precise}
            className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-500"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const navLinks = [
    { id: 'skills', label: '01. Skills' },
    { id: 'projects', label: '02. Projects' },
    { id: 'experience', label: '03. Education' },
    { id: 'contact', label: '04. Contact' },
  ];

  /*
   * Scroll detection
   *
   * Keeps the existing behavior:
   * - Navbar changes appearance after scrolling
   * - Active navigation item updates according to section
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = [
        'hero',
        'skills',
        'projects',
        'experience',
        'contact',
      ];

      const isMobile = window.innerWidth < 768;
      const scrollOffset = isMobile ? 80 : 200;
      const scrollPos = window.scrollY + scrollOffset;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);

        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set initial state correctly if page loads at a scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /*
   * Scroll to a section
   *
   * Uses scrollIntoView instead of manually calculating pageYOffset.
   * This is more reliable on mobile browsers.
   *
   * The CSS variable --navbar-height is temporarily applied to the
   * target section so the fixed navbar does not cover the heading.
   */
  const scrollToSection = (id) => {
    const el = document.getElementById(id);

    if (!el) {
      console.warn(`Section with id "${id}" not found`);
      return;
    }

    setMobileMenuOpen(false);

    requestAnimationFrame(() => {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        const targetPosition =
          el.getBoundingClientRect().top +
          window.scrollY -
          120;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReduced ? 'auto' : 'smooth',
        });
      } else {
        el.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    });
  };

  /*
   * Close mobile menu when Escape is pressed
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  /*
   * Prevent background page scrolling while mobile menu is open.
   *
   * This makes the mobile drawer behave like a proper navigation drawer.
   */
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      animate={scrolled ? 'scrolled' : 'top'}
      variants={{
        top: {
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem',
          backgroundColor: 'rgba(8,8,12,0)',
        },
        scrolled: {
          paddingTop: '0.65rem',
          paddingBottom: '0.65rem',
          backgroundColor: 'rgba(8,8,12,0.92)',
        },
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        backdropFilter: scrolled
          ? 'blur(16px) saturate(1.2)'
          : 'none',
        WebkitBackdropFilter: scrolled
          ? 'blur(16px) saturate(1.2)'
          : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        animate={
          scrolled
            ? {
                borderColor: 'rgba(30,32,46,0.7)',
                borderBottomWidth: '1px',
              }
            : {
                borderColor: 'transparent',
                borderBottomWidth: '1px',
              }
        }
        transition={{ duration: 0.3 }}
        className="border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Monogram */}
          <button
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <motion.div
              whileHover={
                prefersReduced
                  ? {}
                  : {
                      borderColor: 'rgba(245,158,11,0.5)',
                      scale: 1.04,
                    }
              }
              transition={springs.snappy}
              className="w-9 h-9 bg-bg-surface border border-bg-border flex items-center justify-center font-mono text-xs font-bold text-steel-100 rounded"
            >
              RN<span className="text-amber-500">.</span>
            </motion.div>

            <div className="hidden sm:block">
              <span className="block font-heading text-sm font-semibold tracking-tight text-steel-100 group-hover:text-amber-500 transition-colors">
                {portfolioData.personal.name}
              </span>

              <span className="block font-mono text-[10px] text-steel-400">
                {portfolioData.personal.role}
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-bg-surface/80 border border-bg-border/70 rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                link={link}
                isActive={activeSection === link.id}
                onClick={() => scrollToSection(link.id)}
              />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <MagneticCTA
              onClick={() => scrollToSection('contact')}
              prefersReduced={prefersReduced}
            />
          </div>

          {/* Mobile Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            whileTap={prefersReduced ? {} : { scale: 0.92 }}
            className="md:hidden p-2 rounded bg-bg-surface border border-bg-border text-steel-300 hover:text-amber-500 focus:outline-none"
            aria-label={
              mobileMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{
                    rotate: -45,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: 45,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{
                    rotate: 45,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: -45,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              key="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-[56px] bg-bg-dark/60 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu */}
            <motion.div
              key="mobile-menu"
              initial={{
                opacity: 0,
                height: 0,
                filter: 'blur(4px)',
              }}
              animate={{
                opacity: 1,
                height: 'auto',
                filter: 'blur(0px)',
              }}
              exit={{
                opacity: 0,
                height: 0,
                filter: 'blur(4px)',
              }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="md:hidden relative z-50 bg-bg-dark/98 border-b border-bg-border/80 backdrop-blur-xl overflow-hidden"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.06,
                    },
                  },
                }}
                className="px-6 py-5 flex flex-col gap-4 font-mono text-sm"
              >
                {navLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: -14,
                        filter: 'blur(4px)',
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        filter: 'blur(0px)',
                        transition: {
                          duration: 0.3,
                        },
                      },
                    }}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-left py-2 border-b border-bg-border/40 flex items-center justify-between ${
                      activeSection === link.id
                        ? 'text-amber-500 font-bold'
                        : 'text-steel-300'
                    }`}
                  >
                    <span>{link.label}</span>

                    {activeSection === link.id && (
                      <motion.span
                        layoutId="mobile-active-pip"
                        className="w-2 h-2 rounded-full bg-amber-500"
                        transition={springs.bouncy}
                      />
                    )}
                  </motion.button>
                ))}

                {/* Mobile CTA */}
                <motion.button
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 10,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.3,
                        delay: 0.35,
                      },
                    },
                  }}
                  onClick={() => scrollToSection('contact')}
                  className="mt-2 w-full py-3 bg-amber-500 text-bg-dark font-mono font-bold text-center rounded"
                >
                  Get in Touch
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MagneticCTA({ onClick, prefersReduced }) {
  const {
    ref,
    x,
    y,
    onMouseMove,
    onMouseLeave,
  } = useMagneticEffect(0.28);

  return (
    <motion.div
      ref={ref}
      style={prefersReduced ? {} : { x, y }}
      onMouseMove={
        prefersReduced ? undefined : onMouseMove
      }
      onMouseLeave={
        prefersReduced ? undefined : onMouseLeave
      }
    >
      <button
        onClick={onClick}
        className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/12 text-amber-500 text-xs font-mono transition-all duration-200"
      >
        <span>Get in Touch</span>

        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </motion.div>
  );
}