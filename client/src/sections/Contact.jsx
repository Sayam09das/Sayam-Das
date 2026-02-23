import { useRef } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../animations/useScrollReveal'

export default function Contact() {
  const sectionRef = useRef(null)
  useScrollReveal({ scopeRef: sectionRef })

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#EEF2D3] px-6 py-20 transition-colors duration-300 dark:bg-[#121212] md:px-10 md:py-24 lg:px-[60px] lg:py-32 2xl:px-[120px]"
    >
      <div className="mx-auto max-w-[900px] rounded-3xl border border-[#E2E8C0] bg-[#F5F6ED] p-8 text-center shadow-sm transition-colors duration-300 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] md:p-12">
        <h2 data-reveal className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl lg:text-5xl">
          Let’s Build Something Great
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-[620px] text-base text-zinc-600 dark:text-[#BBBBBB] md:text-lg">
          Need a product experience, brand refresh, or conversion-focused website? I am open to freelance collaborations.
        </p>

        <motion.a
          data-reveal
          href="mailto:hello@example.com"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="mt-8 inline-flex rounded-full border border-[#B8E93A] bg-[#C6F54D] px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#111111] shadow-[0_8px_24px_rgba(184,233,58,0.25)] dark:border-[#C6F54D] dark:bg-[#C6F54D] dark:text-[#111111]"
        >
          hello@example.com
        </motion.a>
      </div>
    </section>
  )
}
