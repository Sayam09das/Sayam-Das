import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useCountUp({ statsRef, numberRefs, stats }) {
  useEffect(() => {
    if (!statsRef.current) {
      return undefined
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      stats.forEach((stat, index) => {
        if (numberRefs.current[index]) {
          numberRefs.current[index].textContent = `${stat.value}${stat.suffix}`
        }
      })
      return undefined
    }

    const ctx = gsap.context(() => {
      stats.forEach((stat, index) => {
        const element = numberRefs.current[index]
        if (!element) {
          return
        }

        const countObject = { value: 0 }
        gsap.to(countObject, {
          value: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            element.textContent = `${Math.floor(countObject.value)}${stat.suffix}`
          },
        })
      })
    }, statsRef)

    return () => {
      ctx.revert()
    }
  }, [numberRefs, stats, statsRef])
}
