"use client"

import * as React from "react"
import { BarChart, Calendar, Eye, GraduationCap, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Presentation {
  id: number
  student: string
  batch: string
  class: string
  presentationName: string
  status: string
  fileType: string
  fileUrl: string
}

export default function ExaminerDashboard() {
  const [selectedBatch, setSelectedBatch] = React.useState<string>("all")
  const [selectedClass, setSelectedClass] = React.useState<string>("all")
  const [isLoading, setIsLoading] = React.useState(true)

  // Mock data for presentations
  const presentations: Presentation[] = [
    {
      id: 1,
      student: "Alice Johnson",
      batch: "2023A",
      class: "Web Development",
      presentationName: "E-commerce Platform",
      status: "Pending",
      fileType: "pdf",
      fileUrl: "/sample.pdf",
    },
    {
      id: 2,
      student: "Bob Smith",
      batch: "2023A",
      class: "Data Science",
      presentationName: "Predictive Analytics Model",
      status: "Graded",
      fileType: "mp4",
      fileUrl: "/sample.mp4",
    },
    {
      id: 3,
      student: "Charlie Brown",
      batch: "2023B",
      class: "Mobile App Development",
      presentationName: "Health Tracking App",
      status: "Pending",
      fileType: "pdf",
      fileUrl: "/sample.pdf",
    },
    {
      id: 4,
      student: "Diana Ross",
      batch: "2023B",
      class: "Web Development",
      presentationName: "Social Media Dashboard",
      status: "Pending",
      fileType: "pptx",
      fileUrl: "/sample.pptx",
    },
    {
      id: 5,
      student: "Ethan Hunt",
      batch: "2023C",
      class: "Data Science",
      presentationName: "Natural Language Processing Tool",
      status: "Graded",
      fileType: "mp4",
      fileUrl: "/sample.mp4",
    },
  ]

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  const filteredPresentations = presentations.filter(
    (p) =>
      (selectedBatch === "all" || p.batch === selectedBatch) && (selectedClass === "all" || p.class === selectedClass),
  )

  const totalPresentations = presentations.length
  const gradedPresentations = presentations.filter((p) => p.status === "Graded").length
  const pendingPresentations = totalPresentations - gradedPresentations

  const FilePreview: React.FC<{ file: Presentation }> = ({ file }) => {
    // React.useEffect(() => {
    //   if (file.fileType === "mp4") {
    //     const video = document.createElement("video")
    //     video.onloadedmetadata = () => {
    //       setAspectRatio({ width: video.videoWidth, height: video.videoHeight })
    //     }
    //     video.src = file.fileUrl
    //   }
    // }, [file])

    if (file.fileType === "mp4") {
      return (
        <div className="w-full aspect-video bg-black flex items-center justify-center">
          <video src={file.fileUrl} controls className="w-full h-full">
            Your browser does not support the video tag.
          </video>
        </div>
      )
    } else if (file.fileType === "pdf") {
      return <iframe src={file.fileUrl} title={`Preview of ${file.presentationName}`} className="w-full h-[80vh]" />
    } else {
      // For other file types (e.g., pptx), show a placeholder or download link
      return (
        <div className="w-full h-[80vh] flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="mb-4">Preview not available for {file.fileType.toUpperCase()} files</p>
            <Button asChild>
              <a href={file.fileUrl} download>
                Download File
              </a>
            </Button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen p-6">
      <main className="max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="bg-blue-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Presentations</CardTitle>
              <GraduationCap className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20 bg-blue-400" />
              ) : (
                <div className="text-2xl font-bold">{totalPresentations}</div>
              )}
            </CardContent>
          </Card>
          <Card className="bg-green-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Graded Presentations</CardTitle>
              <BarChart className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20 bg-green-400" />
              ) : (
                <div className="text-2xl font-bold">{gradedPresentations}</div>
              )}
            </CardContent>
          </Card>
          <Card className="bg-amber-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trainee Not Submitted Yet</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20 bg-amber-400" />
              ) : (
                <div className="text-2xl font-bold">{pendingPresentations}</div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Presentations</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage and grade student final presentations across all batches and classes.
            </p>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select Batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    <SelectItem value="2023A">Batch 2023A</SelectItem>
                    <SelectItem value="2023B">Batch 2023B</SelectItem>
                    <SelectItem value="2023C">Batch 2023C</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search presentations..."
                  className="pl-10 w-full md:w-[300px] bg-white"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Student</TableHead>
                    <TableHead className="font-semibold">Batch</TableHead>
                    <TableHead className="font-semibold">Class</TableHead>
                    <TableHead className="font-semibold">Final Presentation</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Skeleton className="h-6 w-32" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-20" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-28" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-40" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-24" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-8 w-20" />
                          </TableCell>
                        </TableRow>
                      ))
                    : filteredPresentations.map((presentation) => (
                        <TableRow key={presentation.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{presentation.student}</TableCell>
                          <TableCell>{presentation.batch}</TableCell>
                          <TableCell>{presentation.class}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="link" className="p-0 h-auto font-normal">
                                  {presentation.presentationName}
                                  <Eye className="ml-2 h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-[80vw] w-full max-h-[90vh] p-0 overflow-hidden">
                                <DialogHeader className="p-6 bg-white border-b">
                                  <DialogTitle>{presentation.presentationName}</DialogTitle>
                                </DialogHeader>
                                <div className="flex-grow overflow-auto">
                                  <FilePreview file={presentation} />
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                presentation.status === "Pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {presentation.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant={presentation.status === "Pending" ? "default" : "default"}
                              size="sm"
                              className={presentation.status === "Pending" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"}
                            >
                              {presentation.status === "Pending" ? "Grade" : "Grade"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

