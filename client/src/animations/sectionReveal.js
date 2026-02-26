import gsap from 'gsap'
import {
  EASE,
  applyWillChange,
  clearWillChange,
  prefersReducedMotion,
  resolveScope,
} from './utils'

export const initSectionReveal = ({ scope } = {}) => {
  const root = resolveScope(scope)
  if (!root) return () => {}

  const reduced = prefersReducedMotion()
  const observers = []
  const contexts = []

  const elements = gsap.utils.toArray('[data-animate="reveal"]', root)

  elements.forEach((element) => {
    if (reduced) {
      gsap.set(element, { autoAlpha: 1, y: 0 })
      return
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          currentObserver.unobserve(entry.target)

          const ctx = gsap.context(() => {
            const children = entry.target.querySelectorAll('[data-reveal-child]')
            const targets = children.length ? children : [entry.target]
            applyWillChange(targets)
            gsap.fromTo(
              targets,
              { y: 48, autoAlpha: 0, force3D: true },
              {
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: EASE.confident,
                stagger: 0.08,
                scrollTrigger: {
                  trigger: entry.target,
                  start: 'top 85%',
                  end: 'top 40%',
                  scrub: 0.5,
                },
                onComplete: () => clearWillChange(targets),
              },
            )
          }, entry.target)
          contexts.push(ctx)
        })
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )

    observer.observe(element)
    observers.push(observer)
  })

  return () => {
    observers.forEach((observer) => observer.disconnect())
    contexts.forEach((ctx) => ctx.revert())
  }
}
