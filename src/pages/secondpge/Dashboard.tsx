import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './layouts/navbar';

interface Item {
    id: number;
    title: string;
    description: string;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'subject' | 'note'>('subject');

    const subjects: Item[] = [
        { id: 1, title: 'Mathematics', description: 'Fundamentals of algebra and geometry' },
        { id: 2, title: 'Physics', description: 'Principles of mechanics and energy' },
    ];

    const notes: Item[] = [
        { id: 1, title: 'Algebra Notes', description: 'Detailed notes on quadratic equations' },
        { id: 2, title: 'Mechanics Notes', description: 'Summary of Newton\'s laws of motion' },
    ];

    const handleTabClick = (tab: 'subject' | 'note') => {
        setActiveTab(tab);
    };

    // Navigasi ke halaman detail subjek
    const handleSubjectClick = (id: number) => {
        navigate(`/subjectdetail/${id}`);
    };

    return (
        <div className="bg-white overflow-hidden min-h-screen md:px-44 lg:px-10 xl:px-56">
            <Navbar />
            <div className="flex justify-center items-center h-[40vh] w-[80vw] bg-black rounded-lg shadow-lg mt-8">
                <h2 className="text-[96px] font-extrabold text-white">Class Name</h2>
            </div>

            <div className="flex justify-left mt-8 space-x-4">
                <button
                    className={`px-4 py-2 font-bold rounded-lg ${activeTab === 'subject' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-600'}`}
                    onClick={() => handleTabClick('subject')}
                >
                    Subject
                </button>
                <button
                    className={`px-4 py-2 font-bold rounded-lg ${activeTab === 'note' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-600'}`}
                    onClick={() => handleTabClick('note')}
                >
                    Note
                </button>
            </div>

            <div className="mt-8 space-y-4">
                {activeTab === 'subject' && subjects.map((subject) => (
                    <div
                        key={subject.id}
                        className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer"
                        onClick={() => handleSubjectClick(subject.id)}
                    >
                        <h3 className="text-xl font-bold">{subject.title}</h3>
                        <p className="text-sm text-gray-500">{subject.description}</p>
                    </div>
                ))}
                {activeTab === 'note' && notes.map((note) => (
                    <div key={note.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">{note.title}</h3>
                        <p className="text-sm text-gray-500">{note.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
