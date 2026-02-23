import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function SimpleLoader({ onComplete, duration = 1200 }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete?.()
    }, duration)

    return () => window.clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-live="polite"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Loading</p>
      </div>
    </motion.div>
  )
}
