import { motion } from 'framer-motion'
import CircularBadge from './CircularBadge'

export default function HeroRight() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 36 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative z-10 mx-auto flex w-full max-w-[520px] items-end justify-center"
    >
      <CircularBadge />

      <div className="w-full overflow-hidden rounded-[190px_190px_18px_18px] border border-zinc-900/10 bg-[linear-gradient(165deg,#d6d2ff_0%,#c1dafd_46%,#f4f6ff_100%)] shadow-[0_30px_90px_rgba(34,41,93,0.2)]">
        <img
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80"
          alt="Designer portrait"
          className="h-[580px] w-full object-cover object-top"
        />
      </div>
    </motion.div>
  )
}
