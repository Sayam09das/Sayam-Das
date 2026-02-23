import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const lines = ['I engineer', 'immersive digital', 'experiences.']

export default function HeroLeft({ contentRef }) {
  const [magnet, setMagnet] = useState({ x: 0, y: 0, glow: false })

  const lineVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 36 },
      visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay: 0.4 + index * 0.2, ease: 'easeOut' },
      }),
    }),
    [],
  )

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.14
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.18
    setMagnet({ x, y, glow: true })
  }

  const onLeave = () => setMagnet({ x: 0, y: 0, glow: false })

  return (
    <div ref={contentRef} className="relative z-10 flex will-change-transform flex-col items-start gap-7 md:items-center lg:items-start">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
        className="inline-flex items-center gap-2 rounded-full border border-[#E2E8C0] bg-[#EEF2D3] px-4 py-2 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-700 dark:text-[#BBBBBB] sm:text-xs">
          Available for freelance work
        </span>
      </motion.div>

      <div className="space-y-4 md:text-center lg:text-left">
        <h1 id="hero-headline" className="text-4xl font-black leading-[0.9] tracking-[-0.05em] text-zinc-900 dark:text-white sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[68px]">
          {lines.map((line, index) => (
            <motion.span
              key={line}
              custom={index}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <svg viewBox="0 0 360 20" xmlns="http://www.w3.org/2000/svg" className="h-4 w-44 text-[#B8E93A] md:mx-auto lg:mx-0">
          <motion.path
            d="M3 12 C38 2, 76 18, 110 10 C144 2, 181 18, 214 10 C248 3, 287 17, 322 9 C336 6, 347 9, 357 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.95, ease: 'easeOut' }}
          />
        </svg>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.05, ease: 'easeOut' }}
        className="max-w-[560px] text-sm leading-7 text-zinc-700 dark:text-[#BBBBBB] sm:text-base md:text-center md:leading-8 lg:text-left"
      >
        I blend design, motion, and performance engineering to create expressive and immersive
        digital products.
      </motion.p>

      <motion.button
        type="button"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        initial={{ opacity: 0, scale: 0.9, y: 14 }}
        animate={{ opacity: 1, scale: 1, x: magnet.x, y: magnet.y }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-xl border border-[#B8E93A] bg-[#C6F54D] px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#111111] will-change-transform dark:border-[#C6F54D] dark:bg-[#C6F54D] dark:text-[#111111]"
        style={{
          boxShadow: magnet.glow ? '0 0 0 1px rgba(17,17,17,0.08), 0 12px 40px rgba(198,245,77,0.35)' : '0 10px 30px rgba(24,24,27,0.18)',
        }}
      >
        View Case Studies
      </motion.button>
    </div>
  )
}
