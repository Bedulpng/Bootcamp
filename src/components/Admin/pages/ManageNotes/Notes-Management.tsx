"use client";

import { useState } from "react";
import Notes from "../Notes";
import GraderNotes from "./Grader-Notes";
import { Button } from "@/components/ui/button";

export type Page = "notes" | "grader-notes";

export default function NotesManagement() {
  const [currentPage, setCurrentPage] = useState<Page>("notes");
  const [graderId, setSelectedGraderId] = useState<string | null>("");
  const [visibility, setSelectedVisibility] = useState<string | null>("");
  const [graderName, setSelectedGraderName] = useState<string | null>("");

  const handleViewGraderNotes = (
    graderId: string,
    graderName: string,
    visibility: string
  ) => {
    setSelectedGraderName(graderName);
    setSelectedGraderId(graderId);
    setSelectedVisibility(visibility);
    setCurrentPage("grader-notes");
  };

  const handleBackToNotes = () => {
    setCurrentPage("notes");
    setSelectedGraderId(null);
    setSelectedGraderName(null);
  };

  const renderNotePage = () => {
    switch (currentPage) {
      case "notes":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Notes Management
              </h2>
              <Button>Create New Note</Button>
            </div>
            <Notes onViewGraderNotes={handleViewGraderNotes} />
          </div>
        );
      case "grader-notes":
        return (
          <GraderNotes
            graderId={graderId || ""}
            graderfullName={graderName || "Unknown Grader"}
            visibility={visibility || ""}
            onBack={handleBackToNotes}
          />
        );
      default:
        return null;
    }
  };

  return <div className="p-6">{renderNotePage()}</div>;
}
