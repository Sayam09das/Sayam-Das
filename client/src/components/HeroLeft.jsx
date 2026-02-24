import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

export default function HeroLeft({ contentRef }) {
  const isMobile = useIsMobile()
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
    if (isMobile) return
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
        <h1 id="hero-headline" className="text-3xl font-black leading-[0.95] tracking-[-0.05em] text-zinc-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
          <motion.span custom={0} variants={lineVariants} initial="hidden" animate="visible" className="block">
            Creative Technologist crafting
          </motion.span>
          <motion.span custom={1} variants={lineVariants} initial="hidden" animate="visible" className="mt-1 block">
            <span className="relative inline-block">
              immersive
              <motion.span
                className="absolute -bottom-2 left-0 h-[4px] w-full rounded-full bg-[#B8E93A]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
                style={{ transformOrigin: 'left center' }}
              />
            </span>{' '}
            digital experiences.
          </motion.span>
        </h1>
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
        animate={{ opacity: 1, scale: 1, x: isMobile ? 0 : magnet.x, y: isMobile ? 0 : magnet.y }}
        transition={isMobile ? { duration: 0.45, delay: 0.9, ease: 'easeOut' } : { type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
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
