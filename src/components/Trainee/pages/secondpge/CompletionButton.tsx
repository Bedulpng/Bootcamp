"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { jwtDecode } from "jwt-decode";
import {
  submitLessonCompletion,
  submitChallengeCompletion,
  getChallengeStatus,
  getLessonStatus,
} from "@/Api/SubmitAssignment";

interface TaskCompletionProps {
  Id: string | undefined; 
}

export default function TaskCompletion({ Id }: TaskCompletionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"SUBMITTED" | "NOTSUBMITTED" | null>(
    null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "application/vnd.openxmlformats-officedocument.presentationml.presentation"];
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        alert("Only JPEG, PNG, PDF, and PPTX files are allowed.");
      }
    }
  };

  const handleSubmit = async (confirmed = false) => {
    if (!file && !confirmed) {
      setShowDialog(true);
      return;
    }

    if (!Id) {
      console.error("Lesson ID/Challenge ID is missing");
      return;
    }

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error("No refreshToken found in localStorage");
      alert("You need to be logged in to submit");
      return;
    }

    let userId;
    try {
      const decodedToken: { id: string } = jwtDecode(refreshToken);
      userId = decodedToken.id;
    } catch (error) {
      console.error("Failed to decode refreshToken:", error);
      alert("Invalid token. Please log in again.");
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("files", file);
    }
    formData.append("userId", userId);

    try {
      setIsSubmitting(true); // Tampilkan spinner
      console.log("Submitting form with file:", file?.name || "No file");

      setShowDialog(false);
      setIsSubmitted(true);

      const isChallenge = window.location.pathname.includes("trainee/challenge");

      if (isChallenge) {
        const response = await submitChallengeCompletion(
          userId,
          Id,
          file ? [file] : []
        );
        console.log("Challenge submitted successfully:", response);
      } else {
        const response = await submitLessonCompletion(
          userId,
          Id,
          file ? [file] : []
        );
        console.log("Lesson submitted successfully:", response);
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("An error occurred while submitting");
    } finally {
      setIsSubmitting(false); // Sembunyikan spinner
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      if (!Id) {
        console.error("Lesson ID/Challenge ID is missing");
        return;
      }

      try {
        const isChallenge = window.location.pathname.includes("trainee/challenge");

        if (isChallenge) {
          // Cek status dari tabel `challenge`
          const challengeResponse = await getChallengeStatus(Id);
          if (challengeResponse?.status) {
            setStatus(challengeResponse.status);
            if (challengeResponse.status === "SUBMITTED") {
              setIsSubmitted(true);
            }
          }
        } else {
          // Cek status dari tabel `lesson`
          const lessonResponse = await getLessonStatus(Id);
          if (lessonResponse?.status) {
            setStatus(lessonResponse.status); // SUBMITTED atau NOTSUBMITTED
            console.log(lessonResponse.files);
            if (lessonResponse.status === "SUBMITTED") {
              setIsSubmitted(true);
            }
          }
        }
      } catch (error: any) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStatus();
  }, [Id]);

  if (isSubmitted) {
    return (
      <Card className="w-[300px] shadow-lg">
        <CardContent className="pt-6">
          {file ? (
            <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm flex-1 truncate">{file.name}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center p-2 text-sm text-muted-foreground">
              No attachment
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[300px] shadow-lg">
      <CardContent className="pt-6 space-y-4">
        <div className="relative">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept=".jpeg,.jpg,.png,.pdf,.pptx"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center gap-2 w-full p-2 border-2 border-dashed border-primary/20 round</Card>ed-lg hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary">
              {file ? file.name : "Attach Files"}
            </span>
          </label>
        </div>

        {status === "NOTSUBMITTED" && (
          <div className="text-red-500 text-sm font-medium">Late</div>
        )}

        <Button
          className="w-full font-medium"
          onClick={() => handleSubmit()}
          disabled={isSubmitting} // Disabled jika sedang submit
        >
          {isSubmitting ? "Submitting..." : "Mark As Completed"}
        </Button>
      </CardContent>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as complete?</AlertDialogTitle>
            <AlertDialogDescription>
              You don't have any attachment on this lesson. Are you sure you
              want to continue?
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
    </Card>
  );
}
