import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import vertexShader from '../shaders/vertex.glsl?raw'
import fragmentShader from '../shaders/fragment.glsl?raw'

export default function MouseDistortion({ mouseRef, scrollStateRef }) {
  const meshRef = useRef(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
      uDistortStrength: { value: 0 },
    }),
    [],
  )

  useFrame((state, delta) => {
    if (!meshRef.current) return

    uniforms.uTime.value += delta

    const targetMouseX = mouseRef.current?.x ?? 0.5
    const targetMouseY = mouseRef.current?.y ?? 0.5

    uniforms.uMouse.value.x = THREE.MathUtils.lerp(uniforms.uMouse.value.x, targetMouseX, 0.08)
    uniforms.uMouse.value.y = THREE.MathUtils.lerp(uniforms.uMouse.value.y, targetMouseY, 0.08)

    const progress = scrollStateRef.current?.progress || 0
    const distortion = scrollStateRef.current?.distortion || 0

    uniforms.uScroll.value = THREE.MathUtils.lerp(uniforms.uScroll.value, progress, 0.06)
    uniforms.uDistortStrength.value = THREE.MathUtils.lerp(uniforms.uDistortStrength.value, distortion, 0.08)

    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      scrollStateRef.current?.cameraY || 0,
      0.06,
    )
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[22, 14, 220, 220]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}
