import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import MouseDistortion from './MouseDistortion'
import ParticleScene from './ParticleScene'
import useWebGLScrollSync from '../animations/useWebGLScrollSync'

export default function WebGLBackground({ introProgress = 1, paused = false }) {
  const [enabled, setEnabled] = useState(true)
  const [visible, setVisible] = useState(true)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const scrollStateRef = useWebGLScrollSync()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    setEnabled(!(reduced || isMobile))
  }, [])

  useEffect(() => {
    let rafId = 0
    const onMove = (event) => {
      if (!enabled) return
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        mouseRef.current.x = event.clientX / window.innerWidth
        mouseRef.current.y = 1 - event.clientY / window.innerHeight
      })
    }

    const onVisibility = () => {
      setVisible(!document.hidden)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled])

  if (!enabled) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-30 bg-[linear-gradient(180deg,#f7f4ff_0%,#eef6ff_52%,#fff9f2_100%)] dark:bg-[linear-gradient(180deg,#111114_0%,#121722_52%,#1a1320_100%)]"
        style={{ opacity: introProgress }}
      />
    )
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-30" style={{ opacity: introProgress }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible && !paused ? 'always' : 'never'}
      >
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={58} />
        <MouseDistortion mouseRef={mouseRef} scrollStateRef={scrollStateRef} />
        <ParticleScene mouseRef={mouseRef} scrollStateRef={scrollStateRef} />
      </Canvas>
    </div>
  )
}
