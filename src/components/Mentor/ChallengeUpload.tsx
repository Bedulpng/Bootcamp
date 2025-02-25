"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { jwtDecode } from "jwt-decode"
import toast from "react-hot-toast"

interface ChallengeUploadFormProps {
  onSuccess: () => void
  classId: string | undefined;
  batchId: string | undefined;
}

export default function ChallengeUpload({ onSuccess, classId, batchId }: ChallengeUploadFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState<Date | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "application/zip"]
  const maxFiles = 3
  const refreshToken = localStorage.getItem('refreshToken')
  let userId: string = "";
  if (refreshToken) {
    try {
      const decoded: any = jwtDecode(refreshToken);
      userId = decoded.id;
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!title || !description || files.length === 0 || !deadline) {
      setError("Please fill in all fields, select a deadline, and upload at least one file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deadline", deadline.toISOString());
    formData.append("mentorId", userId); // Replace with actual mentor ID
  
    if (batchId) {
      formData.append("batchId", batchId);
    }
    if (classId) {
      formData.append("classId", classId);
    }
  
    files.forEach((file) => formData.append("files", file));
  
    try {
      const response = await fetch("http://10.10.103.248:4000/uploads/challenge", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`, 
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to upload the challenge.");
        return;
      }
  
      const data = await response.json();
      console.log("Upload successful:", data);
  
      // Reset form after submission
      setTitle("");
      setDescription("");
      setFiles([]);
      setDeadline(null);
      setError(null);
  
      // Call the onSuccess callback to close the modal
      onSuccess();
  
      toast.success("Lesson/Challenge uploaded successfully!");
    } catch (error) {
      console.error("Error uploading challenge:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter challenge title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter challenge description"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <DatePicker
          id="deadline"
          selected={deadline}
          onChange={(date: Date | null) => setDeadline(date)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Select deadline"
          className="w-full px-3 py-2 border rounded-md text-gray-700"
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
        Upload Challenge
      </Button>
    </form>
  )
}
