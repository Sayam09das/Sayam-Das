import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useSkillsAnimation({ sectionRef, headingRef, cardRefs, barRefs, countRefs, bgRef }) {
  useEffect(() => {
    if (!sectionRef.current) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    const ctx = gsap.context(() => {
      const cards = (cardRefs.current || []).filter(Boolean)
      const bars = (barRefs.current || []).filter(Boolean)
      const counts = (countRefs.current || []).filter(Boolean)

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0.5 : 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0.55 : 0.9,
          stagger: reduceMotion ? 0.08 : 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      bars.forEach((bar, index) => {
        const target = Number(bar.dataset.progress || 0)
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: target / 100,
            duration: reduceMotion ? 0.8 : 1.5,
            ease: 'power3.out',
            delay: index * 0.08,
            scrollTrigger: {
              trigger: bar,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      counts.forEach((countNode) => {
        const target = Number(countNode.dataset.count || 0)
        const obj = { value: 0 }
        gsap.to(obj, {
          value: target,
          duration: reduceMotion ? 0.6 : 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: countNode,
            start: 'top 90%',
            once: true,
          },
          onUpdate: () => {
            countNode.textContent = `${Math.round(obj.value)}%`
          },
        })
      })

      if (!isMobile && !reduceMotion && bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [bgRef, barRefs, cardRefs, countRefs, headingRef, sectionRef])
}
