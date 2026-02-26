/**
 * experienceAnimation.js
 * Cinematic experience timeline — 2026 portfolio grade
 * Scroll-driven progress line · staggered reveals · spotlight pin · depth parallax
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────
   EASING
───────────────────────────────────────────────────────────────────*/
const EASE = {
  cinematic : 'cubic-bezier(0.16, 1, 0.3, 1)',
  reveal    : 'cubic-bezier(0.22, 1, 0.36, 1)',
  out       : 'power3.out',
  inOut     : 'power2.inOut',
  none      : 'none',
}

/* ─────────────────────────────────────────────────────────────────
   WORD SPLIT
───────────────────────────────────────────────────────────────────*/
function splitWords(el) {
  if (!el || el.dataset.split === 'done') return []
  const text = el.textContent.trim()
  el.setAttribute('aria-label', text)
  el.textContent = ''
  el.dataset.split = 'done'

  return text.split(' ').map((word, i, arr) => {
    const outer = document.createElement('span')
    outer.style.cssText =
      'display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.05em;'
    const inner = document.createElement('span')
    inner.textContent = word
    inner.style.cssText = 'display:inline-block;will-change:transform,opacity;'
    outer.appendChild(inner)
    el.appendChild(outer)
    if (i < arr.length - 1) {
      const sp = document.createElement('span')
      sp.innerHTML = '&nbsp;'
      sp.style.display = 'inline-block'
      el.appendChild(sp)
    }
    return inner
  })
}

/* ─────────────────────────────────────────────────────────────────
   1. SECTION ENTRY
───────────────────────────────────────────────────────────────────*/
function initSectionEntry(scope) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return () => {}

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger : scope,
      start   : 'top 88%',
      end     : 'top 40%',
      scrub   : 1,
    },
  })
  tl.fromTo(scope, { opacity: 0.08, y: 32 }, { opacity: 1, y: 0, ease: EASE.none })
  return () => tl.scrollTrigger?.kill()
}

/* ─────────────────────────────────────────────────────────────────
   2. HEADER REVEAL (eyebrow + headline)
───────────────────────────────────────────────────────────────────*/
function initHeaderReveal(scope) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const eyebrow  = scope.querySelector('[data-exp="eyebrow"]')
  const headline = scope.querySelector('[data-exp="headline"]')
  const subline  = scope.querySelector('[data-exp="subline"]')

  if (!eyebrow && !headline) return () => {}

  let headWords = []
  let subWords  = []

  if (!reduced) {
    if (eyebrow)  gsap.set(eyebrow,  { y: 14, opacity: 0 })
    if (headline) {
      headWords = splitWords(headline)
      gsap.set(headWords, { yPercent: 110, opacity: 0, rotateX: -22 })
    }
    if (subline) {
      subWords = splitWords(subline)
      gsap.set(subWords, { yPercent: 80, opacity: 0 })
    }
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger : scope,
      start   : 'top 75%',
      toggleActions: 'play none none reverse',
    },
  })

  if (eyebrow) {
    tl.to(eyebrow, { y: 0, opacity: 1, duration: 0.6, ease: EASE.out }, 0)
  }
  if (headWords.length) {
    tl.to(headWords, {
      yPercent : 0,
      opacity  : 1,
      rotateX  : 0,
      duration : 1.2,
      stagger  : { amount: 0.35, ease: 'power2.out' },
      ease     : EASE.cinematic,
    }, 0.15)
  }
  if (subWords.length) {
    tl.to(subWords, {
      yPercent : 0,
      opacity  : 1,
      duration : 0.75,
      stagger  : { amount: 0.2 },
      ease     : EASE.cinematic,
    }, 0.55)
  }

  return () => tl.scrollTrigger?.kill()
}

/* ─────────────────────────────────────────────────────────────────
   3. TIMELINE PROGRESS LINE  (scaleY driven by scroll)
───────────────────────────────────────────────────────────────────*/
function initTimelineLine(scope) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const line    = scope.querySelector('[data-animate="timeline-line"]')
  const dot     = scope.querySelector('[data-exp="timeline-dot"]')

  if (!line) return () => {}

  if (!reduced) {
    gsap.set(line, { scaleY: 0, transformOrigin: 'top center' })
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger : scope,
      start   : 'top 60%',
      end     : 'bottom 85%',
      scrub   : 1.2,
    },
  })

  tl.to(line, { scaleY: 1, ease: EASE.none })

  // Dot tracks line progress
  if (dot) {
    tl.to(dot, { yPercent: 2200, ease: EASE.none }, 0)
  }

  return () => tl.scrollTrigger?.kill()
}

