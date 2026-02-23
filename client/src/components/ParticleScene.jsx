import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleScene({ mouseRef, scrollStateRef, count = 420 }) {
  const pointsRef = useRef(null)

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 20
      pos[i3 + 1] = (Math.random() - 0.5) * 14
      pos[i3 + 2] = (Math.random() - 0.5) * 8
      spd[i] = 0.005 + Math.random() * 0.012
    }

    return { positions: pos, speeds: spd }
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    const attrs = pointsRef.current.geometry.attributes.position
    const arr = attrs.array
    const progress = scrollStateRef.current?.progress || 0

    const mouseX = (mouseRef.current?.x || 0.5) - 0.5
    const mouseY = (mouseRef.current?.y || 0.5) - 0.5

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      arr[i3 + 1] += speeds[i] * delta * 60
      arr[i3] += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.0005

      arr[i3] += mouseX * 0.0008
      arr[i3 + 1] += mouseY * 0.0006
      arr[i3 + 2] += progress * 0.0008

      if (arr[i3 + 1] > 7) {
        arr[i3 + 1] = -7
      }
    }

    attrs.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={new THREE.Color('#ffffff')}
        size={0.04}
        transparent
        opacity={0.22}
        depthWrite={false}
      />
    </points>
  )
}
