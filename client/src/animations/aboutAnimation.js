/**
 * aboutAnimation.js
 * Cinematic scroll-storytelling animation system — 2026
 * Pinned narrative, parallax depth, phase-driven GSAP timeline
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────
   EASING CONSTANTS
───────────────────────────────────────────────────────────────────*/
const EASE = {
    cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
    reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
    out: 'power3.out',
    inOut: 'power2.inOut',
    none: 'none',
}

/* ─────────────────────────────────────────────────────────────────
   WORD SPLIT
───────────────────────────────────────────────────────────────────*/
function splitWords(element) {
    const original = element.textContent.trim()
    element.setAttribute('aria-label', original)
    element.textContent = ''

    return original.split(' ').map((word, i, arr) => {
        const outer = document.createElement('span')
        outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.06em;'

        const inner = document.createElement('span')
        inner.textContent = word
        inner.style.cssText = 'display:inline-block;will-change:transform,opacity,filter;'
        outer.appendChild(inner)
        element.appendChild(outer)

        if (i < arr.length - 1) {
            const sp = document.createElement('span')
            sp.innerHTML = '&nbsp;'
            sp.style.display = 'inline-block'
            element.appendChild(sp)
        }
        return inner
    })
}

/* ─────────────────────────────────────────────────────────────────
   LINE SPLIT  (for the oversized statement)
───────────────────────────────────────────────────────────────────*/
function splitLines(element) {
    const lines = Array.from(element.querySelectorAll('[data-line]'))
    if (!lines.length) return []
    return lines.map(line => {
        const inner = document.createElement('span')
        inner.style.cssText = 'display:inline-block;will-change:transform,opacity;'
        inner.innerHTML = line.innerHTML
        line.innerHTML = ''
        line.style.cssText = 'display:block;overflow:hidden;'
        line.appendChild(inner)
        return inner
    })
}

/* ─────────────────────────────────────────────────────────────────
   SECTION ENTRY TRANSITION (from Hero)
───────────────────────────────────────────────────────────────────*/
function initSectionEntry(scope) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return () => { }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: scope,
            start: 'top 92%',
            end: 'top 40%',
            scrub: 1,
        },
    })

    tl.fromTo(scope,
        { opacity: 0.2, y: 40 },
        { opacity: 1, y: 0, ease: EASE.none },
        0
    )

    return () => tl.scrollTrigger?.kill()
}

