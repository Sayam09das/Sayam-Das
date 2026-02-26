import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

interface TypewriterProps {
  words: string[]
  duration?: number
  delay?: number
  className?: string
  cursorClassName?: string
}

export function Typewriter({
  words,
  duration = 100,
  delay = 0,
  className,
  cursorClassName,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1))
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? duration / 2 : duration)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, duration])

  // Initial delay
  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      // Start typing after delay
    }, delay)
    return () => clearTimeout(initialTimeout)
  }, [delay])

  return (
    <span className={cn("inline-flex items-center", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWordIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="inline"
        >
          {currentText}
        </motion.span>
      </AnimatePresence>
      <span
        className={cn(
          "inline-block h-[1em] w-[0.1em] bg-blue-400 ml-[2px] animate-pulse",
          cursorClassName
        )}
        aria-hidden="true"
      />
    </span>
  )
}

