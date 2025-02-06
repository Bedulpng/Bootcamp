"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, BookOpen, Trophy, ChevronRight, ArrowLeft, X, ChevronLeft } from "lucide-react"
import type { Class, File } from "@/types/Trainee"
import { fetchClassById } from "@/Api/FetchBatchbyMentor"
import LessonModal from "./Modal/LessonUpload"
import ChallengeModal from "./Modal/ChallengeUpload"
import { Badge } from "@/components/ui/badge"

// Mock data function
const generateMockSubmissions = (count: number) => {
  const statuses: ("submitted" | "late" | "not submitted")[] = ["submitted", "late", "not submitted"]
  return Array.from({ length: count }, (_, i) => ({
    traineeId: `trainee-${i + 1}`,
    traineeName: `Trainee ${i + 1}`,
    submissionDate: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)] as "submitted" | "late" | "not submitted",
  }))
}

interface ItemDetails {
  title: string
  description: string
  files?: File[]
  deadline?: string
  assignedTrainees?: string[]
  submissions?: {
    traineeId: string
    traineeName: string
    submissionDate: string
    status: "submitted" | "late" | "not submitted"
  }[]
}

const ITEMS_PER_PAGE = 5

export default function ClassDetails() {
  const { classId } = useParams<{ classId: string }>()
  const [activeTab, setActiveTab] = useState("participants")
  const [isNavExpanded, setIsNavExpanded] = useState(true)
  const [selectedItem, setSelectedItem] = useState<ItemDetails | null>(null)
  const [classes, setClasses] = useState<Class[]>([])
  const [assignedTraineesPage, setAssignedTraineesPage] = useState(1)
  const [submissionsPage, setSubmissionsPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classData = await fetchClassById(classId)
        console.log("Class Data:", classData)

        // Add mock data for challenges and lessons
        const updatedClassData = classData.map((classItem) => ({
          ...classItem,
          challenges: classItem.challenges.map((challenge) => ({
            ...challenge,
            assignedTrainees: Array.from({ length: 20 }, (_, i) => `Trainee ${i + 1}`),
            submissions: generateMockSubmissions(20),
          })),
          lessons: classItem.lessons.map((lesson) => ({
            ...lesson,
            assignedTrainees: Array.from({ length: 20 }, (_, i) => `Trainee ${i + 1}`),
            submissions: generateMockSubmissions(20),
          })),
        }))

        setClasses(updatedClassData)
      } catch (error) {
        console.error("Failed to fetch class:", error)
      }
    }

    fetchData()
  }, [classId]) // Added classId to the dependency array

  const tabVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  }

  const expandVariants = {
    collapsed: {
      gridTemplateColumns: "1fr",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    expanded: {
      gridTemplateColumns: "1fr 1fr",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  }

  const navItems = [
    { id: "participants", icon: Users, label: "Participants" },
    { id: "challenges", icon: Trophy, label: "Challenges" },
    { id: "lessons", icon: BookOpen, label: "Lessons" },
  ]

  const handleItemClick = (item: ItemDetails) => {
    setSelectedItem(item)
    setAssignedTraineesPage(1)
    setSubmissionsPage(1)
  }

  const closeExpanded = () => {
    setSelectedItem(null)
  }

  const renderPagination = (currentPage: number, totalItems: number, setPage: (page: number) => void) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    return (
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Button variant="outline" size="sm" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link to="/dashboard/batch">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to Classes</span>
          </Button>
        </Link>
        {/* <h1 className="text-3xl font-bold">{classes.title}</h1> */}
      </div>

      <div className="flex">
        <nav
          className={`bg-white rounded-lg shadow-md p-4 mr-6 transition-all duration-300 ${
            isNavExpanded ? "w-64" : "w-16"
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className="mb-4 w-full flex justify-center"
          >
            <ChevronRight
              className={`h-6 w-6 transition-transform duration-300 ${isNavExpanded ? "rotate-180" : ""}`}
            />
            <span className="sr-only">{isNavExpanded ? "Collapse navigation" : "Expand navigation"}</span>
          </Button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-4 py-2 mb-2 rounded-md text-lg font-semibold transition-all duration-300 ${
                activeTab === item.id ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {isNavExpanded && <span className="ml-2">{item.label}</span>}
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 overflow-hidden"
          >
            {activeTab === "participants" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(classes) &&
                  classes.map((classItem, index) =>
                    classItem.users.map((user, userIndex) => (
                      <motion.div
                        key={`${index}-${userIndex}`}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-4 flex items-center">
                            <img
                              src={
                                user.profiles?.[0]?.filepath
                                  ? `http://192.168.1.6:4000${user.profiles[0].filepath
                                      .replace(/\\/g, "/")
                                      .replace("public", "")}`
                                  : "/placeholder.svg"
                              }
                              alt={user.fullName || "No userName"}
                              width={50}
                              height={50}
                              className="rounded-full mr-4"
                            />
                            <div>
                              <h3 className="font-semibold">{user.fullName || "No userName"}</h3>
                              <p className="text-sm text-gray-600">{user.role || "Student"}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )),
                  )}
              </div>
            )}
            {(activeTab === "challenges" || activeTab === "lessons") && (
              <div className="relative">
                <div className="absolute top-4 right-4 z-50 ">
                  {activeTab === "challenges" ? <ChallengeModal /> : <LessonModal />}
                </div>

                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate={selectedItem ? "expanded" : "collapsed"}
                  className="grid gap-4"
                >
                  <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                      {classes.length === 0 ||
                      (activeTab === "challenges" && classes.every((classItem) => classItem.challenges.length === 0)) ||
                      (activeTab === "lessons" && classes.every((classItem) => classItem.lessons.length === 0)) ? (
                        <p className="text-gray-600 text-center">No {activeTab} yet</p>
                      ) : (
                        classes
                          .flatMap((classItem) =>
                            activeTab === "challenges" ? classItem.challenges : classItem.lessons,
                          )
                          .map((item, index) => (
                            <motion.div
                              key={index}
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                            >
                              <Card
                                className={`overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ${
                                  selectedItem === item ? "ring-2 ring-blue-500" : ""
                                }`}
                                onClick={() => handleItemClick(item)}
                              >
                                <CardHeader>
                                  <CardTitle>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-gray-600 truncate">{item.description}</p>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))
                      )}
                    </div>
                  </ScrollArea>

                  <AnimatePresence>
                    {selectedItem && (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg p-6 border border-blue-200"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-2xl font-bold text-blue-800">{selectedItem.title}</h2>
                          <Button variant="ghost" size="icon" onClick={closeExpanded}>
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close details</span>
                          </Button>
                        </div>
                        <p className="text-gray-700 mb-4">{selectedItem.description}</p>
                        {selectedItem.files &&
                          selectedItem.files.map((file, index) => (
                            <p key={index} className="text-sm font-semibold text-blue-600 mb-2">
                              File: {file.filename}
                            </p>
                          ))}
                        {selectedItem.deadline && (
                          <p className="text-sm font-semibold text-blue-600 mb-4">
                            Deadline: {new Date(selectedItem.deadline).toLocaleString()}
                          </p>
                        )}

                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-blue-800 mb-2">Assigned Trainees</h3>
                          {selectedItem.assignedTrainees && selectedItem.assignedTrainees.length > 0 ? (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {selectedItem.assignedTrainees
                                  .slice(
                                    (assignedTraineesPage - 1) * ITEMS_PER_PAGE,
                                    assignedTraineesPage * ITEMS_PER_PAGE,
                                  )
                                  .map((trainee, index) => (
                                    <Card key={index} className="bg-white shadow">
                                      <CardContent className="p-4">
                                        <p className="font-medium text-gray-800">{trainee}</p>
                                      </CardContent>
                                    </Card>
                                  ))}
                              </div>
                              {renderPagination(
                                assignedTraineesPage,
                                selectedItem.assignedTrainees.length,
                                setAssignedTraineesPage,
                              )}
                            </>
                          ) : (
                            <p className="text-gray-600">No trainees assigned yet.</p>
                          )}
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-blue-800 mb-2">Submissions</h3>
                          {selectedItem.submissions && selectedItem.submissions.length > 0 ? (
                            <>
                              <div className="grid grid-cols-1 gap-4">
                                {selectedItem.submissions
                                  .slice((submissionsPage - 1) * ITEMS_PER_PAGE, submissionsPage * ITEMS_PER_PAGE)
                                  .map((submission, index) => (
                                    <Card key={index} className="bg-white shadow">
                                      <CardContent className="p-4 flex justify-between items-center">
                                        <div>
                                          <p className="font-medium text-gray-800">{submission.traineeName}</p>
                                          <p className="text-sm text-gray-600">
                                            Submitted: {new Date(submission.submissionDate).toLocaleString()}
                                          </p>
                                        </div>
                                        <Badge
                                          variant={
                                            submission.status === "submitted"
                                              ? "default"
                                              : submission.status === "late"
                                                ? "destructive"
                                                : "outline"
                                          }
                                        >
                                          {submission.status}
                                        </Badge>
                                      </CardContent>
                                    </Card>
                                  ))}
                              </div>
                              {renderPagination(submissionsPage, selectedItem.submissions.length, setSubmissionsPage)}
                            </>
                          ) : (
                            <p className="text-gray-600">No submissions yet.</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

