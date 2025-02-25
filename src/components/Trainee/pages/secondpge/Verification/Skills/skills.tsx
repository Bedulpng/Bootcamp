"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { StarRating } from "./star-rating"
import { TextArea } from "../text-area"
import { Button } from "@/components/ui/button"

interface SkillsProps {
  onNext: () => void
  onPrev: () => void;
  updateFormData: (data: any) => void;
}

interface FormData {
  [key: string]: number | string;
  confident: string;
}

const techSkills = ["JavaScript", "Python", "React", "Node.js", "SQL", "HTML/CSS", "Java", "Docker"]

export const Skills: React.FC<SkillsProps> = ({ onNext, onPrev, updateFormData }) => {
  const initialFormData: FormData = techSkills.reduce((acc, skill) => {
    acc[skill] = 1;
    return acc;
  }, {} as FormData);
  initialFormData.confident = "";

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState({
    skills: "",
    confident: "",
  });

  const handleSkillChange = (skill: string, rating: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [skill]: rating,
    }));
  };

  const handleConfidentChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      confident: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      confident: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      skills: "",
      confident: "",
    };
    let hasError = false;

    if (!formData.confident) {
      newErrors.confident = "This field is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
    } else {
      updateFormData(formData);
      onNext();
      console.log("Form submitted:", formData);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Rate your skills</h3>
        {techSkills.map((skill) => (
          <div key={skill} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 w-24">{skill}</span>
            <StarRating
              rating={Number(formData[skill])}
              onRatingChange={(rating) => handleSkillChange(skill, rating)}
            />
          </div>
        ))}
      </div>
      <TextArea
        label="Confident Box"
        name="confident"
        value={formData.confident}
        onChange={handleConfidentChange}
        error={errors.confident}
        placeholder="Explain your strongest skills and expertise..."
      />
      <div className="flex justify-between">
        <Button type="button" onClick={onPrev} variant="secondary">
          Previous
        </Button>
        <Button type="submit">Confirm</Button>
      </div>
    </motion.form>
  );
};
