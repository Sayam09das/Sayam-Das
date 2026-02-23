import { useEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import liquidVertex from '../shaders/liquidVertex.glsl?raw'
import liquidFragment from '../shaders/liquidFragment.glsl?raw'

function createTextTexture(text) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'rgba(255,255,255,0.95)'
  ctx.font = '700 110px Inter, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export default function LiquidText({ controlsRef, audioLevelRef }) {
  const { invalidate } = useThree()

  const texA = useMemo(() => createTextTexture('Digital Designer'), [])
  const texB = useMemo(() => createTextTexture('Creative Developer'), [])
  const texC = useMemo(() => createTextTexture('Interactive Engineer'), [])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTexA: { value: texA },
          uTexB: { value: texB },
          uMix: { value: 0 },
          uIntensity: { value: 0 },
          uTime: { value: 0 },
        },
        vertexShader: liquidVertex,
        fragmentShader: liquidFragment,
      }),
    [texA, texB],
  )

  useEffect(() => {
    const tick = () => {
      if (!controlsRef.current) return
      material.uniforms.uTime.value += 0.016
      const mixVal = controlsRef.current.liquidMix
      if (mixVal < 1) {
        material.uniforms.uTexA.value = texA
        material.uniforms.uTexB.value = texB
        material.uniforms.uMix.value = mixVal
      } else {
        material.uniforms.uTexA.value = texB
        material.uniforms.uTexB.value = texC
        material.uniforms.uMix.value = mixVal - 1
      }

      material.uniforms.uIntensity.value = controlsRef.current.liquidIntensity + (audioLevelRef.current || 0) * 0.35
      invalidate()
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      material.dispose()
      texA.dispose()
      texB.dispose()
      texC.dispose()
    }
  }, [audioLevelRef, controlsRef, invalidate, material, texA, texB, texC])

  return (
    <mesh position={[0, -2.2, -0.5]}>
      <planeGeometry args={[8.6, 2.1, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}
