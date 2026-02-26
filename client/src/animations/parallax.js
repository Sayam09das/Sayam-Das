import gsap from 'gsap'
import {
  applyWillChange,
  clearWillChange,
  prefersReducedMotion,
  resolveScope,
  clamp,
} from './utils'

export const initParallax = ({ scope } = {}) => {
  const root = resolveScope(scope)
  if (!root) return () => {}

  const reduced = prefersReducedMotion()
  const ctx = gsap.context(() => {
    const elements = gsap.utils.toArray('[data-speed]', root)
    elements.forEach((element) => {
      const speed = clamp(Number(element.dataset.speed || 1), 0.2, 2)
      if (reduced || speed === 1) {
        gsap.set(element, { y: 0 })
        return
      }

      const yDistance = (speed - 1) * 180
      applyWillChange(element)
      gsap.fromTo(
        element,
        { y: -yDistance, force3D: true },
        {
          y: yDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          onComplete: () => clearWillChange(element),
        },
      )
    })
  }, root)

  return () => {
    ctx.revert()
  }
}
