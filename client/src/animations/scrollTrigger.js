import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isBrowser } from './utils'

gsap.registerPlugin(ScrollTrigger)

export const initScrollTrigger = ({ lenis } = {}) => {
  if (!isBrowser) {
    return () => {}
  }

  ScrollTrigger.defaults({
    markers: false,
    scrub: false,
    invalidateOnRefresh: true,
  })

  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    ignoreMobileResize: true,
  })

  const handleLenisScroll = () => {
    ScrollTrigger.update()
  }

  if (lenis) {
    lenis.on('scroll', handleLenisScroll)
  }

  let rafId = 0
  const onResize = () => {
    window.cancelAnimationFrame(rafId)
    rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }

  window.addEventListener('resize', onResize, { passive: true })

  return () => {
    if (lenis) {
      lenis.off('scroll', handleLenisScroll)
    }
    window.cancelAnimationFrame(rafId)
    window.removeEventListener('resize', onResize)
  }
}