/* ─────────────────────────────────────────────────────────────────
   4. EXPERIENCE ITEM REVEALS  (scroll-triggered per item)
───────────────────────────────────────────────────────────────────*/
function initItemReveals(scope) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const items   = scope.querySelectorAll('[data-animate="experience-item"]')
  const cleanups = []

  items.forEach((item) => {
    const side     = item.dataset.side || 'left'
    const card     = item.querySelector('[data-exp-card]')
    const year     = item.querySelector('[data-exp-year]')
    const dot      = item.querySelector('[data-exp-dot]')
    const titleEl  = item.querySelector('[data-exp-title]')
    const bodyEl   = item.querySelector('[data-exp-body]')
    const tagsEl   = item.querySelectorAll('[data-exp-tag]')
    const iconEl   = item.querySelector('[data-exp-icon]')

    if (!reduced) {
      const fromX = side === 'left' ? -48 : 48
      if (card)   gsap.set(card,   { x: fromX, opacity: 0, rotateX: 6, scale: 0.96 })
      if (year)   gsap.set(year,   { x: side === 'left' ? 30 : -30, opacity: 0 })
      if (dot)    gsap.set(dot,    { scale: 0, opacity: 0 })
      if (iconEl) gsap.set(iconEl, { scale: 0.7, opacity: 0, rotate: -15 })
      if (titleEl) {
        const words = splitWords(titleEl)
        gsap.set(words, { yPercent: 100, opacity: 0 })
        titleEl._words = words
      }
      if (bodyEl) gsap.set(bodyEl, { y: 14, opacity: 0 })
      if (tagsEl.length) gsap.set(tagsEl, { y: 10, opacity: 0 })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger      : item,
        start        : 'top 82%',
        end          : 'top 30%',
        toggleActions: 'play none none reverse',
      },
    })

    if (dot) {
      tl.to(dot, {
        scale    : 1,
        opacity  : 1,
        duration : 0.5,
        ease     : EASE.reveal,
      }, 0)
    }
    if (card) {
      tl.to(card, {
        x        : 0,
        opacity  : 1,
        rotateX  : 0,
        scale    : 1,
        duration : 0.85,
        ease     : EASE.cinematic,
      }, 0.05)
    }
    if (year) {
      tl.to(year, {
        x        : 0,
        opacity  : 1,
        duration : 0.7,
        ease     : EASE.cinematic,
      }, 0.1)
    }
    if (iconEl) {
      tl.to(iconEl, {
        scale    : 1,
        opacity  : 1,
        rotate   : 0,
        duration : 0.55,
        ease     : EASE.reveal,
      }, 0.15)
    }
    if (titleEl?._words?.length) {
      tl.to(titleEl._words, {
        yPercent : 0,
        opacity  : 1,
        duration : 0.65,
        stagger  : { amount: 0.2 },
        ease     : EASE.cinematic,
      }, 0.2)
    }
    if (bodyEl) {
      tl.to(bodyEl, {
        y        : 0,
        opacity  : 1,
        duration : 0.6,
        ease     : EASE.cinematic,
      }, 0.4)
    }
    if (tagsEl.length) {
      tl.to(tagsEl, {
        y        : 0,
        opacity  : 1,
        duration : 0.45,
        stagger  : 0.06,
        ease     : EASE.out,
      }, 0.52)
    }

    cleanups.push(() => tl.scrollTrigger?.kill())
  })

  return () => cleanups.forEach(fn => fn())
}

/* ─────────────────────────────────────────────────────────────────
   5. YEAR WATERMARK PARALLAX
───────────────────────────────────────────────────────────────────*/
function initYearWatermarks(scope) {
  const reduced   = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return () => {}

  const watermarks = scope.querySelectorAll('[data-exp-watermark]')
  const cleanups = []

  watermarks.forEach((el) => {
    const trig = ScrollTrigger.create({
      trigger  : el,
      start    : 'top bottom',
      end      : 'bottom top',
      scrub    : 1.4,
      onUpdate : (self) => {
        const y = (self.progress - 0.5) * -70
        gsap.set(el, { y, force3D: true })
      },
    })
    cleanups.push(() => trig.kill())
  })

  return () => cleanups.forEach(fn => fn())
}

