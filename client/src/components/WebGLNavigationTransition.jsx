import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

function TransitionPlane({ progressRef }) {
  const meshRef = useRef(null)
  const { invalidate } = useThree()

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uProgress: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uProgress;
          varying vec2 vUv;
          void main() {
            float n = sin(vUv.y * 22.0 + uProgress * 12.0) * 0.06;
            float m = smoothstep(uProgress - 0.2, uProgress + 0.2, vUv.x + n);
            vec3 col = vec3(0.03, 0.04, 0.08);
            gl_FragColor = vec4(col, m * 0.92);
          }
        `,
      }),
    [],
  )

  useEffect(() => {
    const tick = () => {
      material.uniforms.uProgress.value = progressRef.current
      invalidate()
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      material.dispose()
    }
  }, [invalidate, material, progressRef])

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

export default function WebGLNavigationTransition({ enabled = true }) {
  const overlayRef = useRef(null)
  const progressRef = useRef(0)
  const runningRef = useRef(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 767px)').matches
    if (reduced || mobile) return undefined

    const onClick = (event) => {
      const target = event.target.closest('a[href^="#"]')
      if (!target || runningRef.current) return

      runningRef.current = true
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(progressRef, {
            current: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              runningRef.current = false
            },
          })
        },
      })

      tl.to(progressRef, { current: 1, duration: 0.55, ease: 'power2.inOut' })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  if (!enabled) return null

  return (
    <div ref={overlayRef} className="pointer-events-none fixed inset-0 z-[88]">
      <Canvas dpr={[1, 1.5]} frameloop="never" gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
        <TransitionPlane progressRef={progressRef} />
      </Canvas>
    </div>
  )
}
