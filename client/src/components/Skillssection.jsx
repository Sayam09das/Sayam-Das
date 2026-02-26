/**
 * SkillsSection.jsx
 * Premium skills / capabilities showcase — 2026
 * Pinned scroll · 3D tilt · spotlight focus · depth parallax
 */

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { initSkillsAnimation } from '../animations/skillsAnimation'

/* ─── Spring config ────────────────────────────────────────────── */
const SP = { type: 'spring', stiffness: 120, damping: 20 }

/* ─── Skill data ───────────────────────────────────────────────── */
const SKILLS = [
  {
    id      : 'motion',
    index   : '01',
    title   : 'Motion Engineering',
    blurb   : 'GSAP · Framer Motion · Lenis · ScrollTrigger — cinematic sequences, scroll narratives, and micro-interactions that elevate product feel.',
    tags    : ['GSAP', 'ScrollTrigger', 'Framer Motion'],
    icon    : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    depth   : '1.3',
    accent  : true,
  },
  {
    id      : 'frontend',
    index   : '02',
    title   : 'Frontend Architecture',
    blurb   : 'React · Next.js · Vite — component systems designed for scale, with performance budgets enforced from day one.',
    tags    : ['React', 'Next.js', 'TypeScript'],
    icon    : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    depth   : '0.8',
    accent  : false,
  },
  {
    id      : 'design',
    index   : '03',
    title   : 'Design Systems',
    blurb   : 'Figma → production in one motion. Token-driven systems, accessible components, pixel-perfect fidelity across every breakpoint.',
    tags    : ['Figma', 'Tokens', 'A11y'],
    icon    : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    depth   : '1',
    accent  : false,
  },
  {
    id      : 'perf',
    index   : '04',
    title   : 'Performance',
    blurb   : 'Core Web Vitals at 99 · sub-12ms interaction latency · GPU-composited animations · code-split lazy boundaries.',
    tags    : ['Core Web Vitals', 'GPU', 'Bundle'],
    icon    : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    depth   : '1.3',
    accent  : false,
  },
  {
    id      : 'threed',
    index   : '05',
    title   : '3D & WebGL',
    blurb   : 'Three.js · R3F · custom GLSL shaders — spatial experiences that feel native to the browser without plugin dependencies.',
    tags    : ['Three.js', 'R3F', 'GLSL'],
    icon    : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    depth   : '0.8',
    accent  : true,
  },
  {
    id      : 'fullstack',
    index   : '06',
    title   : 'Full-Stack',
    blurb   : 'Node · Prisma · Postgres · tRPC — end-to-end ownership from data model to the last CSS rule.',
    tags    : ['Node', 'Prisma', 'tRPC'],
    icon    : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    depth   : '1',
    accent  : false,
  },
]

/* ─── Card component ───────────────────────────────────────────── */
function SkillCard({ skill }) {
  return (
    <motion.div
      className={`sk-card ${skill.accent ? 'sk-card--accent' : ''}`}
      data-animate="skill-card"
      data-depth={skill.depth}
      style={{ perspective: '800px' }}
      role="article"
      aria-label={skill.title}
    >
      <div className="sk-card-inner" data-card-inner>
        {/* Glare layer */}
        <div className="sk-card-glare" data-card-glare aria-hidden="true" />

        {/* Header row */}
        <div className="sk-card-head">
          <motion.div
            className="sk-card-icon"
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={SP}
            aria-hidden="true"
          >
            {skill.icon}
          </motion.div>
          <span className="sk-card-index" aria-hidden="true">{skill.index}</span>
        </div>

        {/* Body */}
        <div className="sk-card-body">
          <h3 className="sk-card-title">{skill.title}</h3>
          <p className="sk-card-blurb">{skill.blurb}</p>
        </div>

        {/* Tags */}
        <div className="sk-card-tags" aria-label={`Technologies: ${skill.tags.join(', ')}`}>
          {skill.tags.map(tag => (
            <span key={tag} className="sk-tag">{tag}</span>
          ))}
        </div>

        {/* Bottom glow bar */}
        <div className="sk-card-bar" aria-hidden="true" />
      </div>
    </motion.div>
  )
}

