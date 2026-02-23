import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScene from '../components/HeroScene'

gsap.registerPlugin(ScrollTrigger)

export default function WebGLHero() {
  const sectionRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const scrollRef = useRef(0)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 767px)').matches
    setEnabled(!(reduced || mobile))
  }, [])

  useEffect(() => {
    if (!enabled || !sectionRef.current) return undefined

    let raf = 0
    const onMove = (event) => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        mouseRef.current.x = event.clientX / window.innerWidth
        mouseRef.current.y = 1 - event.clientY / window.innerHeight
      })
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        scrollRef.current = self.progress
      },
    })

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      trigger.kill()
    }
  }, [enabled])

  return (
    <section
      id="home"
      ref={sectionRef}
      data-scroll-section
      className="relative h-screen overflow-hidden bg-[linear-gradient(180deg,#f6f8ff_0%,#eef4ff_52%,#f8f6ff_100%)] dark:bg-[linear-gradient(180deg,#101218_0%,#121826_52%,#171324_100%)]"
    >
      {enabled ? (
        <div className="absolute inset-0 -z-10">
          <Canvas dpr={[1, 1.5]} frameloop="never" gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
            <fog attach="fog" args={['#dbe8ff', 4, 10]} />
            <PerspectiveCamera makeDefault position={[0, 0, 4.8]} fov={42} />
            <HeroScene mouseRef={mouseRef} scrollRef={scrollRef} />
          </Canvas>
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,rgba(167,139,250,0.18),transparent_44%),radial-gradient(circle_at_50%_70%,rgba(56,189,248,0.16),transparent_44%)]" />
      )}

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-6 md:px-10 lg:px-[60px]">
        <div className="max-w-[760px]">
          <h1
            id="hero-headline"
            className="text-4xl font-black tracking-[-0.05em] text-zinc-900 dark:text-white sm:text-5xl md:text-6xl lg:text-[68px]"
          >
            Creative Technologist
          </h1>
          <p className="mt-6 max-w-[620px] text-sm leading-7 text-zinc-700 dark:text-[#BBBBBB] md:text-base md:leading-8">
            I build immersive digital systems where motion, 3D, and interaction architecture create meaningful storytelling experiences.
          </p>
        </div>
      </div>
    </section>
  )
}
