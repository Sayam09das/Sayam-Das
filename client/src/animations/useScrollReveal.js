import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollReveal({ scopeRef, selector = '[data-reveal]' }) {
  useEffect(() => {
    if (!scopeRef.current) {
      return undefined
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector)
      if (!elements.length) return

      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: reducedMotion ? 0.5 : 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scopeRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, scopeRef)

    return () => {
      ctx.revert()
    }
  }, [scopeRef, selector])
}
