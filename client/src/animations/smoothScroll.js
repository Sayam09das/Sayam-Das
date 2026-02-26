import gsap from 'gsap'
import Lenis from 'lenis'
import { isBrowser, prefersReducedMotion } from './utils'

export const initSmoothScroll = (options = {}) => {
  if (!isBrowser || prefersReducedMotion()) {
    return {
      lenis: null,
      destroy: () => {},
    }
  }

  const lenis = new Lenis({
    smoothWheel: true,
    syncTouch: true,
    lerp: 0.1,
    wheelMultiplier: 0.95,
    ...options,
  })

  let rafId = 0
  let tickerTime = performance.now()
  const onTick = (time) => {
    tickerTime = time * 1000
  }
  gsap.ticker.add(onTick)

  const raf = (time) => {
    lenis.raf(tickerTime || time)
    rafId = window.requestAnimationFrame(raf)
  }
  rafId = window.requestAnimationFrame(raf)

  return {
    lenis,
    destroy: () => {
      window.cancelAnimationFrame(rafId)
      gsap.ticker.remove(onTick)
      lenis.destroy()
    },
  }
}
