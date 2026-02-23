import { useEffect, useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json'
import particleVertex from '../shaders/particleVertex.glsl?raw'
import particleFragment from '../shaders/particleFragment.glsl?raw'

export default function ParticleLogo({ controlsRef, audioLevelRef, onReadyRender }) {
  const pointsRef = useRef(null)
  const { invalidate } = useThree()

  const { startPositions, targetPositions, scales } = useMemo(() => {
    const count = 1800
    const start = new Float32Array(count * 3)
    const target = new Float32Array(count * 3)
    const scl = new Float32Array(count)

    const font = new FontLoader().parse(helvetiker)
    const geo = new TextGeometry('SAYAM DAS', {
      font,
      size: 0.9,
      depth: 0.02,
      curveSegments: 8,
      bevelEnabled: false,
    })

    geo.center()
    const textPositions = geo.attributes.position.array
    const textCount = textPositions.length / 3

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      start[i3] = (Math.random() - 0.5) * 14
      start[i3 + 1] = (Math.random() - 0.5) * 8
      start[i3 + 2] = (Math.random() - 0.5) * 8

      const t3 = (i % textCount) * 3
      target[i3] = textPositions[t3] * 2.5
      target[i3 + 1] = textPositions[t3 + 1] * 2.5
      target[i3 + 2] = textPositions[t3 + 2] * 2.5
      scl[i] = Math.random()
    }

    geo.dispose()

    return {
      startPositions: start,
      targetPositions: target,
      scales: scl,
    }
  }, [])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uExplode: { value: 0 },
          uAudio: { value: 0 },
        },
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
      }),
    [],
  )

  useEffect(() => {
    const tick = () => {
      if (!material || !controlsRef.current) return

      material.uniforms.uTime.value += 0.016
      material.uniforms.uProgress.value = controlsRef.current.particleProgress
      material.uniforms.uExplode.value = controlsRef.current.explode
      material.uniforms.uAudio.value = audioLevelRef.current || 0
      invalidate()
      onReadyRender?.()
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      material.dispose()
    }
  }, [audioLevelRef, controlsRef, invalidate, material, onReadyRender])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[startPositions, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[targetPositions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  )
}
