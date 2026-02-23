import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
}

export default function PageWrapper({ children, sectionKey }) {
  return (
    <motion.div
      key={sectionKey}
      data-scroll-section
      initial="initial"
      whileInView="animate"
      viewport={{ amount: 0.2, once: true }}
      exit="exit"
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
