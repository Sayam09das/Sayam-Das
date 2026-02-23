import { useEffect } from 'react'
import gsap from 'gsap'

export default function useCinematicLoader({
  containerRef,
  overlayRef,
  logoRef,
  progressRef,
  particleRef,
  onComplete,
  onHandoffProgress,
}) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    const finish = () => {
      onHandoffProgress?.(1)
      onComplete?.()
    }

    if (reduced || isMobile) {
      const quick = gsap.timeline({ onComplete: finish })
      quick
        .fromTo(logoRef.current, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45 })
        .to(overlayRef.current, { opacity: 0, duration: 0.45, ease: 'power2.out' }, 0.8)
      return () => quick.kill()
    }

    const heroTitle = document.getElementById('hero-headline')
    const startX = window.innerWidth / 2
    const startY = window.innerHeight / 2

    let dx = 0
    let dy = -120
    let targetScale = 1.15

    if (heroTitle) {
      const rect = heroTitle.getBoundingClientRect()
      const targetX = rect.left + rect.width / 2
      const targetY = rect.top + rect.height / 2
      dx = targetX - startX
      dy = targetY - startY

      const logoHeight = logoRef.current?.getBoundingClientRect().height || 80
      targetScale = Math.max(0.9, Math.min(1.45, rect.height / logoHeight))
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: finish,
    })

    tl.set(logoRef.current, { opacity: 0, scale: 0.9, x: 0, y: 0 })
      .fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: 2, ease: 'none' }, 0)
      .to(logoRef.current, { opacity: 1, scale: 1.06, duration: 0.85, ease: 'power3.out' }, 0.2)
      .to(logoRef.current, { scale: 1.2, duration: 0.6, ease: 'power2.inOut' }, 1.15)
      .to(particleRef.current, { opacity: 0.45, duration: 0.7, ease: 'power2.out' }, 1.3)
      .to(
        logoRef.current,
        {
          x: dx,
          y: dy,
          scale: targetScale,
          color: '#111111',
          duration: 1.5,
          onUpdate: function onUpdateLogo() {
            const p = this.progress()
            onHandoffProgress?.(0.4 + p * 0.6)
          },
        },
        1.95,
      )
      .to(
        overlayRef.current,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.5,
          ease: 'power4.inOut',
        },
        1.95,
      )
      .to(containerRef.current, { opacity: 0, duration: 0.45, ease: 'power2.out' }, 3.25)

    return () => {
      tl.kill()
    }
  }, [containerRef, logoRef, onComplete, onHandoffProgress, overlayRef, particleRef, progressRef])
}
