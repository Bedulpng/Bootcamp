"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Class } from "@/types/Trainee"

interface AnimatedDropdownProps {
  options: Class[]
  onSelect: (option: Class, e: React.MouseEvent) => void
}

export default function AnimatedDropdown({ options, onSelect }: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Class | null>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (option: Class, e: React.MouseEvent) => {
    setSelectedOption(option)
    onSelect(option, e)
    setIsOpen(false)
  }

  return (
    <div className="relative w-64">
      <motion.button
        type="button"
        onClick={toggleDropdown}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        whileTap={{ scale: 0.995 }}
      >
        <span>{selectedOption ? selectedOption.className : "Select a class"}</span>
        <motion.span
          className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <motion.li
                key={option.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(option,e)}}
                className="relative px-4 py-2 text-sm text-gray-900 cursor-pointer select-none"
                whileHover={{ backgroundColor: "#3b82f6", color: "#ffffff" }}
                whileTap={{ scale: 0.98 }}
              >
                {option.className}
                {selectedOption?.id === option.id && (
                  <motion.span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.span>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

