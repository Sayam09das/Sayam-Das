import { motion } from 'framer-motion'

export default function CircularBadge({ badgeRef }) {
  return (
    <motion.div
      ref={badgeRef}
      aria-hidden="true"
      className="pointer-events-none absolute -right-1 top-8 z-20 hidden h-24 w-24 items-center justify-center rounded-full border border-[#E2E8C0] bg-[#F5F6ED]/90 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#444444] shadow-sm md:flex dark:border-[#2A2A2A] dark:bg-[#121212]/90 dark:text-[#BBBBBB]"
    >
      Creative
    </motion.div>
  )
}
