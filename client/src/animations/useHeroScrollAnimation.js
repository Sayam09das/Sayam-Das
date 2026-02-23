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

    const ctx = gsap.context(() => {
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
