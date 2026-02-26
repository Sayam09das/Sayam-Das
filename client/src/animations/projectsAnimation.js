/**
 * projectsAnimation.js
 * Cinematic horizontal scroll projects system — 2026
 * Pinned horizontal pan · panel reveals · magnetic CTAs · depth parallax
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────
   EASING
───────────────────────────────────────────────────────────────────*/
const EASE = {
  cinematic : 'cubic-bezier(0.16, 1, 0.3, 1)',
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
    outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.06em;'
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
   SECTION ENTRY (fade in from hero/about/skills)
───────────────────────────────────────────────────────────────────*/
function initSectionEntry(scope) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return () => {}

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger : scope,
      start   : 'top 88%',
      end     : 'top 42%',
      scrub   : 1,
    },
  })
  tl.fromTo(scope, { opacity: 0.1 }, { opacity: 1, ease: EASE.none })
  return () => tl.scrollTrigger?.kill()
}

/* ─────────────────────────────────────────────────────────────────
   MAGNETIC CTA BUTTONS
───────────────────────────────────────────────────────────────────*/
function initMagneticCTAs(scope) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return () => {}

  const btns = scope.querySelectorAll('[data-magnetic-cta]')
  const cleanups = []

  btns.forEach((btn) => {
    const label = btn.querySelector('[data-mag-label]')
    const xBtn  = gsap.quickTo(btn,   'x', { duration: 0.5, ease: EASE.cinematic })
    const yBtn  = gsap.quickTo(btn,   'y', { duration: 0.5, ease: EASE.cinematic })
    const xLbl  = label ? gsap.quickTo(label, 'x', { duration: 0.4, ease: EASE.cinematic }) : null
    const yLbl  = label ? gsap.quickTo(label, 'y', { duration: 0.4, ease: EASE.cinematic }) : null

    const onMove = (e) => {
      const r = btn.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width  / 2)
      const dy = e.clientY - (r.top  + r.height / 2)
      xBtn(dx * 0.35); yBtn(dy * 0.35)
      if (xLbl) { xLbl(-dx * 0.15); yLbl(-dy * 0.15) }
    }
    const onLeave = () => {
      xBtn(0); yBtn(0)
      if (xLbl) { xLbl(0); yLbl(0) }
      gsap.to(btn, { scale: 1, duration: 0.45, ease: EASE.cinematic })
    }
    const onEnter = () => gsap.to(btn, { scale: 1.06, duration: 0.3, ease: EASE.out })

    btn.addEventListener('mousemove',  onMove)
    btn.addEventListener('mouseleave', onLeave)
    btn.addEventListener('mouseenter', onEnter)
    cleanups.push(() => {
      btn.removeEventListener('mousemove',  onMove)
      btn.removeEventListener('mouseleave', onLeave)
      btn.removeEventListener('mouseenter', onEnter)
    })
  })

  return () => cleanups.forEach(fn => fn())
}

