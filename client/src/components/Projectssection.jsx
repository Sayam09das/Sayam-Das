/**
 * ProjectsSection.jsx
 * Cinematic horizontal scroll projects showcase — 2026
 * Pinned pan · image reveal · text stagger · depth parallax · magnetic CTAs
 */

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { initProjectsAnimation } from '../animations/projectsAnimation'

/* ─── Framer micro-interaction spring ─────────────────────────── */
const SP = { type: 'spring', stiffness: 120, damping: 20 }

/* ─── Project data ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    id      : 'luminary',
    index   : '01',
    year    : '2025',
    type    : 'SaaS Product',
    title   : 'Luminary',
    sub     : 'AI-powered analytics platform',
    desc    : 'End-to-end design system and frontend architecture for a real-time intelligence platform. Zero to production in 14 weeks — 99 Lighthouse, sub-12ms interactions.',
    stack   : ['React', 'GSAP', 'Prisma', 'tRPC'],
    link    : '#',
    accent  : '#60a5fa',
    // Gradient placeholder — swap for real image src
    gradient: 'linear-gradient(135deg, #0b1f4d 0%, #1e3a8a 35%, #0a1738 70%, #020617 100%)',
    pattern : 'grid',
  },
  {
    id      : 'meridian',
    index   : '02',
    year    : '2025',
    type    : 'Motion System',
    title   : 'Meridian',
    sub     : 'Cinematic design system',
    desc    : 'A full motion design system for a consumer fintech app. Defined timing tokens, spring presets, and scroll narrative components used across 40+ screens.',
    stack   : ['Framer Motion', 'Figma Tokens', 'Next.js'],
    accent  : '#93c5fd',
    link    : '#',
    gradient: 'linear-gradient(135deg, #0a1f4d 0%, #153a8a 40%, #081738 80%, #020617 100%)',
    pattern : 'dots',
  },
  {
    id      : 'axiom',
    index   : '03',
    year    : '2024',
    type    : 'WebGL / 3D',
    title   : 'Axiom',
    sub     : 'Spatial product experience',
    desc    : 'Three.js product configurator with real-time material switching, HDRI lighting, and custom GLSL post-processing. 60fps on mid-range hardware.',
    stack   : ['Three.js', 'R3F', 'GLSL', 'Lenis'],
    accent  : '#3b82f6',
    link    : '#',
    gradient: 'linear-gradient(135deg, #071a42 0%, #102f73 45%, #050f28 85%, #020617 100%)',
    pattern : 'lines',
  },
  {
    id      : 'solstice',
    index   : '04',
    year    : '2024',
    type    : 'Full-Stack',
    title   : 'Solstice',
    sub     : 'Climate data platform',
    desc    : 'Full-stack climate intelligence dashboard. Real-time streaming data, complex data visualisation, WebSocket architecture, and a scroll-driven storytelling homepage.',
    stack   : ['D3.js', 'Node', 'WebSocket', 'PostgreSQL'],
    accent  : '#2563eb',
    link    : '#',
    gradient: 'linear-gradient(135deg, #081738 0%, #122d63 40%, #040d24 75%, #020617 100%)',
    pattern : 'grid',
  },
]

/* ─── Geometric pattern SVGs (GPU safe — inline) ──────────────── */
function PatternGrid() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
      <defs>
        <pattern id="pg-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#60a5fa" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pg-grid)"/>
    </svg>
  )
}
function PatternDots() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, opacity: 0.07 }}>
      <defs>
        <pattern id="pg-dots" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#60a5fa"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pg-dots)"/>
    </svg>
  )
}
function PatternLines() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
      <defs>
        <pattern id="pg-lines" width="1" height="40" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#60a5fa" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pg-lines)"/>
    </svg>
  )
}

const PATTERNS = { grid: PatternGrid, dots: PatternDots, lines: PatternLines }

