import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useLenis({ paused = false } = {}) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    if (reducedMotion || isMobile) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis
    window.__lenisInstance = lenis

    const onScroll = () => {
      ScrollTrigger.update()
    }

    lenis.on('scroll', onScroll)

    let frameId = 0
    const raf = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }

    frameId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.off('scroll', onScroll)
      lenis.destroy()
      lenisRef.current = null
      window.__lenisInstance = null
    }
  }, [])

  useEffect(() => {
    if (!lenisRef.current) return
    if (paused) {
      lenisRef.current.stop()
      return
    }
    lenisRef.current.start()
  }, [paused])

  return lenisRef
}
