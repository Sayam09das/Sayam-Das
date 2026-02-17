import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef(null);
  const progressRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  // Theme toggle with localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  // GSAP Scroll animations
  useEffect(() => {
    const navbar = navRef.current;

    // Navbar shrink on scroll
    gsap.to(navbar, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=100',
        scrub: true,
      },
      padding: '0.75rem 0',
      duration: 0.3,
    });

    // Scroll progress bar
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Framer Motion variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const mobileLinkVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] z-[100] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Navbar */}
      <motion.nav
        ref={navRef}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 px-6 py-4 rounded-2xl backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-2xl shadow-black/10"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            variants={linkVariants}
            className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent hover:scale-105 transition-transform"
            style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
          >
            Portfolio
          </motion.a>

          {/* Desktop Navigation */}
          <motion.div
            variants={linkVariants}
            className="hidden md:flex items-center gap-1"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                variants={linkVariants}
                className={`relative px-4 py-2 text-sm font-medium transition-colors group ${activeSection === link.href.substring(1)
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
                {/* Animated underline */}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Active indicator */}
                {activeSection === link.href.substring(1) && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute inset-0 bg-[var(--glass-bg)] rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </motion.div>

          {/* Right Side Actions */}
          <motion.div variants={linkVariants} className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA Button - Desktop */}
            <motion.a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] text-white font-semibold text-sm shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-[var(--color-primary)]/50 transition-all overflow-hidden relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient glow effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Hire Me</span>
              <ArrowUpRight size={16} className="relative z-10" />
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Drawer */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[var(--bg-secondary)] border-l border-[var(--glass-border)] shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col p-8 gap-6">
                {/* Mobile Logo */}
                <motion.div
                  variants={mobileLinkVariants}
                  className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent mb-4"
                >
                  Portfolio
                </motion.div>

                {/* Mobile Links */}
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={mobileLinkVariants}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium py-3 px-4 rounded-xl transition-all ${activeSection === link.href.substring(1)
                        ? 'text-[var(--text-primary)] bg-[var(--glass-bg)] border border-[var(--glass-border)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]'
                      }`}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                  </motion.a>
                ))}

                {/* Mobile CTA */}
                <motion.a
                  href="#contact"
                  variants={mobileLinkVariants}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-4 mt-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] text-white font-semibold text-base shadow-lg shadow-[var(--color-primary)]/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Hire Me
                  <ArrowUpRight size={18} />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CSS Variables */}
      <style>{`
        :root {
          --bg-primary: #0b1120;
          --bg-secondary: #111827;
          --bg-tertiary: #1f2937;
          --bg-elevated: #182033;
          --text-primary: #f9fafb;
          --text-secondary: #9ca3af;
          --color-primary: #6366f1;
          --color-primary-hover: #4f46e5;
          --color-accent: #22d3ee;
          --border-primary: #1f2937;
          --glass-bg: rgba(255, 255, 255, 0.05);
          --glass-border: rgba(255, 255, 255, 0.1);
        }

        .light {
          --bg-primary: #ffffff;
          --bg-secondary: #f9fafb;
          --bg-tertiary: #f3f4f6;
          --bg-elevated: #ffffff;
          --text-primary: #111827;
          --text-secondary: #6b7280;
          --color-primary: #6366f1;
          --color-primary-hover: #4f46e5;
          --color-accent: #06b6d4;
          --border-primary: #e5e7eb;
          --glass-bg: rgba(255, 255, 255, 0.8);
          --glass-border: rgba(0, 0, 0, 0.1);
        }

        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Sora', 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
        }

        body {
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        *:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default Navbar;