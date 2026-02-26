import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { initHeroAnimation } from '../animations/heroAnimation'
import { WordRotate } from './ui/word-rotate'
import { Typewriter } from './ui/typewriter'
import { NumberTicker } from './ui/number-ticker'

/* ─────────────────────────────────────────────────────────────────
   SPRING / EASING CONFIGS
───────────────────────────────────────────────────────────────── */
const SPRING = { type: 'spring', stiffness: 260, damping: 24, mass: 0.8 }
const EASE_OUT = [0.22, 1, 0.36, 1]

/* ─────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────────── */

// Cinematic overlay — fades out on mount
const overlayVariants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 0,
    transition: { duration: 1.4, ease: EASE_OUT, delay: 0.1 },
  },
}

// Background wrapper reveal
const bgVariants = {
  initial: { opacity: 0, scale: 1.06 },
  animate: {
    opacity: 1, scale: 1,
    transition: { duration: 1.8, ease: EASE_OUT },
  },
}

// Per-orb entrance
const orbVariants = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.7 },
  animate: {
    opacity: 0.28, scale: 1,
    transition: { duration: 2, ease: EASE_OUT, delay },
  },
})

// Stagger container — all hero content children
const contentContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.95 } },
}

// Generic fade-up item
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

// Title — 3-D tilt entrance
const titleVariants = {
  initial: { opacity: 0, y: 40, rotateX: 12 },
  animate: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
}

// Meta stat items
const metaItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

// Corner number
const cornerVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 1, ease: EASE_OUT, delay: 1.9 },
  },
}

// Scroll indicator
const scrollVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: EASE_OUT, delay: 2.1 },
  },
}

// CTA button variants
const btnPrimary = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
  tap: { scale: 0.97 },
}
const btnGhost = {
  rest: { scale: 1 },
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
}

