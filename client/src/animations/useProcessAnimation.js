import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useProcessAnimation({ sectionRef, horizontalLineRef, verticalLineRef, stepsRef, circlesRef, numbersRef }) {
  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    const ctx = gsap.context(() => {
      const steps = stepsRef.current.filter(Boolean)
      const circles = circlesRef.current.filter(Boolean)
      const numbers = numbersRef.current.filter(Boolean)

      if (isMobile) {
        gsap.fromTo(
          verticalLineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: reduceMotion ? 0.6 : 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      } else {
        gsap.fromTo(
          horizontalLineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: reduceMotion ? 0.7 : 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      }

      gsap.fromTo(
        steps,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0.65 : 1,
          stagger: reduceMotion ? 0.1 : 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(
        circles,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: reduceMotion ? 0.5 : 0.8,
          stagger: reduceMotion ? 0.08 : 0.15,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(
        numbers,
        { opacity: 0 },
        {
          opacity: 1,
          duration: reduceMotion ? 0.4 : 0.6,
          stagger: reduceMotion ? 0.08 : 0.12,
          delay: reduceMotion ? 0.05 : 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      if (!reduceMotion) {
        circles.forEach((circle, index) => {
          gsap.to(circle, {
            y: index % 2 === 0 ? -3 : -2,
            duration: 2 + index * 0.15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [circlesRef, horizontalLineRef, numbersRef, sectionRef, stepsRef, verticalLineRef])
}
