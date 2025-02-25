import React, { useState, useEffect } from "react";
import { X, Search, UserPlus, GraduationCap, CheckCheck } from "lucide-react";
import { Mentor, Trainee, Batch } from "@/types/Trainee";
import { fetchBatches } from "@/Api/FetchingBatches&Classes";
import { fetchTrainees, fetchMentors } from "@/Api/FetchUsersByRole";
import axios from "axios";

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    className: string;
    batch: Batch[];
    mentors: Mentor[];
    participants: Trainee[];
  }) => void;
  selectedClassId: string | null;
  selectedClassTitle: string;
}

export const EditClassModal: React.FC<ClassModalProps> = ({ isOpen, onClose, selectedClassId, selectedClassTitle }) => {
  const [className, setClassName] = useState("");
  const [fetchedBatch, setFetchedBatch] = useState<Batch[]>([]);
  const [selectedBatch, setselectedBatch] = useState<Batch[]>([]);
  const [batchSearch, setBatchSearch] = useState("");
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [fetchedTrainees, setFetchedTrainees] = useState<Trainee[]>([]);
  const [fetchedMentors, setFetchedMentors] = useState<Mentor[]>([]);
  const [participants, setParticipants] = useState<Trainee[]>([]);
  const [mentorSearch, setMentorSearch] = useState("");
  const [participantSearch, setParticipantSearch] = useState("");

  useEffect(() => {
    const getBatches = async () => {
      try {
        const fetchedBatch = await fetchBatches();
        setFetchedBatch(fetchedBatch);
        console.log("Batch Data", fetchedBatch);
      } catch (error) {
        console.error("Failed to fetch batch:", error);
      } finally {
      }
    };

    getBatches();
  }, []);

  useEffect(() => {
    const getTrainees = async () => {
      try {
        const fetchedTrainees = await fetchTrainees();
        setFetchedTrainees(fetchedTrainees);
      } catch (error) {
        console.error("Failed to fetch trainees:", error);
      } finally {
      }
    };

    getTrainees();
  }, []);

  useEffect(() => {
    const getMentors = async () => {
      try {
        const fetchedMentors = await fetchMentors();
        setFetchedMentors(fetchedMentors);
      } catch (error) {
        console.error("Failed to fetch Mentors: ", error);
      } finally {
      }
    };

    getMentors();
  }, []);

  if (!isOpen) return null;

  const filteredBatches = batchSearch
    ? fetchedBatch.filter((b) =>
        b.batchTitle.toLowerCase().includes(batchSearch.toLowerCase())
      )
    : [];

  const filteredMentors = fetchedMentors.filter(
    (person) =>
      (person.fullName ?? "No Name")
        .toLowerCase()
        .includes(mentorSearch.toLowerCase()) &&
      !mentors.find((m) => m.id === person.id)
  );

  const filteredParticipants = fetchedTrainees.filter(
    (person) =>
      (person.fullName ?? "No Name")
        .toLowerCase()
        .includes(participantSearch.toLowerCase()) &&
      !participants.find((p) => p.id === person.id)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        className,
        batchId: selectedBatch.map((b) => b.id),
        participants: participants.map((p) => p.id),
      };
      await axios.put(`http://192.168.1.12:4000/admin/class/${selectedClassId}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        }
      });
      onClose();
    } catch (error) {
      console.error("Error submitting class:", error);
    }
  };

  const removeMentor = (id: string) => {
    setMentors(mentors.filter((m) => m.id !== id));
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl transform scale-100 animate-popup">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Edit Class {selectedClassTitle}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex gap-6">
              {/* Class Name */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  
                />
              </div>

              {/* Batch Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for a batch..."
                    value={batchSearch}
                    onChange={(e) => setBatchSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {batchSearch && (
                  <div className="mt-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg">
                    {filteredBatches.map((batchItem) => (
                      <button
                        key={batchItem.id}
                        type="button"
                        onClick={() => {
                          if (
                            !selectedBatch.some((b) => b.id === batchItem.id)
                          ) {
                            setselectedBatch([...selectedBatch, batchItem]);
                          }
                          setBatchSearch("");
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">
                            {batchItem.batchNum}
                          </div>
                          <div className="text-sm text-gray-500">
                            {batchItem.batchTitle}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedBatch.map((batchItem) => (
                    <span
                      key={batchItem.id}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>{batchItem.batchTitle}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setselectedBatch(
                            selectedBatch.filter((b) => b.id !== batchItem.id)
                          )
                        }
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mentors and Participants */}
            <div className="flex gap-6">
              {/* Mentors */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mentors
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search mentors..."
                    value={mentorSearch}
                    onChange={(e) => setMentorSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {mentorSearch && (
                  <div className="mt-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg">
                    {filteredMentors.map((person) => (
                      <button
                        key={person.id}
                        type="button"
                        onClick={() => {
                          setMentors([...mentors, person]);
                          setMentorSearch("");
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <UserPlus className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{person.fullName}</div>
                          <div className="text-sm text-gray-500">
                            {person.role} - {person.email}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {mentors.map((mentor) => (
                    <span
                      key={mentor.id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {mentor.fullName}
                      <button
                        type="button"
                        onClick={() => removeMentor(mentor.id)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Participants */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Participants
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search participants..."
                    value={participantSearch}
                    onChange={(e) => setParticipantSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {participantSearch && (
                  <div className="mt-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg">
                    {filteredParticipants.map((person) => (
                      <button
                        key={person.id}
                        type="button"
                        onClick={() => {
                          setParticipants([...participants, person]);
                          setParticipantSearch("");
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <UserPlus className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{person.fullName}</div>
                          <div className="text-sm text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {participants.map((participant) => (
                    <span
                      key={participant.id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {participant.fullName}
                      <button
                        type="button"
                        onClick={() => removeParticipant(participant.id)}
                        className="hover:bg-green-200 rounded-full p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={!selectedBatch}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 font-medium flex items-center gap-2"
            >
              <CheckCheck className="w-5 h-5" />
              Confirm Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
