import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useAboutAnimation({ sectionRef, imageWrapRef, imageInnerRef, contentRef, lineRef }) {
  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches

    const ctx = gsap.context(() => {
      const textItems = contentRef.current?.querySelectorAll('[data-about-text]') || []
      const duration = isMobile ? 0.7 : 1

      gsap.fromTo(
        imageWrapRef.current,
        { x: isMobile ? 0 : -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(
        textItems,
        { x: isMobile ? 0 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            transformOrigin: 'left center',
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      }

      if (!isMobile && !reduceMotion) {
        const parallaxAmount = isTablet ? 30 : 50
        gsap.fromTo(
          imageInnerRef.current,
          { y: -parallaxAmount },
          {
            y: parallaxAmount,
            ease: 'none',
            scrollTrigger: {
              trigger: imageWrapRef.current,
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
  }, [contentRef, imageInnerRef, imageWrapRef, lineRef, sectionRef])
}
