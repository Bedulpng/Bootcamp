"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-hot-toast"
import { PersonalInfo } from "./Personal/personal-info"
import { Education } from "./Education/education"
import { Skills } from "./Skills/skills"
import { StepHeader } from "./step-header"
import axios from "axios"
import "react-phone-number-input/style.css"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react" // Close icon

const steps = ["Personal", "Education", "Skills"]

interface FormData {
  personal: Record<string, any>
  education: Record<string, any>
  skills: Record<string, any>
}

interface MultiStepFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export const MultiStepFormModal: React.FC<MultiStepFormModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    personal: {},
    education: {},
    skills: {},
  })

  toast.error("Verify First")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    } else {
      window.removeEventListener("keydown", handleKeyDown)
    }

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const handleStepChange = (step: number) => {
    if (step > currentStep) {
      toast.error("You must complete the previous form first.")
    } else {
      setCurrentStep(step)
    }
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (stepName: keyof FormData, data: Record<string, any>) => {
    setFormData((prevData) => ({
      ...prevData,
      [stepName]: { ...prevData[stepName], ...data },
    }))
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem("refreshToken")
    if (!token) {
      toast.error("Authorization token not found")
      return
    }

    const { personal, education, skills } = formData
    const formattedData = { ...personal, ...education, ...skills }

    try {
      await axios.put("http://192.168.1.12:4000/trainee/verify", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success("Verification form submitted successfully")
      onClose() // Close the modal on success
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error submitting form:", error)
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred while submitting the form")
      } else {
        toast.error("An unexpected error occurred")
      }
    }
  }

  if (!isOpen) return null // Don't render modal if not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <X size={24} />
        </button>

        <StepHeader steps={steps} currentStep={currentStep} onStepClick={handleStepChange} />

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <PersonalInfo
              key="personal"
              onNext={handleNextStep}
              updateFormData={(data) => updateFormData("personal", data)}
            />
          )}
          {currentStep === 1 && (
            <Education
              key="education"
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              updateFormData={(data) => updateFormData("education", data)}
            />
          )}
          {currentStep === 2 && (
            <Skills
              key="skills"
              onPrev={handlePrevStep}
              updateFormData={(data) => updateFormData("skills", data)}
              formData={formData}
            />
          )}
        </AnimatePresence>

        {/* Submit Button */}
        {currentStep === 2 && (
          <div className="flex justify-between mt-8">
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