/* ─────────────────────────────────────────────────────────────────
   PER-PANEL IMAGE + TEXT REVEAL  (triggered as panel enters center)
───────────────────────────────────────────────────────────────────*/
function initPanelReveals(panels, trackEl) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cleanups = []

  panels.forEach((panel, i) => {
    const img      = panel.querySelector('[data-proj-img]')
    const textEls  = panel.querySelectorAll('[data-animate="project-text"]')
    const meta     = panel.querySelector('[data-proj-meta]')
    const cta      = panel.querySelector('[data-proj-cta]')
    const counter  = panel.querySelector('[data-proj-counter]')

    if (!reduced) {
      if (img) {
        gsap.set(img, {
          scale    : 1.12,
          clipPath : 'inset(8% 8% 8% 8% round 20px)',
          filter   : 'brightness(0.65) blur(4px)',
        })
      }
      // Split and hide text words
      textEls.forEach(el => {
        const words = splitWords(el)
        gsap.set(words, { yPercent: 100, opacity: 0, rotateX: -18 })
        el._words = words
      })
      if (meta)    gsap.set(meta,    { y: 22, opacity: 0 })
      if (cta)     gsap.set(cta,     { y: 14, opacity: 0, filter: 'blur(4px)' })
      if (counter) gsap.set(counter, { opacity: 0 })
    }

    // ── Per-panel ScrollTrigger using horizontal track as scroller ──
    // We use containerAnimation approach: panels trigger inside the
    // horizontally-moving track
    const revealTl = gsap.timeline({ paused: true })

    if (img) {
      revealTl.to(img, {
        scale    : 1,
        clipPath : 'inset(0% 0% 0% 0% round 20px)',
        filter   : 'brightness(1) blur(0px)',
        duration : 0.7,
        ease     : EASE.cinematic,
      }, 0)
    }

    textEls.forEach((el, ti) => {
      const words = el._words
      if (words?.length) {
        revealTl.to(words, {
          yPercent : 0,
          opacity  : 1,
          rotateX  : 0,
          duration : 0.55,
          stagger  : { amount: 0.22, ease: 'power2.out' },
          ease     : EASE.cinematic,
        }, 0.12 + ti * 0.14)
      }
    })

    if (meta)    revealTl.to(meta,    { y: 0, opacity: 1, duration: 0.45, ease: EASE.cinematic }, 0.35)
    if (cta)     revealTl.to(cta,     { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: EASE.cinematic }, 0.48)
    if (counter) revealTl.to(counter, { opacity: 1, duration: 0.35 }, 0.2)

    panel._revealTl = revealTl
    cleanups.push(() => revealTl.kill())
  })

  return () => cleanups.forEach(fn => fn())
}

/* ─────────────────────────────────────────────────────────────────
   PANEL DEPTH PARALLAX  (data-speed on elements inside each panel)
───────────────────────────────────────────────────────────────────*/
function initPanelDepthParallax(scope) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return () => {}

  // Vertical parallax within each panel as section scrolls
  const els = scope.querySelectorAll('[data-speed]')
  const triggers = []

  els.forEach(el => {
    const speed = parseFloat(el.dataset.speed || '1')
    const dir   = speed > 1 ? -1 : 1

    const trig = ScrollTrigger.create({
      trigger  : scope,
      start    : 'top bottom',
      end      : 'bottom top',
      scrub    : true,
      onUpdate : (self) => {
        gsap.set(el, {
          y       : self.progress * 55 * speed * dir,
          force3D : true,
        })
      },
    })
    triggers.push(trig)
  })

  return () => triggers.forEach(t => t.kill())
}

/* ─────────────────────────────────────────────────────────────────
   ACTIVE PANEL EMPHASIS
───────────────────────────────────────────────────────────────────*/
function setActivePanel(panels, activeIdx, reduced) {
  if (reduced) return
  panels.forEach((panel, i) => {
    const isActive = i === activeIdx
    gsap.to(panel, {
      opacity  : isActive ? 1 : 0.55,
      scale    : isActive ? 1 : 0.97,
      duration : 0.5,
      ease     : EASE.cinematic,
      overwrite: 'auto',
    })
  })

  // Trigger panel reveal timeline
  const active = panels[activeIdx]
  if (active?._revealTl) {
    active._revealTl.play()
  }
}

