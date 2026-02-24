import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useHeroScrollAnimation({
  sectionRef,
  bgRef,
  contentRef,
  portraitRef,
  badgeRef,
}) {
  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    const ctx = gsap.context(() => {
      if (reduceMotion || isMobile) {
        gsap.fromTo(
          [contentRef.current, portraitRef.current],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
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

      const triggerConfig = {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom top',
        scrub: true,
      }

      gsap.fromTo(
        sectionRef.current,
        { opacity: 0.96 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: triggerConfig,
        },
      )

      gsap.to(contentRef.current, {
        yPercent: -10,
        ease: 'none',
        willChange: 'transform',
        scrollTrigger: triggerConfig,
      })

      gsap.to(portraitRef.current, {
        yPercent: -15,
        ease: 'none',
        willChange: 'transform',
        scrollTrigger: triggerConfig,
      })

      gsap.to(bgRef.current, {
        yPercent: 12,
        ease: 'none',
        willChange: 'transform',
        scrollTrigger: triggerConfig,
      })

      gsap.to(badgeRef.current, {
        rotate: 80,
        ease: 'none',
        willChange: 'transform',
        scrollTrigger: triggerConfig,
      })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [badgeRef, bgRef, contentRef, portraitRef, sectionRef])
}
