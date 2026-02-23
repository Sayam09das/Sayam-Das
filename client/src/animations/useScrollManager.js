import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function useScrollManager({ initialLocked = true } = {}) {
  const [isScrollLocked, setIsScrollLocked] = useState(initialLocked)

  useEffect(() => {
    document.body.style.overflow = isScrollLocked ? 'hidden' : ''

    const triggers = ScrollTrigger.getAll()
    triggers.forEach((trigger) => {
      if (isScrollLocked) {
        trigger.disable(false, false)
      } else {
        trigger.enable(false, false)
      }
    })

    if (!isScrollLocked) {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isScrollLocked])

  const lockScroll = useCallback(() => setIsScrollLocked(true), [])
  const unlockScroll = useCallback(() => setIsScrollLocked(false), [])

  return { isScrollLocked, lockScroll, unlockScroll }
}
