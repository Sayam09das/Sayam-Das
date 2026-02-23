import { useCallback, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import gsap from 'gsap'
import ParticleLogo from './ParticleLogo'
import LiquidText from './LiquidText'
import useAudioReactive from '../hooks/useAudioReactive'
import useIntroTimeline from '../hooks/useIntroTimeline'

function IntroScene({ controlsRef, audioLevelRef }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 80)
    return () => window.clearTimeout(t)
  }, [])

  if (!ready) return null

  return (
    <>
      <ParticleLogo controlsRef={controlsRef} audioLevelRef={audioLevelRef} />
      <LiquidText controlsRef={controlsRef} audioLevelRef={audioLevelRef} />
    </>
  )
}

function SceneController({ controlsRef }) {
  const { camera, invalidate } = useThree()

  useEffect(() => {
    const tick = () => {
      if (!controlsRef.current) return
      camera.position.z = gsap.utils.interpolate(camera.position.z, controlsRef.current.cameraZ, 0.08)
      camera.lookAt(0, 0, 0)
      invalidate()
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [camera, controlsRef, invalidate])

  return null
}

export default function InsaneIntro({ onComplete, onHandoffProgress }) {
  const [active, setActive] = useState(true)
  const [isLite, setIsLite] = useState(false)
  const [webglReady, setWebglReady] = useState(false)
  const overlayRef = useRef(null)
  const phaseRef = useRef('boot')
  const forceDoneRef = useRef(false)

  const finishIntro = useCallback(() => {
    if (forceDoneRef.current) return
    forceDoneRef.current = true
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
      onComplete: () => {
        setActive(false)
        onComplete?.()
      },
    })
  }, [onComplete])

  const { enabled: audioEnabled, muted, start, toggleMute, levelRef } = useAudioReactive()
  const controlsRef = useIntroTimeline({
    active,
    isLite,
    phaseRef,
    onHandoffProgress,
    onComplete: finishIntro,
  })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    setIsLite(reduced || isMobile)
  }, [])

  useEffect(() => {
    if (!active) return undefined
    const timeout = window.setTimeout(() => {
      finishIntro()
    }, isLite ? 2200 : 11000)
    return () => window.clearTimeout(timeout)
  }, [active, finishIntro, isLite])

  if (!active) return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-black">
      <div ref={overlayRef} className="absolute inset-0 bg-black" />

      {!isLite && (
        <div className="absolute inset-0">
          <Canvas
            dpr={[1, 1.5]}
            frameloop="never"
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            onCreated={({ gl }) => {
              gl.setClearColor('#000000', 1)
              const onContextLost = (event) => {
                event.preventDefault()
                setIsLite(true)
              }
              gl.domElement.addEventListener('webglcontextlost', onContextLost, { passive: false })
              setWebglReady(true)
            }}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={44} />
            <fog attach="fog" args={['#000000', 6, 20]} />
            <SceneController controlsRef={controlsRef} />
            <IntroScene controlsRef={controlsRef} audioLevelRef={levelRef} />
          </Canvas>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_62%)]" />

      <div className="absolute inset-x-0 bottom-14 flex items-center justify-center gap-4">
        {!isLite && (
          <button
            type="button"
            onClick={start}
            className="rounded-full border border-white/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80"
          >
            {audioEnabled ? 'Audio On' : 'Enable Audio'}
          </button>
        )}

        {!isLite && audioEnabled && (
          <button
            type="button"
            onClick={toggleMute}
            className="rounded-full border border-white/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80"
          >
            {muted ? 'Unmute' : 'Mute'}
          </button>
        )}
      </div>

      {isLite && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl font-black tracking-[-0.04em] text-white">Creative Digital Designer</h1>
        </div>
      )}

      {!isLite && webglReady && (
        <div className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60">
          {phaseRef.current}
        </div>
      )}
    </div>
  )
}