/* ─── Single project panel ─────────────────────────────────────── */
function ProjectPanel({ project, isFirst }) {
  const Pattern = PATTERNS[project.pattern] || PatternGrid

  return (
    <article
      className="prj-panel"
      data-proj="panel"
      aria-label={`${project.title} — ${project.type}`}
    >
      {/* ── Panel inner layout ── */}
      <div className="prj-panel-inner">

        {/* LEFT — project info ── */}
        <div className="prj-info" data-speed="1">

          {/* Top meta */}
          <div className="prj-meta" data-proj-meta>
            <span className="prj-meta-index" aria-hidden="true">{project.index}</span>
            <span className="prj-meta-divider" aria-hidden="true" />
            <span className="prj-meta-type">{project.type}</span>
            <span className="prj-meta-year">{project.year}</span>
          </div>

          {/* Title */}
          <div className="prj-title-wrap">
            <h3
              className="prj-title"
              data-animate="project-text"
              aria-label={project.title}
            >
              {project.title}
            </h3>
            <p
              className="prj-sub"
              data-animate="project-text"
              aria-label={project.sub}
            >
              {project.sub}
            </p>
          </div>

          {/* Description */}
          <p
            className="prj-desc"
            data-animate="project-text"
          >
            {project.desc}
          </p>

          {/* Stack */}
          <div className="prj-stack" aria-label={`Stack: ${project.stack.join(', ')}`}>
            {project.stack.map(t => (
              <span key={t} className="prj-stack-tag">{t}</span>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href={project.link}
            className="prj-cta"
            data-proj-cta
            data-magnetic-cta
            variants={{
              rest : { scale: 1 },
              hover: { scale: 1.04 },
              tap  : { scale: 0.97 },
            }}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            transition={SP}
            aria-label={`View ${project.title} project`}
          >
            <span data-mag-label className="prj-cta-label">
              View case study
            </span>
            <span className="prj-cta-arrow" aria-hidden="true">→</span>
          </motion.a>
        </div>

        {/* RIGHT — image ── */}
        <div className="prj-visual" data-speed="0.7">
          <div
            className="prj-img-frame"
            data-proj-img
            style={{ background: project.gradient }}
            aria-hidden="true"
          >
            <Pattern />

            {/* Floating accent number */}
            <div
              className="prj-visual-num"
              data-speed="1.3"
              aria-hidden="true"
              style={{ color: project.accent + '18' }}
            >
              {project.index}
            </div>

            {/* Overlay gradient */}
            <div className="prj-img-overlay" />

            {/* Corner badge */}
            <div
              className="prj-img-badge"
              style={{ borderColor: project.accent + '40', color: project.accent }}
            >
              <span className="prj-img-badge-dot" style={{ background: project.accent }} />
              {project.type}
            </div>
          </div>
        </div>

      </div>

      {/* Panel counter (bottom right) */}
      <div className="prj-panel-counter" data-proj-counter aria-hidden="true">
        {project.index}
      </div>
    </article>
  )
}

/* ─── Main component ───────────────────────────────────────────── */
export default function ProjectsSection({ lenis = null }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const cleanup = initProjectsAnimation({ scope: el, lenis })
    return cleanup
  }, [lenis])

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Projects showcase"
      className="prj-section"
    >
      {/* ── All styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        /* ── Tokens ── */
        .prj-section {
          --lime-300: #93c5fd;
          --lime-400: #60a5fa;
          --lime-500: #3b82f6;
          --lime-600: #2563eb;
          --fg:       #eff6ff;
          --fg-muted: rgba(239,246,255,0.50);
          --fg-dim:   rgba(239,246,255,0.24);
          --border:   rgba(255,255,255,0.08);
          --border-lime: rgba(96,165,250,0.22);
          --surface:  rgba(255,255,255,0.03);
        }

        /* ── Section shell ── */
        .prj-section {
          position: relative;
          width: 100%;
          /* scroll budget — do not reduce below ~340vh */
          min-height: 380vh;
          background: #020617;
          overflow: hidden;
          isolation: isolate;
        }

        /* ── Grain ── */
        .prj-section::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          pointer-events: none;
        }

        /* ── Ambient orb ── */
        .prj-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
          animation: prj-orb-drift 20s ease-in-out infinite alternate;
        }
        .prj-orb-1 {
          width: clamp(400px, 55vw, 800px);
          height: clamp(400px, 55vw, 800px);
          background: radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%);
          top: 10%; right: -15%;
        }
        .prj-orb-2 {
          width: clamp(250px, 35vw, 500px);
          height: clamp(250px, 35vw, 500px);
          background: radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%);
          bottom: 5%; left: -10%;
          animation-delay: -8s;
        }
        @keyframes prj-orb-drift {
          from { transform: translate(0, 0); }
          to   { transform: translate(-50px, 40px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .prj-orb { animation: none !important; }
        }

        /* ── Sticky pinned container ── */
        .prj-sticky {
          position: sticky;
          top: 0;
          height: 100svh;
          width: 100%;
          overflow: hidden;
          z-index: 2;
          display: flex;
          flex-direction: column;
        }

        /* ── Top header bar ── */
        .prj-header {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(24px, 4vw, 44px) clamp(20px, 6vw, 80px) 0;
          pointer-events: none;
        }
        .prj-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--lime-500);
          will-change: transform, opacity;
        }
        .prj-header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .prj-headline {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(14px, 2vw, 20px);
          font-weight: 400;
          letter-spacing: -0.01em;
          color: var(--fg);
          margin: 0;
          will-change: transform, opacity;
          overflow: visible;
        }
        .prj-headline em {
          font-style: italic;
          background: linear-gradient(135deg, var(--lime-300), var(--lime-500));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .prj-panel-index {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--fg-dim);
          min-width: 5ch;
          text-align: right;
        }

        /* ── Horizontal track ── */
        .prj-track {
          display: flex;
          align-items: center;
          height: 100%;
          will-change: transform;
          /* width set to n * 100vw by JS or flex will handle it */
          flex-shrink: 0;
        }

        /* ── Individual panel ── */
        .prj-panel {
          position: relative;
          width: 100vw;
          height: 100svh;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(80px, 10vw, 120px) clamp(20px, 6vw, 80px) clamp(60px, 8vw, 100px);
          will-change: transform, opacity;
        }

        /* Panel inner — two-column layout */
        .prj-panel-inner {
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }
        @media (max-width: 1023px) {
          .prj-panel-inner {
            grid-template-columns: 1fr;
            gap: 28px;
            max-height: 90svh;
            overflow: hidden;
          }
        }

        /* ── Info column ── */
        .prj-info {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.5vw, 26px);
          will-change: transform;
        }

        /* Meta row */
        .prj-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          will-change: transform, opacity;
        }
        .prj-meta-index {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(11px, 1.3vw, 13px);
          color: var(--lime-400);
          letter-spacing: 0.06em;
        }
        .prj-meta-divider {
          width: 1px; height: 12px;
          background: var(--border);
        }
        .prj-meta-type {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--fg-dim);
        }
        .prj-meta-year {
          margin-left: auto;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--fg-dim);
        }

        /* Title block */
        .prj-title-wrap { display: flex; flex-direction: column; gap: 6px; }
        .prj-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(42px, 7vw, 88px);
          font-weight: 400;
          line-height: 0.94;
          letter-spacing: -0.025em;
          color: var(--fg);
          margin: 0;
          perspective: 700px;
          overflow: visible;
        }
        .prj-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(13px, 1.6vw, 16px);
          font-weight: 300;
          letter-spacing: 0.01em;
          color: var(--fg-muted);
          margin: 0;
          perspective: 700px;
          overflow: visible;
        }

        /* Description */
        .prj-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(13px, 1.4vw, 15px);
          font-weight: 300;
          line-height: 1.65;
          color: var(--fg-muted);
          max-width: 44ch;
          margin: 0;
          perspective: 700px;
          overflow: visible;
        }

        /* Stack chips */
        .prj-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .prj-stack-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--fg-dim);
          border: 1px solid var(--border);
          border-radius: 9999px;
          padding: 3px 10px;
          transition: border-color 0.22s, color 0.22s;
        }
        .prj-panel:hover .prj-stack-tag {
          border-color: var(--border-lime);
          color: var(--lime-400);
        }

        /* CTA */
        .prj-cta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          border-radius: 9999px;
          border: 1px solid var(--border-lime);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(14px);
          color: var(--fg);
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.03em;
          text-decoration: none;
          cursor: pointer;
          will-change: transform;
          transition: border-color 0.25s, background 0.25s;
          width: fit-content;
          will-change: transform, opacity, filter;
        }
        .prj-cta:hover {
          border-color: rgba(96,165,250,0.50);
          background: rgba(96,165,250,0.06);
        }
        .prj-cta-label { will-change: transform; }
        .prj-cta-arrow {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .prj-cta:hover .prj-cta-arrow { transform: translateX(4px); }

        /* ── Visual column ── */
        .prj-visual {
          position: relative;
          will-change: transform;
        }

        .prj-img-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border);
          will-change: transform, clip-path, filter;
        }
        @media (max-width: 1023px) {
          .prj-img-frame {
            aspect-ratio: 16/7;
            border-radius: 14px;
          }
        }
        @media (max-width: 599px) {
          .prj-visual { display: none; }
        }

        /* Overlay */
        .prj-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 40%,
            rgba(7,13,2,0.55) 100%
          );
          pointer-events: none;
        }

        /* Big background number */
        .prj-visual-num {
          position: absolute;
          bottom: -5%;
          right: -3%;
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(120px, 22vw, 280px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.05em;
          user-select: none;
          pointer-events: none;
          will-change: transform;
        }

        /* Badge */
        .prj-img-badge {
          position: absolute;
          top: 16px; left: 16px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 9999px;
          border: 1px solid;
          background: rgba(7,13,2,0.6);
          backdrop-filter: blur(12px);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .prj-img-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Panel counter */
        .prj-panel-counter {
          position: absolute;
          bottom: clamp(20px, 3vw, 36px);
          right: clamp(20px, 6vw, 80px);
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(56px, 8vw, 100px);
          font-weight: 400;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(96,165,250,0.06);
          user-select: none;
          pointer-events: none;
          will-change: opacity;
          line-height: 1;
        }

        /* ── Progress bar ── */
        .prj-progress-wrap {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 10;
          height: 1px;
          background: var(--border);
        }
        .prj-progress-bar {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 100%;
          background: linear-gradient(90deg, var(--lime-500), var(--lime-300));
          transform-origin: left center;
          transform: scaleX(0);
          will-change: transform;
        }
        .prj-progress-label {
          position: absolute;
          bottom: 12px;
          left: clamp(20px, 6vw, 80px);
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--fg-dim);
        }
        .prj-progress-index {
          position: absolute;
          bottom: 12px;
          right: clamp(20px, 6vw, 80px);
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: var(--lime-400);
          min-width: 5ch;
          text-align: right;
        }

        /* ── Post-scroll statement ── */
        .prj-outro {
          position: relative;
          z-index: 2;
          padding: clamp(64px, 10vw, 120px) clamp(20px, 6vw, 80px);
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.5vw, 28px);
        }
        .prj-outro-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--lime-500);
        }
        .prj-outro-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(28px, 5vw, 64px);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.08;
          color: var(--fg);
          margin: 0;
        }
        .prj-outro-heading em {
          font-style: italic;
          color: var(--lime-300);
        }
        .prj-outro-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(14px, 1.6vw, 17px);
          font-weight: 300;
          color: var(--fg-muted);
          max-width: 46ch;
          line-height: 1.65;
          margin: 0;
        }
        .prj-outro-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          border-radius: 9999px;
          border: none;
          background: linear-gradient(135deg, var(--lime-300), var(--lime-500));
          color: #0b1220;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          cursor: pointer;
          width: fit-content;
          box-shadow: 0 4px 24px rgba(59,130,246,0.28);
          transition: box-shadow 0.25s, transform 0.18s;
        }
        .prj-outro-cta:hover {
          box-shadow: 0 6px 32px rgba(59,130,246,0.45);
          transform: translateY(-1px);
        }

        /* ── Exit fade ── */
        .prj-exit {
          position: relative;
          z-index: 2;
          height: clamp(60px, 8vw, 100px);
          background: linear-gradient(180deg, transparent 0%, #020617 100%);
          pointer-events: none;
        }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .prj-panel {
            padding-top: clamp(70px, 18vw, 100px);
            padding-bottom: clamp(40px, 10vw, 80px);
          }
          .prj-title { font-size: clamp(36px, 9vw, 60px); }
          .prj-desc { display: none; }
          .prj-stack { display: none; }
        }
        @media (max-width: 479px) {
          .prj-cta { padding: 11px 22px; font-size: 12.5px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .prj-img-frame { will-change: auto; }
          .prj-panel      { will-change: auto; }
        }
      `}</style>

      {/* ── Ambient background ─────────────────────────────── */}
      <div className="prj-orb prj-orb-1" aria-hidden="true" />
      <div className="prj-orb prj-orb-2" aria-hidden="true" />

      {/* ═══ STICKY PINNED CONTAINER ═══ */}
      <div className="prj-sticky" data-proj="sticky">

        {/* Top header */}
        <div className="prj-header">
          <span className="prj-eyebrow" data-proj="eyebrow">
            04 — Selected Work
          </span>
          <div className="prj-header-right">
            <h2
              className="prj-headline"
              data-proj="headline"
              aria-label="Built to last"
            >
              Built to <em>last</em>
            </h2>
            <span
              className="prj-panel-index"
              data-proj="index"
              aria-live="polite"
              aria-label="Current project"
            >
              01 / 04
            </span>
          </div>
        </div>

        {/* Horizontal track */}
        <div
          className="prj-track"
          data-animate="horizontal-projects"
          data-proj="track"
          aria-label="Projects list — scroll to explore"
        >
          {PROJECTS.map((project, i) => (
            <ProjectPanel
              key={project.id}
              project={project}
              isFirst={i === 0}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="prj-progress-wrap">
          <div
            className="prj-progress-bar"
            data-proj="progress"
            aria-hidden="true"
          />
          <span className="prj-progress-label" aria-hidden="true">
            Projects
          </span>
          <span
            className="prj-progress-index"
            data-proj="index"
            aria-hidden="true"
          >
            01 / 04
          </span>
        </div>

      </div>
      {/* ═══ END STICKY ═══ */}

      {/* ── Post-scroll outro ─────────────────────────────── */}
      <div className="prj-outro" role="complementary" aria-label="Projects summary">
        <motion.span
          className="prj-outro-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ ...SP, delay: 0.05 }}
        >
          Every project ships
        </motion.span>
        <motion.h2
          className="prj-outro-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ ...SP, delay: 0.12 }}
        >
          Not just built —<br />
          <em>engineered to endure.</em>
        </motion.h2>
        <motion.p
          className="prj-outro-sub"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ ...SP, delay: 0.2 }}
        >
          Each project is a committed engagement — full ownership from architecture decisions through launch and beyond.
        </motion.p>
        <motion.a
          href="#contact"
          className="prj-outro-cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ ...SP, delay: 0.3 }}
          aria-label="Start a project together"
        >
          Start a project
          <span aria-hidden="true">→</span>
        </motion.a>
      </div>

      {/* ── Exit fade ─────────────────────────────────────── */}
      <div className="prj-exit" aria-hidden="true" />
    </section>
  )
}