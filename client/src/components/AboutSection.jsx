import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { initAboutAnimation } from '../animations/aboutAnimation'

/* ─── Framer spring ─────────────────────────────────────────────── */
const SPRING = { type: 'spring', stiffness: 120, damping: 20 }

const highlightHover = {
    rest: { scale: 1, color: 'rgba(239,246,255,0.38)' },
    hover: { scale: 1.02, color: '#93c5fd' },
}

const ctaHover = {
    rest: { scale: 1, boxShadow: '0 0 0 1px rgba(96,165,250,0.22)' },
    hover: { scale: 1.04, boxShadow: '0 0 0 1px rgba(96,165,250,0.55), 0 8px 32px rgba(59,130,246,0.22)' },
    tap: { scale: 0.97 },
}

/* ─────────────────────────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────────────────────────── */
export default function AboutSection({ lenis = null }) {
    const sectionRef = useRef(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        return initAboutAnimation({ scope: el, lenis })
    }, [lenis])

    return (
        <section
            ref={sectionRef}
            id="about"
            aria-label="About section"
            className="about-section"
        >
            {/* ══════════════════════════════════ STYLES ══════════════════ */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        /* ════════════════════════════════
           TOKENS
        ════════════════════════════════ */
        .about-section {
          --a-blue-200:  #bfdbfe;
          --a-blue-300:  #93c5fd;
          --a-blue-400:  #60a5fa;
          --a-blue-500:  #3b82f6;
          --a-blue-600:  #2563eb;
          --a-fg:        #eff6ff;
          --a-fg-muted:  rgba(239,246,255,0.50);
          --a-fg-dim:    rgba(239,246,255,0.24);
          --a-border:    rgba(255,255,255,0.07);
          --a-border-b:  rgba(96,165,250,0.18);
          --a-surface:   rgba(255,255,255,0.03);
          --a-glass:     rgba(6,15,30,0.55);
        }

        /* ════════════════════════════════
           SECTION SHELL
        ════════════════════════════════ */
        .about-section {
          position: relative;
          width: 100%;
          min-height: 380vh;   /* total scroll distance — drives pin */
          background: #020617;
          overflow: hidden;
          isolation: isolate;
        }

        /* ════════════════════════════════
           BACKGROUND LAYERS
        ════════════════════════════════ */
        .about-bg-shift {
          position: absolute; inset: 0; z-index: 0;
          background: radial-gradient(ellipse 80% 60% at 20% 60%, rgba(37,99,235,0.07) 0%, transparent 65%);
          pointer-events: none;
          will-change: opacity;
        }
        .about-accent-orb {
          position: absolute;
          top: 15%; right: -15%;
          width: clamp(300px, 55vw, 700px);
          height: clamp(300px, 55vw, 700px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          will-change: transform, opacity;
          opacity: 0; z-index: 0;
        }
        .about-grain {
          position: absolute; inset: 0; z-index: 1;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          pointer-events: none;
        }

        /* ════════════════════════════════
           STICKY PINNED WRAPPER
        ════════════════════════════════ */
        .about-sticky {
          position: sticky;
          top: 0;
          height: 100svh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 2;
          will-change: transform;
        }

        /* ════════════════════════════════
           INNER LAYOUT
        ════════════════════════════════ */
        .about-inner {
          width: 100%;
          max-width: 1200px;
          padding: 0 clamp(20px, 6vw, 80px);
          position: relative;
        }

        /* ════════════════════════════════
           TOP HUD — progress + label + counter
        ════════════════════════════════ */
        .about-hud {
          position: absolute;
          top: clamp(24px, 4vw, 44px);
          left: clamp(20px, 6vw, 80px);
          right: clamp(20px, 6vw, 80px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
          gap: 12px;
        }
        .about-hud-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          color: var(--a-fg-dim);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .about-progress-bar {
          flex: 1;
          height: 1px;
          background: var(--a-border);
          overflow: hidden;
          border-radius: 9999px;
        }
        .about-progress-line {
          height: 100%;
          background: linear-gradient(90deg, var(--a-blue-500), var(--a-blue-300));
          transform-origin: left center;
          transform: scaleX(0);
          will-change: transform;
        }
        .about-counter-wrap {
          display: flex;
          align-items: baseline;
          gap: 4px;
          flex-shrink: 0;
        }
        .about-counter {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(13px, 1.6vw, 16px);
          color: var(--a-blue-400);
          letter-spacing: -0.01em;
          min-width: 2ch; text-align: right;
        }
        .about-counter-of {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.10em;
          color: var(--a-fg-dim); text-transform: uppercase;
        }

        /* ════════════════════════════════
           PHASE STACK
        ════════════════════════════════ */
        .about-phases {
          position: relative;
          width: 100%;
          min-height: 60vh;
          display: flex;
          align-items: center;
        }
        .about-phase {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          will-change: transform, opacity;
        }

        /* ════════════════════════════════
           PHASE 1 — cinematic headline
           Layout: full width, oversized text
        ════════════════════════════════ */
        .phase1-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(40px, 7.5vw, 104px);
          font-weight: 400;
          line-height: 0.96;
          letter-spacing: -0.025em;
          color: var(--a-fg);
          max-width: 14ch;
          margin: 0;
          perspective: 800px;
        }
        .phase1-heading em {
          font-style: italic;
          background: linear-gradient(135deg, var(--a-blue-300) 0%, var(--a-blue-500) 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .phase1-sub {
          margin-top: clamp(14px, 2vw, 22px);
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(11px, 1.3vw, 13px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--a-fg-dim);
        }
        /* Side graphic element — only on wide screens */
        .phase1-gfx {
          display: none;
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
        }
        @media (min-width: 1024px) {
          .phase1-gfx {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 6px;
          }
        }
        .phase1-gfx-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96,165,250,0.30));
        }

        /* ════════════════════════════════
           PHASE 2 — story paragraph
           Layout: big number left, text right
        ════════════════════════════════ */
        .phase2-layout {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(24px, 4vw, 64px);
          align-items: center;
          width: 100%;
        }
        .phase2-number {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(72px, 13vw, 170px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(96,165,250,0.16);
          user-select: none;
          flex-shrink: 0;
        }
        .phase2-text-col {
          display: flex; flex-direction: column; gap: 18px;
        }
        .phase2-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--a-blue-400);
        }
        .phase2-body {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(16px, 2.1vw, 23px);
          font-weight: 300;
          line-height: 1.65;
          color: var(--a-fg-muted);
          max-width: 44ch;
          perspective: 700px;
        }
        .phase2-body strong { color: var(--a-fg); font-weight: 400; }
        /* Stack on mobile */
        @media (max-width: 639px) {
          .phase2-layout { grid-template-columns: 1fr; gap: 16px; }
          .phase2-number { font-size: clamp(52px, 18vw, 80px); }
        }

        /* ════════════════════════════════
           PHASE 3 — oversized statement
           Layout: left-edge anchored lines
        ════════════════════════════════ */
        .phase3-wrap {
          display: flex;
          align-items: flex-end;
          gap: clamp(32px, 5vw, 64px);
          width: 100%;
        }
        .phase3-statement {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(34px, 6.2vw, 84px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--a-fg);
          max-width: 18ch;
          margin: 0;
          flex: 1;
        }
        .phase3-statement [data-line] { display: block; }
        .phase3-statement [data-line="highlight"] {
          background: linear-gradient(135deg, var(--a-blue-300), var(--a-blue-500));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: italic;
        }
        .phase3-aside {
          display: none;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
          padding-bottom: 8px;
        }
        @media (min-width: 768px) { .phase3-aside { display: flex; } }
        .phase3-aside-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--a-fg-dim);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .phase3-aside-item::before {
          content: '';
          display: block;
          width: 20px; height: 1px;
          background: rgba(96,165,250,0.28);
        }
        .phase3-accent {
          margin-top: clamp(20px, 3vw, 36px);
          display: flex;
          align-items: center;
          gap: 14px;
          will-change: transform, opacity;
        }
        .phase3-accent-line {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, var(--a-blue-500), transparent);
        }
        .phase3-accent-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--a-fg-dim);
        }

        /* ════════════════════════════════
           PHASE 4 — CTA
           Layout: headline left + glass tag card right
        ════════════════════════════════ */
        .phase4-layout {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(24px, 4vw, 60px);
          align-items: center;
          width: 100%;
        }
        @media (max-width: 767px) {
          .phase4-layout { grid-template-columns: 1fr; gap: 24px; }
          .phase4-card { display: none; }
        }
        .phase4-left {
          display: flex; flex-direction: column;
          gap: clamp(18px, 2.5vw, 28px);
          align-items: flex-start;
        }
        .phase4-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--a-fg-dim);
        }
        .phase4-headline {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(26px, 4.2vw, 56px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--a-fg);
          max-width: 22ch;
        }
        .phase4-headline em { font-style: italic; color: var(--a-blue-300); }
        .phase4-cta-row {
          display: flex; flex-wrap: wrap;
          align-items: center; gap: 12px;
          will-change: transform, opacity;
        }
        /* Glass card — right side of phase 4 */
        .phase4-card {
          background: rgba(6,15,30,0.52);
          border: 1px solid rgba(96,165,250,0.16);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-radius: 20px;
          padding: clamp(20px, 2.5vw, 28px) clamp(20px, 2.5vw, 28px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: clamp(180px, 20vw, 240px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 8px 32px rgba(0,0,0,0.40),
            0 0 24px rgba(59,130,246,0.06);
          position: relative;
          overflow: hidden;
        }
        .phase4-card::before {
          content: '';
          position: absolute; top: 0; left: 20%; right: 20%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96,165,250,0.40), transparent);
          pointer-events: none;
        }
        .phase4-card-stat {
          display: flex; flex-direction: column; gap: 3px;
        }
        .phase4-card-val {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--a-blue-300), var(--a-blue-500));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .phase4-card-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--a-fg-dim);
        }
        .phase4-card-sep {
          height: 1px;
          background: var(--a-border);
        }

        /* ── CTA button ── */
        .about-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          border-radius: 9999px;
          border: 1px solid var(--a-border-b);
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(14px);
          outline: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 500;
          letter-spacing: 0.03em;
          color: var(--a-fg);
          white-space: nowrap;
          will-change: transform;
          transition: border-color 0.25s, background 0.25s;
        }
        .about-cta-arrow {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .about-cta-btn:hover .about-cta-arrow { transform: translateX(4px); }

        /* ── Available tag ── */
        .phase4-tag {
          display: inline-flex;
          align-items: center; gap: 7px;
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid var(--a-border-b);
          background: rgba(96,165,250,0.05);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--a-blue-300);
          will-change: transform, opacity, filter;
        }
        .tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--a-blue-400);
          box-shadow: 0 0 6px rgba(96,165,250,0.70);
        }

        /* ════════════════════════════════
           IMAGE COLUMN (parallax)
        ════════════════════════════════ */
        .about-image-col {
          position: absolute;
          right: clamp(20px, 5vw, 80px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          will-change: transform;
        }
        .about-img-frame {
          width: clamp(140px, 18vw, 260px);
          aspect-ratio: 3/4;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--a-border);
          position: relative;
          background: rgba(6,15,30,0.60);
          backdrop-filter: blur(16px);
        }
        /* Glass sheen on image frame */
        .about-img-frame::before {
          content: '';
          position: absolute; top: 0; left: 15%; right: 15%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96,165,250,0.35), transparent);
          z-index: 2; pointer-events: none;
        }
        .about-img-frame::after {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(180deg, transparent 50%, rgba(7,13,28,0.55) 100%);
          pointer-events: none; z-index: 1;
        }
        .about-img-inner {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          will-change: transform, clip-path, filter;
        }
        .about-img-placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(160deg, rgba(37,99,235,0.15) 0%, rgba(2,6,23,0.80) 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding: 20px; gap: 8px;
        }
        .placeholder-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--a-fg-dim);
        }
        .placeholder-grid {
          width: 100%; height: 100%;
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(96,165,250,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        /* Image col only on lg+ */
        @media (max-width: 1023px) { .about-image-col { display: none; } }

        /* ════════════════════════════════
           STATEMENT SECTION (post-pin)
        ════════════════════════════════ */
        .about-statement-section {
          position: relative; z-index: 2;
          padding: clamp(80px,12vw,160px) clamp(20px,6vw,80px);
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          gap: clamp(32px,5vw,64px);
          max-width: 1200px;
          margin: 0 auto;
        }
        .about-statement-text {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(11px, 1.3vw, 13px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--a-blue-500);
        }
        .about-statement {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(30px, 5vw, 70px);
          font-weight: 400;
          line-height: 1.10;
          letter-spacing: 0.18em;
          color: var(--a-fg);
          max-width: 18ch;
          will-change: transform, opacity, letter-spacing;
        }
        .about-highlight-word {
          display: inline-block;
          cursor: default;
          color: var(--a-fg-muted);
          transition: color 0.22s;
          will-change: transform;
        }

        /* ════════════════════════════════
           METRICS ROW (post-statement)
        ════════════════════════════════ */
        .about-metrics {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(20px, 4vw, 52px);
          align-items: stretch;
          justify-content: center;
          padding: clamp(40px,6vw,80px) clamp(20px,6vw,80px);
          max-width: 1100px;
          margin: 0 auto;
          position: relative; z-index: 2;
        }
        /* Metric as glass card */
        .metric-card {
          display: flex; flex-direction: column; gap: 6px;
          min-width: clamp(100px, 14vw, 140px);
          padding: clamp(16px, 2vw, 22px);
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(96,165,250,0.08);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s;
        }
        .metric-card::before {
          content: '';
          position: absolute; top: 0; left: 20%; right: 20%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96,165,250,0.28), transparent);
          pointer-events: none;
        }
        .metric-card:hover { border-color: rgba(96,165,250,0.20); }
        .metric-val {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(36px, 5.5vw, 66px);
          font-weight: 400;
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--a-fg);
        }
        .metric-val-blue {
          background: linear-gradient(135deg, var(--a-blue-300), var(--a-blue-500));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .metric-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--a-fg-dim);
        }
        /* Remove metric dividers — cards do the separation */
        .metric-divider { display: none; }

        /* ════════════════════════════════
           EXIT FADE
        ════════════════════════════════ */
        .about-exit-fade {
          position: relative; z-index: 2;
          height: clamp(80px, 12vw, 160px);
          background: linear-gradient(180deg, transparent 0%, #020617 100%);
          pointer-events: none;
        }

        /* ════════════════════════════════
           REDUCED MOTION
        ════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .about-phase { opacity: 1 !important; position: relative !important; }
          .about-accent-orb { animation: none !important; }
        }

        /* ════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ════════════════════════════════ */
        /* xs: ≤ 479px */
        @media (max-width: 479px) {
          .about-hud-label { display: none; }
          .phase1-heading   { max-width: 100%; }
          .phase4-card      { display: none; }
        }
        /* sm: 480–767px */
        @media (min-width: 480px) and (max-width: 767px) {
          .about-inner { padding: 0 clamp(20px,5vw,40px); }
        }
        /* md: 768–1023px */
        @media (min-width: 768px) and (max-width: 1023px) {
          .about-inner { padding: 0 clamp(24px,5vw,60px); }
          .phase4-layout { grid-template-columns: 1fr; }
          .phase4-card { display: none; }
        }
        /* lg: 1024–1279px */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .about-inner { padding: 0 clamp(32px,5vw,64px); }
        }
        /* xl: 1280–1535px */
        @media (min-width: 1280px) and (max-width: 1535px) {
          .about-inner { padding: 0 clamp(48px,5vw,80px); }
        }
        /* 2xl: ≥ 1536px */
        @media (min-width: 1536px) {
          .about-inner { padding: 0 100px; }
          .about-img-frame { width: 300px; }
        }
      `}</style>

            {/* ── Background layers ─────────────────────────────────────── */}
            <div className="about-bg-shift" data-about="bg-shift" aria-hidden="true" />
            <div className="about-accent-orb" data-about="accent-orb" data-speed="0.6" aria-hidden="true" />
            <div className="about-grain" aria-hidden="true" />

            {/* ══════════════════════════════════════════════════════════════
          STICKY PINNED CONTAINER
      ══════════════════════════════════════════════════════════════ */}
            <div className="about-sticky" data-about="sticky">
                <div className="about-inner">

                    {/* ── Top HUD: label + progress + counter ── */}
                    <div className="about-hud" aria-hidden="true">
                        <span className="about-hud-label">02 — About</span>
                        <div className="about-progress-bar">
                            <div className="about-progress-line" data-about="progress-line" />
                        </div>
                        <div className="about-counter-wrap">
                            <span className="about-counter" data-about="counter">01</span>
                            <span className="about-counter-of">/ 04</span>
                        </div>
                    </div>

                    {/* ── Phase stack ── */}
                    <div className="about-phases" aria-live="polite">

                        {/* ─ Phase 1: cinematic headline ─ */}
                        <div className="about-phase" data-phase="1" aria-hidden="true">
                            <h2 className="phase1-heading" data-animate="about-heading">
                                I build the <em>future</em> one component at a time
                            </h2>
                            <p className="phase1-sub">Engineering · Design · Motion</p>

                            {/* Decorative gfx — wide only */}
                            <div className="phase1-gfx" aria-hidden="true">
                                {['180px', '120px', '80px', '48px'].map((w, i) => (
                                    <div
                                        key={i}
                                        className="phase1-gfx-line"
                                        style={{ width: w, opacity: 0.5 - i * 0.1 }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* ─ Phase 2: story ─ */}
                        <div className="about-phase" data-phase="2" aria-hidden="true">
                            <div className="phase2-layout">
                                <div className="phase2-number" aria-hidden="true">02</div>
                                <div className="phase2-text-col">
                                    <span className="phase2-label">The story</span>
                                    <p className="phase2-body" data-animate="about-text">
                                        I've spent <strong>6 years</strong> turning product visions into living interfaces — obsessing over timing curves, spatial rhythm, and the invisible details that make an experience feel <strong>inevitable</strong> rather than engineered.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ─ Phase 3: statement ─ */}
                        <div className="about-phase" data-phase="3" aria-hidden="true">
                            <div className="phase3-wrap">
                                <div>
                                    <h3 className="phase3-statement">
                                        <span data-line>Precision.</span>
                                        <span data-line>Motion.</span>
                                        <span data-line="highlight">Impact.</span>
                                    </h3>
                                    <div className="phase3-accent" data-about="accent">
                                        <div className="phase3-accent-line" />
                                        <span className="phase3-accent-text">Philosophy · 2026</span>
                                    </div>
                                </div>
                                {/* Aside labels */}
                                <div className="phase3-aside" aria-hidden="true">
                                    {['Hand-crafted', 'Performance first', 'Zero shortcuts'].map((t) => (
                                        <span key={t} className="phase3-aside-item">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ─ Phase 4: CTA ─ */}
                        <div className="about-phase" data-phase="4" aria-hidden="true">
                            <div className="phase4-layout">
                                {/* Left */}
                                <div className="phase4-left">
                                    <span className="phase4-eyebrow">Ready to collaborate</span>
                                    <h3 className="phase4-headline">
                                        Let's build something <em>extraordinary</em> together
                                    </h3>
                                    <div className="phase4-cta-row" data-about="cta">
                                        <motion.button
                                            className="about-cta-btn"
                                            variants={ctaHover}
                                            initial="rest"
                                            whileHover="hover"
                                            whileTap="tap"
                                            transition={SPRING}
                                            aria-label="View my projects"
                                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            See my work
                                            <span className="about-cta-arrow" aria-hidden="true">→</span>
                                        </motion.button>
                                        <div className="phase4-tag" data-about="tag">
                                            <span className="tag-dot" aria-hidden="true" />
                                            Available now
                                        </div>
                                    </div>
                                </div>

                                {/* Right — glass stat card */}
                                <div className="phase4-card" aria-hidden="true">
                                    <div className="phase4-card-stat">
                                        <span className="phase4-card-val">99%</span>
                                        <span className="phase4-card-label">Client satisfaction</span>
                                    </div>
                                    <div className="phase4-card-sep" />
                                    <div className="phase4-card-stat">
                                        <span className="phase4-card-val">40+</span>
                                        <span className="phase4-card-label">Products shipped</span>
                                    </div>
                                    <div className="phase4-card-sep" />
                                    <div className="phase4-card-stat">
                                        <span className="phase4-card-val">6+</span>
                                        <span className="phase4-card-label">Years experience</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ── Image column (parallax) ── */}
                    <div className="about-image-col" data-speed="1.0" aria-hidden="true">
                        <div className="about-img-frame">
                            <div className="about-img-inner about-img-placeholder" data-about="image">
                                <div className="placeholder-grid" />
                                <span className="placeholder-label">Portfolio · 2026</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
          STATEMENT SECTION — appears after pin releases
      ══════════════════════════════════════════════════════════════ */}
            <div className="about-statement-section" data-speed="0.6">
                <span className="about-statement-text">The Approach</span>
                <p
                    className="about-statement"
                    data-about="statement"
                    aria-label="Every pixel earns its place. Every motion tells a story."
                >
                    Every{' '}
                    <motion.span
                        className="about-highlight-word"
                        variants={highlightHover}
                        initial="rest"
                        whileHover="hover"
                        transition={SPRING}
                    >
                        pixel
                    </motion.span>{' '}
                    earns its place.{' '}
                    Every{' '}
                    <motion.span
                        className="about-highlight-word"
                        variants={highlightHover}
                        initial="rest"
                        whileHover="hover"
                        transition={SPRING}
                    >
                        motion
                    </motion.span>{' '}
                    tells a story.
                </p>
            </div>

            {/* ══════════════════════════════════════════════════════════════
          METRICS ROW
      ══════════════════════════════════════════════════════════════ */}
            <div className="about-metrics" data-speed="1.3">
                {[
                    { val: '6', suffix: '+', label: 'Years crafting interfaces', blue: true },
                    { val: '40', suffix: '+', label: 'Products shipped', blue: false },
                    { val: '12', suffix: 'ms', label: 'Target interaction latency', blue: true },
                    { val: '∞', suffix: '', label: 'Attention to detail', blue: false },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        className="metric-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10%' }}
                        transition={{ ...SPRING, delay: i * 0.08 }}
                        whileHover={{ y: -4, transition: { duration: 0.22 } }}
                    >
                        <span className={`metric-val ${item.blue ? 'metric-val-blue' : ''}`}>
                            {item.val}
                            <span style={{ fontSize: '0.55em', letterSpacing: 0, marginLeft: 2 }}>
                                {item.suffix}
                            </span>
                        </span>
                        <span className="metric-label">{item.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* ── Exit fade ─────────────────────────────────────────────── */}
            <div className="about-exit-fade" aria-hidden="true" />

        </section>
    )
}