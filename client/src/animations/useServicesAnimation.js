import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useServicesAnimation({ sectionRef, cardsRef, bgRef, decorativeRef }) {
  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches

    const ctx = gsap.context(() => {
      const cards = cardsRef.current || []

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.7 : 1,
          stagger: isMobile ? 0.12 : 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        },
      )

      if (!isMobile) {
        gsap.to(cards, {
          y: -28,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom top',
            scrub: true,
          },
        })

        if (bgRef.current) {
          gsap.to(bgRef.current, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        if (decorativeRef.current) {
          gsap.to(decorativeRef.current, {
            y: -40,
            rotation: 24,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (sectionRef.current && trigger.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [bgRef, cardsRef, decorativeRef, sectionRef])
}
