import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initHorizontalScroll } from './horizontalScroll'
import { initMagneticButtons } from './magneticButtons'
import { initNavbarScroll } from './navbarScroll'
import { initPageTransitions } from './pageTransitions'
import { initParallax } from './parallax'
import { initScrollProgress } from './scrollProgress'
import { initScrollTrigger } from './scrollTrigger'
import { initSectionReveal } from './sectionReveal'
import { initSmoothScroll } from './smoothScroll'
import { initTextSplit } from './textSplit'
import { isBrowser } from './utils'

export const initAnimations = ({ scope, smoothOptions } = {}) => {
  if (!isBrowser) {
    return {
      lenis: null,
      pageTransitions: null,
      cleanup: () => {},
    }
  }

  const cleanups = []
  const smooth = initSmoothScroll(smoothOptions)
  cleanups.push(smooth.destroy)

  const cleanupScrollTrigger = initScrollTrigger({ lenis: smooth.lenis })
  cleanups.push(cleanupScrollTrigger)

  cleanups.push(initSectionReveal({ scope }))
  cleanups.push(initTextSplit({ scope }))
  cleanups.push(initParallax({ scope }))
  cleanups.push(initHorizontalScroll({ scope }))
  cleanups.push(initMagneticButtons({ scope }))
  cleanups.push(initNavbarScroll({ scope }))
  cleanups.push(initScrollProgress())

  const pageTransitions = initPageTransitions()
  cleanups.push(pageTransitions.cleanup)

  const cleanup = () => {
    cleanups.reverse().forEach((dispose) => {
      if (typeof dispose === 'function') dispose()
    })
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }

  return {
    lenis: smooth.lenis,
    pageTransitions,
    cleanup,
  }
}

export {
  initSmoothScroll,
  initScrollTrigger,
  initSectionReveal,
  initTextSplit,
  initParallax,
  initHorizontalScroll,
  initMagneticButtons,
  initNavbarScroll,
  initScrollProgress,
  initPageTransitions,
}
