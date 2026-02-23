import { useEffect, useRef, useState } from 'react'

export default function CursorGlow() {
  const dotRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 767px)').matches
    setEnabled(!(reduced || mobile))
  }, [])

  useEffect(() => {
    if (!enabled || !dotRef.current) return undefined

    let raf = 0
    let tx = window.innerWidth * 0.5
    let ty = window.innerHeight * 0.5
    let x = tx
    let y = ty

    const onMove = (event) => {
      tx = event.clientX
      ty = event.clientY
    }

    const tick = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = window.requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6F54D]/35 blur-xl"
    />
  )
}
