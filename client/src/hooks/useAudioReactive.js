import { useCallback, useEffect, useRef, useState } from 'react'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function useAudioReactive() {
  const [enabled, setEnabled] = useState(false)
  const [muted, setMuted] = useState(false)
  const levelRef = useRef(0)
  const contextRef = useRef(null)
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const gainRef = useRef(null)
  const dataRef = useRef(null)

  const start = useCallback(async () => {
    if (enabled) return

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) return

      const context = new AudioContextClass()
      const analyser = context.createAnalyser()
      analyser.fftSize = 256

      const gain = context.createGain()
      gain.gain.value = 0.03

      const oscillator = context.createOscillator()
      oscillator.type = 'sine'
      oscillator.frequency.value = 42

      oscillator.connect(gain)
      gain.connect(analyser)
      analyser.connect(context.destination)
      oscillator.start()

      contextRef.current = context
      analyserRef.current = analyser
      sourceRef.current = oscillator
      gainRef.current = gain
      dataRef.current = new Uint8Array(analyser.frequencyBinCount)

      setEnabled(true)
    } catch {
      setEnabled(false)
    }
  }, [enabled])

  const toggleMute = useCallback(() => {
    const next = !muted
    setMuted(next)
    if (gainRef.current) {
      gainRef.current.gain.value = next ? 0 : 0.03
    }
  }, [muted])

  useEffect(() => {
    if (!enabled || !analyserRef.current || !dataRef.current) return undefined

    const update = () => {
      if (!analyserRef.current || !dataRef.current) return
      analyserRef.current.getByteFrequencyData(dataRef.current)
      let sum = 0
      for (let i = 0; i < 24; i += 1) {
        sum += dataRef.current[i]
      }
      const avg = sum / 24 / 255
      levelRef.current = clamp(avg, 0, 1)
    }

    const id = window.setInterval(update, 60)
    return () => window.clearInterval(id)
  }, [enabled])

  useEffect(() => {
    return () => {
      if (sourceRef.current) sourceRef.current.stop()
      if (contextRef.current) contextRef.current.close()
    }
  }, [])

  return {
    enabled,
    muted,
    levelRef,
    start,
    toggleMute,
  }
}
