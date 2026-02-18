import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedShinyText({ children, className }: AnimatedShinyTextProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center justify-center transition-all ease-out hover:text-green-400 hover:duration-300",
        className
      )}
      initial={{ backgroundPosition: "0% 50%" }}
      whileHover={{ backgroundPosition: "100% 50%" }}
    >
      {children}
    </motion.span>
  );
}

