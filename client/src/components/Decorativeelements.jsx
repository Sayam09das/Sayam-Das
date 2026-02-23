import { motion } from 'framer-motion'

export default function DecorativeElements({ sparklesRef, wavesRef }) {
  return (
    <>
      <motion.svg
        ref={sparklesRef}
        viewBox="0 0 94 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute right-[7%] top-[16%] z-0 h-[60px] w-[60px] text-zinc-900 will-change-transform dark:text-[#BBBBBB] sm:h-[72px] sm:w-[72px] lg:h-[84px] lg:w-[84px]"
        animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M46 6 L52 36 L82 42 L52 48 L46 78 L40 48 L10 42 L40 36 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M72 14 L74 24 L84 26 L74 28 L72 38 L70 28 L60 26 L70 24 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </motion.svg>

      <motion.svg
        ref={wavesRef}
        viewBox="0 0 120 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute bottom-[14%] right-[6%] z-0 w-[90px] text-zinc-900 will-change-transform dark:text-[#BBBBBB] sm:w-[108px] lg:w-[124px]"
        animate={{ x: [0, 7, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M4 8 Q18 1 33 8 Q48 15 63 8 Q78 1 93 8 Q104 14 116 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 22 Q18 15 33 22 Q48 29 63 22 Q78 15 93 22 Q104 28 116 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 36 Q18 29 33 36 Q48 43 63 36 Q78 29 93 36 Q104 42 116 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
    </>
  )
}
