"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import TraineeSearch from "./TraineeSearch";
import TraineeList from "./TraineeList";
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trainee, Note, Visibility } from "@/types/Trainee";
const apiUrl = import.meta.env.VITE_API_URL;

export default function NotesPage() {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState<Visibility>("All");
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("trainees");

  // Fetch trainees from API
  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await axios.get(
          `http://${apiUrl}/admin/users/TRAINEE`
        );
        setTrainees(response.data);
      } catch (error) {
        console.error("Error fetching trainees:", error);
      }
    };

    fetchTrainees();
  }, []);

  // Fetch notes from API based on filter and graderId
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Token not found. Please log in again.");
        }
        const decodedToken: { id: string } = JSON.parse(
          atob(refreshToken.split(".")[1])
        );
        const graderId = decodedToken.id;

        let endpoint = `http://${apiUrl}/mentor/notes/${graderId}`;
        if (filter !== "All") {
          endpoint += `/${filter}`;
        }

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [filter]);

  const addNote = (
    newNote: Omit<Note, "id" | "createdAt" | "grader" | "trainee">
  ) => {
    setNotes([
      ...notes,
      {
        ...newNote,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        grader: { id: "", fullName: "", nickname: "", role: "" },
        trainee: { id: "", fullName: "", nickname: "", email: "" },
      },
    ]);
    setIsModalOpen(false);
    setSelectedTrainee(null);
    setActiveTab("notes");
  };

  const filteredTrainees = trainees.filter((trainee) => {
    const searchTermLower = searchTerm.trim().toLowerCase();
    return (
      trainee.fullName.toLowerCase().includes(searchTermLower) ||
      trainee.email.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="min-h-screen">
      <Header filter={filter} setFilter={setFilter} />
      <main className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trainees">Trainees</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="trainees" className="space-y-4">
            <TraineeSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <TraineeList
              trainees={filteredTrainees}
              onSelectTrainee={(trainee) => {
                setSelectedTrainee(trainee);
                setIsModalOpen(true);
              }}
            />
            {filteredTrainees.length === 0 && (
              <p className="text-gray-500">No trainees found.</p>
            )}
          </TabsContent>
          <TabsContent value="notes">
            <NoteList
              notes={notes}
              filter={filter}
              setFilter={setFilter}
              onDelete={(noteId: string) => {
                setNotes((prevNotes) =>
                  prevNotes.filter((note) => note.id !== noteId)
                );
              }}
            />
          </TabsContent>
        </Tabs>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedTrainee?.fullName}</DialogTitle>
            </DialogHeader>
            <NoteForm
              addNote={addNote}
              selectedTrainee={selectedTrainee}
              onCancel={() => setIsModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
