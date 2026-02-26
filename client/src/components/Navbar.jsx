import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { initNavbarScroll } from '../animations/navbarScroll'
import { prefersReducedMotion } from '../animations/utils'

/* ─── Framer motion helpers ─────────────────────────────────────── */
const MotionButton = motion.button
const MotionSpan   = motion.span
const MotionAside  = motion.aside
const MotionUl     = motion.ul
const MotionLi     = motion.li

/* ─── Spring preset ─────────────────────────────────────────────── */
const SPRING = { stiffness: 120, damping: 20, mass: 0.9 }

/* ─── Nav items ─────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'home',     label: 'Home'     },
  { id: 'about',    label: 'About'    },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact'  },
]

/* ─── Mobile menu variants (clipPath wipe — unchanged) ───────────── */
const MENU_VARIANTS = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(0% 0% 100% 0% round 0.75rem)',
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0% round 0.75rem)',
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
}

const ITEM_VARIANTS = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', ...SPRING } },
}

/* ─── CSS: Lime-green SaaS theme (light + dark) ──────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

  /* ── Design tokens ── */
  :root {
    --lime-300: #93c5fd;
    --lime-400: #60a5fa;
    --lime-500: #3b82f6;
    --lime-600: #2563eb;
    --lime-700: #1d4ed8;
  }

  /* ── Light-mode defaults ── */
  .nb-root {
    --nb-bg:          rgba(255, 255, 255, 0.74);
    --nb-border:      rgba(37, 99, 235, 0.22);
    --nb-text:        #0b1220;
    --nb-muted:       rgba(15, 23, 42, 0.50);
    --nb-pill-bg:     rgba(96, 165, 250, 0.16);
    --nb-pill-border: rgba(59, 130, 246, 0.38);
    --nb-shadow:      0 4px 32px rgba(37,99,235,0.10), 0 1px 0 rgba(255,255,255,0.9) inset;
    --nb-mobile-bg:   rgba(248, 250, 255, 0.88);
  }

  /* ── Dark-mode override — applied by parent .dark / [data-theme="dark"] ── */
  .dark .nb-root,
  [data-theme="dark"] .nb-root {
    --nb-bg:          rgba(2, 6, 23, 0.82);
    --nb-border:      rgba(96, 165, 250, 0.16);
    --nb-text:        #eff6ff;
    --nb-muted:       rgba(239, 246, 255, 0.46);
    --nb-pill-bg:     rgba(96, 165, 250, 0.12);
    --nb-pill-border: rgba(96, 165, 250, 0.30);
    --nb-shadow:      0 4px 40px rgba(0,0,0,0.60), 0 0 0 1px rgba(96,165,250,0.07) inset;
    --nb-mobile-bg:   rgba(2, 6, 23, 0.92);
  }

  /* ── Fixed outer strip (centres the pill) ── */
  .nb-outer {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    display: flex;
    justify-content: center;
    padding: 14px 16px 0;
    pointer-events: none;
  }

  /* ── Frosted-glass pill ── */
  .nb-shell {
    pointer-events: all;
    width: 100%;
    max-width: 900px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 8px 6px 20px;
    border-radius: 9999px;
    border: 1px solid var(--nb-border);
    background: var(--nb-bg);
    backdrop-filter: blur(18px) saturate(160%);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    box-shadow: var(--nb-shadow);
    transition: box-shadow 0.3s, border-color 0.3s;
  }

  /* ── Logo ── */
  .nb-logo {
    position: relative;
    z-index: 20;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 14px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    background: linear-gradient(135deg, var(--lime-400) 0%, var(--lime-600) 60%, #1e40af 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    white-space: nowrap;
    transition: filter 0.2s;
  }
  .nb-logo:hover {
    filter: brightness(1.18) drop-shadow(0 0 6px rgba(96,165,250,0.40));
  }

  /* ── Desktop nav list ── */
  .nb-nav-list {
    display: flex;
    align-items: center;
    gap: 2px;
    list-style: none;
    margin: 0; padding: 0;
  }
  @media (max-width: 767px) { .nb-nav-list { display: none !important; } }

  /* ── Desktop nav button ── */
  .nb-nav-btn {
    position: relative;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.01em;
    border-radius: 9999px;
    padding: 7px 16px;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
    color: var(--nb-muted);
    transition: color 0.18s;
  }
  .nb-nav-btn:hover { color: var(--nb-text); }
  /* active — lime gradient text */
  .nb-nav-btn[aria-current="page"] {
    background: linear-gradient(135deg, var(--lime-400), var(--lime-600));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Shared active pill (layoutId shared between items) ── */
  .nb-active-bg {
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: var(--nb-pill-bg);
    border: 1px solid var(--nb-pill-border);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Active indicator dot ── */
  .nb-active-dot {
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 3px; height: 3px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--lime-400), var(--lime-600));
    box-shadow: 0 0 6px rgba(96,165,250,0.65);
    pointer-events: none;
    z-index: 1;
  }

  /* ── Right-side cluster ── */
  .nb-right {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  /* ── Mobile hamburger (mirrors original size + shape) ── */
  .nb-hamburger {
    position: relative;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px; height: 44px;
    border-radius: 9999px;
    border: 1px solid var(--nb-border);
    background: var(--nb-bg);
    color: var(--nb-text);
    backdrop-filter: blur(12px);
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .nb-hamburger:hover {
    border-color: var(--lime-500);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.14);
  }
  @media (min-width: 768px) { .nb-hamburger { display: none !important; } }

  /* ── Ham icon bars ── */
  .nb-ham-bars {
    display: flex; flex-direction: column; gap: 4px; width: 18px;
  }
  .nb-ham-bars span {
    display: block; height: 1.5px; border-radius: 2px;
    background: var(--nb-text);
    transition: transform 0.26s cubic-bezier(0.22,1,0.36,1), opacity 0.2s, width 0.2s;
    transform-origin: center;
  }
  .nb-ham-bars span:nth-child(1) { width: 100%; }
  .nb-ham-bars span:nth-child(2) { width: 65%; }
  .nb-ham-bars span:nth-child(3) { width: 100%; }
  /* open state */
  .nb-hamburger[aria-expanded="true"] .nb-ham-bars span:nth-child(1) {
    transform: translateY(5.5px) rotate(45deg); width: 100%;
  }
  .nb-hamburger[aria-expanded="true"] .nb-ham-bars span:nth-child(2) {
    opacity: 0; width: 0;
  }
  .nb-hamburger[aria-expanded="true"] .nb-ham-bars span:nth-child(3) {
    transform: translateY(-5.5px) rotate(-45deg); width: 100%;
  }

  /* ── Mobile aside (same position as original) ── */
  .nb-mobile-aside {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 40;
    padding: 84px 12px 24px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border: 1px solid var(--nb-border);
    border-top: none;
    background: var(--nb-mobile-bg);
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    box-shadow: 0 20px 60px rgba(0,0,0,0.20), 0 4px 20px rgba(59,130,246,0.09);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* ── Mobile nav item (mirrors original: w-full rounded-2xl border px-5 py-4 text-2xl) ── */
  .nb-mobile-item {
    width: 100%;
    border-radius: 1rem; /* rounded-2xl */
    border: 1px solid var(--nb-border);
    padding: 1rem 1.25rem; /* py-4 px-5 */
    text-align: left;
    background: transparent;
    cursor: pointer;
    outline: none;
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem; /* text-2xl */
    font-weight: 700;
    color: var(--nb-text);
    transition: background 0.18s, border-color 0.18s;
  }
  .nb-mobile-item:hover {
    background: var(--nb-pill-bg);
    border-color: var(--nb-pill-border);
  }
  /* active state */
  .nb-mobile-item[aria-current="page"] {
    background: linear-gradient(135deg, rgba(96,165,250,0.13) 0%, rgba(37,99,235,0.06) 100%);
    border-color: var(--nb-pill-border);
  }
  .nb-mobile-item[aria-current="page"] > span {
    background: linear-gradient(135deg, var(--lime-400), var(--lime-600));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Responsive tweaks ── */
  @media (max-width: 479px) {
    .nb-shell { padding: 5px 6px 5px 16px; }
    .nb-logo  { font-size: 13px; }
  }
  @media (min-width: 480px) and (max-width: 767px) {
    .nb-shell { padding: 6px 8px 6px 18px; }
  }
`

/* ─── Inject styles once ─────────────────────────────────────────── */
let _injected = false
function injectStyles() {
  if (_injected || typeof document === 'undefined') return
  _injected = true
  const tag = document.createElement('style')
  tag.setAttribute('data-nb-lime', '1')
  tag.textContent = STYLES
  document.head.appendChild(tag)
}

/* ═══════════════════════════════════════════════════════════════════
   Navbar — identical logic + JSX shape as original; lime SaaS theme
═══════════════════════════════════════════════════════════════════ */
const Navbar = ({ lenis = null, items = NAV_ITEMS }) => {
  const navRef = useRef(null)
  const [activeId, setActiveId] = useState(items[0]?.id ?? 'home')
  const [menuOpen, setMenuOpen]  = useState(false)
  const reduced = useMemo(() => prefersReducedMotion(), [])

  useEffect(() => { injectStyles() }, [])

  /* scroll-progress / hide-on-scroll hook */
  useEffect(() => {
    const cleanup = initNavbarScroll({ scope: navRef.current, lenis })
    return cleanup
  }, [lenis])

  /* active section tracking */
  useEffect(() => {
    const sectionElements = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)
    if (!sectionElements.length) return () => {}

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActiveId(visible.target.id)
      },
      { threshold: [0.2, 0.45, 0.65], rootMargin: '-15% 0px -45% 0px' },
    )
    sectionElements.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [items])

  /* lock scroll while mobile menu open */
  useEffect(() => {
    if (!menuOpen) return () => {}
    const previousOverflow = document.body.style.overflow
    if (lenis?.stop) lenis.stop()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      if (lenis?.start) lenis.start()
    }
  }, [lenis, menuOpen])

  /* smooth-scroll helper */
  const scrollToId = (id) => {
    setActiveId(id)
    setMenuOpen(false)
    const target = document.getElementById(id)
    if (!target) return
    if (lenis?.scrollTo) {
      lenis.scrollTo(target, {
        duration: reduced ? 0 : 1.1,
        easing: (value) => 1 - Math.pow(1 - value, 3),
      })
      return
    }
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  /* ── JSX (same shape as original) ─────────────────────────────── */
  return (
    <div className="nb-root">
      {/* Fixed outer row */}
      <div ref={navRef} className="nb-outer">
        <div className="nb-shell">

          {/* ── Logo ── */}
          <MotionButton
            onClick={() => scrollToId(items[0].id)}
            className="nb-logo"
            aria-label="Go to top"
            whileHover={reduced ? undefined : { scale: 1.04 }}
            whileTap={reduced   ? undefined : { scale: 0.96 }}
            transition={{ type: 'spring', ...SPRING }}
          >
            SD
          </MotionButton>

          {/* ── Desktop nav ── */}
          <nav aria-label="Primary navigation">
            <ul className="nb-nav-list">
              {items.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.id}>
                    <MotionButton
                      onClick={() => scrollToId(item.id)}
                      data-magnetic
                      className="nb-nav-btn"
                      whileHover={reduced ? undefined : { scale: 1.03 }}
                      whileTap={reduced   ? undefined : { scale: 0.97 }}
                      transition={{ type: 'spring', ...SPRING }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {/* animated active background pill */}
                      {isActive ? (
                        <MotionSpan
                          className="nb-active-bg"
                          layoutId="nb-pill"
                          transition={{ type: 'spring', ...SPRING }}
                        />
                      ) : null}

                      {/* label */}
                      <span style={{ position: 'relative', zIndex: 1 }}>
                        {item.label}
                      </span>

                      {/* active dot */}
                      {isActive ? (
                        <MotionSpan
                          className="nb-active-dot"
                          layoutId="nb-dot"
                          transition={{ type: 'spring', ...SPRING }}
                        />
                      ) : null}
                    </MotionButton>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* ── Right cluster ── */}
          <div className="nb-right">
            {/* Mobile hamburger */}
            <MotionButton
              onClick={() => setMenuOpen((open) => !open)}
              className="nb-hamburger"
              whileTap={reduced ? undefined : { scale: 0.94 }}
              transition={{ type: 'spring', ...SPRING }}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="nb-ham-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </MotionButton>
          </div>

        </div>
      </div>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {menuOpen ? (
          <MotionAside
            id="mobile-navigation"
            className="nb-mobile-aside"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={MENU_VARIANTS}
          >
            <MotionUl
              style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}
            >
              {items.map((item) => {
                const isActive = activeId === item.id
                return (
                  <MotionLi key={item.id} variants={ITEM_VARIANTS}>
                    <MotionButton
                      onClick={() => scrollToId(item.id)}
                      className="nb-mobile-item"
                      whileTap={reduced ? undefined : { scale: 0.98 }}
                      transition={{ type: 'spring', ...SPRING }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{item.label}</span>
                    </MotionButton>
                  </MotionLi>
                )
              })}
            </MotionUl>
          </MotionAside>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default Navbar