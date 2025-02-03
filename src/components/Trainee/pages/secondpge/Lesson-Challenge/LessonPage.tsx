"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LessonCard } from "./LessonCard"
import { LessonSkeleton } from "../../../Skeleton/LessonSkeleton"
import { FileText } from "lucide-react"

function NoLessons() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="rounded-full bg-muted p-3 mb-4">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">Nothing here yet</h3>
      <p className="text-sm text-muted-foreground">No lessons found for the selected filters.</p>
    </motion.div>
  )
}

interface Lesson {
  id: string
  title: string
  details: string
  mentor: string
  class: string
  status: "assigned" | "submitted" | "notsubmitted"
}

// Simulated data - in real app this would come from an API
const MOCK_LESSONS: Lesson[] = [
  {
    id: "1",
    title: "Mathematics 101",
    details: "Introduction to Algebra",
    mentor: "Dr. Smith",
    class: "Class A",
    status: "assigned",
  },
  {
    id: "2",
    title: "Physics 101",
    details: "Basic Mechanics",
    mentor: "Prof. Johnson",
    class: "Class A",
    status: "submitted",
  },
  {
    id: "3",
    title: "Chemistry 101",
    details: "Atomic Structure",
    mentor: "Dr. Williams",
    class: "Class B",
    status: "notsubmitted",
  },
  {
    id: "4",
    title: "Biology 101",
    details: "Cell Structure",
    mentor: "Prof. Brown",
    class: "Class B",
    status: "assigned",
  },
]

interface Tab {
  value: string;
  label: string;
}

// Define the props for the AnimatedTabs component
interface AnimatedTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  tabs: Tab[];
}

function AnimatedTabs({ value, onValueChange, tabs }: AnimatedTabsProps) {
  return (
    <div className="flex space-x-1 rounded-xl bg-muted p-1 flex-grow">
      {tabs.map((tab) => (
        <motion.button
          key={tab.value}
          className={`${
            value === tab.value ? "bg-background text-foreground" : "text-muted-foreground"
          } relative rounded-lg px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 flex-grow`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
          onClick={() => onValueChange(tab.value)}
        >
          {value === tab.value && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-background mix-blend-difference"
              style={{ borderRadius: 8 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </motion.button>
      ))}
    </div>
  )
}

export default function LessonsPage() {
  const [loading, setLoading] = useState(true)
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Filter lessons based on selected class and status
  useEffect(() => {
    let filtered = [...MOCK_LESSONS]

    if (selectedClass !== "all") {
      filtered = filtered.filter((lesson) => lesson.class === selectedClass)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((lesson) => lesson.status === selectedStatus)
    }

    setFilteredLessons(filtered)
  }, [selectedClass, selectedStatus])

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(4)].map((_, i) => (
          <LessonSkeleton key={i} />
        ))}
      </div>
    )
  }

  const tabs = [
    { value: "all", label: "All" },
    { value: "assigned", label: "Assigned" },
    { value: "submitted", label: "Submitted" },
    { value: "notsubmitted", label: "Not Submitted" },
  ]

  return (
    <div className="space-y-6 p-4">
      <div className="flex space-x-4 items-center">
        <AnimatedTabs value={selectedStatus} onValueChange={setSelectedStatus} tabs={tabs} />
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="Class A">Class A</SelectItem>
            <SelectItem value="Class B">Class B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="space-y-4">
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <LessonCard
                  title={lesson.title}
                  details={lesson.details}
                  mentor={lesson.mentor}
                  status={lesson.status}
                />
              </motion.div>
            ))
          ) : (
            <NoLessons />
          )}
        </div>
      </AnimatePresence>
    </div>
  )
}

