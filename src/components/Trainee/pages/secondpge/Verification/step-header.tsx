"use client"

import React from "react"
import { motion } from "framer-motion"

interface StepHeaderProps {
  steps: string[]
  currentStep: number
  onStepClick: (step: number) => void
}

export const StepHeader: React.FC<StepHeaderProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <motion.div
            className={`flex items-center cursor-pointer ${index <= currentStep ? "text-blue-600" : "text-gray-400"}`}
            onClick={() => onStepClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                index <= currentStep ? "bg-blue-600" : "bg-gray-300"
              }`}
              initial={false}
              animate={{
                scale: index === currentStep ? 1.2 : 1,
                backgroundColor: index <= currentStep ? "#2563EB" : "#D1D5DB",
              }}
            >
              {index + 1}
            </motion.div>
            <span className="ml-2">{step}</span>
          </motion.div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-gray-300 mx-2">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: "0%" }}
                animate={{ width: index < currentStep ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