/* ─────────────────────────────────────────────────────────────────
   MAIN HORIZONTAL SCROLL SYSTEM
───────────────────────────────────────────────────────────────────*/
function initHorizontalScroll(scope) {
  const reduced    = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const sticky     = scope.querySelector('[data-proj="sticky"]')
  const track      = scope.querySelector('[data-proj="track"]')
  const panels     = Array.from(scope.querySelectorAll('[data-proj="panel"]'))
  const progressEl = scope.querySelector('[data-proj="progress"]')
  const headline   = scope.querySelector('[data-proj="headline"]')
  const eyebrow    = scope.querySelector('[data-proj="eyebrow"]')
  const indexEl    = scope.querySelector('[data-proj="index"]')

  if (!sticky || !track || !panels.length) return () => {}

  const panelCount = panels.length

  /* ── Initial states ── */
  if (!reduced) {
    if (headline) {
      const words = splitWords(headline)
      gsap.set(words, { yPercent: 108, opacity: 0 })
    }
    if (eyebrow) gsap.set(eyebrow, { y: 10, opacity: 0 })
  }

  /* ── Panel reveals init ── */
  const cleanReveals = initPanelReveals(panels, track)

  /* ── Calculate horizontal distance ── */
  // Total translateX needed = (n-1) panel widths
  const getTranslateX = () => -(track.scrollWidth - window.innerWidth)

  /* ── Horizontal scroll timeline ── */
  const hTl = gsap.timeline({ paused: true })

  // Header entry
  if (!reduced) {
    if (eyebrow) {
      hTl.to(eyebrow, { y: 0, opacity: 1, duration: 0.05, ease: EASE.out }, 0)
    }
    if (headline) {
      const words = Array.from(headline.querySelectorAll('span > span'))
      if (words.length) {
        hTl.to(words, {
          yPercent : 0,
          opacity  : 1,
          duration : 0.12,
          stagger  : { amount: 0.07 },
          ease     : EASE.out,
        }, 0.02)
      }
    }
  }

  // Horizontal pan — occupies 0.08 → 0.95 of timeline
  hTl.fromTo(
    track,
    { x: 0 },
    {
      x        : () => getTranslateX(),
      ease     : EASE.none,
      duration : 0.87,
    },
    0.08
  )

  // Progress bar
  if (progressEl) {
    hTl.fromTo(progressEl,
      { scaleX: 0 },
      { scaleX: 1, ease: EASE.none, duration: 1 },
      0
    )
  }

  // Exit: last panel fades up + dissolves
  hTl.to(panels[panelCount - 1], {
    opacity  : 0,
    y        : -32,
    duration : 0.06,
    ease     : EASE.none,
  }, 0.94)
  if (progressEl) {
    hTl.to(progressEl.parentElement, {
      opacity  : 0,
      duration : 0.04,
    }, 0.96)
  }

  /* ── Active panel tracking ── */
  let currentActive = -1

  const onUpdate = (self) => {
    const panelProgress = (self.progress - 0.08) / 0.87
    const rawIdx = Math.round(panelProgress * (panelCount - 1))
    const activeIdx = Math.max(0, Math.min(panelCount - 1, rawIdx))

    if (activeIdx !== currentActive) {
      currentActive = activeIdx
      setActivePanel(panels, activeIdx, reduced)

      if (indexEl) {
        indexEl.textContent = String(activeIdx + 1).padStart(2, '0') + ' / ' + String(panelCount).padStart(2, '0')
      }
    }
  }

  /* ── Pin + scrub ── */
  const pin = ScrollTrigger.create({
    trigger   : scope,
    start     : 'top top',
    end       : `+=${window.innerHeight * 3.6}`,
    pin       : sticky,
    scrub     : 1.5,
    animation : hTl,
    onUpdate,
    invalidateOnRefresh: true,
  })

  // Refresh on resize
  const onResize = () => {
    ScrollTrigger.refresh()
  }
  window.addEventListener('resize', onResize, { passive: true })

  return () => {
    pin.kill()
    hTl.kill()
    cleanReveals()
    window.removeEventListener('resize', onResize)
  }
}

/* ─────────────────────────────────────────────────────────────────
   PUBLIC API
───────────────────────────────────────────────────────────────────*/
export function initProjectsAnimation({ scope, lenis = null }) {
  if (!scope) return () => {}

  const ctx = gsap.context(() => {}, scope)

  const cleanEntry      = initSectionEntry(scope)
  const cleanHorizontal = initHorizontalScroll(scope)
  const cleanMagnetic   = initMagneticCTAs(scope)
  const cleanDepth      = initPanelDepthParallax(scope)

  return () => {
    cleanEntry()
    cleanHorizontal()
    cleanMagnetic()
    cleanDepth()
    ctx.revert()
  }
}