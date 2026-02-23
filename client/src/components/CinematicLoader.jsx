import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import introVertex from '../shaders/introVertex.glsl?raw'
import introFragment from '../shaders/introFragment.glsl?raw'
import useCinematicLoader from '../animations/useCinematicLoader'

function IntroParticles({ materialRef }) {
  const pointsRef = useRef(null)

  const { positions, scales } = useMemo(() => {
    const count = 420
    const pos = new Float32Array(count * 3)
    const scl = new Float32Array(count)

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 8
      pos[i3 + 1] = (Math.random() - 0.5) * 8
      pos[i3 + 2] = (Math.random() - 0.5) * 6
      scl[i] = Math.random()
    }

    return { positions: pos, scales: scl }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0.1 },
      uFlash: { value: 0 },
    }),
    [],
  )

  useEffect(() => {
    materialRef.current = uniforms
  }, [materialRef, uniforms])

  useFrame((_, delta) => {
    uniforms.uTime.value += delta
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

export default function CinematicLoader({ onComplete, onHandoffProgress }) {
  const [enabled, setEnabled] = useState(true)
  const [active, setActive] = useState(true)
  const containerRef = useRef(null)
  const overlayRef = useRef(null)
  const logoRef = useRef(null)
  const progressRef = useRef(null)
  const particleRef = useRef(null)
  const uniformsRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    setEnabled(!(reduced || isMobile))
  }, [])

  useCinematicLoader({
    containerRef,
    overlayRef,
    logoRef,
    progressRef,
    particleRef,
    onHandoffProgress,
    onComplete: () => {
      setActive(false)
      onComplete?.()
    },
  })

  useEffect(() => {
    if (!uniformsRef.current) return
    const t = setInterval(() => {
      uniformsRef.current.uProgress.value = Math.min(1, uniformsRef.current.uProgress.value + 0.01)
    }, 16)
    return () => clearInterval(t)
  }, [enabled])

  if (!active) return null

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      <div ref={overlayRef} className="absolute inset-0 bg-black [clip-path:inset(0%_0%_0%_0%)]" />

      {enabled && (
        <div ref={particleRef} className="absolute inset-0 opacity-80">
          <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
            <IntroParticles materialRef={uniformsRef} />
          </Canvas>
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_62%)]" />

      <h1
        ref={logoRef}
        className="absolute left-1/2 top-1/2 text-center text-[42px] font-black tracking-[-0.04em] text-white will-change-transform sm:text-[58px] lg:text-[68px]"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        Creative Digital Designer
      </h1>

      <div className="absolute bottom-14 left-1/2 h-[2px] w-[220px] -translate-x-1/2 overflow-hidden rounded-full bg-white/20">
        <div
          ref={progressRef}
          className="h-full origin-left bg-white"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}
