"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload } from "lucide-react"
import LessonChallengeUploadForm from "../LessonUpload"
import { useParams } from "react-router-dom"


export default function LessonModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { classId } = useParams<{ classId: string }>();
  const { batchId } = useParams<{batchId: string}>();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Lesson</DialogTitle>
        </DialogHeader>
        <LessonChallengeUploadForm onSuccess={() => setIsOpen(false)} classId={classId} batchId={batchId}/>
      </DialogContent>
    </Dialog>
  )
}

