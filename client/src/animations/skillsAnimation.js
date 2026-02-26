/**
 * skillsAnimation.js
 * Premium scroll-reactive skills animation — 2026
 * Pinned reveal · 3D tilt · depth parallax · spotlight focus
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────
   EASING
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
function splitWords(el) {
    const text = el.textContent.trim()
    el.setAttribute('aria-label', text)
    el.textContent = ''

    return text.split(' ').map((word, i, arr) => {
        const outer = document.createElement('span')
        outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.05em;'
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
   3D CARD TILT
───────────────────────────────────────────────────────────────────*/
function initCardTilt(scope) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return () => { }

    const cards = scope.querySelectorAll('[data-animate="skill-card"]')
    const cleanups = []

    cards.forEach((card) => {
        const inner = card.querySelector('[data-card-inner]') || card
        const glare = card.querySelector('[data-card-glare]')

        const rxTo = gsap.quickTo(inner, 'rotateX', { duration: 0.5, ease: EASE.cinematic })
        const ryTo = gsap.quickTo(inner, 'rotateY', { duration: 0.5, ease: EASE.cinematic })

        const onMove = (e) => {
            const rect = card.getBoundingClientRect()
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2
            const dx = (e.clientX - cx) / (rect.width / 2)
            const dy = (e.clientY - cy) / (rect.height / 2)

            rxTo(-dy * 5)
            ryTo(dx * 5)

            if (glare) {
                const gx = ((e.clientX - rect.left) / rect.width) * 100
                const gy = ((e.clientY - rect.top) / rect.height) * 100
                gsap.set(glare, {
                    background: `radial-gradient(circle at ${gx}% ${gy}%, rgba(96,165,250,0.10) 0%, transparent 65%)`,
                })
            }
        }

        const onLeave = () => {
            rxTo(0)
            ryTo(0)
            if (glare) gsap.to(glare, { opacity: 0, duration: 0.4 })
        }

        const onEnter = () => {
            if (glare) gsap.to(glare, { opacity: 1, duration: 0.3 })
        }

        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        card.addEventListener('mouseenter', onEnter)

        cleanups.push(() => {
            card.removeEventListener('mousemove', onMove)
            card.removeEventListener('mouseleave', onLeave)
            card.removeEventListener('mouseenter', onEnter)
        })
    })

    return () => cleanups.forEach(fn => fn())
}

/* ─────────────────────────────────────────────────────────────────
   DEPTH PARALLAX  (data-depth)
───────────────────────────────────────────────────────────────────*/
function initDepthParallax(scope) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return () => { }

    const els = scope.querySelectorAll('[data-depth]')
    const triggers = []

    els.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || '1')
        const dir = depth > 1 ? -1 : 1

        const trig = ScrollTrigger.create({
            trigger: scope,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
                const offset = self.progress * 60 * depth * dir
                gsap.set(el, { y: offset, force3D: true })
            },
        })
        triggers.push(trig)
    })

    return () => triggers.forEach(t => t.kill())
}

/* ─────────────────────────────────────────────────────────────────
   BG TEXT PARALLAX
───────────────────────────────────────────────────────────────────*/
function initBgTextParallax(scope) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return () => { }

    const bgTexts = scope.querySelectorAll('[data-bg-text]')
    const triggers = []

    bgTexts.forEach((el, i) => {
        const dir = i % 2 === 0 ? -1 : 1

        const trig = ScrollTrigger.create({
            trigger: scope,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
            onUpdate: (self) => {
                gsap.set(el, {
                    x: self.progress * 120 * dir,
                    opacity: 0.04 + self.progress * 0.04,
                    force3D: true,
                })
            },
        })
        triggers.push(trig)
    })

    return () => triggers.forEach(t => t.kill())
}