/* ─────────────────────────────────────────────────────────────────
   PINNED SCROLL STORYTELLING — 4-PHASE TIMELINE
───────────────────────────────────────────────────────────────────*/
function initPinnedStorytelling(scope) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const sticky = scope.querySelector('[data-about="sticky"]')
    const phase1 = scope.querySelector('[data-phase="1"]')
    const phase2 = scope.querySelector('[data-phase="2"]')
    const phase3 = scope.querySelector('[data-phase="3"]')
    const phase4 = scope.querySelector('[data-phase="4"]')
    const counter = scope.querySelector('[data-about="counter"]')
    const progressLine = scope.querySelector('[data-about="progress-line"]')
    const bgShift = scope.querySelector('[data-about="bg-shift"]')
    const accentOrb = scope.querySelector('[data-about="accent-orb"]')

    if (!sticky) return () => { }

    // ── Initial states ────────────────────────────────────────────
    const phases = [phase1, phase2, phase3, phase4].filter(Boolean)

    if (!reduced) {
        phases.forEach(p => gsap.set(p, { opacity: 0, y: 0 }))

        if (phase1) {
            const words = splitWords(phase1.querySelector('[data-animate="about-heading"]') || phase1)
            gsap.set(words, { yPercent: 105, opacity: 0, rotateX: -30, filter: 'blur(10px)' })
            phase1._words = words
        }
        if (phase2) {
            const words = splitWords(phase2.querySelector('[data-animate="about-text"]') || phase2)
            gsap.set(words, { yPercent: 80, opacity: 0 })
            phase2._words = words
        }
        if (phase3) {
            const lines = splitLines(phase3)
            gsap.set(lines, { yPercent: 100, opacity: 0 })
            phase3._lines = lines

            const accent = phase3.querySelector('[data-about="accent"]')
            if (accent) gsap.set(accent, { x: -30, opacity: 0 })
            phase3._accent = accent
        }
        if (phase4) {
            const cta = phase4.querySelector('[data-about="cta"]')
            const tag = phase4.querySelector('[data-about="tag"]')
            if (cta) gsap.set(cta, { y: 20, opacity: 0 })
            if (tag) gsap.set(tag, { y: 12, opacity: 0, filter: 'blur(6px)' })
        }
    }

    // ── Main scrub timeline ───────────────────────────────────────
    const master = gsap.timeline({ paused: true })

    // Phase 1 in  (0 → 0.22)
    if (phase1) {
        master.to(phase1, { opacity: 1, duration: 0.04 }, 0)
        if (phase1._words?.length) {
            master.to(phase1._words, {
                yPercent: 0,
                opacity: 1,
                rotateX: 0,
                filter: 'blur(0px)',
                duration: 0.18,
                stagger: { amount: 0.08 },
                ease: EASE.out,
            }, 0.02)
        }
    }

    // Phase 1 out / Phase 2 in  (0.22 → 0.46)
    if (phase1) {
        master.to(phase1, { opacity: 0, y: -20, duration: 0.08, ease: EASE.none }, 0.22)
    }
    if (phase2) {
        master.to(phase2, { opacity: 1, duration: 0.04 }, 0.24)
        if (phase2._words?.length) {
            master.to(phase2._words, {
                yPercent: 0,
                opacity: 1,
                duration: 0.16,
                stagger: { amount: 0.1 },
                ease: EASE.out,
            }, 0.26)
        }
    }

    // Phase 2 out / Phase 3 in  (0.46 → 0.70)
    if (phase2) {
        master.to(phase2, { opacity: 0, y: -20, duration: 0.08, ease: EASE.none }, 0.46)
    }
    if (phase3) {
        master.to(phase3, { opacity: 1, duration: 0.04 }, 0.48)
        if (phase3._lines?.length) {
            master.to(phase3._lines, {
                yPercent: 0,
                opacity: 1,
                duration: 0.16,
                stagger: { amount: 0.08 },
                ease: EASE.out,
            }, 0.50)
        }
        if (phase3._accent) {
            master.to(phase3._accent, {
                x: 0,
                opacity: 1,
                duration: 0.14,
                ease: EASE.cinematic,
            }, 0.56)
        }
    }

    // Phase 3 out / Phase 4 in  (0.70 → 1.0)
    if (phase3) {
        master.to(phase3, { opacity: 0, y: -20, duration: 0.08, ease: EASE.none }, 0.70)
    }
    if (phase4) {
        master.to(phase4, { opacity: 1, duration: 0.04 }, 0.72)
        const cta = phase4.querySelector('[data-about="cta"]')
        const tag = phase4.querySelector('[data-about="tag"]')
        if (cta) master.to(cta, { y: 0, opacity: 1, duration: 0.14, ease: EASE.cinematic }, 0.74)
        if (tag) master.to(tag, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.12, ease: EASE.out }, 0.80)
    }

    // Progress line
    if (progressLine) {
        master.fromTo(progressLine,
            { scaleX: 0 },
            { scaleX: 1, ease: EASE.none, duration: 1 },
            0
        )
    }

    // Counter  01 → 04
    if (counter) {
        master.to(counter, {
            innerHTML: 4,
            snap: { innerHTML: 1 },
            duration: 1,
            ease: EASE.none,
            onUpdate() {
                const n = Math.min(4, Math.max(1, Math.round(this._targets[0].innerHTML)))
                this._targets[0].textContent = '0' + n
            },
        }, 0)
    }

    // Background subtle colour shift
    if (bgShift) {
        master.fromTo(bgShift,
            { opacity: 0 },
            { opacity: 1, ease: EASE.none, duration: 1 },
            0
        )
    }

    // Accent orb drift
    if (accentOrb && !reduced) {
        master.fromTo(accentOrb,
            { x: -80, opacity: 0 },
            { x: 40, opacity: 0.55, ease: EASE.inOut, duration: 1 },
            0
        )
    }

    // ── Pin + scrub ───────────────────────────────────────────────
    const pin = ScrollTrigger.create({
        trigger: scope,
        start: 'top top',
        end: '+=280%',
        pin: sticky,
        scrub: 1.4,
        animation: master,
        onUpdate: (self) => {
            // Subtle parallax on sticky itself
            if (!reduced) {
                gsap.set(sticky, {
                    yPercent: self.progress * 4,
                    force3D: true,
                })
            }
        },
    })

    return () => {
        pin.kill()
        master.kill()
    }
}

