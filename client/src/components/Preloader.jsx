import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import introVertex from '../shaders/introVertex.glsl?raw'
import introFragment from '../shaders/introFragment.glsl?raw'

function ParticleIntro({ uniformsRef, cameraZRef }) {
  const pointsRef = useRef(null)

  const { positions, scales } = useMemo(() => {
    const count = 520
    const pos = new Float32Array(count * 3)
    const scl = new Float32Array(count)

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 8
      pos[i3 + 1] = (Math.random() - 0.5) * 8
      pos[i3 + 2] = (Math.random() - 0.5) * 7
      scl[i] = Math.random()
    }

    return { positions: pos, scales: scl }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uFlash: { value: 0 },
    }),
    [],
  )

  useEffect(() => {
    uniformsRef.current = uniforms
  }, [uniforms, uniformsRef])

  useFrame((state, delta) => {
    uniforms.uTime.value += delta
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, cameraZRef.current, 0.08)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={introVertex}
        fragmentShader={introFragment}
      />
    </points>
  )
}

export default function Preloader({ onComplete }) {
  const [active, setActive] = useState(true)
  const [enabled, setEnabled] = useState(true)
  const containerRef = useRef(null)
  const uniformsRef = useRef(null)
  const cameraZRef = useRef(8)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    if (reduceMotion || isMobile) {
      setEnabled(false)
      const t = window.setTimeout(() => {
        setActive(false)
        onComplete?.()
      }, 350)
      return () => window.clearTimeout(t)
    }

    // Wait for uniformsRef to be set before creating timeline
    // Also add a timeout to prevent infinite waiting
    let checkInterval = null
    let timeoutId = null
    
    const startAnimation = () => {
      if (!uniformsRef.current) return
      
      if (checkInterval) clearInterval(checkInterval)
      if (timeoutId) clearTimeout(timeoutId)
      
      document.documentElement.style.overflow = 'hidden'

      const timeline = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.55,
            ease: 'power2.out',
            onComplete: () => {
              document.documentElement.style.overflow = ''
              setActive(false)
              onComplete?.()
            },
          })
        },
      })

      timeline
        .to({}, { duration: 0.2 })
        .to(
          uniformsRef.current.uProgress,
          { value: 1, duration: 2.1, ease: 'power3.out' },
          0.35,
        )
        .to(cameraZRef, { current: 4.6, duration: 2.6, ease: 'power2.inOut' }, 0.3)
        .to(uniformsRef.current.uFlash, { value: 1, duration: 0.24, ease: 'power2.out' }, 2.9)
        .to(uniformsRef.current.uFlash, { value: 0, duration: 0.4, ease: 'power2.out' }, 3.14)
    }

    checkInterval = setInterval(() => {
      if (uniformsRef.current) {
        startAnimation()
      }
    }, 50)

    // Safety timeout - if uniforms don't load within 3 seconds, skip animation
    timeoutId = setTimeout(() => {
      clearInterval(checkInterval)
      setEnabled(false)
      setActive(false)
      onComplete?.()
    }, 3000)

    return () => {
      if (checkInterval) clearInterval(checkInterval)
      if (timeoutId) clearTimeout(timeoutId)
      document.documentElement.style.overflow = ''
    }
  }, [onComplete])

  if (!active) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      aria-hidden="true"
    >
      {enabled && (
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={48} />
          <ParticleIntro uniformsRef={uniformsRef} cameraZRef={cameraZRef} />
        </Canvas>
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)]" />
      <div className="pointer-events-none absolute text-sm font-semibold uppercase tracking-[0.4em] text-white/70">
        SAYAM DAS
      </div>
    </div>
  )
}
