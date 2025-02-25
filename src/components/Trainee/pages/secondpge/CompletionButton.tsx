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
import { Note, type Files } from "@/types/Trainee";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import { getChallengeStatus, getLessonStatus, getPresentationStatus } from "@/Api/SubmitAssignment";
import ViewNoteModal from "../Modal/ViewNote";
import axios from "axios";

interface SubmissionFormProps {
  itemId: string | undefined;
}

export default function SubmissionForm({ itemId }: SubmissionFormProps) {
  const [submissionFiles, setSubmissionFiles] = useState<Files[]>([]);
  const [submissionNote, setSubmissionNote] = useState<Note[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const path = location.pathname;

  const itemType = path.includes("/lesson")
    ? "lesson"
    : path.includes("/challenge")
    ? "challenge"
    : path.includes("/presentation")
    ? "presentation"
    : "";

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
        let response;
        switch (itemType) {
          case "challenge":
            response = await getChallengeStatus(Id, userId);
            break;
          case "lesson":
            response = await getLessonStatus(Id, userId);
            break;
          case "presentation":
            response = await getPresentationStatus(Id, userId);
            break;
          default:
            console.warn("Unknown item type.");
            return;
        }

        if (response) {
          setSubmissionFiles(response.submissionFiles || []);
          setSubmissionNote(response.notes || []);
          setStatus(response.status || "");
          setIsSubmitted(response.status === "SUBMITTED" || response.status === "GRADED");
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStatus();
  }, [itemType, itemId, userId]);

  const allowedFileTypes = ["image/png", "image/jpeg", "application/pdf", "video/mp4"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
        .filter((file) => {
          if (!allowedFileTypes.includes(file.type)) {
            alert(`File type not allowed: ${file.name}`);
            return false;
          }
          return true;
        })
        .map((file) => file);

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };


  const handleRemoveFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const handleSubmit = async (confirmed = false) => {
    if (files.length === 0 && !confirmed) {
      setShowDialog(true);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("userId", String(userId));
    files.forEach((file) => formData.append("files", file));

    console.log("FormData entries:", );
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const endpoint =
      itemType === "lesson"
        ? `http://10.10.103.248:4000/complete/lesson/${itemId}`
        : itemType === "challenge"
        ? `http://10.10.103.248:4000/complete/challenge/${itemId}`
        : `http://10.10.103.248:4000/complete/presentation/${itemId}`;

    try {
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
    } catch (error: any) {
      console.error("Submission failed:", error);
      setMessage("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-[300px] shadow-lg">
        <CardContent className="pt-6">
          {submissionFiles.length > 0 ? (
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

          {submissionNote.length > 0 ? (
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

          {isModalOpen && <ViewNoteModal notes={submissionNote} onClose={handleModalClose} />}
        </CardContent>
      </Card>
    );
  }

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
          <Plus className="mr-2 h-4 w-4" /> Add or Create
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
                  key={file.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                >
                  <span className="truncate mr-2">{file.name}</span>
                  <div className="flex gap-2">
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0 hover:bg-primary/10"
                      onClick={() => handlePreviewFile(file)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button> */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleRemoveFile(file)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
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
          {isSubmitting ? "Submitting..." : "Mark as Complete"}
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
                You don't have any attachments for this {itemType}. Are you sure you want to continue?
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
