import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isBrowser, prefersReducedMotion } from './utils'

export const initScrollProgress = () => {
  if (!isBrowser) return () => {}

  const reduced = prefersReducedMotion()
  const bar = document.createElement('div')
  bar.setAttribute('data-scroll-progress', 'true')
  Object.assign(bar.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '2px',
    zIndex: '9999',
    transformOrigin: '0% 50%',
    transform: 'scaleX(0)',
    background: 'currentColor',
    pointerEvents: 'none',
    willChange: 'transform',
  })

  const ctx = gsap.context(() => {
    document.body.appendChild(bar)
  }, document.body)
  const setScale = gsap.quickSetter(bar, 'scaleX')

  const trigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      setScale(reduced ? (self.progress > 0 ? 1 : 0) : self.progress)
    },
  })

  return () => {
    trigger.kill()
    bar.remove()
    ctx.revert()
  }
}
