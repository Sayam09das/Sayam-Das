import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { initAboutAnimation } from '../animations/aboutAnimation'

/* ─── Framer micro-interaction spring ─────────────────────────── */
const SPRING = { type: 'spring', stiffness: 120, damping: 20 }

const highlightHover = {
    rest: { scale: 1, color: 'var(--about-fg-muted)' },
    hover: { scale: 1.02, color: 'var(--about-lime-300)' },
}

const ctaHover = {
    rest: { scale: 1, boxShadow: '0 0 0 1px rgba(96,165,250,0.22)' },
    hover: { scale: 1.04, boxShadow: '0 0 0 1px rgba(96,165,250,0.55), 0 8px 32px rgba(59,130,246,0.22)' },
    tap: { scale: 0.97 },
}

/* ─────────────────────────────────────────────────────────────── */
export default function AboutSection({ lenis = null }) {
    const sectionRef = useRef(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const cleanup = initAboutAnimation({ scope: el, lenis })
        return cleanup
    }, [lenis])

    return (
        <section
            ref={sectionRef}
            id="about"
            aria-label="About section"
            className="about-section"
        >
            {/* ── Styles ──────────────────────────────────────────── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        /* ── Tokens ── */
        .about-section {
          --about-lime-300: #93c5fd;
          --about-lime-400: #60a5fa;
          --about-lime-500: #3b82f6;
          --about-lime-600: #2563eb;
          --about-fg:       #eff6ff;
          --about-fg-muted: rgba(239,246,255,0.50);
          --about-fg-dim:   rgba(239,246,255,0.24);
          --about-border:   rgba(255,255,255,0.07);
          --about-border-lime: rgba(96,165,250,0.18);
          --about-surface:  rgba(255,255,255,0.03);
        }

        /* ── Section shell ── */
        .about-section {
          position: relative;
          width: 100%;
          /* Total scroll distance = pinned duration */
          min-height: 380vh;
          background: #020617;
          overflow: hidden;
          isolation: isolate;
        }

        /* ── Background colour shift overlay ── */
        .about-bg-shift {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(
            ellipse 80% 60% at 20% 60%,
            rgba(37,99,235,0.07) 0%,
            transparent 65%
          );
          pointer-events: none;
          will-change: opacity;
        }

        /* ── Accent orb ── */
        .about-accent-orb {
          position: absolute;
          top: 15%;
          right: -15%;
          width: clamp(300px, 55vw, 700px);
          height: clamp(300px, 55vw, 700px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          will-change: transform, opacity;
          opacity: 0;
          z-index: 0;
        }

        /* ── Grain ── */
        .about-grain {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          pointer-events: none;
        }

        /* ── Sticky wrapper ── */
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

        /* ── Inner layout ── */
        .about-inner {
          width: 100%;
          max-width: 1200px;
          padding: 0 clamp(20px, 6vw, 80px);
          position: relative;
        }

        /* ── Progress bar ── */
        .about-progress-bar {
          position: absolute;
          top: clamp(28px, 5vw, 48px);
          left: clamp(20px, 6vw, 80px);
          right: clamp(20px, 6vw, 80px);
          height: 1px;
          background: var(--about-border);
          z-index: 10;
          overflow: hidden;
        }
        .about-progress-line {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, var(--about-lime-500), var(--about-lime-300));
          transform-origin: left center;
          transform: scaleX(0);
          will-change: transform;
        }

        /* ── Phase counter ── */
        .about-counter-wrap {
          position: absolute;
          top: clamp(20px, 4vw, 36px);
          right: clamp(20px, 6vw, 80px);
          display: flex;
          align-items: baseline;
          gap: 4px;
          z-index: 10;
        }
        .about-counter {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(13px, 1.6vw, 16px);
          color: var(--about-lime-400);
          letter-spacing: -0.01em;
          min-width: 2ch;
          text-align: right;
        }
        .about-counter-of {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--about-fg-dim);
          text-transform: uppercase;
        }

        /* ── Section label ── */
        .about-section-label {
          position: absolute;
          top: clamp(20px, 4vw, 36px);
          left: clamp(20px, 6vw, 80px);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--about-fg-dim);
          z-index: 10;
        }

        /* ── Phase container ── */
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

        /* ── Phase 1: large headline ── */
        .phase1-heading {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(42px, 8vw, 108px);
          font-weight: 400;
          line-height: 0.96;
          letter-spacing: -0.025em;
          color: var(--about-fg);
          max-width: 14ch;
          margin: 0;
          perspective: 800px;
        }
        .phase1-heading em {
          font-style: italic;
          background: linear-gradient(135deg, var(--about-lime-300) 0%, var(--about-lime-500) 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .phase1-sub {
          margin-top: clamp(16px, 2.5vw, 24px);
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(13px, 1.4vw, 15px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--about-fg-dim);
        }

        /* ── Phase 2: story paragraph ── */
        .phase2-layout {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
          width: 100%;
        }
        @media (max-width: 767px) {
          .phase2-layout { grid-template-columns: 1fr; gap: 28px; }
        }
        .phase2-number {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(80px, 14vw, 180px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(96,165,250,0.18);
          user-select: none;
        }
        .phase2-text-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .phase2-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--about-lime-400);
        }
        .phase2-body {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(17px, 2.2vw, 24px);
          font-weight: 300;
          line-height: 1.6;
          color: var(--about-fg-muted);
          max-width: 42ch;
          perspective: 700px;
        }
        .phase2-body strong {
          color: var(--about-fg);
          font-weight: 400;
        }

        /* ── Phase 3: oversized statement lines ── */
        .phase3-statement {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(34px, 6.5vw, 86px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--about-fg);
          max-width: 18ch;
          margin: 0;
        }
        .phase3-statement [data-line] {
          display: block;
        }
        .phase3-statement [data-line="highlight"] {
          background: linear-gradient(135deg, var(--about-lime-300), var(--about-lime-500));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: italic;
        }
        .phase3-accent {
          margin-top: clamp(24px, 3.5vw, 40px);
          display: flex;
          align-items: center;
          gap: 14px;
          will-change: transform, opacity;
        }
        .phase3-accent-line {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, var(--about-lime-500), transparent);
        }
        .phase3-accent-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--about-fg-dim);
        }

        /* ── Phase 4: CTA + tag ── */
        .phase4-layout {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.5vw, 36px);
          align-items: flex-start;
        }
        .phase4-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--about-fg-dim);
        }
        .phase4-headline {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(28px, 4.5vw, 58px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--about-fg);
          max-width: 22ch;
        }
        .phase4-headline em {
          font-style: italic;
          color: var(--about-lime-300);
        }
        .phase4-cta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          will-change: transform, opacity;
        }
        .phase4-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid var(--about-border-lime);
          background: rgba(96,165,250,0.05);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--about-lime-300);
          will-change: transform, opacity, filter;
        }
        .tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--about-lime-400);
          box-shadow: 0 0 6px rgba(96,165,250,0.7);
        }

        /* ── CTA button ── */
        .about-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          border-radius: 9999px;
          border: 1px solid var(--about-border-lime);
          background: rgba(255,255,255,0.035);
          backdrop-filter: blur(14px);
          outline: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: var(--about-fg);
          white-space: nowrap;
          will-change: transform;
          transition: border-color 0.25s, background 0.25s, color 0.25s;
        }
        .about-cta-arrow {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .about-cta-btn:hover .about-cta-arrow { transform: translateX(4px); }

        /* ── Image column (parallax layer) ── */
        .about-image-col {
          position: absolute;
          right: clamp(20px, 5vw, 80px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          will-change: transform;
        }
        .about-img-frame {
          width: clamp(160px, 20vw, 280px);
          aspect-ratio: 3/4;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--about-border);
          position: relative;
        }
        .about-img-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(180deg, transparent 50%, rgba(7,13,2,0.5) 100%);
          pointer-events: none;
        }
        .about-img-inner {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          will-change: transform, clip-path, filter;
        }
        /* Placeholder when no real image */
        .about-img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(160deg, rgba(37,99,235,0.15) 0%, rgba(2,6,23,0.8) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 20px;
          gap: 8px;
        }
        .placeholder-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--about-fg-dim);
        }
        .placeholder-grid {
          width: 100%; height: 100%;
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(96,165,250,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        @media (max-width: 1023px) { .about-image-col { display: none; } }

        /* ── Statement section (after pin) ── */
        .about-statement-section {
          position: relative;
          z-index: 2;
          padding: clamp(80px, 12vw, 160px) clamp(20px, 6vw, 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: clamp(40px, 6vw, 72px);
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-statement-text {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(11px, 1.3vw, 13px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--about-lime-500);
        }

        .about-statement {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(32px, 5.5vw, 72px);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: 0.18em;
          color: var(--about-fg);
          max-width: 18ch;
          will-change: transform, opacity, letter-spacing;
        }

        /* ── Highlight word interaction ── */
        .about-highlight-word {
          display: inline-block;
          cursor: default;
          color: var(--about-fg-muted);
          transition: color 0.22s;
          will-change: transform;
        }

        /* ── Metrics row (after statement) ── */
        .about-metrics {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(28px, 5vw, 60px);
          align-items: flex-start;
          justify-content: center;
          padding: clamp(48px, 7vw, 96px) clamp(20px, 6vw, 80px);
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .metric-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 120px;
        }
        .metric-val {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 400;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .metric-val-lime {
          background: linear-gradient(135deg, var(--about-lime-300), var(--about-lime-500));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .metric-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--about-fg-dim);
        }
        .metric-divider {
          width: 1px;
          height: 48px;
          background: var(--about-border);
          align-self: center;
        }
        @media (max-width: 479px) { .metric-divider { display: none; } }

        /* ── Transition fade-out to next section ── */
        .about-exit-fade {
          position: relative;
          z-index: 2;
          height: clamp(80px, 12vw, 160px);
          background: linear-gradient(180deg, transparent 0%, #020617 100%);
          pointer-events: none;
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .about-phase { opacity: 1 !important; position: relative !important; }
          .about-accent-orb { animation: none !important; }
        }
      `}</style>

            {/* ── Background layers ──────────────────────────────── */}
            <div className="about-bg-shift" data-about="bg-shift" aria-hidden="true" />
            <div className="about-accent-orb" data-about="accent-orb" data-speed="0.6" aria-hidden="true" />
            <div className="about-grain" aria-hidden="true" />

            {/* ── Sticky pinned container ────────────────────────── */}
            <div className="about-sticky" data-about="sticky">
                <div className="about-inner">

                    {/* Progress bar */}
                    <div className="about-progress-bar" aria-hidden="true">
                        <div className="about-progress-line" data-about="progress-line" />
                    </div>

                    {/* Section label */}
                    <span className="about-section-label" aria-hidden="true">02 — About</span>

                    {/* Counter */}
                    <div className="about-counter-wrap" aria-hidden="true">
                        <span className="about-counter" data-about="counter">01</span>
                        <span className="about-counter-of">/ 04</span>
                    </div>

                    {/* Phase stack */}
                    <div className="about-phases" aria-live="polite">

                        {/* ── Phase 1: Big headline reveal ── */}
                        <div className="about-phase" data-phase="1" aria-hidden="true">
                            <h2
                                className="phase1-heading"
                                data-animate="about-heading"
                            >
                                I build the <em>future</em> one component at a time
                            </h2>
                            <p className="phase1-sub">Engineering · Design · Motion</p>
                        </div>

                        {/* ── Phase 2: Story paragraph ── */}
                        <div className="about-phase" data-phase="2" aria-hidden="true">
                            <div className="phase2-layout">
                                <div className="phase2-number" aria-hidden="true">02</div>
                                <div className="phase2-text-col">
                                    <span className="phase2-label">The story</span>
                                    <p
                                        className="phase2-body"
                                        data-animate="about-text"
                                    >
                                        I've spent <strong>6 years</strong> turning product visions into living interfaces — obsessing over timing curves, spatial rhythm, and the invisible details that make an experience feel <strong>inevitable</strong> rather than engineered.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── Phase 3: Oversized statement lines ── */}
                        <div className="about-phase" data-phase="3" aria-hidden="true">
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

                        {/* ── Phase 4: CTA ── */}
                        <div className="about-phase" data-phase="4" aria-hidden="true">
                            <div className="phase4-layout">
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
                        </div>

                    </div>

                    {/* ── Image column (parallax mid layer 1.0) ── */}
                    <div className="about-image-col" data-speed="1.0" aria-hidden="true">
                        <div className="about-img-frame">
                            <div
                                className="about-img-inner about-img-placeholder"
                                data-about="image"
                            >
                                <div className="placeholder-grid" />
                                <span className="placeholder-label">Portfolio · 2026</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Statement section — appears after pin releases ─── */}
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

            {/* ── Metrics row ───────────────────────────────────── */}
            <div className="about-metrics" data-speed="1.3">
                {[
                    { val: '6', suffix: '+', label: 'Years crafting interfaces', lime: true },
                    null,
                    { val: '40', suffix: '+', label: 'Products shipped', lime: false },
                    null,
                    { val: '12', suffix: 'ms', label: 'Target interaction latency', lime: true },
                    null,
                    { val: '∞', suffix: '', label: 'Attention to detail', lime: false },
                ].map((item, i) =>
                    item === null ? (
                        <div key={i} className="metric-divider" aria-hidden="true" />
                    ) : (
                        <motion.div
                            key={i}
                            className="metric-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10%' }}
                            transition={{ ...SPRING, delay: i * 0.07 }}
                        >
                            <span className={`metric-val ${item.lime ? 'metric-val-lime' : ''}`} style={!item.lime ? { color: 'var(--about-fg)' } : {}}>
                                {item.val}<span style={{ fontSize: '0.55em', letterSpacing: 0, marginLeft: '2px' }}>{item.suffix}</span>
                            </span>
                            <span className="metric-label">{item.label}</span>
                        </motion.div>
                    )
                )}
            </div>

            {/* ── Exit fade ─────────────────────────────────────── */}
            <div className="about-exit-fade" aria-hidden="true" />
        </section>
    )
}