/* ─────────────────────────────────────────────────────────────────
   HERO COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Hero({ lenis = null }) {
  const heroRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  /* Mouse-parallax motion values */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  // Background layer   (slowest)
  const bgX = useTransform(smoothX, [-1, 1], [-18, 18])
  const bgY = useTransform(smoothY, [-1, 1], [-12, 12])

  // Corner number      (fastest)
  const cornerX = useTransform(smoothX, [-1, 1], [-6, 6])
  const cornerY = useTransform(smoothY, [-1, 1], [-14, 14])

  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window
      mouseX.set((e.clientX / w - 0.5) * 2)
      mouseY.set((e.clientY / h - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const cleanup = initHeroAnimation({ scope: el, lenis })
    return cleanup
  }, [lenis])

  // Kick entrance on mount
  useEffect(() => { setLoaded(true) }, [])

  return (
    <section
      ref={heroRef}
      aria-label="Hero section"
      className="relative w-full min-h-svh flex items-center justify-center overflow-hidden isolate bg-[#020617]"
      style={{ perspective: '1200px' }}
    >
      {/* ── Keyframe-only styles (Tailwind can't do these) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        @keyframes badge-pulse {
          0%,100% { box-shadow: 0 0 4px rgba(96,165,250,0.6); }
          50%      { box-shadow: 0 0 12px rgba(96,165,250,0.9), 0 0 20px rgba(96,165,250,0.3); }
        }
        @keyframes scan-drift {
          from { top: 35%; opacity: 0.4; }
          to   { top: 62%; opacity: 0.15; }
        }

        .badge-dot-pulse { animation: badge-pulse 2.4s ease-in-out infinite; }
        .float-dot-pulse  { animation: badge-pulse 2s   ease-in-out infinite; }
        .scanline-drift   { animation: scan-drift  18s  ease-in-out infinite alternate; }

        .grad-text {
          background: linear-gradient(135deg, #93c5fd 0%, #3b82f6 55%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .grad-text-sm {
          background: linear-gradient(135deg, #93c5fd, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .font-instrument { font-family: 'Instrument Serif', Georgia, serif; }
        .font-dm         { font-family: 'DM Sans', sans-serif; }

        .btn-shine::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 55%);
          pointer-events: none;
        }
        .grid-mask {
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%);
        }
        .grain-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
        }

        /* FIX: Correct headline sizing across breakpoints */
        .hero-headline {
          font-size: clamp(38px, 8vw, 100px);
        }
        @media (min-width: 1024px) and (max-width: 1440px) {
          .hero-headline {
            font-size: clamp(48px, 5.5vw, 72px);
          }
        }
        @media (max-width: 640px) {
          .hero-headline {
            font-size: 42px;
          }
        }

        /* FIX: Meta stats wrap nicely on small screens */
        @media (max-width: 640px) {
          .hero-meta {
            justify-content: center;
          }
          .hero-meta .meta-divider-sm {
            display: none;
          }
        }

        /* FIX: CTAs stack on very small screens */
        @media (max-width: 420px) {
          .hero-ctas {
            flex-direction: column;
            width: 100%;
          }
          .hero-ctas button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .badge-dot-pulse, .scanline-drift, .float-dot-pulse { animation: none !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          CINEMATIC OVERLAY — fades out on load
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 bg-[#020617] z-[60] pointer-events-none"
        variants={overlayVariants}
        initial="initial"
        animate={loaded ? 'animate' : 'initial'}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════
          BACKGROUND LAYER — parallax + entrance
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute z-0 pointer-events-none"
        style={{ inset: '-15%', x: bgX, y: bgY }}
        variants={bgVariants}
        initial="initial"
        animate={loaded ? 'animate' : 'initial'}
        aria-hidden="true"
      >
        {/* Orb 1 */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 'clamp(380px,55vw,780px)', height: 'clamp(380px,55vw,780px)',
            background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(37,99,235,0.1) 60%, transparent 80%)',
            filter: 'blur(80px)', top: '-10%', right: '-5%',
          }}
          variants={orbVariants(0.3)}
          initial="initial"
          animate={loaded ? 'animate' : 'initial'}
        >
          {/* Continuous breathe */}
          <motion.div
            className="w-full h-full rounded-full"
            animate={{ scale: [1, 1.06, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
          />
        </motion.div>

        {/* Orb 2 */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 'clamp(280px,40vw,600px)', height: 'clamp(280px,40vw,600px)',
            background: 'radial-gradient(circle, rgba(96,165,250,0.3) 0%, rgba(59,130,246,0.08) 55%, transparent 75%)',
            filter: 'blur(80px)', bottom: '0%', left: '-8%',
          }}
          variants={orbVariants(0.5)}
          initial="initial"
          animate={loaded ? 'animate' : 'initial'}
        >
          <motion.div
            className="w-full h-full rounded-full"
            animate={{ scale: [1, 1.08, 1], opacity: [1, 0.75, 1] }}
            transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
          />
        </motion.div>

        {/* Orb 3 */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 'clamp(200px,28vw,420px)', height: 'clamp(200px,28vw,420px)',
            background: 'radial-gradient(circle, rgba(147,197,253,0.2) 0%, transparent 70%)',
            filter: 'blur(80px)', top: '55%', right: '25%',
          }}
          variants={orbVariants(0.7)}
          initial="initial"
          animate={loaded ? 'animate' : 'initial'}
        >
          <motion.div
            className="w-full h-full rounded-full"
            animate={{ scale: [1, 1.10, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, delay: 4 }}
          />
        </motion.div>

        {/* Grain overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.032] grain-bg" />

        {/* Grid */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none grid-mask"
          style={{
            backgroundImage:
              'linear-gradient(rgba(96,165,250,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Scanline */}
        <div
          className="absolute left-0 right-0 h-px z-[2] pointer-events-none scanline-drift"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.15) 25%, rgba(96,165,250,0.4) 50%, rgba(96,165,250,0.15) 75%, transparent 100%)',
            top: '42%',
          }}
        />
      </motion.div>

      {/* ══════════════════════════════════════════════════════
          CORNER NUMBER — parallax + fade-up
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute z-[9] hidden md:flex flex-col items-end gap-1 pointer-events-none"
        style={{
          bottom: 'clamp(80px,10vw,120px)',
          right: 'clamp(20px,6vw,80px)',
          x: cornerX,
          y: cornerY,
        }}
        variants={cornerVariants}
        initial="initial"
        animate={loaded ? 'animate' : 'initial'}
        aria-hidden="true"
      >
        <span
          className="font-instrument font-normal leading-none tracking-[-0.04em] select-none"
          style={{
            fontSize: 'clamp(64px,10vw,120px)',
            background:
              'linear-gradient(180deg, rgba(96,165,250,0.12) 0%, rgba(96,165,250,0.02) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          01
        </span>
        <span className="font-dm text-[10px] tracking-[0.16em] uppercase text-white/30">
          Hero
        </span>
      </motion.div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT — centered layout
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 w-full max-w-[900px] mx-auto flex flex-col items-center text-center px-5 sm:px-8 md:px-12"
        style={{
          paddingTop: 'clamp(80px,12vw,120px)',
          paddingBottom: 'clamp(80px,12vw,120px)',
        }}
        variants={contentContainer}
        initial="initial"
        animate={loaded ? 'animate' : 'initial'}
      >

        {/* ── Badge ── */}
        <motion.div
          className="inline-flex items-center gap-2 py-[5px] pr-[14px] pl-[10px] rounded-full backdrop-blur-xl cursor-default mb-6"
          style={{
            border: '1px solid rgba(96,165,250,0.22)',
            background: 'rgba(96,165,250,0.06)',
          }}
          variants={fadeUp}
          aria-label="Currently available"
          whileHover={{
            borderColor: 'rgba(96,165,250,0.5)',
            background: 'rgba(96,165,250,0.10)',
            transition: { duration: 0.25 },
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 badge-dot-pulse"
            style={{ boxShadow: '0 0 8px rgba(96,165,250,0.7)' }}
            aria-hidden="true"
          />
          <span className="font-dm text-[11.5px] font-medium tracking-[0.1em] uppercase text-blue-300">
            Open to opportunities · 2026
          </span>
        </motion.div>

        {/* ── Eyebrow ── */}
        <motion.p
          className="font-dm font-normal tracking-[0.22em] uppercase text-white/50 mb-5 hidden sm:block"
          style={{ fontSize: 'clamp(11px,1.4vw,13px)' }}
          variants={fadeUp}
        >
          <Typewriter
            words={['Senior Front-End Engineer', 'Creative Developer', 'UI/UX Specialist']}
            duration={80}
            className="text-white/50"
          />
        </motion.p>

        {/* ── Headline ── */}
        <motion.div
          className="mb-[clamp(18px,4vw,32px)] w-full"
          style={{ perspective: '900px' }}
          variants={titleVariants}
        >
          <h1
            className="hero-headline font-instrument font-normal leading-[1.0] tracking-[-0.025em] text-white text-center"
            aria-label="Craft digital experiences that inspire"
          >
            {/* FIX: removed broken pl-[] offsets; natural center alignment */}
            <span className="block">Craft digital</span>
            <span className="block">experiences that</span>
            <span className="block mt-1">
              <WordRotate
                words={['inspire', 'engage', 'transform', 'captivate']}
                duration={2500}
                className="grad-text inline-block font-instrument italic"
              />
            </span>
          </h1>
        </motion.div>

        {/* ── Subline ── */}
        <motion.p
          className="font-dm font-light leading-[1.65] text-white/50 max-w-[46ch] mb-[clamp(32px,5vw,52px)] tracking-[0.005em] text-center"
          style={{ fontSize: 'clamp(15px,1.8vw,18px)' }}
          variants={fadeUp}
        >
          I design and engineer premium interfaces — cinematic motion, obsessive detail, and architecture built to scale.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          className="hero-ctas flex flex-wrap justify-center items-center gap-3 mb-[clamp(40px,7vw,72px)] w-full"
          variants={fadeUp}
        >
          {/* Primary */}
          <motion.button
            className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-0 outline-none cursor-pointer font-dm text-sm font-medium tracking-[0.03em] text-[#0b1220] overflow-hidden whitespace-nowrap btn-shine"
            style={{
              background: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)',
              boxShadow:
                '0 0 0 1px rgba(96,165,250,0.3), 0 4px 24px rgba(59,130,246,0.30), 0 1px 0 rgba(255,255,255,0.25) inset',
            }}
            variants={btnPrimary}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            transition={SPRING}
            aria-label="View my work"
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <motion.span
              className="relative z-[1]"
              variants={{ hover: { x: -2 }, rest: { x: 0 } }}
              transition={SPRING}
            >
              View my work
            </motion.span>
            <motion.span
              className="relative z-[1]"
              variants={{ hover: { x: 5 }, rest: { x: 0 } }}
              transition={SPRING}
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.button>

          {/* Ghost */}
          <motion.button
            className="relative inline-flex items-center gap-2 px-[30px] py-[13px] rounded-full outline-none cursor-pointer font-dm text-sm font-normal tracking-[0.02em] text-white/50 whitespace-nowrap backdrop-blur-xl"
            style={{
              border: '1px solid rgba(96,165,250,0.22)',
              background: 'rgba(255,255,255,0.035)',
            }}
            variants={btnGhost}
            initial="rest"
            whileHover={{
              scale: 1.03,
              borderColor: 'rgba(96,165,250,0.45)',
              color: 'rgba(239,246,255,1)',
              background: 'rgba(96,165,250,0.06)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
            aria-label="Download resume"
          >
            <span className="relative z-[1]">Download CV</span>
          </motion.button>
        </motion.div>

        {/* ── Meta stats ── */}
        <motion.div
          className="hero-meta flex flex-wrap justify-center gap-x-8 gap-y-5 items-start w-full"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {[
            { value: 6, suffix: '+', label: 'Years experience', delay: 0 },
            null,
            { value: 40, suffix: '+', label: 'Products shipped', delay: 0.2 },
            null,
            { value: 99, suffix: '%', label: 'Client satisfaction', delay: 0.4 },
            null,
            { value: 15, suffix: '+', label: 'Global clients', delay: 0.6 },
          ].map((item, i) =>
            item === null ? (
              <motion.div
                key={i}
                className="meta-divider-sm w-px h-8 self-center bg-white/[0.08] hidden sm:block"
                variants={metaItem}
                aria-hidden="true"
              />
            ) : (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-[3px]"
                variants={metaItem}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <span
                  className="font-instrument font-normal leading-none tracking-[-0.02em] text-white"
                  style={{ fontSize: 'clamp(22px,3vw,30px)' }}
                >
                  <NumberTicker
                    value={item.value}
                    delay={item.delay}
                    className="text-white"
                  />
                  <span className="grad-text-sm">{item.suffix}</span>
                </span>
                <span className="font-dm text-[11px] font-normal tracking-[0.1em] uppercase text-white/30 text-center">
                  {item.label}
                </span>
              </motion.div>
            )
          )}
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════
          SCROLL INDICATOR
      ══════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-[clamp(28px,4vw,44px)] left-1/2 -translate-x-1/2 z-[12] flex flex-col items-center gap-2"
        variants={scrollVariants}
        initial="initial"
        animate={loaded ? 'animate' : 'initial'}
        aria-hidden="true"
      >
        {/* Pulsing "Scroll" label */}
        <motion.span
          className="font-dm text-[10px] tracking-[0.18em] uppercase text-white/30"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        >
          Scroll
        </motion.span>

        {/* Track + animated line */}
        <div className="w-px h-11 bg-white/[0.08] rounded-sm overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 right-0 h-full rounded-sm"
            style={{ background: 'linear-gradient(180deg, #60a5fa, transparent)' }}
            animate={{ y: ['-100%', '200%'], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.2,
              ease: 'easeInOut',
              repeat: Infinity,
              times: [0, 0.2, 0.8, 1],
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}