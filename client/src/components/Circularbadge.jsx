import { motion } from 'framer-motion'

export default function CircularBadge({ badgeRef }) {
  return (
    <motion.div
      ref={badgeRef}
      initial={{ opacity: 0, y: 26, scale: 0.5, rotate: -18 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: -8 }}
      transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.8 }}
      className="absolute left-[-20px] top-8 z-20 flex h-[112px] w-[112px] items-center justify-center rounded-full border-2 border-zinc-900 bg-white shadow-[0_15px_38px_rgba(0,0,0,0.2)] will-change-transform dark:border-[#2A2A2A] dark:bg-[#1A1A1A] sm:h-[126px] sm:w-[126px] lg:h-[138px] lg:w-[138px]"
    >
      <style>{`
        @keyframes spin-anticlockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .badge-text-spin {
          transform-origin: 70px 70px;
          animation: spin-anticlockwise 12s linear infinite;
        }
      `}</style>
      <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full">
        <defs>
          <path
            id="portfolioBadgeTextPath"
            d="M 70,70 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
          />
        </defs>
        <text className="badge-text-spin fill-zinc-900 text-[10px] font-extrabold uppercase [letter-spacing:1.5px] dark:fill-white">
          <textPath href="#portfolioBadgeTextPath" startOffset="0%">
            AVAILABLE FOR FREELANCE • AVAILABLE FOR FREELANCE •
          </textPath>
        </text>
      </svg>

      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-7 w-7 text-zinc-900 dark:text-white"
        whileHover={{ x: 1, y: -1 }}
        transition={{ duration: 0.2 }}
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
