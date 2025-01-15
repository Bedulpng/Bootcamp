import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Header/NavbarA';
import { roles } from '../../table/RoleTable'; // Import roles from RoleTable

const RolesManage: React.FC = () => {
    const navigate = useNavigate();

    const handleAddRole = () => {
        navigate('/addrole');
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-8 bg-[#0020f6]">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h1 className="text-xl font-bold mb-4 text-center">Role Registered</h1>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {roles.map((role, index) => (
                                <div
                                    key={index}
                                    className={`${role.color} flex items-center justify-center h-[200px] rounded-lg shadow-md text-center text-lg font-semibold text-black cursor-pointer`}
                                >
                                    {role.name}
                                </div>
                            ))}
                            <div
                                onClick={handleAddRole}
                                className="flex items-center justify-center h-[200px] rounded-lg shadow-md border border-gray-300 text-center text-lg font-semibold text-gray-500 cursor-pointer"
                            >
                                + Add
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RolesManage;
