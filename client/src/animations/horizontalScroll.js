import gsap from 'gsap'
import {
  applyWillChange,
  clearWillChange,
  prefersReducedMotion,
  resolveScope,
} from './utils'

export const initHorizontalScroll = ({ scope } = {}) => {
  const root = resolveScope(scope)
  if (!root) return () => {}

  const reduced = prefersReducedMotion()
  const ctx = gsap.context(() => {
    const sections = gsap.utils.toArray('[data-animate="horizontal"]', root)

    sections.forEach((section) => {
      const track = section.querySelector('[data-horizontal-track]') || section.firstElementChild
      if (!track) return

      const panels = gsap.utils.toArray('[data-horizontal-panel]', track)
      const panelCount = panels.length || track.children.length
      if (panelCount <= 1 || reduced) return

      const distance = -100 * (panelCount - 1)
      applyWillChange(track)
      gsap.to(track, {
        xPercent: distance,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top top',
          end: () => `+=${section.offsetWidth * (panelCount - 1)}`,
          scrub: 0.8,
          snap: {
            snapTo: 1 / (panelCount - 1),
            duration: { min: 0.2, max: 0.5 },
            inertia: false,
          },
        },
        onComplete: () => clearWillChange(track),
      })
    })
  }, root)

  return () => {
    ctx.revert()
  }
}
