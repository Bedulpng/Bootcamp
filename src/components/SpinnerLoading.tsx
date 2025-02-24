"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const loadingTexts = [
  "Just a moment...",
  "Almost there...",
  "Loading your content...",
  "Hang tight...",
  "Working on it...",
  "Getting things ready...",
  "Please wait...",
  "Loading awesome stuff...",
  "This won't take long...",
  "Processing...",
]

export function DotSpinner({ className }: { className?: string }) {
  const [loadingText, setLoadingText] = React.useState(loadingTexts[0])

  React.useEffect(() => {
    // Change the loading text every 3 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length)
      setLoadingText(loadingTexts[randomIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn("flex flex-col items-center gap-4", className)} role="status">
      <div className="flex items-center gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: "#0033FF" }}
            animate={{
              y: ["0%", "-50%", "0%"],
            }}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <motion.span
        className="text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={loadingText}
      >
        {loadingText}
      </motion.span>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

