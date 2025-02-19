"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { TextInput } from "../text-input"
import { DatePicker } from "./date-picker"
import { CustomPhoneInput } from "./phone-input"
import { Button } from "@/components/ui/button"

interface PersonalInfoProps {
  onNext: () => void
  updateFormData: (data: any) => void
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ onNext, updateFormData }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    nickname: "",
    pob: "",
    dob: "",
    address: "",
    mobile: "",
  })

  const [errors, setErrors] = useState({
    fullName: "",
    nickname: "",
    pob: "",
    dob: "",
    address: "",
    mobile: "",
  })

  const handleChange = (name: string, value: string) => {
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
    e.preventDefault()
    const newErrors = { ...errors }
    let hasError = false

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key as keyof typeof errors] = "This field is required"
        hasError = true
      }
    })

    if (hasError) {
      setErrors(newErrors)
    } else {
      updateFormData(formData)
      onNext()
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <TextInput
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
      />
      <TextInput
        label="Nickname"
        name="nickname"
        value={formData.nickname}
        onChange={handleChange}
        error={errors.nickname}
      />
      <TextInput
        label="Place of Birth"
        name="pob"
        value={formData.pob}
        onChange={handleChange}
        error={errors.pob}
      />
      <DatePicker
        label="Date of Birth"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        error={errors.dob}
      />
      <TextInput
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
      />
      <CustomPhoneInput
        label="Mobile Phone"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        error={errors.mobile}
      />
      <Button type="submit">Next</Button>
    </motion.form>
  )
}

