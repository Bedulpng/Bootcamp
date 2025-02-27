import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  UserPlus,
  GraduationCap,
  CheckCheck,
} from "lucide-react";
import { fetchClasses } from "@/Api/FetchingBatches&Classes";
import { fetchMentors, fetchTrainees } from "@/Api/FetchUsersByRole";
import { Class, Mentor } from "@/types/Trainee";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

interface BatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  batchId: string;
  batchTitles: string;
  // Optional batch ID for editing existing batches
}

export const BatchEdit: React.FC<BatchModalProps> = ({
  isOpen,
  onClose,
  batchId,
  batchTitles: title,
}) => {
  const [batchNum, setBatchNum] = useState<number>(0);
  const [batchTitle, setBatchTitle] = useState("");
  const [batchDesc, setBatchDesc] = useState("");
  const [classSearch, setClassSearch] = useState("");
  const [fetchedClasses, setFetchedClasses] = useState<Class[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<Class[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [fetchedMentors, setFetchedMentors] = useState<Mentor[]>([]);
  const [mentorSearch, setMentorSearch] = useState("");
  const [participants, setParticipants] = useState<Mentor[]>([]);
  const [fetchedParticipant, setFetchedParticipant] = useState<Mentor[]>([]);
  const [participantSearch, setParticipantSearch] = useState("");

  useEffect(() => {
    const getClasses = async () => {
      try {
        const fetchedClasses = await fetchClasses();
        setFetchedClasses(fetchedClasses);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    const getMentors = async () => {
      try {
        const fetchedMentors = await fetchMentors();
        setFetchedMentors(fetchedMentors);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      }
    };

    const getUsers = async () => {
      try {
        const fetchedTrainees = await fetchTrainees();
        setFetchedParticipant(fetchedTrainees);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getClasses();
    getMentors();
    getUsers();
  }, []);

  if (!isOpen) return null;

  const filteredClasses = classSearch
    ? fetchedClasses.filter((c) =>
        c.className.toLowerCase().includes(classSearch.toLowerCase())
      )
    : [];

  const filteredMentors = mentorSearch
    ? fetchedMentors.filter((person) =>
        (person.fullName ?? "No Name")
          .toLowerCase()
          .includes(mentorSearch.toLowerCase())
      )
    : [];

  const filteredParticipants = participantSearch
    ? fetchedParticipant.filter((person) =>
        (person.fullName ?? "No Name")
          .toLowerCase()
          .includes(participantSearch.toLowerCase())
      )
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Construct the payload with conditional inclusion of fields
      const payload: Record<string, any> = {};

      if (batchNum) payload.batchNum = batchNum;
      if (batchTitle) payload.batchTitle = batchTitle;
      if (batchDesc) payload.batchDesc = batchDesc;
      if (selectedClasses.length > 0)
        payload.batchClass = selectedClasses.map((cls) => cls.id); // Include only if there are selected classes
      if (mentors.length > 0)
        payload.mentors = mentors.map((mentor) => mentor.id); // Include only if there are mentors
      if (participants.length > 0)
        payload.participants = participants.map(
          (participant) => participant.id
        ); // Include only if there are participants

      // Make the API request
      await axios.put(
        `http://${apiUrl}/admin/batch/${batchId}`,
        payload,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("refreshToken"),
          },
        }
      );

      console.log("Batch successfully edited:", payload);
      onClose();
    } catch (error) {
      console.error("Error submitting batch:", error);
    }
  };

  const removeMentor = (id: string) => {
    setMentors(mentors.filter((m) => m.id !== id));
  };

  const removeUsers = (id: string) => {
    setMentors(mentors.filter((m) => m.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl transform scale-100 animate-popup">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Edit Batch for {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6 flex flex-wrap gap-6">
            {/* Left Column */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Num
                </label>
                <input
                  type="number"
                  value={batchNum}
                  onChange={(e) => setBatchNum(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Title
                </label>
                <input
                  type="text"
                  value={batchTitle}
                  onChange={(e) => setBatchTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Description
                </label>
                <textarea
                  value={batchDesc}
                  onChange={(e) => setBatchDesc(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-4">
              {/* Classes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for a class..."
                    value={classSearch}
                    onChange={(e) => setClassSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {classSearch && (
                  <div className="mt-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg">
                    {filteredClasses.map((classItem) => (
                      <button
                        key={classItem.id}
                        type="button"
                        onClick={() => {
                          if (
                            !selectedClasses.some(
                              (cls) => cls.id === classItem.id
                            )
                          ) {
                            setSelectedClasses([...selectedClasses, classItem]);
                          }
                          setClassSearch("");
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">
                            {classItem.className}
                          </div>
                          {Array.isArray(classItem.mentors)
                            ? classItem.mentors.map((m) => m.fullName).join(" - ")
                            : "No mentors available"}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedClasses.map((classItem) => (
                    <span
                      key={classItem.id}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>{classItem.className}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedClasses(
                            selectedClasses.filter(
                              (cls) => cls.id !== classItem.id
                            )
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

              {/* Mentors */}
              <div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Participants
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Participants..."
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
                            {person.role} - {person.email}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {participants.map((user) => (
                    <span
                      key={user.id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                    >
                      {user.fullName}
                      <button
                        type="button"
                        onClick={() => removeUsers(user.id)}
                        className="hover:bg-yellow-200 rounded-full p-0.5"
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
              disabled={!selectedClasses}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-yellow-300 font-medium flex items-center gap-2"
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
