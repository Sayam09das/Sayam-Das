import gsap from 'gsap'
import {
  EASE,
  applyWillChange,
  clearWillChange,
  prefersReducedMotion,
  resolveScope,
} from './utils'

const splitToChars = (element) => {
  const original = element.textContent || ''
  const fragment = document.createDocumentFragment()
  const chars = []

  for (const char of original) {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    span.style.transformStyle = 'preserve-3d'
    span.setAttribute('aria-hidden', 'true')
    fragment.appendChild(span)
    chars.push(span)
  }

  element.textContent = ''
  element.setAttribute('aria-label', original)
  element.appendChild(fragment)

  return { original, chars }
}

export const initTextSplit = ({ scope } = {}) => {
  const root = resolveScope(scope)
  if (!root) return () => {}

  const reduced = prefersReducedMotion()
  const contexts = []
  const restores = []
  const targets = gsap.utils.toArray('[data-animate="split"]', root)

  targets.forEach((element) => {
    const { original, chars } = splitToChars(element)
    restores.push(() => {
      element.textContent = original
      element.removeAttribute('aria-label')
      element.style.perspective = ''
    })

    element.style.perspective = '900px'

    if (reduced) {
      gsap.set(chars, { yPercent: 0, autoAlpha: 1, rotateX: 0, filter: 'blur(0px)' })
      return
    }

    const ctx = gsap.context(() => {
      applyWillChange(chars)
      gsap.fromTo(
        chars,
        {
          yPercent: 110,
          autoAlpha: 0,
          rotateX: -80,
          filter: 'blur(8px)',
          force3D: true,
          transformOrigin: '50% 100%',
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: EASE.cinematic,
          stagger: 0.015,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onComplete: () => clearWillChange(chars),
        },
      )
    }, element)

    contexts.push(ctx)
  })

  return () => {
    contexts.forEach((ctx) => ctx.revert())
    restores.forEach((restore) => restore())
  }
}
