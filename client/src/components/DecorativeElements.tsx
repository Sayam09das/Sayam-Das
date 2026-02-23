import { motion } from 'framer-motion'

export default function DecorativeElements() {
  return (
    <>
      <motion.svg
        viewBox="0 0 92 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute right-[11%] top-[18%] z-0 h-[76px] w-[76px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
      >
        <path
          d="M44 4 L50 34 L80 40 L50 46 L44 76 L38 46 L8 40 L38 34 Z"
          stroke="#111827"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M70 12 L72 22 L82 24 L72 26 L70 36 L68 26 L58 24 L68 22 Z"
          stroke="#111827"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 110 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute bottom-[17%] right-[8%] z-0 w-[112px]"
        animate={{ x: [0, 7, 0] }}
        transition={{ duration: 3.2, ease: 'easeInOut', repeat: Infinity }}
      >
        <path d="M4 8 Q17 1 31 8 Q45 15 59 8 Q73 1 87 8 Q98 14 106 8" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 21 Q17 14 31 21 Q45 28 59 21 Q73 14 87 21 Q98 27 106 21" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 34 Q17 27 31 34 Q45 41 59 34 Q73 27 87 34 Q98 40 106 34" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
    </>
  )
}
