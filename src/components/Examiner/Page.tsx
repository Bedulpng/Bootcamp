"use client";

import { useState, useEffect } from "react";
import { BarChart, Calendar, Eye, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Batch,
  Class,
  Files,
  PresentationCompletion,
  Trainee,
} from "@/types/Trainee";
import axios from "axios";
import NotePresentation from "./NoteFinalPresentation";
import BatchCards from "./Batch/BatchCard";

export default function ExaminerDashboard() {
  const [selectedBatch, setSelectedBatch] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [presentations, setPresentations] = useState<PresentationCompletion[]>(
    []
  );
  const [batches, setBatches] = useState<Batch[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [presentationId, setPresentationId] = useState<string | undefined>(
    undefined
  );

  const addNote = (note: any) => {
    console.log("Note added:", note);
    setShowNoteForm(false); // Close the modal after adding a note
  };

  const handleCancel = () => {
    setShowNoteForm(false);
    setSelectedTrainee(null); // Reset selected trainee
  };

  const handleGradeClick = (trainee: Trainee, presentationId: string) => {
    setSelectedTrainee(trainee);
    setPresentationId(presentationId);
    setShowNoteForm(true);
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.12:4000/admin/batch"
        );
        setBatches(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };
    fetchBatches();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.12:4000/admin/class"
        );
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchFinalPresentations = async () => {
      try {
        const params: Record<string, string> = {};
        if (selectedBatch !== "all") params.batchId = selectedBatch;
        if (selectedClass !== "all") params.classId = selectedClass;

        const response = await axios.get(
          "http://192.168.1.12:4000/examiner/presentations/completions",
          { params }
        );

        setPresentations(response.data);
      } catch (err) {
        console.error("Failed to fetch final presentations:", err);
      } finally {
      }
    };

    fetchFinalPresentations();
  }, [selectedBatch, selectedClass]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const totalPresentations = presentations.length;
  const gradedPresentations = presentations.filter(
    (p) => p.status === "GRADED"
  ).length;
  const pendingPresentations = presentations.filter(
    (p) => p.status === "NOTSUBMITTED" || p.status === "LATE"
  ).length;

  return (
    <div className="min-h-screen p-6">
      <main className="max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="bg-blue-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Presentations
              </CardTitle>
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
              <CardTitle className="text-sm font-medium">
                Graded Presentations
              </CardTitle>
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
              <CardTitle className="text-sm font-medium">
                Trainee Not Submitted Yet
              </CardTitle>
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
        <BatchCards batches={batches} />

          {/* <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Presentations
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage and grade student final presentations across all batches
                and classes.
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
                      {batches.map((batch) => (
                        <SelectItem key={batch.id} value={batch.id}>
                          {batch.batchTitle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      {classes.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Student</TableHead>
                      <TableHead className="font-semibold">Batch</TableHead>
                      <TableHead className="font-semibold">Class</TableHead>
                      <TableHead className="font-semibold">
                        Final Presentation
                      </TableHead>
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
                      : presentations.map((presentation) => (
                          <TableRow
                            key={presentation.id}
                            className="hover:bg-gray-50"
                          >
                            <TableCell className="font-medium">
                              {presentation.user.fullName}
                            </TableCell>
                            <TableCell>
                              {presentation.final.batch.batchTitle}
                            </TableCell>
                            <TableCell>
                              {presentation.final.class.className}
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="link"
                                    className="p-0 h-auto font-normal"
                                  >
                                    {presentation.submissionFiles.map(
                                      (f) => f.filename
                                    )}
                                    <Eye className="ml-2 h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[60vw] w-full max-h-[90vh] overflow-hidden">
                                  <DialogHeader className="p-6 bg-white border-b">
                                    <DialogTitle>
                                      {presentation.submissionFiles.map(
                                        (f) => f.filename
                                      )}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="flex-grow overflow-auto">
                                    <FilePreview
                                      file={presentation.submissionFiles[0]}
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  presentation.status === "SUBMITTED"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {presentation.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="default"
                                size="sm"
                                className="bg-indigo-600 hover:bg-indigo-700"
                                onClick={() =>
                                  handleGradeClick(
                                    presentation.user,
                                    presentation.id
                                  )
                                }
                              >
                                Grade
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                  <Dialog open={showNoteForm} onOpenChange={setShowNoteForm}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Grade Submisson</DialogTitle>
                      </DialogHeader>
                      <NotePresentation
                        addNote={addNote}
                        selectedTrainee={selectedTrainee}
                        onCancel={handleCancel}
                        presentationId={presentationId}
                      />
                    </DialogContent>
                  </Dialog>
                </Table>
              </div>
            </div>
          </div> */}
      </main>
    </div>
  );
}
