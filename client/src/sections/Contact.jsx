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
      className="bg-[linear-gradient(155deg,#EEF2D3_0%,#EAF3C3_42%,#EDE4FF_100%)] px-6 py-20 transition-colors duration-300 dark:bg-[linear-gradient(155deg,#121212_0%,#181818_56%,#221a2f_100%)] md:px-10 md:py-24 lg:px-[60px] lg:py-32 2xl:px-[120px]"
    >
      <div className="mx-auto max-w-[1200px] rounded-3xl border border-[#E2E8C0] bg-[#F5F6ED]/90 p-6 shadow-[0_20px_50px_rgba(86,102,35,0.12)] backdrop-blur-sm transition-colors duration-300 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]/90 md:p-10 lg:p-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <h2 data-reveal className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl lg:text-5xl">
              Let&apos;s Build Something Great
            </h2>
            <p data-reveal className="mt-5 max-w-[520px] text-base text-zinc-600 dark:text-[#BBBBBB] md:text-lg">
              Have a product, portfolio, or launch in mind? Share a few details and I&apos;ll get
              back with next steps.
            </p>
            <div data-reveal className="mt-8 space-y-3 text-sm text-zinc-700 dark:text-[#BBBBBB]">
              <p>Email: hello@example.com</p>
              <p>Location: India / Remote Worldwide</p>
              <p>Response window: within 24-48 hours</p>
            </div>
          </div>

          <motion.form
            data-reveal
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="text"
              placeholder="Your name"
              className="h-12 rounded-xl border border-[#E2E8C0] bg-[#F5F6ED] px-4 text-sm text-zinc-900 outline-none transition focus:border-[#B8E93A] dark:border-[#2A2A2A] dark:bg-[#121212] dark:text-white"
            />
            <input
              type="email"
              placeholder="Email address"
              className="h-12 rounded-xl border border-[#E2E8C0] bg-[#F5F6ED] px-4 text-sm text-zinc-900 outline-none transition focus:border-[#B8E93A] dark:border-[#2A2A2A] dark:bg-[#121212] dark:text-white"
            />
            <input
              type="text"
              placeholder="Project type"
              className="h-12 rounded-xl border border-[#E2E8C0] bg-[#F5F6ED] px-4 text-sm text-zinc-900 outline-none transition focus:border-[#B8E93A] dark:border-[#2A2A2A] dark:bg-[#121212] dark:text-white sm:col-span-2"
            />
            <textarea
              placeholder="Tell me about your goals..."
              rows={5}
              className="rounded-xl border border-[#E2E8C0] bg-[#F5F6ED] px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#B8E93A] dark:border-[#2A2A2A] dark:bg-[#121212] dark:text-white sm:col-span-2"
            />
            <motion.button
              type="submit"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="h-12 rounded-xl border border-[#B8E93A] bg-[#C6F54D] px-6 text-sm font-semibold uppercase tracking-[0.1em] text-[#111111] shadow-[0_8px_24px_rgba(184,233,58,0.25)] sm:col-span-2"
            >
              Send Inquiry
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
