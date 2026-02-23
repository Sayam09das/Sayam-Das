import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrthographicCamera, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const revealVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const revealFragment = `
uniform sampler2D uTexture;
uniform float uProgress;
uniform float uTime;
varying vec2 vUv;

float wave(vec2 uv, float t) {
  return sin((uv.y * 12.0) + t * 2.0) * 0.03;
}

void main() {
  vec2 uv = vUv;
  float edge = smoothstep(uProgress - 0.15, uProgress + 0.15, uv.x + wave(uv, uTime));
  vec4 tex = texture2D(uTexture, uv);
  float alpha = edge;
  gl_FragColor = vec4(tex.rgb, alpha);
}
`

function RevealPlane({ imageUrl, progressRef }) {
  const meshRef = useRef(null)
  const texture = useTexture(imageUrl)

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uProgress: { value: 0 },
      uTime: { value: 0 },
    }),
    [texture],
  )

  useFrame((_, delta) => {
    uniforms.uTime.value += delta
    uniforms.uProgress.value = THREE.MathUtils.lerp(uniforms.uProgress.value, progressRef.current, 0.1)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 1.3, 1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={revealVertex}
        fragmentShader={revealFragment}
      />
    </mesh>
  )
}

export default function ShaderImageReveal({ imageUrl, className = '', alt = 'Portfolio image' }) {
  const containerRef = useRef(null)
  const progressRef = useRef(0)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    if (reduced || isMobile || !containerRef.current) {
      setEnabled(false)
      progressRef.current = 1
      return undefined
    }

    const tweenObj = { value: 0 }

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(tweenObj, {
          value: 1,
          duration: 1.5,
          ease: 'power3.out',
          onUpdate: () => {
            progressRef.current = tweenObj.value
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  if (!enabled) {
    return (
      <div ref={containerRef} className={className}>
        <img
          src={imageUrl}
          alt={alt}
          width="1400"
          height="900"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className}>
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <OrthographicCamera makeDefault position={[0, 0, 4]} zoom={180} />
        <RevealPlane imageUrl={imageUrl} progressRef={progressRef} />
      </Canvas>
    </div>
  )
}
