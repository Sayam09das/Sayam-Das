import { motion } from 'framer-motion'

export default function HeroLeft() {
  return (
    <div className="relative z-10 flex flex-col items-start gap-7">
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-4 py-2"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-700">
          Available for freelance
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3 }}
        className="space-y-5"
      >
        <h1 className="text-[clamp(42px,7vw,88px)] font-black leading-[0.92] tracking-[-0.04em] text-zinc-900">
          Creative
          <br />
          Digital
          <br />
          Designer
        </h1>

        <svg
          viewBox="0 0 360 18"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[18px] w-[220px] text-orange-500"
        >
          <motion.path
            d="M3 11 C40 3, 76 17, 111 9 C145 2, 182 16, 216 8 C250 1, 286 15, 322 7 C337 4, 347 8, 357 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-[520px] text-base leading-8 text-zinc-700 md:text-lg"
      >
        I design bold digital experiences that connect brand, product, and story.
        From identity systems to interactive UI, every detail is crafted with intent.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-xl border border-zinc-900 bg-zinc-900 px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white"
      >
        View Portfolio
      </motion.button>
    </div>
  )
}
