import gsap from 'gsap'
import { clamp, prefersReducedMotion, resolveScope } from './utils'

export const initMagneticButtons = ({ scope } = {}) => {
  const root = resolveScope(scope)
  if (!root) return () => {}

  const reduced = prefersReducedMotion()
  if (reduced) return () => {}

  const cleanups = []
  const ctx = gsap.context(() => {
    const buttons = gsap.utils.toArray('[data-magnetic]', root)

    buttons.forEach((button) => {
      const strength = clamp(Number(button.dataset.magneticStrength || 0.4), 0.1, 1)
      button.style.willChange = 'transform'

      const xTo = gsap.quickTo(button, 'x', {
        duration: 0.28,
        ease: 'power3.out',
      })
      const yTo = gsap.quickTo(button, 'y', {
        duration: 0.28,
        ease: 'power3.out',
      })

      const onPointerMove = (event) => {
        const rect = button.getBoundingClientRect()
        const pointerX = event.clientX - rect.left - rect.width / 2
        const pointerY = event.clientY - rect.top - rect.height / 2
        xTo(pointerX * strength)
        yTo(pointerY * strength)
      }

      const reset = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      button.addEventListener('pointermove', onPointerMove, { passive: true })
      button.addEventListener('pointerleave', reset, { passive: true })
      button.addEventListener('pointercancel', reset, { passive: true })

      cleanups.push(() => {
        button.removeEventListener('pointermove', onPointerMove)
        button.removeEventListener('pointerleave', reset)
        button.removeEventListener('pointercancel', reset)
        button.style.willChange = ''
        gsap.set(button, { x: 0, y: 0 })
      })
    })
  }, root)

  return () => {
    cleanups.forEach((cleanup) => cleanup())
    ctx.revert()
  }
}