/* ─────────────────────────────────────────────────────────────────
   OVERSIZED STATEMENT TEXT SCROLL EFFECT
───────────────────────────────────────────────────────────────────*/
function initStatementText(scope) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return () => { }

    const statement = scope.querySelector('[data-about="statement"]')
    if (!statement) return () => { }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: statement,
            start: 'top 75%',
            end: 'top 15%',
            scrub: 1.2,
        },
    })

    tl.fromTo(statement,
        { letterSpacing: '0.18em', opacity: 0.15, scale: 0.94 },
        { letterSpacing: '0.04em', opacity: 1, scale: 1, ease: EASE.none },
        0
    )

    return () => tl.scrollTrigger?.kill()
}

/* ─────────────────────────────────────────────────────────────────
   IMAGE / VISUAL REVEAL
───────────────────────────────────────────────────────────────────*/
function initImageReveal(scope) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return () => { }

    const images = scope.querySelectorAll('[data-about="image"]')

    const triggers = Array.from(images).map(img => {
        gsap.set(img, {
            scale: 1.08,
            clipPath: 'inset(100% 0% 0% 0%)',
            filter: 'brightness(0.7)',
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: img,
                start: 'top 82%',
                end: 'top 28%',
                scrub: 1,
            },
        })

        tl.to(img, {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            filter: 'brightness(1)',
            ease: EASE.none,
        })

        return tl.scrollTrigger
    })

    return () => triggers.forEach(t => t?.kill())
}

/* ─────────────────────────────────────────────────────────────────
   MULTI-LAYER PARALLAX (speed attributes)
───────────────────────────────────────────────────────────────────*/
function initParallax(scope) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return () => { }

    const layers = scope.querySelectorAll('[data-speed]')
    const triggers = []

    layers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed || '1')
        const dir = layer.dataset.dir === 'down' ? 1 : -1
        const range = window.innerHeight * 0.6 * speed

        const trig = ScrollTrigger.create({
            trigger: scope,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
                gsap.set(layer, {
                    y: self.progress * range * dir,
                    force3D: true,
                })
            },
        })
        triggers.push(trig)
    })

    return () => triggers.forEach(t => t.kill())
}

/* ─────────────────────────────────────────────────────────────────
   PUBLIC API
───────────────────────────────────────────────────────────────────*/
export function initAboutAnimation({ scope, lenis = null }) {
    if (!scope) return () => { }

    const ctx = gsap.context(() => { }, scope)

    const cleanEntry = initSectionEntry(scope)
    const cleanPin = initPinnedStorytelling(scope)
    const cleanStatement = initStatementText(scope)
    const cleanImages = initImageReveal(scope)
    const cleanParallax = initParallax(scope)

    return () => {
        cleanEntry()
        cleanPin()
        cleanStatement()
        cleanImages()
        cleanParallax()
        ctx.revert()
    }
}