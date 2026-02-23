import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function useIntroTimeline({ active, isLite, phaseRef, onHandoffProgress, onComplete }) {
  const controlsRef = useRef({
    particleProgress: 0,
    liquidMix: 0,
    liquidIntensity: 0,
    explode: 0,
    cameraZ: 9,
    overlayAlpha: 1,
  })
  const handoffRef = useRef(onHandoffProgress)
  const completeRef = useRef(onComplete)

  useEffect(() => {
    handoffRef.current = onHandoffProgress
  }, [onHandoffProgress])

  useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (!active) return undefined

    const c = controlsRef.current

    if (isLite) {
      const lite = gsap.timeline({ onComplete: () => completeRef.current?.() })
      lite
        .to(c, { overlayAlpha: 0.2, duration: 0.5, ease: 'power2.out' })
        .to(c, {
          overlayAlpha: 0,
          duration: 0.6,
          ease: 'power3.out',
          onUpdate: () => {
            handoffRef.current?.(1 - c.overlayAlpha)
          },
        })
      return () => lite.kill()
    }

    const tl = gsap.timeline({ onComplete: () => completeRef.current?.() })

    tl.to(c, {
      particleProgress: 1,
      duration: 2.5,
      ease: 'power4.out',
      onUpdate: () => {
        phaseRef.current = 'formation'
        handoffRef.current?.(0.2 + c.particleProgress * 0.2)
      },
    })
      .to(c, {
        liquidIntensity: 1,
        duration: 0.8,
        ease: 'power2.out',
        onStart: () => {
          phaseRef.current = 'liquid'
        },
      })
      .to(c, {
        liquidMix: 1,
        duration: 1.5,
        ease: 'power2.inOut',
      })
      .to(c, {
        liquidMix: 2,
        duration: 1.5,
        ease: 'power2.inOut',
      })
      .to(c, {
        explode: 1,
        cameraZ: 2.3,
        duration: 2,
        ease: 'power2.inOut',
        onStart: () => {
          phaseRef.current = 'fly'
        },
        onUpdate: () => {
          handoffRef.current?.(0.6 + c.explode * 0.35)
        },
      })
      .to(c, {
        overlayAlpha: 0,
        liquidIntensity: 0,
        duration: 1,
        ease: 'power3.out',
        onStart: () => {
          phaseRef.current = 'handoff'
        },
        onUpdate: () => {
          handoffRef.current?.(1 - c.overlayAlpha)
        },
      })

    return () => {
      tl.kill()
    }
  }, [active, isLite, phaseRef])

  return controlsRef
}
