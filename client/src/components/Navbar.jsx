import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Home, User, Briefcase, Mail,
  Menu, X, ArrowRight, Zap,
} from 'lucide-react'
import { initNavbarScroll } from '../animations/navbarScroll'
import { prefersReducedMotion } from '../animations/utils'

/* ─── Spring configs ────────────────────────────────────────────── */
const SPRING_SNAPPY = { type: 'spring', stiffness: 380, damping: 30, mass: 0.6 }
const SPRING_SOFT = { type: 'spring', stiffness: 120, damping: 22, mass: 0.9 }
const EASE_OUT = [0.22, 1, 0.36, 1]

/* ─── Nav items (with Lucide icon components) ───────────────────── */
const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'about', label: 'About', Icon: User },
  { id: 'projects', label: 'Projects', Icon: Briefcase },
  { id: 'contact', label: 'Contact', Icon: Mail },
]

/* ─── Framer variants ───────────────────────────────────────────── */
const BAR_ENTRANCE = {
  hidden: { opacity: 0, y: -40, scale: 0.95, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_OUT, delay: 0.2 },
  },
}

const DRAWER_VARIANTS = {
  hidden: {
    opacity: 0, y: -20, rotateX: -8,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
  visible: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.42, ease: EASE_OUT, staggerChildren: 0.05, delayChildren: 0.08 },
  },
}

const DRAWER_ITEM = {
  hidden: { opacity: 0, x: -18, filter: 'blur(4px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 200, damping: 22 },
  },
}

/* ─── Minimal CSS — only what Tailwind cannot express ───────────── */
const CRITICAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@700;800&family=Outfit:wght@400;500&display=swap');

  .font-cabinet { font-family: 'Cabinet Grotesk', sans-serif; }
  .font-outfit  { font-family: 'Outfit', sans-serif; }

  /* Aurora gradient text (logo) */
  .aurora-text {
    background: linear-gradient(135deg, #6ee7b7 0%, #38bdf8 55%, #7dd3fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  /* Active nav item gradient text */
  .nav-active-text {
    background: linear-gradient(135deg, #34d399 0%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Top aurora shimmer line on bar */
  .bar-aurora::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(16,185,129,0.50) 20%,
      rgba(56,189,248,0.60) 50%,
      rgba(16,185,129,0.50) 80%,
      transparent 100%
    );
    z-index: 10;
    pointer-events: none;
  }

  /* Inner glass sheen on bar */
  .bar-sheen::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: linear-gradient(170deg,
      rgba(255,255,255,0.10) 0%,
      rgba(255,255,255,0.03) 35%,
      transparent 60%
    );
    pointer-events: none;
    z-index: 1;
  }

  /* Drawer aurora rim */
  .drawer-rim::after {
    content: '';
    position: absolute;
    top: 0; left: 8%; right: 8%;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(16,185,129,0.55) 25%,
      rgba(56,189,248,0.60) 75%,
      transparent
    );
    pointer-events: none;
  }

  /* CTA button shine overlay */
  .cta-shine::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%);
    border-radius: inherit;
    pointer-events: none;
  }

  /* Pulsing availability dot */
  @keyframes av-pulse {
    0%,100% { box-shadow: 0 0 4px rgba(16,185,129,0.70); }
    50%      { box-shadow: 0 0 10px rgba(16,185,129,1), 0 0 18px rgba(56,189,248,0.45); }
  }
  .av-dot { animation: av-pulse 2.2s ease-in-out infinite; }

  /* Micro-divider gradient */
  .zone-divider {
    width: 1px;
    height: 28px;
    flex-shrink: 0;
    background: linear-gradient(180deg,
      transparent,
      rgba(56,189,248,0.30),
      transparent
    );
  }

  /* Drawer arrow slide-in */
  .drawer-arrow {
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.18s, transform 0.22s;
  }
  .drawer-btn:hover .drawer-arrow,
  .drawer-btn[aria-current="page"] .drawer-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .av-dot { animation: none !important; }
  }
