import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8C0] bg-[#F5F6ED] px-6 py-12 text-zinc-700 transition-colors duration-300 dark:border-[#2A2A2A] dark:bg-[#0F0F0F] dark:text-[#BBBBBB] md:px-10 lg:px-[60px] 2xl:px-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto flex max-w-[1440px] flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between"
      >
        <p>© {new Date().getFullYear()} Sayam Das. All rights reserved.</p>
        <p>Built with React, Tailwind, Framer Motion, GSAP and optimized smooth scrolling.</p>
      </motion.div>
    </footer>
  )
}
