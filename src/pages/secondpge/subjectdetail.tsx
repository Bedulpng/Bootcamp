import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './layouts/navbar';

const SubjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="bg-white overflow-hidden min-h-screen md:px-44 lg:px-10 xl:px-56">
        <Navbar />
             <div className="min-h-screen p-8">
                <h1 className="text-3xl font-bold">Subject Detail Page</h1>
                <p>ID Subject: {id}</p>
        </div>
        </div>

    );
};

export default SubjectDetail;
