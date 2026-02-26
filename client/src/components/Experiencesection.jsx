/**
 * ExperienceSection.jsx
 * Cinematic experience timeline — 2026 portfolio grade
 * Scroll-driven progress line · alternating reveals · spotlight · depth parallax
 */

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { initExperienceAnimation } from '../animations/experienceAnimation'

/* ─── Framer spring ────────────────────────────────────────────── */
const SP = { type: 'spring', stiffness: 120, damping: 20 }

const cardHover = {
  rest : { scale: 1 },
  hover: { scale: 1.02 },
}

const iconHover = {
  rest : { rotate: 0,  scale: 1    },
  hover: { rotate: 12, scale: 1.12 },
}

/* ─── Experience data ──────────────────────────────────────────── */
const EXPERIENCES = [
  {
    id       : 'lead-2025',
    year     : '2025',
    period   : 'Jan 2025 — Present',
    role     : 'Lead Motion Engineer',
    company  : 'Luminary Labs',
    location : 'Remote · Global',
    type     : 'Full-Time',
    summary  : 'Architected the motion design system powering 4 flagship SaaS products. Defined scroll narrative tokens, spring presets, and cinematic intro sequences adopted company-wide. Delivered sub-12ms interactions across 200k+ MAU.',
    tags     : ['GSAP', 'React', 'Motion Systems', 'Architecture'],
    highlight: true,
    icon     : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    id       : 'senior-2023',
    year     : '2023',
    period   : 'Mar 2023 — Dec 2024',
    role     : 'Senior Frontend Engineer',
    company  : 'Meridian Digital',
    location : 'London · Berlin',
    type     : 'Full-Time',
    summary  : 'Built Three.js product configurators and WebGL experiences for enterprise clients. Led a team of 4 engineers. Reduced bundle size by 62% through lazy splitting and tree-shaking architecture.',
    tags     : ['Three.js', 'WebGL', 'GLSL', 'Leadership'],
    highlight: false,
    icon     : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
  },
  {
    id       : 'mid-2022',
    year     : '2022',
    period   : 'Aug 2022 — Feb 2023',
    role     : 'Frontend Engineer',
    company  : 'Axiom Studio',
    location : 'Amsterdam · Remote',
    type     : 'Contract',
    summary  : 'Delivered a horizontal scroll storytelling homepage for a Series B climate startup. Achieved 99 Lighthouse performance score. Implemented Lenis-based scroll narrative used as industry reference.',
    tags     : ['Lenis', 'ScrollTrigger', 'Next.js', 'Performance'],
    highlight: false,
    icon     : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    id       : 'junior-2020',
    year     : '2020',
    period   : 'Sep 2020 — Jul 2022',
    role     : 'UI Engineer',
    company  : 'Solstice Products',
    location : 'San Francisco',
    type     : 'Full-Time',
    summary  : 'Shipped the design system from v0 to production across 8 product teams. Established accessibility standards and motion guidelines that reduced design-to-dev handoff time by 40%.',
    tags     : ['Design Systems', 'React', 'Figma', 'A11y'],
    highlight: false,
    icon     : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
]

/* ─── Single experience card ───────────────────────────────────── */
function ExperienceCard({ exp, side, isLast }) {
  return (
    <div
      className={`exp-item exp-item--${side}`}
      data-animate="experience-item"
      data-side={side}
      {...(isLast ? { 'data-exp': 'last-item' } : {})}
      role="article"
      aria-label={`${exp.role} at ${exp.company}`}
    >
      {/* ── Year watermark ── */}
      <div
        className={`exp-year exp-year--${side}`}
        data-exp-watermark
        data-exp-year
        aria-hidden="true"
      >
        {exp.year}
      </div>

      {/* ── Timeline dot ── */}
      <div className="exp-dot-wrap" aria-hidden="true">
        <div className="exp-dot" data-exp-dot />
        <div className="exp-dot-ring" />
      </div>

      {/* ── Card ── */}
      <motion.div
        className={`exp-card ${exp.highlight ? 'exp-card--highlight' : ''}`}
        data-exp-card
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        transition={SP}
      >
        {/* Card inner glow (on hover) */}
        <div className="exp-card-glow" aria-hidden="true" />

        {/* Top row */}
        <div className="exp-card-top">
          <motion.div
            className="exp-icon"
            variants={iconHover}
            initial="rest"
            whileHover="hover"
            transition={SP}
            data-exp-icon
            aria-hidden="true"
          >
            {exp.icon}
          </motion.div>

          <div className="exp-top-meta">
            <span className="exp-type-badge">{exp.type}</span>
            <span className="exp-period">{exp.period}</span>
          </div>
        </div>

        {/* Role + company */}
        <div className="exp-role-wrap">
          <h3
            className="exp-role"
            data-exp-title
            aria-label={exp.role}
          >
            {exp.role}
          </h3>
          <div className="exp-company-row">
            <span className="exp-company">{exp.company}</span>
            <span className="exp-meta-sep" aria-hidden="true">·</span>
            <span className="exp-location">{exp.location}</span>
          </div>
        </div>

        {/* Summary */}
        <p className="exp-summary" data-exp-body>
          {exp.summary}
        </p>

        {/* Tags */}
        <div className="exp-tags" role="list" aria-label="Technologies">
          {exp.tags.map(tag => (
            <span
              key={tag}
              className="exp-tag"
              data-exp-tag
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Highlight accent bar */}
        {exp.highlight && (
          <div className="exp-highlight-bar" aria-hidden="true" />
        )}
      </motion.div>
    </div>
  )
}

/* ─── Main component ───────────────────────────────────────────── */
export default function ExperienceSection({ lenis = null }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const cleanup = initExperienceAnimation({ scope: el, lenis })
    return cleanup
  }, [lenis])

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Experience timeline"
      className="exp-section"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        /* ── Tokens ── */
        .exp-section {
          --lime-300: #93c5fd;
          --lime-400: #60a5fa;
          --lime-500: #3b82f6;
          --lime-600: #2563eb;
          --fg:       #eff6ff;
          --fg-muted: rgba(239,246,255,0.48);
          --fg-dim:   rgba(239,246,255,0.22);
          --border:   rgba(255,255,255,0.07);
          --border-lime: rgba(96,165,250,0.20);
          --surface:  rgba(255,255,255,0.028);
          --surface-accent: rgba(96,165,250,0.052);
        }

        /* ── Section shell ── */
        .exp-section {
          position: relative;
          width: 100%;
          min-height: 260vh;
          background: #020617;
          overflow: hidden;
          isolation: isolate;
          padding-bottom: clamp(80px, 12vw, 160px);
        }

        /* ── Grain ── */
        .exp-section::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.026;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          pointer-events: none;
        }

        /* ── Ambient orb ── */
        .exp-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .exp-orb-1 {
          width: clamp(300px, 45vw, 600px);
          height: clamp(300px, 45vw, 600px);
          background: radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%);
          top: 5%; right: -12%;
          animation: exp-orb-drift 18s ease-in-out infinite alternate;
        }
        .exp-orb-2 {
          width: clamp(200px, 30vw, 420px);
          height: clamp(200px, 30vw, 420px);
          background: radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%);
          bottom: 8%; left: -8%;
          animation: exp-orb-drift 22s ease-in-out infinite alternate-reverse;
        }
        @keyframes exp-orb-drift {
          from { transform: translate(0, 0); }
          to   { transform: translate(-40px, 50px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .exp-orb { animation: none !important; }
        }

        /* ── Inner container ── */
        .exp-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 clamp(20px, 6vw, 80px);
        }

        /* ── Section header ── */
        .exp-header {
          padding: clamp(80px, 12vw, 140px) 0 clamp(56px, 8vw, 96px);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .exp-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--lime-500);
          will-change: transform, opacity;
        }
        .exp-headline {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(40px, 7vw, 90px);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: -0.025em;
          color: var(--fg);
          margin: 0;
          perspective: 900px;
          overflow: visible;
          max-width: 12ch;
        }
        .exp-headline em {
          font-style: italic;
          background: linear-gradient(135deg, var(--lime-300) 0%, var(--lime-500) 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .exp-subline {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(14px, 1.6vw, 17px);
          font-weight: 300;
          color: var(--fg-muted);
          max-width: 46ch;
          line-height: 1.65;
          margin: 0;
          perspective: 700px;
          overflow: visible;
        }

        /* ── Timeline layout ── */
        .exp-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: clamp(48px, 7vw, 80px);
        }

        /* ── Central line ── */
        .exp-line-wrap {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          transform: translateX(-50%);
          width: 1px;
          z-index: 1;
          pointer-events: none;
        }
        @media (max-width: 767px) {
          .exp-line-wrap {
            left: clamp(20px, 8vw, 48px);
            transform: none;
          }
        }
        .exp-line-track {
          width: 1px;
          height: 100%;
          background: rgba(255,255,255,0.07);
          position: relative;
        }
        .exp-line-fill {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 100%;
          background: linear-gradient(180deg, var(--lime-500), var(--lime-300));
          transform-origin: top center;
          transform: scaleY(0);
          will-change: transform;
        }
        .exp-line-dot {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--lime-400);
          box-shadow: 0 0 12px rgba(96,165,250,0.6);
          will-change: transform;
          z-index: 2;
        }

        /* ── Spotlight target ── */
        .exp-spotlight {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 90vw;
          max-width: 900px;
          height: 300px;
          background: radial-gradient(ellipse at center, rgba(96,165,250,0.06) 0%, transparent 70%);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
          will-change: opacity;
        }

        /* ── Item row ── */
        .exp-item {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 24px 1fr;
          align-items: start;
          gap: 0 clamp(16px, 3vw, 40px);
          will-change: transform, opacity;
        }

        /* Dot positioning */
        .exp-dot-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          padding-top: 28px;
          z-index: 2;
        }
        .exp-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--lime-400);
          box-shadow: 0 0 0 3px rgba(96,165,250,0.15);
          position: relative;
          z-index: 2;
          will-change: transform, opacity;
          flex-shrink: 0;
        }
        .exp-dot-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1);
          width: 22px; height: 22px;
          border-radius: 50%;
          border: 1px solid rgba(96,165,250,0.20);
          z-index: 1;
        }

        /* Left item: card on left, dot in center, empty on right */
        .exp-item--left .exp-card { grid-column: 1; grid-row: 1; }
        .exp-item--left .exp-dot-wrap { grid-column: 2; grid-row: 1; }
        .exp-item--left .exp-year { grid-column: 3; grid-row: 1; }

        /* Right item: empty on left, dot in center, card on right */
        .exp-item--right .exp-year { grid-column: 1; grid-row: 1; text-align: right; }
        .exp-item--right .exp-dot-wrap { grid-column: 2; grid-row: 1; }
        .exp-item--right .exp-card { grid-column: 3; grid-row: 1; }

        /* ── Year watermark ── */
        .exp-year {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(56px, 9vw, 120px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(96,165,250,0.08);
          user-select: none;
          pointer-events: none;
          padding-top: 8px;
          will-change: transform, opacity;
        }
        .exp-year--right { text-align: right; }

        /* ── Card ── */
        .exp-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: clamp(20px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow: hidden;
          will-change: transform, opacity;
          transition: border-color 0.25s;
        }
        .exp-card:hover { border-color: var(--border-lime); }
        .exp-card--highlight {
          background: var(--surface-accent);
          border-color: var(--border-lime);
        }

        /* Card hover glow */
        .exp-card-glow {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(ellipse at 30% 20%, rgba(96,165,250,0.07) 0%, transparent 60%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s;
        }
        .exp-card:hover .exp-card-glow { opacity: 1; }

        /* Top row */
        .exp-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .exp-icon {
          width: 38px; height: 38px;
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
        .exp-card--highlight .exp-icon {
          background: linear-gradient(135deg, rgba(96,165,250,0.15), rgba(37,99,235,0.05));
          border-color: rgba(96,165,250,0.35);
        }
        .exp-top-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
        }
        .exp-type-badge {
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--lime-400);
          background: rgba(96,165,250,0.08);
          border: 1px solid rgba(96,165,250,0.18);
          border-radius: 9999px;
          padding: 2px 9px;
        }
        .exp-period {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.06em;
          color: var(--fg-dim);
        }

        /* Role */
        .exp-role-wrap { display: flex; flex-direction: column; gap: 5px; }
        .exp-role {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(20px, 2.6vw, 28px);
          font-weight: 400;
          letter-spacing: -0.015em;
          color: var(--fg);
          margin: 0;
          line-height: 1.15;
          perspective: 700px;
          overflow: visible;
        }
        .exp-card--highlight .exp-role {
          background: linear-gradient(135deg, var(--lime-300), var(--lime-500));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .exp-company-row {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
        }
        .exp-company {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(13px, 1.4vw, 15px);
          font-weight: 500;
          color: var(--fg-muted);
        }
        .exp-meta-sep { color: var(--fg-dim); font-size: 12px; }
        .exp-location {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: var(--fg-dim);
          letter-spacing: 0.02em;
        }

        /* Summary */
        .exp-summary {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(12.5px, 1.3vw, 14px);
          font-weight: 300;
          line-height: 1.65;
          color: var(--fg-muted);
          margin: 0;
          will-change: transform, opacity;
        }

        /* Tags */
        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }
        .exp-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--fg-dim);
          border: 1px solid var(--border);
          border-radius: 9999px;
          padding: 3px 10px;
          will-change: transform, opacity;
          transition: border-color 0.2s, color 0.2s;
        }
        .exp-card:hover .exp-tag {
          border-color: var(--border-lime);
          color: var(--lime-400);
        }

        /* Highlight bar */
        .exp-highlight-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--lime-500), transparent);
          border-radius: 2px 2px 0 0;
        }

        /* ── Closing statement ── */
        .exp-statement {
          padding: clamp(56px, 8vw, 100px) 0 0;
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 20px);
          align-items: flex-start;
          max-width: 600px;
        }
        .exp-stmt-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--lime-500);
        }
        .exp-stmt-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(26px, 4.5vw, 54px);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--fg);
          margin: 0;
        }
        .exp-stmt-heading em {
          font-style: italic;
          color: var(--lime-300);
        }
        .exp-stmt-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(13px, 1.5vw, 16px);
          font-weight: 300;
          color: var(--fg-muted);
          line-height: 1.65;
          max-width: 46ch;
          margin: 0;
        }

        /* ── Exit fade ── */
        .exp-exit {
          position: relative;
          z-index: 2;
          height: clamp(60px, 8vw, 100px);
          background: linear-gradient(180deg, transparent 0%, #020617 100%);
          pointer-events: none;
          margin-top: clamp(40px, 6vw, 80px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 767px) {
          /* Stack to single column on mobile */
          .exp-item {
            grid-template-columns: 28px 1fr;
            gap: 0 14px;
          }
          .exp-item--left .exp-card  { grid-column: 2; grid-row: 1; }
          .exp-item--left .exp-dot-wrap { grid-column: 1; grid-row: 1; justify-content: flex-start; }
          .exp-item--left .exp-year  { display: none; }

          .exp-item--right .exp-year { display: none; }
          .exp-item--right .exp-dot-wrap { grid-column: 1; grid-row: 1; justify-content: flex-start; }
          .exp-item--right .exp-card { grid-column: 2; grid-row: 1; }

          .exp-line-wrap { left: 8px; transform: none; }
          .exp-dot-wrap  { padding-top: 22px; }
          .exp-headline  { font-size: clamp(36px, 9vw, 60px); }
          .exp-role      { font-size: clamp(18px, 4.5vw, 24px); }
        }

        @media (max-width: 479px) {
          .exp-card-top { flex-direction: column; align-items: flex-start; gap: 8px; }
          .exp-top-meta { align-items: flex-start; }
          .exp-summary  { font-size: 12.5px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .exp-card, .exp-item { will-change: auto; }
          .exp-line-fill       { transform: scaleY(1) !important; }
        }
      `}</style>

      {/* ── Ambient orbs ───────────────────────────────────── */}
      <div className="exp-orb exp-orb-1" aria-hidden="true" data-speed="0.7" />
      <div className="exp-orb exp-orb-2" aria-hidden="true" data-speed="1.2" />

      <div className="exp-inner">

        {/* ── Header ── */}
        <header className="exp-header">
          <span className="exp-eyebrow" data-exp="eyebrow">
            05 — Journey
          </span>
          <h2
            className="exp-headline"
            data-exp="headline"
            aria-label="Years of deliberate craft"
          >
            Years of <em>deliberate</em> craft
          </h2>
          <p
            className="exp-subline"
            data-exp="subline"
          >
            Every role shaped how I think about interface engineering — performance, motion, and the invisible craft that makes products feel alive.
          </p>
        </header>

        {/* ── Timeline ── */}
        <div className="exp-timeline" role="feed" aria-label="Career timeline">

          {/* Central progress line */}
          <div className="exp-line-wrap" aria-hidden="true">
            <div className="exp-line-track">
              <div
                className="exp-line-fill"
                data-animate="timeline-line"
              />
            </div>
            <div className="exp-line-dot" data-exp="timeline-dot" />
          </div>

          {/* Spotlight glow target — positioned at mid-section */}
          <div
            className="exp-spotlight"
            data-exp="spotlight"
            style={{ top: `${(100 / EXPERIENCES.length) * (Math.floor(EXPERIENCES.length / 2))}%` }}
            aria-hidden="true"
          />

          {/* Experience items — alternating left/right */}
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              side={i % 2 === 0 ? 'left' : 'right'}
              isLast={i === EXPERIENCES.length - 1}
            />
          ))}

        </div>

        {/* ── Closing statement ── */}
        <div className="exp-statement" role="complementary" aria-label="Journey summary">
          <motion.span
            className="exp-stmt-label"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ ...SP, delay: 0.05 }}
          >
            The foundation
          </motion.span>
          <motion.h3
            className="exp-stmt-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ ...SP, delay: 0.14 }}
          >
            Experience that <em>compounds</em>.
          </motion.h3>
          <motion.p
            className="exp-stmt-sub"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ ...SP, delay: 0.24 }}
          >
            Six years across startups, agencies, and product studios — each one sharpening a different edge. The result is someone who ships with confidence because the patterns have been learned the hard way.
          </motion.p>
        </div>

      </div>

      {/* ── Exit fade ─────────────────────────────────────── */}
      <div className="exp-exit" aria-hidden="true" />
    </section>
  )
}