/* ─────────────────────────────────────────────────────────────────
   6. MID-SECTION SPOTLIGHT PIN
───────────────────────────────────────────────────────────────────*/
function initSpotlightPin(scope) {
  const reduced   = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return () => {}

  const spotlight  = scope.querySelector('[data-exp="spotlight"]')
  const allItems   = Array.from(scope.querySelectorAll('[data-animate="experience-item"]'))
  const focusIndex = Math.floor(allItems.length / 2)
  const focusItem  = allItems[focusIndex]

  if (!spotlight || !focusItem) return () => {}

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger : spotlight,
      start   : 'top 55%',
      end     : 'bottom 45%',
      scrub   : 1,
    },
  })

  // Dim others
  const others = allItems.filter((_, i) => i !== focusIndex)
  tl.to(others, { opacity: 0.32, scale: 0.985, duration: 0.5, ease: EASE.none }, 0)
  tl.to(focusItem, { scale: 1.015, duration: 0.5, ease: EASE.none }, 0)

  // Background glow
  tl.to(spotlight, { opacity: 1, duration: 0.5, ease: EASE.none }, 0)

  // Restore
  tl.to(others,    { opacity: 1, scale: 1, duration: 0.5, ease: EASE.none }, 0.5)
  tl.to(focusItem, { scale: 1, duration: 0.5, ease: EASE.none }, 0.5)
  tl.to(spotlight, { opacity: 0, duration: 0.5, ease: EASE.none }, 0.5)

  return () => tl.scrollTrigger?.kill()
}

/* ─────────────────────────────────────────────────────────────────
   7. DEPTH PARALLAX
───────────────────────────────────────────────────────────────────*/
function initDepthParallax(scope) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return () => {}

  const els      = scope.querySelectorAll('[data-speed]')
  const cleanups = []

  els.forEach((el) => {
    const speed = parseFloat(el.dataset.speed || '1')
    const dir   = speed > 1 ? -1 : 1

    const trig = ScrollTrigger.create({
      trigger  : scope,
      start    : 'top bottom',
      end      : 'bottom top',
      scrub    : true,
      onUpdate : (self) => {
        gsap.set(el, {
          y       : self.progress * 90 * speed * dir,
          force3D : true,
        })
      },
    })
    cleanups.push(() => trig.kill())
  })

  return () => cleanups.forEach(fn => fn())
}

/* ─────────────────────────────────────────────────────────────────
   8. EXIT TRANSITION
───────────────────────────────────────────────────────────────────*/
function initExitTransition(scope) {
  const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return () => {}

  const lastItem = scope.querySelector('[data-exp="last-item"]')
  if (!lastItem) return () => {}

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger : lastItem,
      start   : 'bottom 30%',
      end     : 'bottom top',
      scrub   : 1,
    },
  })

  tl.to(lastItem, { y: -28, opacity: 0, ease: EASE.none })

  return () => tl.scrollTrigger?.kill()
}

/* ─────────────────────────────────────────────────────────────────
   PUBLIC API
───────────────────────────────────────────────────────────────────*/
export function initExperienceAnimation({ scope, lenis = null }) {
  if (!scope) return () => {}

  const ctx = gsap.context(() => {}, scope)

  const cleanEntry    = initSectionEntry(scope)
  const cleanHeader   = initHeaderReveal(scope)
  const cleanLine     = initTimelineLine(scope)
  const cleanItems    = initItemReveals(scope)
  const cleanYear     = initYearWatermarks(scope)
  const cleanSpot     = initSpotlightPin(scope)
  const cleanDepth    = initDepthParallax(scope)
  const cleanExit     = initExitTransition(scope)

  return () => {
    cleanEntry()
    cleanHeader()
    cleanLine()
    cleanItems()
    cleanYear()
    cleanSpot()
    cleanDepth()
    cleanExit()
    ctx.revert()
  }
}