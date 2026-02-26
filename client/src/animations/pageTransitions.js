import { animate, spring } from 'framer-motion'
import { prefersReducedMotion } from './utils'

export const initPageTransitions = () => {
  const reduced = prefersReducedMotion()

  const transition = reduced
    ? { duration: 0.01 }
    : {
        type: 'spring',
        stiffness: 220,
        damping: 30,
        mass: 0.85,
      }

  const variants = {
    initial: { opacity: 0, filter: 'blur(8px)', y: 14 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0, transition },
    exit: { opacity: 0, filter: 'blur(6px)', y: -10, transition: { duration: 0.26 } },
  }

  const playEntrance = (element) => {
    if (!element) return () => {}
    const controls = animate(
      element,
      { opacity: [0, 1], filter: ['blur(8px)', 'blur(0px)'], transform: ['translate3d(0,12px,0)', 'translate3d(0,0,0)'] },
      reduced ? { duration: 0.01 } : spring({ stiffness: 240, damping: 28, mass: 0.85 }),
    )
    return () => controls.stop()
  }

  return {
    variants,
    transition,
    playEntrance,
    cleanup: () => {},
  }
}
