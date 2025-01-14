import React, { useState } from 'react';
import { X, Search, UserPlus, Users, GraduationCap } from 'lucide-react';
import { mockClasses, mockMentors, mockParticipants } from '../data/mockData';

interface Person {
  id: string;
  name: string;
  role: string;
  department?: string;
}

interface Class {
  id: string;
  name: string;
  department: string;
}

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    className: string;
    class: Class;
    mentors: Person[];
    participants: Person[];
  }) => void;
}

export const ClassModal: React.FC<ClassModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [className, setClassName] = useState('');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [classSearch, setClassSearch] = useState('');
  const [mentors, setMentors] = useState<Person[]>([]);
  const [participants, setParticipants] = useState<Person[]>([]);
  const [mentorSearch, setMentorSearch] = useState('');
  const [participantSearch, setParticipantSearch] = useState('');

  if (!isOpen) return null;

  const filteredClasses = classSearch
    ? mockClasses.filter(c => 
        c.name.toLowerCase().includes(classSearch.toLowerCase()) ||
        c.department.toLowerCase().includes(classSearch.toLowerCase())
      )
    : [];

  const filteredMentors = mockMentors.filter(
    person => 
      person.name.toLowerCase().includes(mentorSearch.toLowerCase()) &&
      !mentors.find(m => m.id === person.id)
  );

  const filteredParticipants = mockParticipants.filter(
    person => 
      person.name.toLowerCase().includes(participantSearch.toLowerCase()) &&
      !participants.find(p => p.id === person.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) return;
    onSubmit({ className, class: selectedClass, mentors, participants });
    onClose();
  };

  const removeMentor = (id: string) => {
    setMentors(mentors.filter(m => m.id !== id));
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform scale-100 animate-popup">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Create New Class</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Name
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

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
              {classSearch && !selectedClass && (
                <div className="mt-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredClasses.map(classItem => (
                    <button
                      key={classItem.id}
                      type="button"
                      onClick={() => {
                        setSelectedClass(classItem);
                        setClassSearch('');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{classItem.name}</div>
                        <div className="text-sm text-gray-500">{classItem.department}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {selectedClass && (
                <div className="mt-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-lg">
                    <GraduationCap className="w-4 h-4" />
                    <span>{selectedClass.name}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedClass(null)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

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
                  {filteredMentors.map(person => (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => {
                        setMentors([...mentors, person]);
                        setMentorSearch('');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-gray-500">{person.role} - {person.department}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {mentors.map(mentor => (
                  <span
                    key={mentor.id}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {mentor.name}
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

            <div>
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
                  {filteredParticipants.map(person => (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => {
                        setParticipants([...participants, person]);
                        setParticipantSearch('');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-gray-500">{person.role}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {participants.map(participant => (
                  <span
                    key={participant.id}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {participant.name}
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

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedClass}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 font-medium flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              Create Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};