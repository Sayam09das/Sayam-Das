import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useHorizontalScroll({ sectionRef, trackRef, panelRefs }) {
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    const ctx = gsap.context(() => {
      const panels = (panelRefs.current || []).filter(Boolean)

      if (isMobile || prefersReducedMotion) {
        gsap.fromTo(
          panels,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        )
        return
      }

      const getDistance = () => trackRef.current.scrollWidth - window.innerWidth

      const horizontalTween = gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3000',
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0.72, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: 'left center',
              end: 'right center',
              scrub: true,
            },
          },
        )
      })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [panelRefs, sectionRef, trackRef])
}
