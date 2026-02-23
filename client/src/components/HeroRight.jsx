import { useState } from 'react'
import { motion } from 'framer-motion'
import CircularBadge from './CircularBadge'

export default function HeroRight({ portraitRef, badgeRef }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width
    const relativeY = (event.clientY - rect.top) / rect.height

    setTilt({
      rotateY: (relativeX - 0.5) * 10,
      rotateX: (0.5 - relativeY) * 8,
    })
  }

  const resetTilt = () => setTilt({ rotateX: 0, rotateY: 0 })

  return (
    <motion.div
      ref={portraitRef}
      initial={{ opacity: 0, scale: 0.9, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.7, ease: 'easeOut' }}
      className="relative z-10 mx-auto flex w-full justify-center will-change-transform"
    >
      <CircularBadge badgeRef={badgeRef} />

      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        animate={tilt}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        className="w-[280px] will-change-transform [transform-style:preserve-3d] sm:w-[300px] md:w-[380px] lg:w-[480px] xl:w-[520px]"
        style={{ perspective: '1200px' }}
      >
        <div className="overflow-hidden rounded-[140px_140px_18px_18px] border border-zinc-900/10 bg-[linear-gradient(160deg,#d7d4ff_0%,#bfdcfd_52%,#f5f7ff_100%)] shadow-[0_28px_80px_rgba(38,44,85,0.24)] dark:border-[#2A2A2A] dark:bg-[#1A1A1A] lg:rounded-[190px_190px_18px_18px]">
          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&fm=webp&w=1200&q=80"
            alt="Portrait"
            width="1200"
            height="1600"
            loading="eager"
            decoding="async"
            className="h-[360px] w-full object-cover object-top sm:h-[420px] md:h-[500px] lg:h-[580px]"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
