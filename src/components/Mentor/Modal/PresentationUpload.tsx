"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload } from "lucide-react"
import { useParams } from "react-router-dom"
import PresentationUpload from "../PresentationUpload"


export default function PresentationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { classId } = useParams<{ classId: string }>();
  const { batchId } = useParams<{batchId: string}>();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload Final Presentation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Final Presentation</DialogTitle>
        </DialogHeader>
        <PresentationUpload onSuccess={() => setIsOpen(false)} classId={classId} batchId={batchId}/>
      </DialogContent>
    </Dialog>
  )
}

