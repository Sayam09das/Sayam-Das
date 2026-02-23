import { motion } from 'framer-motion'

export default function CircularBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.65, rotate: -14 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-[-28px] top-10 z-20 flex h-[138px] w-[138px] items-center justify-center rounded-full border-2 border-zinc-900 bg-white shadow-[0_16px_38px_rgba(0,0,0,0.14)]"
    >
      <motion.svg
        viewBox="0 0 140 140"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
      >
        <defs>
          <path
            id="freelanceCirclePath"
            d="M 70,70 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
          />
        </defs>
        <text className="fill-zinc-900 text-[10px] font-bold [letter-spacing:1.8px] uppercase">
          <textPath href="#freelanceCirclePath" startOffset="0%">
            AVAILABLE FOR FREELANCE • AVAILABLE FOR FREELANCE •
          </textPath>
        </text>
      </motion.svg>

      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-7 w-7 text-zinc-900"
        whileHover={{ x: 1, y: -1 }}
      >
        <path
          d="M7 17L17 7M17 7H7M17 7V17"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  )
}
