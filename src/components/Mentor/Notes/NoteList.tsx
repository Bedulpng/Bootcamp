"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import { Batch, Class, Note } from "@/types/Trainee";
import axios from "axios";
import NoSubmitted from "@/components/Examiner/Class/NoTask";
import TraineeSearch from "./TraineeSearch";
const apiUrl = import.meta.env.VITE_API_URL;

export default function ExaminerNotes() {
  const [selectedBatch, setSelectedBatch] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedLesson, setSelectedLesson] = useState<string>("all");
  const [selectedChallenge, setSelectedChallenge] = useState<string>("all");
  const [Notes, setNotes] = useState<Note[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleNoteClick = (notes: Note) => {
    setSelectedNote(notes);
    setShowNoteDialog(true);
  };

  const filteredNotes = Notes.filter((note) =>
    note.trainee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(`http://${apiUrl}/admin/batch`);
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
        const response = await axios.get(`http://${apiUrl}/admin/class`);
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchFinalNotes = async () => {
      try {
        const params: Record<string, string> = {};
        if (selectedBatch !== "all") params.batchId = selectedBatch;
        if (selectedClass !== "all") params.classId = selectedClass;

        const response = await axios.get(`http://${apiUrl}/mentor/note/notes`, {
          params,
        });

        setNotes(response.data);
      } catch (err) {
        console.error("Failed to fetch final Notes:", err);
      } finally {
      }
    };

    fetchFinalNotes();
  }, [selectedBatch, selectedClass]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <main className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Notes</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage and grade student final Notes across all batches and
              classes.
            </p>
          </div>
          <div className="p-6">
            <TraineeSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
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
                <Select
                  value={selectedLesson}
                  onValueChange={setSelectedLesson}
                >
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select Lesson" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Lessons</SelectItem>
                    {classes.find((c) => c.id === selectedClass)?.lessons
                      .length ? (
                      classes
                        .find((c) => c.id === selectedClass)
                        ?.lessons.map((lesson) => (
                          <SelectItem key={lesson.id} value={lesson.id}>
                            {lesson.title}
                          </SelectItem>
                        ))
                    ) : (
                      <SelectItem disabled value="no-lesson">
                        No Lesson Found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedChallenge}
                  onValueChange={setSelectedChallenge}
                >
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select Challenge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Challenges</SelectItem>
                    {classes.find((c) => c.id === selectedClass)?.challenges
                      .length ? (
                      classes
                        .find((c) => c.id === selectedClass)
                        ?.challenges.map((challenge) => (
                          <SelectItem key={challenge.id} value={challenge.id}>
                            {challenge.title}
                          </SelectItem>
                        ))
                    ) : (
                      <SelectItem disabled value="no-challenge">
                        No Challenge Found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-center">
                      Student
                    </TableHead>
                    <TableHead className="font-semibold text-center">
                      Batch
                    </TableHead>
                    <TableHead className="font-semibold text-center">
                      Class
                    </TableHead>
                    <TableHead className="font-semibold text-center">
                      Lesson
                    </TableHead>
                    <TableHead className="font-semibold text-center">
                      Challenge
                    </TableHead>
                    <TableHead className="font-semibold text-center">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          <Skeleton className="h-6 w-32" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Skeleton className="h-6 w-20" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Skeleton className="h-6 w-28" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Skeleton className="h-6 w-40" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : filteredNotes.length > 0 ? (
                    filteredNotes.map((n) => (
                      <TableRow key={n.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-center">
                          {n.trainee.fullName}
                        </TableCell>
                        <TableCell className="text-center">
                          {n.batch?.batchTitle ? (
                            n.batch.batchTitle
                          ) : (
                            <span className="text-gray-500 italic">None</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {n.class?.className ? (
                            n.class.className
                          ) : (
                            <span className="text-gray-500 italic">None</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {n.lessonCompletion?.lesson.title ? (
                            n.lessonCompletion.lesson.title
                          ) : (
                            <span className="text-gray-500 italic">None</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {n.challengeCompletion?.challenge.title ? (
                            n.challengeCompletion.challenge.title
                          ) : (
                            <span className="text-gray-500 italic">None</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-indigo-600 hover:bg-indigo-700 mx-auto"
                            onClick={() => handleNoteClick(n)}
                          >
                            View Note
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        <NoSubmitted />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>

                <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Presentation Notes</DialogTitle>
                    </DialogHeader>
                    <div className="p-4 space-y-2">
                      {selectedNote && selectedNote.content ? (
                        <div className="p-3 bg-gray-100 rounded-lg border">
                          <p className="text-gray-700">
                            {selectedNote.content}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-500">No notes available.</p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
