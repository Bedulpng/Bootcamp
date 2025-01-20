import React, { useState, useEffect } from 'react';
import { X, Search, UserPlus, Users, GraduationCap } from 'lucide-react';
import { fetchClasses } from '@/Api/FetchingBatches&Classes';
import { fetchMentors } from '@/Api/FetchUsersByRole';
import { Class, Mentor } from '@/types/Trainee';
import axios from 'axios';

interface BatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    batchNum: number;
    batchTitle: string;
    batchDesc: string;
    startDate: Date;
    endDate: Date | null;
    class: Class[];
    mentors: Mentor[];
  }) => void;
}

interface BatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BatchModal: React.FC<BatchModalProps> = ({ isOpen, onClose }) => {
  const [batchNum, setBatchNum] = useState<number>(0);
  const [batchTitle, setbatchTitle] = useState('');
  const [batchDesc, setbatchdesc] = useState('');
  const [startDate] = useState<Date>(new Date()); 
  const [endDate] = useState<Date | null>(null);
  const [classSearch, setClassSearch] = useState('');
  const [fetchedClasses, setFetchedClasses] = useState<Class[]>([]); // Store all classes fetched from the API
  const [selectedClasses, setSelectedClasses] = useState<Class[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [fetchedMentors, setFetchedMentors] = useState<Mentor[]>([]);
  const [mentorSearch, setMentorSearch] = useState('');

  //get class
  useEffect(() => {
    const getClasses = async () => {
      try {
        const fetchedClasses = await fetchClasses();
        setFetchedClasses(fetchedClasses);
        console.log('Fetched classes:', fetchedClasses);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      } finally {
      }
    };

    getClasses();
  }, []);

//get mentors
  useEffect(() => {
    const getMentors = async () => {
      try {
        const fetchedMentors = await fetchMentors();
        setFetchedMentors(fetchedMentors);
        console.log('Fetched Mentors:', fetchedMentors);
      } catch (error) {
        console.error('Failed to fetch Mentors:', error);
      } finally {
      }
    };

    getMentors();
  }, []);


  if (!isOpen) return null;

  const filteredClasses = classSearch
    ? fetchedClasses.filter(c => 
        c.className.toLowerCase().includes(classSearch.toLowerCase()) 
      )
    : [];

  const filteredMentors = fetchedMentors.filter(
    person => 
      person.fullName.toLowerCase().includes(mentorSearch.toLowerCase()) &&
      !mentors.find(m => m.id === person.id)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        batchNum,
        batchTitle,
        batchDesc,
        batchClass: selectedClasses.map(cls => cls.id),
        mentorIds: mentors.map(mentor => mentor.id), // Extract mentor IDs
        startDate: startDate.toISOString(),
        endDate,
        status: 'Ongoing',
        mentors,
      };
      await axios.post('http://10.10.103.25:4000/admin/batch', payload);
      onClose();
    } catch (error) {
      console.error('Error submitting batch:', error);
    }
  };

  const removeMentor = (id: string) => {
    setMentors(mentors.filter(m => m.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl transform scale-100 animate-popup">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Create New Batch</h2>
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
                  required
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Title
                </label>
                <input
                  type="text"
                  value={batchTitle}
                  onChange={(e) => setbatchTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Description
                </label>
                <textarea
                  value={batchDesc}
                  onChange={(e) => setbatchdesc(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  required
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
                          if (!selectedClasses.some((cls) => cls.id === classItem.id)) {
                            setSelectedClasses([...selectedClasses, classItem]);
                          }
                          setClassSearch('');
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{classItem.className}</div>
                          {Array.isArray(classItem.mentors) ? classItem.mentors.join(' - ') : 'No mentors available'}
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
                          setSelectedClasses(selectedClasses.filter((cls) => cls.id !== classItem.id))
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
                          setMentorSearch('');
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <UserPlus className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{person.fullName}</div>
                          <div className="text-sm text-gray-500">{person.role} - {person.email}</div>
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
              disabled={!selectedClasses}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 font-medium flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              Create Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );  
};