import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function useScrollVelocity({ selector = 'section h1, section h2, section h3' } = {}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (prefersReducedMotion || isMobile) return undefined

    const targets = gsap.utils.toArray(selector)
    if (!targets.length) return undefined

    const setters = targets.map((target) => gsap.quickSetter(target, 'skewY', 'deg'))
    const proxy = { skew: 0 }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const velocitySkew = clamp(self.getVelocity() / -700, -5, 5)

        if (Math.abs(velocitySkew) <= Math.abs(proxy.skew)) {
          return
        }

        proxy.skew = velocitySkew
        gsap.to(proxy, {
          skew: 0,
          duration: 0.55,
          ease: 'power3.out',
          overwrite: true,
          onUpdate: () => {
            setters.forEach((set) => set(proxy.skew))
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [selector])
}
