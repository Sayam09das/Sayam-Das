import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useCinematicScroll({
  sectionRef,
  headlineRef,
  imageRef,
  textRef,
  darkenRef,
  maskRef,
  depthBgRef,
  depthMidRef,
  depthFgRef,
}) {
  useEffect(() => {
    if (!sectionRef.current) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const enableHeavy = !prefersReducedMotion && !isMobile

    const ctx = gsap.context(() => {
      gsap.fromTo(
        maskRef.current,
        { scaleY: 1, transformOrigin: 'top center' },
        {
          scaleY: 0,
          duration: enableHeavy ? 1.2 : 0.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      if (!enableHeavy) {
        gsap.fromTo(
          [headlineRef.current, imageRef.current, textRef.current],
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
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

      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      storyTl
        .fromTo(
          headlineRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1.08, y: 0, ease: 'none' },
          0,
        )
        .to(headlineRef.current, { opacity: 0, scale: 1.18, y: -20, ease: 'none' }, 0.35)
        .fromTo(
          imageRef.current,
          { scale: 1, y: 0, filter: 'blur(0px)' },
          { scale: 1.6, y: -50, filter: 'blur(1.5px)', ease: 'none' },
          0,
        )
        .fromTo(
          darkenRef.current,
          { opacity: 0.08 },
          { opacity: 0.45, ease: 'none' },
          0.08,
        )
        .fromTo(
          textRef.current,
          { opacity: 0, x: 120 },
          { opacity: 1, x: 0, ease: 'none' },
          0.45,
        )

      gsap.to(depthBgRef.current, {
        yPercent: -10,
        scale: 1.03,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(depthMidRef.current, {
        yPercent: -18,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(depthFgRef.current, {
        yPercent: -26,
        scale: 1.09,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [darkenRef, depthBgRef, depthFgRef, depthMidRef, headlineRef, imageRef, maskRef, sectionRef, textRef])
}