/* ─────────────────────────────────────────────────────────────────
   PINNED SCROLL — CARD REVEAL + SPOTLIGHT FOCUS
───────────────────────────────────────────────────────────────────*/
function initPinnedReveal(scope) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sticky = scope.querySelector('[data-skills="sticky"]')
    const headline = scope.querySelector('[data-skills="headline"]')
    const eyebrow = scope.querySelector('[data-skills="eyebrow"]')
    const cards = Array.from(scope.querySelectorAll('[data-animate="skill-card"]'))
    const bgLine = scope.querySelector('[data-skills="bg-line"]')
    const counter = scope.querySelector('[data-skills="counter"]')

    if (!sticky || !cards.length) return () => { }

    /* ── Initial states ── */
    if (!reduced) {
        // Headline words
        let headWords = []
        if (headline) {
            headWords = splitWords(headline)
            gsap.set(headWords, { yPercent: 108, opacity: 0 })
        }
        if (eyebrow) gsap.set(eyebrow, { y: 12, opacity: 0 })

        // Cards — fan out from different directions
        cards.forEach((card, i) => {
            const col = i % 3
            const fromX = col === 0 ? -40 : col === 2 ? 40 : 0
            const fromY = 70 + (i % 2) * 20
            gsap.set(card, {
                y: fromY,
                x: fromX,
                opacity: 0,
                scale: 0.92,
                rotateX: 8,
            })
        })

        if (bgLine) gsap.set(bgLine, { scaleX: 0, transformOrigin: 'left center' })
    }

    /* ── Master timeline ── */
    const master = gsap.timeline({ paused: true })

    // Eyebrow
    if (eyebrow) {
        master.to(eyebrow, { y: 0, opacity: 1, duration: 0.06, ease: EASE.out }, 0)
    }

    // Headline
    if (headline) {
        const words = Array.from(headline.querySelectorAll('span > span'))
        if (words.length) {
            master.to(words, {
                yPercent: 0,
                opacity: 1,
                duration: 0.18,
                stagger: { amount: 0.09 },
                ease: EASE.out,
            }, 0.04)
        }
    }

    // BG line
    if (bgLine) {
        master.to(bgLine, { scaleX: 1, duration: 0.3, ease: EASE.none }, 0)
    }

    // Cards stagger in  (0.12 → 0.62)
    master.to(cards, {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 0.22,
        stagger: { amount: 0.28, ease: 'power2.out' },
        ease: EASE.cinematic,
    }, 0.12)

    // Spotlight: focus card[0] at 0.55, card[1] at 0.72, card[2] at 0.88
    const focusGroups = [
        cards.slice(0, 2),
        cards.slice(2, 4),
        cards.slice(4, 6),
    ]

    const unfocusOpacity = 0.35

    focusGroups.forEach((group, gi) => {
        const start = 0.55 + gi * 0.15
        const others = cards.filter(c => !group.includes(c))

        master.to(others, { opacity: unfocusOpacity, scale: 0.97, duration: 0.08, ease: EASE.none }, start)
        master.to(group, { opacity: 1, scale: 1.02, duration: 0.08, ease: EASE.none }, start)

        // return to normal
        if (gi < focusGroups.length - 1) {
            const reset = start + 0.12
            master.to(cards, { opacity: 1, scale: 1, duration: 0.06, ease: EASE.none }, reset)
        }
    })

    // Horizontal micro-shift via scroll progress
    const onScrollUpdate = (self) => {
        if (reduced) return
        cards.forEach((card, i) => {
            const dir = i % 2 === 0 ? 1 : -1
            const shift = Math.sin(self.progress * Math.PI) * 8 * dir
            gsap.set(card, { x: shift, force3D: true })
        })
        if (counter) {
            counter.textContent = '0' + Math.min(9, Math.max(1, Math.ceil(self.progress * 9)))
        }
    }

    // Exit — cards drift down + fade
    master.to(cards, {
        y: 30,
        opacity: 0,
        scale: 0.96,
        duration: 0.15,
        stagger: { amount: 0.1 },
        ease: EASE.none,
    }, 0.95)

    if (eyebrow) master.to(eyebrow, { y: -16, opacity: 0, duration: 0.1 }, 0.95)
    if (headline) {
        master.to(headline, { y: -24, opacity: 0, duration: 0.1 }, 0.92)
    }

    /* ── Pin ── */
    const pin = ScrollTrigger.create({
        trigger: scope,
        start: 'top top',
        end: '+=260%',
        pin: sticky,
        scrub: 1.6,
        animation: master,
        onUpdate: onScrollUpdate,
    })

    return () => {
        pin.kill()
        master.kill()
    }
}

/* ─────────────────────────────────────────────────────────────────
   SECTION ENTRY
───────────────────────────────────────────────────────────────────*/
function initSectionEntry(scope) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return () => { }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: scope,
            start: 'top 90%',
            end: 'top 45%',
            scrub: 1,
        },
    })
    tl.fromTo(scope, { opacity: 0.15 }, { opacity: 1, ease: EASE.none })

    return () => tl.scrollTrigger?.kill()
}

/* ─────────────────────────────────────────────────────────────────
   PUBLIC API
───────────────────────────────────────────────────────────────────*/
export function initSkillsAnimation({ scope, lenis = null }) {
    if (!scope) return () => { }

    const ctx = gsap.context(() => { }, scope)

    const cleanEntry = initSectionEntry(scope)
    const cleanPinned = initPinnedReveal(scope)
    const cleanTilt = initCardTilt(scope)
    const cleanDepth = initDepthParallax(scope)
    const cleanBgText = initBgTextParallax(scope)

    return () => {
        cleanEntry()
        cleanPinned()
        cleanTilt()
        cleanDepth()
        cleanBgText()
        ctx.revert()
    }
}