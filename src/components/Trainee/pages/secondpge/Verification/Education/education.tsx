"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { TextInput } from "../text-input"
import { Dropdown } from "./dropdown"
import { BooleanSelect } from "./boolean-select"
import { Button } from "@/components/ui/button"

interface EducationProps {
  onNext: () => void
  onPrev: () => void
  updateFormData: (data: any) => void
}

export const Education: React.FC<EducationProps> = ({ onNext, onPrev, updateFormData }) => {
  const [formData, setFormData] = useState({
    lastEdu: "",
    lastEduInst: "",
    major: "",
    inCollege: false,
    college: "",
    currentMajor: "",
    github: "",
  })

  const [errors, setErrors] = useState({
    lastEdu: "",
    lastEduInst: "",
    major: "",
    inCollege: "",
    college: "",
    currentMajor: "",
    github: "",
  })

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors };
    let hasError = false;
  
    Object.keys(formData).forEach((key) => {
      // Ensure `false` is treated as a valid value
      if (key !== "college" && key !== "currentMajor" && formData[key as keyof typeof formData] === "") {
        newErrors[key as keyof typeof errors] = "This field is required";
        hasError = true;
      }
    });
  
    // Ensure inCollege validation works correctly
    if (formData.inCollege) {
      if (!formData.college.trim()) {
        newErrors.college = "This field is required";
        hasError = true;
      }
      if (!formData.currentMajor.trim()) {
        newErrors.currentMajor = "This field is required";
        hasError = true;
      }
    }
  
    if (hasError) {
      setErrors(newErrors);
    } else {
      updateFormData(formData);
      onNext();
    }
  };
  

  return (
    <motion.form
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Dropdown
        label="Last Education"
        name="lastEdu"
        value={formData.lastEdu}
        onChange={handleChange}
        options={["High School", "Bachelor", "Master", "PhD"]}
        error={errors.lastEdu}
      />
      <TextInput label="Last Edu Institution" name="lastEduInst" value={formData.lastEduInst} onChange={handleChange} error={errors.lastEduInst} />
      <TextInput label="Major" name="major" value={formData.major} onChange={handleChange} error={errors.major} />
      <BooleanSelect
        label="Currently in College?"
        name="inCollege"
        value={formData.inCollege}
        onChange={handleChange}
        error={errors.inCollege}
      />
      {formData.inCollege && (
        <>
          <TextInput
            label="College Name"
            name="college"
            value={formData.college}
            onChange={handleChange}
            error={errors.college}
          />
          <TextInput
            label="Current Major"
            name="currentMajor"
            value={formData.currentMajor}
            onChange={handleChange}
            error={errors.currentMajor}
          />
        </>
      )}
      <TextInput
        label="GitHub Account"
        name="github"
        value={formData.github}
        onChange={handleChange}
        error={errors.github}
      />
      <div className="flex justify-between">
        <Button type="button" onClick={onPrev} variant="secondary">
          Previous
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </motion.form>
  )
}

