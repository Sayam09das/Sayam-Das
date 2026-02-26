import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  EASE,
  MOTION,
  applyWillChange,
  clearWillChange,
  prefersReducedMotion,
  resolveScope,
  isBrowser,
} from './utils'

export const initHeroAnimation = ({ scope, lenis } = {}) => {
  if (!isBrowser) {
    return () => {}
  }

  const root = resolveScope(scope)
  if (!root) return () => {}

  const reduced = prefersReducedMotion()
  const ctx = gsap.context(() => {
    // ── Parallax for background layer ────────────────────────
    const bgElement = root.querySelector('[data-animate="hero-bg"]')
    if (bgElement) {
      const bgSpeed = parseFloat(bgElement.dataset.speed) || 0.4
      
      if (!reduced) {
        gsap.to(bgElement, {
          yPercent: -30 * bgSpeed,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }

    // ── Parallax for orbs ────────────────────────────────────
    const orbs = root.querySelectorAll('[data-orb]')
    orbs.forEach((orb, i) => {
      const speed = 0.15 + (i * 0.1)
      if (!reduced) {
        gsap.to(orb, {
          y: -80 * (i + 1),
          x: i === 0 ? 40 : i === 1 ? -30 : 20,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    })

    // ── Parallax for floating card ───────────────────────────
    const floatCard = root.querySelector('.hero-float-card')
    if (floatCard) {
      const floatSpeed = parseFloat(floatCard.dataset.speed) || 0.8
      if (!reduced) {
        gsap.to(floatCard, {
          y: -100 * floatSpeed,
          x: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }
    }

    // ── Parallax for corner number ───────────────────────────
    const corner = root.querySelector('.hero-corner')
    if (corner) {
      const cornerSpeed = parseFloat(corner.dataset.speed) || 1.2
      if (!reduced) {
        gsap.to(corner, {
          y: -150 * cornerSpeed,
          x: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }

    // ── Cinematic overlay fade ───────────────────────────────
    const overlay = root.querySelector('[data-animate="overlay"]')
    if (overlay && !reduced) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 1.2,
        ease: EASE.cinematic,
        delay: 0.3,
      })
    }

    // ── Scanline animation ───────────────────────────────────
    const scanline = root.querySelector('.hero-scanline')
    if (scanline && !reduced) {
      // Already has CSS animation, just ensure it's visible
      gsap.set(scanline, { opacity: 1 })
    }

    // ── Badge animation ──────────────────────────────────────
    const badge = root.querySelector('[data-animate="hero-badge"]')
    if (badge) {
      if (reduced) {
        gsap.set(badge, { opacity: 1, y: 0 })
      } else {
        gsap.fromTo(
          badge,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.base,
            ease: EASE.confident,
            delay: 0.4,
          }
        )
      }
    }

    // ── Eyebrow animation ────────────────────────────────────
    const eyebrow = root.querySelector('[data-animate="hero-eyebrow"]')
    if (eyebrow) {
      if (reduced) {
        gsap.set(eyebrow, { opacity: 1, y: 0 })
      } else {
        gsap.fromTo(
          eyebrow,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.base,
            ease: EASE.smooth,
            delay: 0.5,
          }
        )
      }
    }

    // ── Title animation ──────────────────────────────────────
    const title = root.querySelector('[data-animate="hero-title"]')
    if (title) {
      if (reduced) {
        gsap.set(title, { opacity: 1, y: 0 })
      } else {
        // Animate the title directly without modifying innerHTML to preserve gradient
        gsap.fromTo(
          title,
          { 
            opacity: 0, 
            y: 60,
            filter: 'blur(8px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: MOTION.slow,
            ease: EASE.cinematic,
            delay: 0.55,
            onComplete: () => clearWillChange(title),
          }
        )
      }
    }

    // ── Subtitle animation ───────────────────────────────────
    const sub = root.querySelector('[data-animate="hero-sub"]')
    if (sub) {
      if (reduced) {
        gsap.set(sub, { opacity: 1, y: 0 })
      } else {
        gsap.fromTo(
          sub,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.base,
            ease: EASE.smooth,
            delay: 0.75,
          }
        )
      }
    }

    // ── CTAs animation ────────────────────────────────────────
    const ctas = root.querySelector('[data-animate="hero-ctas"]')
    if (ctas) {
      const buttons = ctas.querySelectorAll('button')
      if (reduced) {
        gsap.set(buttons, { opacity: 1, y: 0 })
      } else {
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.base,
            ease: EASE.confident,
            stagger: 0.1,
            delay: 0.9,
          }
        )
      }
    }

    // ── Meta stats animation ──────────────────────────────────
    const meta = root.querySelector('[data-animate="hero-meta"]')
    if (meta) {
      const metaItems = meta.querySelectorAll('.meta-item, .meta-divider')
      if (reduced) {
        gsap.set(metaItems, { opacity: 1, y: 0 })
      } else {
        gsap.fromTo(
          metaItems,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.base,
            ease: EASE.smooth,
            stagger: 0.08,
            delay: 1.05,
          }
        )
      }
    }

    // ── Scroll indicator animation ───────────────────────────
    const scrollIndicator = root.querySelector('[data-animate="scroll-indicator"]')
const scrollLine = root.querySelector('[data-indicator-line]')
    if (scrollIndicator) {
      if (reduced) {
        gsap.set(scrollIndicator, { opacity: 1 })
      } else {
        gsap.fromTo(
          scrollIndicator,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.base,
            ease: EASE.smooth,
            delay: 1.3,
          }
        )
      }

      // Animate scroll line
      if (scrollLine && !reduced) {
        gsap.fromTo(
          scrollLine,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            duration: 1.8,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.5,
          }
        )
      }
    }
  }, root)

  return () => {
    ctx.revert()
  }
}

