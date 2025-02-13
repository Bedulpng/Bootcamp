"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, AlertCircle, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Note, type File } from "@/types/Trainee";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import { getChallengeStatus, getLessonStatus } from "@/Api/SubmitAssignment";
import ViewNoteModal from "../Modal/ViewNote";

interface SubmissionFormProps {
  itemId: string | undefined;
}

export default function SubmissionForm({ itemId }: SubmissionFormProps) {
  const [submissionFiles, setSubmissionFiles] = useState<File[]>([]);
  const [submissionNote, setSubmissionNote] = useState<Note[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const itemType = location.pathname.startsWith("/trainee/lesson")
    ? "lesson"
    : "challenge";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshToken = localStorage.getItem("refreshToken");
  let userId: string = "";
  if (refreshToken) {
    try {
      const decoded: any = jwtDecode(refreshToken);
      userId = decoded.id;
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const Id = itemId || "";
      try {
        const isChallenge =
          window.location.pathname.includes("trainee/challenge");
        if (isChallenge) {
          // Cek status dari tabel `challenge`
          const challengeResponse = await getChallengeStatus(Id, userId);
          if (challengeResponse?.submissionFiles) {
            setSubmissionFiles(challengeResponse.submissionFiles);
          }
          if (challengeResponse?.notes) {
            setSubmissionNote(challengeResponse.notes);
          }
          if (challengeResponse?.status) {
            setStatus(challengeResponse.status);
            if (
              challengeResponse.status === "SUBMITTED" ||
              challengeResponse.status === "GRADED"
            ) {
              setIsSubmitted(true);
            }
          }
        } else {
          // Cek status dari tabel `lesson`
          const lessonResponse = await getLessonStatus(Id, userId);
          if (lessonResponse?.submissionFiles) {
            setSubmissionFiles(lessonResponse.submissionFiles);
          }
          if (lessonResponse?.notes) {
            setSubmissionNote(lessonResponse.notes);
          }
          if (lessonResponse?.status) {
            setStatus(lessonResponse.status); // SUBMITTED atau NOTSUBMITTED
            console.log(lessonResponse.files);
            if (
              lessonResponse.status === "SUBMITTED" ||
              lessonResponse.status === "GRADED"
            ) {
              setIsSubmitted(true);
            }
          }
        }
      } catch (error: any) {
        console.error("Error fetching status:", error);
      }
    };
    fetchStatus();
  }, []);

  if (isSubmitted) {
    return (
      <Card className="w-[300px] shadow-lg">
        <CardContent className="pt-6">
          {submissionFiles && submissionFiles.length > 0 ? (
            <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm flex-1 truncate">
                {submissionFiles.map((f) => f.filename).join(", ")}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center p-2 text-sm text-muted-foreground">
              No attachment
            </div>
          )}

          <div className="my-4 border-t border-muted"></div>

          {submissionNote && submissionNote.length > 0 ? (
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-sm text-center">View Notes</span>
              <button
                className="p-1 text-muted-foreground hover:text-primary transition"
                onClick={handleModalOpen}
                aria-label="View notes"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center p-2 text-sm text-muted-foreground">
              No notes yet
            </div>
          )}

          {/* Render the modal */}
          {isModalOpen && (
            <ViewNoteModal notes={submissionNote} onClose={handleModalClose} />
          )}
        </CardContent>
      </Card>
    );
  }

  const allowedFileTypes = ["image/png", "image/jpeg", "application/pdf"]; // Add allowed MIME types here

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).filter((file) => {
        if (!allowedFileTypes.includes(file.type)) {
          alert(`File type not allowed: ${file.name}`);
          return false;
        }
        return true;
      }).map((file) => ({
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        filename: file.name,
        filepath: URL.createObjectURL(file), // Create a temporary URL
        mimetype: file.type,
        ...(itemType === "lesson"
          ? { lessonId: itemId }
          : { challengeId: itemId }),
      }));
  
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  
  const handleRemoveFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };
  
  const handleSubmit = async (confirmed = false) => {
    if (files.length === 0 && !confirmed) {
      setShowDialog(true);
      return;
    }
  
    setIsSubmitting(true);
  
    const formData = new FormData();
    formData.append("userId", userId);
    files.forEach((file) => {
      formData.append(
        "files",
        new Blob([file.filepath], { type: file.mimetype }),
        file.filename
      );
    });
  
    const endpoint =
      itemType === "lesson"
        ? `http://10.10.103.13:4000/complete/lesson/${itemId}`
        : `http://10.10.103.13:4000/complete/challenge/${itemId}`;
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Submission failed");
      }
  
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <Card className="w-full max-w-[300px] shadow-md">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Assignment</CardTitle>
          <span className="text-sm text-green-600">{status}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          multiple
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="w-full border-dashed"
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah atau buat
        </Button>
        <AnimatePresence>
          {files.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {files.map((file) => (
                <motion.li
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                >
                  <span className="truncate mr-2">
                    {file.filename} ({(file.filepath.length / 1024).toFixed(2)}{" "}
                    KB)
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleRemoveFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <Button
          onClick={() => handleSubmit()}
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          {isSubmitting ? "Submitting..." : "Tandai sebagai selesai"}
        </Button>
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Submission Result</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Mark as complete?</AlertDialogTitle>
              <AlertDialogDescription>
                You don't have any attachment on this {itemType}. Are you sure
                you want to continue?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleSubmit(true)}>
                Yes, continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
