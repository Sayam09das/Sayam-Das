import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useParallax({ sectionRef, sparklesRef, wavesRef }) {
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

      gsap.to(sparklesRef.current, {
        y: -36,
        rotation: 28,
        ease: 'none',
        willChange: 'transform',
        scrollTrigger: triggerConfig,
      })

      gsap.to(wavesRef.current, {
        x: 28,
        ease: 'none',
        willChange: 'transform',
        scrollTrigger: triggerConfig,
      })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [sectionRef, sparklesRef, wavesRef])
}
