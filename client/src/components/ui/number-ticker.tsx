import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

interface NumberTickerProps {
  value: number
  direction?: "up" | "down"
  duration?: number
  delay?: number
  className?: string
}

export function NumberTicker({
  value,
  direction = "up",
  duration = 2,
  delay = 0,
  className,
}: NumberTickerProps) {
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      springValue.set(direction === "up" ? value : 0)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [springValue, value, direction, delay])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest))
    })

    return () => unsubscribe()
  }, [springValue])

  return (
    <motion.span className={cn("inline-block", className)}>
      {displayValue}
    </motion.span>
  )
}

