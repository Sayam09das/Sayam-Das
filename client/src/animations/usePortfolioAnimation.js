import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function usePortfolioAnimation({ sectionRef, cardsRef, imagesRef, items }) {
  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)
      const images = imagesRef.current.filter(Boolean)

      gsap.fromTo(
        cards,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.8 : 1.2,
          stagger: isMobile ? 0.12 : 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      if (!isMobile && !reduceMotion) {
        const amount = isTablet ? 34 : 50
        gsap.fromTo(
          images,
          { y: -amount },
          {
            y: amount,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [cardsRef, imagesRef, items, sectionRef])
}
