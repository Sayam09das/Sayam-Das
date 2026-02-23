import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { PerspectiveCamera, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ShowcaseMesh({ stateRef }) {
  const meshRef = useRef(null)
  const { camera, invalidate } = useThree()
  const colorARef = useRef(new THREE.Color('#b6c5ff'))
  const colorBRef = useRef(new THREE.Color('#8de3ff'))
  const mixedRef = useRef(new THREE.Color('#b6c5ff'))

  useEffect(() => {
    const tick = () => {
      if (!meshRef.current) return
      const state = stateRef.current

      meshRef.current.rotation.y = state.rotation
      meshRef.current.rotation.x = state.rotation * 0.18
      meshRef.current.position.y = Math.sin(state.rotation * 0.7) * 0.08

      mixedRef.current.copy(colorARef.current).lerp(colorBRef.current, state.materialMix)
      meshRef.current.material.color.copy(mixedRef.current)
      meshRef.current.material.roughness = 0.35 + (1 - state.materialMix) * 0.35
      meshRef.current.material.metalness = 0.2 + state.materialMix * 0.5

      camera.position.z = THREE.MathUtils.lerp(camera.position.z, state.camZ, 0.08)
      camera.lookAt(0, 0, 0)

      invalidate()
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [camera, invalidate, stateRef])

  return (
    <RoundedBox ref={meshRef} args={[1.8, 1.1, 0.24]} radius={0.08} smoothness={8}>
      <meshPhysicalMaterial transparent transmission={0.45} thickness={0.65} clearcoat={1} />
    </RoundedBox>
  )
}

export default function ProductShowcase3D() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const textRefs = useRef([])
  const stateRef = useRef({
    rotation: 0,
    camZ: 4.2,
    bg: 0,
    materialMix: 0,
    sectionOpacity: 1,
  })
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 767px)').matches
    setEnabled(!(reduced || mobile))
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return undefined

    if (!enabled) {
      gsap.fromTo(
        textRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      )
      return undefined
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3000',
          pin: pinRef.current,
          scrub: true,
        },
      })

      tl.to(stateRef.current, { rotation: Math.PI * 0.5, duration: 1, ease: 'none' }, 0)
        .to(textRefs.current[0], { opacity: 1, y: 0, duration: 0.6 }, 0.1)
        .to(stateRef.current, { camZ: 3.1, duration: 1, ease: 'none' }, 1)
        .to(textRefs.current[1], { opacity: 1, y: 0, duration: 0.6 }, 1.1)
        .to(stateRef.current, { bg: 1, materialMix: 1, duration: 1, ease: 'none' }, 2)
        .to(textRefs.current[2], { opacity: 1, y: 0, duration: 0.6 }, 2.1)
        .to(stateRef.current, { camZ: 4.6, sectionOpacity: 0, duration: 1, ease: 'none' }, 3)
    }, sectionRef)

    return () => ctx.revert()
  }, [enabled])

  return (
    <section
      id="product-showcase"
      ref={sectionRef}
      data-scroll-section
      className="relative h-[300vh] bg-white dark:bg-[#0F0F0F]"
    >
      <div ref={pinRef} className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(167,139,250,0.12),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(56,189,248,0.14),transparent_45%)]" />

        {enabled ? (
          <Canvas dpr={[1, 1.5]} frameloop="never" gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
            <PerspectiveCamera makeDefault position={[0, 0, 4.2]} fov={42} />
            <ambientLight intensity={0.65} />
            <pointLight position={[2, 2, 3]} intensity={1} color="#bdd3ff" />
            <ShowcaseMesh stateRef={stateRef} />
          </Canvas>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-40 w-64 rounded-3xl border border-zinc-300 bg-zinc-100 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-[1280px] flex-col justify-center px-6 md:px-10 lg:px-[60px]">
          <h3
            ref={(el) => {
              textRefs.current[0] = el
            }}
            className="translate-y-6 opacity-0 text-4xl font-bold text-zinc-900 dark:text-white"
          >
            Precision Material System
          </h3>
          <p
            ref={(el) => {
              textRefs.current[1] = el
            }}
            className="mt-6 max-w-[520px] translate-y-6 opacity-0 text-base text-zinc-600 dark:text-[#BBBBBB]"
          >
            Scroll-driven camera and material transitions engineered for immersive product storytelling.
          </p>
          <p
            ref={(el) => {
              textRefs.current[2] = el
            }}
            className="mt-6 max-w-[520px] translate-y-6 opacity-0 text-base text-zinc-600 dark:text-[#BBBBBB]"
          >
            Lighting, reflections, and motion curves evolve with progress for Apple-style reveal pacing.
          </p>
        </div>
      </div>
    </section>
  )
}
