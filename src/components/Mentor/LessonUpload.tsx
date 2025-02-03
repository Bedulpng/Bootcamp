"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface LessonUploadFormProps {
  onSuccess: () => void
}

export default function UploadForm({ onSuccess }: LessonUploadFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "application/zip"]
  const maxFiles = 3

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])

    if (selectedFiles.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files.`)
      return
    }

    const invalidFiles = selectedFiles.filter((file) => !allowedTypes.includes(file.type))
    if (invalidFiles.length > 0) {
      setError("Only PDF, JPEG, PNG, and ZIP files are allowed.")
      return
    }

    setFiles(selectedFiles)
    setError(null)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!title || !description || files.length === 0) {
      setError("Please fill in all fields and upload at least one file.")
      return
    }

    // Here you would typically send the data to your server
    console.log("Submitting:", { title, description, files })

    // Reset form after submission
    setTitle("")
    setDescription("")
    setFiles([])
    setError(null)

    // Call the onSuccess callback to close the modal
    onSuccess()

    // Show success message (in a real app, you'd want to handle this more robustly)
    alert("Lesson/Challenge uploaded successfully!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter lesson title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter lesson description"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="files">Upload Files (Max 3)</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="files"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpeg,.jpg,.png,.zip"
            multiple
            className="hidden"
          />
          <Button type="button" variant="outline" onClick={() => document.getElementById("files")?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Choose Files
          </Button>
          <span className="text-sm text-gray-500">
            {files.length > 0 ? `${files.length} file(s) selected` : "No files chosen"}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Only PDF, JPEG, PNG, and ZIP files are allowed.</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full">
        Upload Lesson
      </Button>
    </form>
  )
}

