import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  getScrollVelocity,
  prefersReducedMotion,
  resolveScope,
} from './utils'

gsap.registerPlugin(ScrollTrigger)

export const initNavbarScroll = ({ scope, lenis } = {}) => {
  const root = resolveScope(scope)
  if (!root) return () => {}

  const navbar = root.matches?.('[data-navbar]')
    ? root
    : root.querySelector?.('[data-navbar]')
  if (!navbar) return () => {}

  const glass = navbar.querySelector('[data-navbar-glass]')
  const border = navbar.querySelector('[data-navbar-border]')
  const progress = navbar.querySelector('[data-navbar-progress]')
  const magneticLinks = gsap.utils.toArray('[data-magnetic]', navbar)
  const reduced = prefersReducedMotion()
  const cleanups = []

  const ctx = gsap.context(() => {
    gsap.set(navbar, { yPercent: 0, force3D: true })
    if (glass) gsap.set(glass, { autoAlpha: 0 })
    if (border) gsap.set(border, { autoAlpha: 0 })
    if (progress) gsap.set(progress, { scaleX: 0, transformOrigin: '0% 50%' })
  }, navbar)

  const yTo = gsap.quickTo(navbar, 'yPercent', {
    duration: reduced ? 0 : 0.34,
    ease: 'power3.out',
    overwrite: true,
  })

  const glassOpacityTo = glass
    ? gsap.quickTo(glass, 'opacity', {
        duration: reduced ? 0 : 0.24,
        ease: 'power2.out',
        overwrite: true,
      })
    : null

  const borderOpacityTo = border
    ? gsap.quickTo(border, 'opacity', {
        duration: reduced ? 0 : 0.24,
        ease: 'power2.out',
        overwrite: true,
      })
    : null

  let previousY = window.scrollY
  let previousTime = performance.now()
  let hidden = false

  const applyNavbarState = (scrollY, velocity) => {
    const shouldHide = scrollY > 80 && velocity > 0.16
    const shouldShow = scrollY <= 16 || velocity < -0.08

    if (shouldHide && !hidden) {
      yTo(-100)
      hidden = true
    } else if (shouldShow && hidden) {
      yTo(0)
      hidden = false
    }

    const chromeOpacity = scrollY > 80 ? 1 : 0
    if (glassOpacityTo) glassOpacityTo(chromeOpacity)
    if (borderOpacityTo) borderOpacityTo(chromeOpacity)
  }

  if (lenis && typeof lenis.on === 'function') {
    const onLenisScroll = (payload) => {
      const scrollY = payload?.scroll ?? window.scrollY
      const velocity = payload?.velocity ?? 0
      applyNavbarState(scrollY, velocity)
    }
    lenis.on('scroll', onLenisScroll)
    cleanups.push(() => lenis.off('scroll', onLenisScroll))
  } else {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const currentY = window.scrollY
        const currentTime = performance.now()
        const velocity = getScrollVelocity({
          currentY,
          previousY,
          currentTime,
          previousTime,
        })
        applyNavbarState(currentY, velocity)
        previousY = currentY
        previousTime = currentTime
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    cleanups.push(() => window.removeEventListener('scroll', onScroll))
    onScroll()
  }

  if (progress) {
    const setScale = gsap.quickSetter(progress, 'scaleX')
    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setScale(reduced ? (self.progress > 0 ? 1 : 0) : self.progress)
      },
    })
    cleanups.push(() => progressTrigger.kill())
  }

  if (!reduced) {
    magneticLinks.forEach((link) => {
      const textTarget = link.querySelector('[data-magnetic-text]') || link
      link.style.willChange = 'transform'
      textTarget.style.willChange = 'transform'

      const xTo = gsap.quickTo(link, 'x', {
        duration: 0.28,
        ease: 'power3.out',
      })
      const yToLink = gsap.quickTo(link, 'y', {
        duration: 0.28,
        ease: 'power3.out',
      })
      const xToText = gsap.quickTo(textTarget, 'x', {
        duration: 0.3,
        ease: 'power3.out',
      })
      const yToText = gsap.quickTo(textTarget, 'y', {
        duration: 0.3,
        ease: 'power3.out',
      })

      const onPointerMove = (event) => {
        const rect = link.getBoundingClientRect()
        const dx = event.clientX - rect.left - rect.width / 2
        const dy = event.clientY - rect.top - rect.height / 2
        xTo(dx * 0.15)
        yToLink(dy * 0.2)
        xToText(dx * -0.07)
        yToText(dy * -0.07)
      }

      const reset = () => {
        gsap.to([link, textTarget], {
          x: 0,
          y: 0,
          duration: 0.34,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      link.addEventListener('pointermove', onPointerMove, { passive: true })
      link.addEventListener('pointerleave', reset, { passive: true })
      link.addEventListener('pointercancel', reset, { passive: true })

      cleanups.push(() => {
        link.removeEventListener('pointermove', onPointerMove)
        link.removeEventListener('pointerleave', reset)
        link.removeEventListener('pointercancel', reset)
        link.style.willChange = ''
        textTarget.style.willChange = ''
        gsap.set([link, textTarget], { x: 0, y: 0 })
      })
    })
  }

  return () => {
    cleanups.forEach((cleanup) => cleanup())
    gsap.set(navbar, { yPercent: 0 })
    ctx.revert()
  }
}