`

/* ─── Inject once ────────────────────────────────────────────────── */
let _injected = false
function injectStyles() {
  if (_injected || typeof document === 'undefined') return
  _injected = true
  const el = document.createElement('style')
  el.setAttribute('data-gn', '1')
  el.textContent = CRITICAL_STYLES
  document.head.appendChild(el)
}

/* ═══════════════════════════════════════════════════════════════════
   NAVBAR COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function Navbar({ lenis = null, items = NAV_ITEMS }) {
  const navRef = useRef(null)
  const [activeId, setActiveId] = useState(items[0]?.id ?? 'home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const reduced = useMemo(() => prefersReducedMotion(), [])

  useEffect(() => { injectStyles() }, [])

  /* Scroll-hide / progress */
  useEffect(() => {
    const cleanup = initNavbarScroll({ scope: navRef.current, lenis })
    return cleanup
  }, [lenis])

  /* Active section tracker */
  useEffect(() => {
    const els = items.map(({ id }) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return () => { }
    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (top?.target?.id) setActiveId(top.target.id)
      },
      { threshold: [0.2, 0.45, 0.65], rootMargin: '-15% 0px -45% 0px' },
    )
    els.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [items])

  /* Body lock while menu open */
  useEffect(() => {
    if (!menuOpen) return () => { }
    const prev = document.body.style.overflow
    if (lenis?.stop) lenis.stop()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      if (lenis?.start) lenis.start()
    }
  }, [lenis, menuOpen])

  /* Smooth scroll */
  const scrollTo = (id) => {
    setActiveId(id)
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    if (lenis?.scrollTo) {
      lenis.scrollTo(el, { duration: reduced ? 0 : 1.1, easing: (v) => 1 - Math.pow(1 - v, 3) })
    } else {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }
  }

  /* ── JSX ─────────────────────────────────────────────────────── */
  return (
    <div>
      {/* ════════════════════════════════════════════
          OUTER STRIP — fixed, centres the bar
      ════════════════════════════════════════════ */}
      <motion.div
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 sm:px-5 md:px-6 lg:px-8 pointer-events-none"
        style={{ perspective: '1000px' }}
        variants={BAR_ENTRANCE}
        initial="hidden"
        animate="visible"
      >
        {/* ════════════════════════════════════════
            GLASS BAR
        ════════════════════════════════════════ */}
        <div
          className={[
            // Layout
            'pointer-events-auto relative w-full flex items-center h-[52px] overflow-hidden',
            // Sizing
            'max-w-[860px]',
            // Shape
            'rounded-2xl',
            // Glass surface
            'bg-[rgba(4,14,24,0.48)]',
            'backdrop-blur-2xl',
            // Border
            'border border-[rgba(56,189,248,0.10)]',
            // Shadow stack
            'shadow-[0_0_0_1px_rgba(56,189,248,0.08)_inset,0_0_0_1px_rgba(255,255,255,0.04)_inset,0_8px_32px_rgba(0,0,0,0.55),0_2px_8px_rgba(0,0,0,0.30)]',
            // Pseudo decorations
            'bar-aurora bar-sheen',
          ].join(' ')}
        >

          {/* ── LOGO ZONE ── */}
          <div className="relative z-20 flex items-center h-full px-4 sm:px-5 flex-shrink-0">
            <motion.button
              onClick={() => scrollTo(items[0].id)}
              aria-label="Go home"
              className="font-cabinet aurora-text font-extrabold text-[15px] tracking-widest uppercase border-none outline-none cursor-pointer bg-transparent transition-[filter] duration-200 hover:brightness-125"
              style={{ filter: 'none' }}
              whileHover={reduced ? undefined : {
                scale: 1.06,
                filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.55))',
              }}
              whileTap={reduced ? undefined : { scale: 0.94 }}
              transition={SPRING_SNAPPY}
            >
              SD
            </motion.button>
          </div>

          {/* Zone divider */}
          <div className="zone-divider" />

          {/* ── NAV ZONE — hidden on mobile ── */}
          <nav
            className="hidden md:flex flex-1 items-center justify-center px-2 h-full relative z-20"
            aria-label="Primary navigation"
          >
            <ul className="flex items-center gap-0.5 list-none m-0 p-0">
              {items.map(({ id, label, Icon }) => {
                const isActive = activeId === id
                return (
                  <li key={id}>
                    <motion.button
                      onClick={() => scrollTo(id)}
                      onHoverStart={() => setHovered(id)}
                      onHoverEnd={() => setHovered(null)}
                      whileTap={reduced ? undefined : { scale: 0.95 }}
                      transition={SPRING_SNAPPY}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'relative flex items-center gap-1.5',
                        'font-outfit text-[13px] font-medium tracking-wide',
                        'rounded-[10px] px-3.5 py-[6px]',
                        'border-none outline-none cursor-pointer bg-transparent',
                        'transition-colors duration-200',
                        isActive
                          ? 'nav-active-text'
                          : 'text-[rgba(148,210,240,0.45)] hover:text-[rgba(200,235,255,0.75)]',
                      ].join(' ')}
                    >
                      {/* Liquid glass active pill */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            layoutId="gn-liquid"
                            className="absolute inset-0 rounded-[10px]"
                            style={{
                              background: 'rgba(20,184,166,0.13)',
                              border: '1px solid rgba(56,189,248,0.36)',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              boxShadow: '0 0 0 1px rgba(255,255,255,0.07) inset, 0 0 16px rgba(56,189,248,0.18)',
                              zIndex: 0,
                            }}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={SPRING_SOFT}
                          />
                        )}
                      </AnimatePresence>

                      {/* Hover ghost */}
                      <AnimatePresence>
                        {hovered === id && !isActive && (
                          <motion.span
                            className="absolute inset-0 rounded-[10px] bg-white/[0.04] pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Icon */}
                      <Icon
                        size={13}
                        strokeWidth={2}
                        className="relative z-[1] flex-shrink-0 opacity-70"
                        aria-hidden="true"
                      />

                      {/* Label */}
                      <span className="relative z-[1]">{label}</span>
                    </motion.button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Zone divider — desktop only */}
          <div className="zone-divider hidden md:block" />

          {/* ── RIGHT ZONE ── */}
          <div className="relative z-20 flex items-center gap-2 px-2.5 h-full flex-shrink-0">

            {/* Available CTA */}
            <motion.button
              aria-label="Available for work"
              className={[
                'cta-shine relative flex items-center gap-1.5',
                'font-outfit text-[12.5px] font-medium tracking-wide',
                'text-[rgba(226,245,255,0.90)]',
                'px-3.5 py-[7px] rounded-[10px]',
                'border-none outline-none cursor-pointer overflow-hidden',
                'bg-[linear-gradient(135deg,rgba(16,185,129,0.14)_0%,rgba(56,189,248,0.09)_100%)]',
                'shadow-[0_0_0_1px_rgba(56,189,248,0.22),0_0_0_1px_rgba(255,255,255,0.05)_inset,0_2px_8px_rgba(0,0,0,0.18)]',
                'transition-shadow duration-200',
                'hover:shadow-[0_0_0_1px_rgba(56,189,248,0.48),0_0_0_1px_rgba(255,255,255,0.08)_inset,0_0_20px_rgba(56,189,248,0.18)]',
              ].join(' ')}
              whileHover={reduced ? undefined : { scale: 1.04 }}
              whileTap={reduced ? undefined : { scale: 0.96 }}
              transition={SPRING_SNAPPY}
            >
              <span
                className="av-dot w-[5px] h-[5px] rounded-full bg-emerald-400 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="hidden sm:inline">Available</span>
              <Zap size={11} className="sm:hidden" aria-hidden="true" />
            </motion.button>

            {/* Hamburger — mobile only */}
            <motion.button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="gn-mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className={[
                'md:hidden flex items-center justify-center',
                'w-[38px] h-[38px] rounded-[10px]',
                'bg-[rgba(4,14,24,0.50)]',
                'backdrop-blur-xl',
                'border border-[rgba(56,189,248,0.10)]',
                'text-[rgba(200,235,255,0.75)]',
                'outline-none cursor-pointer',
                'shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset]',
                'transition-[border-color,box-shadow] duration-200',
                'hover:border-[rgba(56,189,248,0.35)]',
                'hover:shadow-[0_0_12px_rgba(56,189,248,0.18),0_0_0_1px_rgba(255,255,255,0.08)_inset]',
              ].join(' ')}
              whileTap={reduced ? undefined : { scale: 0.91 }}
              transition={SPRING_SNAPPY}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={16} strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, rotate: 45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={16} strokeWidth={2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            id="gn-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={[
              // Position
              'fixed top-0 left-0 right-0 z-40 md:hidden',
              // Spacing
              'pt-[84px] px-3.5 pb-5',
              // Shape
              'rounded-b-[20px]',
              // Glass surface
              'bg-[rgba(3,11,20,0.82)]',
              'backdrop-blur-[44px]',
              // Border
              'border border-t-0 border-[rgba(56,189,248,0.10)]',
              // Shadow
              'shadow-[0_0_0_1px_rgba(56,189,248,0.09)_inset,0_20px_60px_rgba(0,0,0,0.65),0_8px_24px_rgba(0,0,0,0.40)]',
              // Aurora rim pseudo
              'drawer-rim relative',
            ].join(' ')}
            variants={DRAWER_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ transformPerspective: 1000 }}
          >
            <motion.ul className="flex flex-col gap-2 list-none m-0 p-0">
              {items.map(({ id, label, Icon }, idx) => {
                const isActive = activeId === id
                return (
                  <motion.li key={id} variants={DRAWER_ITEM}>
                    <motion.button
                      onClick={() => scrollTo(id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'drawer-btn w-full flex items-center justify-between',
                        'px-4 py-3.5 rounded-2xl',
                        'font-cabinet text-[22px] font-bold text-left',
                        'border outline-none cursor-pointer',
                        'backdrop-blur-sm',
                        'transition-[background,border-color,box-shadow] duration-200',
                        isActive
                          ? [
                            'bg-[linear-gradient(135deg,rgba(16,185,129,0.10)_0%,rgba(56,189,248,0.08)_100%)]',
                            'border-[rgba(56,189,248,0.35)]',
                            'shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset,0_0_24px_rgba(56,189,248,0.12)]',
                          ].join(' ')
                          : [
                            'bg-white/[0.03]',
                            'border-white/[0.06]',
                            'shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]',
                            'hover:bg-[rgba(20,184,166,0.09)] hover:border-[rgba(56,189,248,0.28)]',
                            'hover:shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset,0_0_18px_rgba(56,189,248,0.10)]',
                          ].join(' '),
                      ].join(' ')}
                      whileTap={reduced ? undefined : { scale: 0.98 }}
                      transition={SPRING_SNAPPY}
                    >
                      {/* Index */}
                      <span className="font-outfit text-[11px] font-normal tracking-[0.12em] text-[rgba(148,210,240,0.45)] opacity-70 w-7 flex-shrink-0">
                        0{idx + 1}
                      </span>

                      {/* Label */}
                      <span className={[
                        'flex-1',
                        isActive ? 'nav-active-text' : 'text-[rgba(226,245,255,0.88)]',
                      ].join(' ')}>
                        {label}
                      </span>

                      {/* Icon */}
                      <Icon
                        size={16}
                        strokeWidth={1.75}
                        className={[
                          'flex-shrink-0 mr-2',
                          isActive ? 'text-sky-300' : 'text-[rgba(148,210,240,0.40)]',
                        ].join(' ')}
                        aria-hidden="true"
                      />

                      {/* Arrow */}
                      <ArrowRight
                        size={14}
                        strokeWidth={2}
                        className={[
                          'drawer-arrow flex-shrink-0',
                          isActive ? 'text-sky-300' : 'text-[rgba(148,210,240,0.45)]',
                        ].join(' ')}
                        aria-hidden="true"
                      />
                    </motion.button>
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}