/* ─── Main component ───────────────────────────────────────────── */
export default function SkillsSection({ lenis = null }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const cleanup = initSkillsAnimation({ scope: el, lenis })
    return cleanup
  }, [lenis])

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="Skills and capabilities"
      className="sk-section"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        /* ── Tokens ── */
        .sk-section {
          --lime-300: #93c5fd;
          --lime-400: #60a5fa;
          --lime-500: #3b82f6;
          --lime-600: #2563eb;
          --fg:       #eff6ff;
          --fg-muted: rgba(239,246,255,0.48);
          --fg-dim:   rgba(239,246,255,0.22);
          --border:   rgba(255,255,255,0.07);
          --border-lime: rgba(96,165,250,0.20);
          --surface:  rgba(255,255,255,0.032);
          --surface-accent: rgba(96,165,250,0.055);
        }

        /* ── Section shell ── */
        .sk-section {
          position: relative;
          width: 100%;
          min-height: 360vh;
          background: #020617;
          overflow: hidden;
          isolation: isolate;
        }

        /* ── Grain ── */
        .sk-section::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          pointer-events: none;
        }

        /* ── BG text watermark ── */
        .sk-bg-text-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 8% 0;
          gap: 0;
        }
        .sk-bg-text {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(60px, 14vw, 200px);
          font-weight: 400;
          letter-spacing: 0.08em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(96,165,250,0.06);
          white-space: nowrap;
          user-select: none;
          opacity: 0.04;
          will-change: transform, opacity;
          line-height: 1.1;
        }
        .sk-bg-text:nth-child(even) { text-align: right; }

        /* ── Ambient orb ── */
        .sk-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          will-change: transform;
          z-index: 0;
        }
        .sk-orb-1 {
          width: clamp(300px, 45vw, 600px);
          height: clamp(300px, 45vw, 600px);
          background: radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%);
          top: 20%; left: -10%;
          animation: sk-orb-drift 16s ease-in-out infinite alternate;
        }
        .sk-orb-2 {
          width: clamp(200px, 32vw, 450px);
          height: clamp(200px, 32vw, 450px);
          background: radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%);
          bottom: 10%; right: -8%;
          animation: sk-orb-drift 20s ease-in-out infinite alternate-reverse;
        }
        @keyframes sk-orb-drift {
          from { transform: translate(0, 0); }
          to   { transform: translate(40px, -60px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sk-orb-1, .sk-orb-2 { animation: none !important; }
        }

        /* ── Sticky container ── */
        .sk-sticky {
          position: sticky;
          top: 0;
          height: 100svh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          z-index: 2;
          will-change: transform;
        }

        /* ── Inner max-width ── */
        .sk-inner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px, 6vw, 80px);
          position: relative;
        }

        /* ── Top meta row ── */
        .sk-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: clamp(24px, 3.5vw, 40px);
          gap: 12px;
        }
        .sk-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--lime-500);
          will-change: transform, opacity;
        }
        .sk-counter-wrap {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .sk-counter {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 14px;
          color: var(--lime-400);
          min-width: 2ch;
          text-align: right;
        }
        .sk-counter-of {
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--fg-dim);
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Headline ── */
        .sk-headline-wrap {
          margin-bottom: clamp(28px, 4vw, 52px);
          perspective: 900px;
          overflow: visible;
        }
        .sk-headline {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(36px, 6.5vw, 86px);
          font-weight: 400;
          line-height: 0.96;
          letter-spacing: -0.025em;
          color: var(--fg);
          margin: 0;
        }
        .sk-headline em {
          font-style: italic;
          background: linear-gradient(135deg, var(--lime-300) 0%, var(--lime-500) 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── BG separator line ── */
        .sk-bg-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96,165,250,0.18), transparent);
          transform-origin: left center;
          will-change: transform;
        }

        /* ── Card grid ── */
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(10px, 1.5vw, 18px);
          width: 100%;
        }

        @media (max-width: 1023px) {
          .sk-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 599px) {
          .sk-grid {
            grid-template-columns: 1fr;
            max-height: 58svh;
            overflow: hidden;
          }
          .sk-grid > :nth-child(n+4) { display: none; }
        }

        /* ── Card base ── */
        .sk-card {
          position: relative;
          will-change: transform, opacity;
          cursor: default;
        }

        .sk-card-inner {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: clamp(16px, 2.2vw, 26px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow: hidden;
          transition: border-color 0.25s;
          will-change: transform;
          transform-style: preserve-3d;
          height: 100%;
        }
        .sk-card:hover .sk-card-inner {
          border-color: var(--border-lime);
        }
        .sk-card--accent .sk-card-inner {
          background: var(--surface-accent);
          border-color: var(--border-lime);
        }

        /* Glare */
        .sk-card-glare {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0;
          z-index: 1;
          will-change: background, opacity;
        }

        /* Header row */
        .sk-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sk-card-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          border: 1px solid var(--border-lime);
          background: rgba(96,165,250,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--lime-400);
          will-change: transform;
          flex-shrink: 0;
        }
        .sk-card--accent .sk-card-icon {
          background: linear-gradient(135deg, rgba(96,165,250,0.15), rgba(37,99,235,0.06));
          border-color: rgba(96,165,250,0.35);
        }
        .sk-card-index {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--fg-dim);
        }

        /* Body */
        .sk-card-body { display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .sk-card-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(17px, 2vw, 21px);
          font-weight: 400;
          letter-spacing: -0.01em;
          color: var(--fg);
          line-height: 1.2;
          margin: 0;
        }
        .sk-card--accent .sk-card-title {
          background: linear-gradient(135deg, var(--lime-300), var(--lime-500));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sk-card-blurb {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(12px, 1.3vw, 13.5px);
          font-weight: 300;
          line-height: 1.6;
          color: var(--fg-muted);
          margin: 0;
        }

        /* Tags */
        .sk-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }
        .sk-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--fg-dim);
          border: 1px solid var(--border);
          border-radius: 9999px;
          padding: 3px 9px;
          transition: border-color 0.2s, color 0.2s;
        }
        .sk-card:hover .sk-tag {
          border-color: var(--border-lime);
          color: var(--lime-400);
        }

        /* Bottom glow bar */
        .sk-card-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96,165,250,0.3), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .sk-card:hover .sk-card-bar { opacity: 1; }
        .sk-card--accent .sk-card-bar { opacity: 0.6; }

        /* ── Statement strip (after pin releases) ── */
        .sk-statement-strip {
          position: relative;
          z-index: 2;
          padding: clamp(64px, 10vw, 120px) clamp(20px, 6vw, 80px);
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.5vw, 28px);
        }
        .sk-statement-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--lime-500);
        }
        .sk-statement-line {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(28px, 5vw, 64px);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--fg);
        }
        .sk-statement-line em {
          font-style: italic;
          color: var(--lime-300);
        }
        .sk-statement-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(14px, 1.6vw, 17px);
          font-weight: 300;
          color: var(--fg-muted);
          max-width: 48ch;
          line-height: 1.65;
        }

        /* ── Exit fade ── */
        .sk-exit-fade {
          position: relative;
          z-index: 2;
          height: clamp(60px, 10vw, 120px);
          background: linear-gradient(180deg, transparent 0%, #020617 100%);
          pointer-events: none;
        }

        /* ── Responsive helpers ── */
        @media (max-width: 767px) {
          .sk-statement-strip { align-items: flex-start; text-align: left; }
          .sk-meta-row { margin-bottom: 18px; }
          .sk-headline-wrap { margin-bottom: 20px; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .sk-card { will-change: auto; }
          .sk-card-inner { will-change: auto; }
        }
      `}</style>

      {/* ── Ambient background ─────────────────────────────── */}
      <div className="sk-orb sk-orb-1" aria-hidden="true" />
      <div className="sk-orb sk-orb-2" aria-hidden="true" />

      {/* ── Watermark BG text ──────────────────────────────── */}
      <div className="sk-bg-text-wrap" aria-hidden="true">
        <div className="sk-bg-text" data-bg-text>ENGINEERING</div>
        <div className="sk-bg-text" data-bg-text>ARCHITECTURE</div>
        <div className="sk-bg-text" data-bg-text>DEVELOPMENT</div>
      </div>

      {/* ── Sticky pinned content ──────────────────────────── */}
      <div className="sk-sticky" data-skills="sticky">
        <div className="sk-bg-line" data-skills="bg-line" aria-hidden="true" />

        <div className="sk-inner">
          {/* Meta row */}
          <div className="sk-meta-row">
            <span className="sk-eyebrow" data-skills="eyebrow">
              03 — Capabilities
            </span>
            <div className="sk-counter-wrap" aria-hidden="true">
              <span className="sk-counter" data-skills="counter">01</span>
              <span className="sk-counter-of">/ 09</span>
            </div>
          </div>

          {/* Headline */}
          <div className="sk-headline-wrap">
            <h2
              className="sk-headline"
              data-skills="headline"
              aria-label="Engineered for precision"
            >
              Engineered for <em>precision</em>
            </h2>
          </div>

          {/* Card grid */}
          <div className="sk-grid" role="list">
            {SKILLS.map(skill => (
              <div key={skill.id} role="listitem">
                <SkillCard skill={skill} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── After-pin statement ────────────────────────────── */}
      <div className="sk-statement-strip" data-depth="0.8" role="complementary" aria-label="Approach statement">
        <span className="sk-statement-label">The Standard</span>
        <motion.p
          className="sk-statement-line"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ ...SP, delay: 0.1 }}
        >
          Every capability is a <em>craft</em>,<br />
          not a checkbox.
        </motion.p>
        <motion.p
          className="sk-statement-sub"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ ...SP, delay: 0.22 }}
        >
          I don't collect technologies — I master the ones that make products feel inevitable. Depth over breadth. Intention over decoration.
        </motion.p>
      </div>

      {/* ── Exit fade ─────────────────────────────────────── */}
      <div className="sk-exit-fade" aria-hidden="true" />
    </section>
  )
}