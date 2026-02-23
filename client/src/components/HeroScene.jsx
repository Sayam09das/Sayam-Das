import { useEffect, useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import heroVertex from '../shaders/heroVertex.glsl?raw'
import heroFragment from '../shaders/heroFragment.glsl?raw'

export default function HeroScene({ mouseRef, scrollRef }) {
  const meshRef = useRef(null)
  const { camera, invalidate } = useThree()

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        },
        vertexShader: heroVertex,
        fragmentShader: heroFragment,
      }),
    [],
  )

  useEffect(() => {
    const tick = () => {
      if (!meshRef.current) return

      material.uniforms.uTime.value += 0.016
      material.uniforms.uScroll.value = THREE.MathUtils.lerp(
        material.uniforms.uScroll.value,
        scrollRef.current || 0,
        0.06,
      )
      material.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        material.uniforms.uMouse.value.x,
        mouseRef.current?.x || 0.5,
        0.08,
      )
      material.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        material.uniforms.uMouse.value.y,
        mouseRef.current?.y || 0.5,
        0.08,
      )

      meshRef.current.rotation.y += 0.0028
      meshRef.current.rotation.x += 0.0016
      meshRef.current.position.y = Math.sin(material.uniforms.uTime.value * 0.8) * 0.12

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, (mouseRef.current?.x - 0.5) * 0.4, 0.05)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, (mouseRef.current?.y - 0.5) * 0.3, 0.05)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4.8 - (scrollRef.current || 0) * 0.7, 0.04)
      camera.lookAt(0, 0, 0)

      invalidate()
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      material.dispose()
    }
  }, [camera, invalidate, material, mouseRef, scrollRef])

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 3, 4]} intensity={1.1} color="#d8e7ff" />
      <pointLight position={[-2, -2, 2]} intensity={0.55} color="#a78bfa" />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.18, 64]} />
        <primitive object={material} attach="material" />
      </mesh>
    </>
  )
}
