import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

export default function useWebGLScrollSync() {
  const stateRef = useRef({
    progress: 0,
    velocity: 0,
    cameraY: 0,
    distortion: 0,
    enabled: true,
  })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    stateRef.current.enabled = !(reduced || isMobile)

    if (!stateRef.current.enabled) {
      stateRef.current.progress = 0
      stateRef.current.velocity = 0
      stateRef.current.cameraY = 0
      stateRef.current.distortion = 0
      return undefined
    }

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress || 0
        const velocity = clamp(self.getVelocity() / 2200, -1, 1)

        stateRef.current.progress = progress
        stateRef.current.velocity = velocity
        stateRef.current.cameraY = progress * 0.22
        stateRef.current.distortion = clamp(Math.abs(velocity) * 0.85, 0, 0.65)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return stateRef
}
