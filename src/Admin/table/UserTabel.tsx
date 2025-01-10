import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { UserActivity } from '../Types/index';

const UserTable: React.FC = () => {
  const navigate = useNavigate();

  // Mock data
  const [mockUsers] = useState<UserActivity[]>([
    { id: 1, name: 'Jhon Doe', role: 'Trainee' },
    { id: 2, name: 'Jhonny', role: 'Mentor' },
    { id: 3, name: 'Doe Jhon', role: 'Supervisor' },
    { id: 4, name: 'Blud', role: 'Examiner' },
    { id: 5, name: 'Audric', role: 'Trainee' },
    { id: 6, name: 'Jhon', role: 'Mentor' },
    { id: 7, name: 'Doe', role: 'Supervisor' },
    { id: 8, name: 'Dul', role: 'Examiner' },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('All');

  const filteredUsers = mockUsers.filter((user) => {
    if (roleFilter !== 'All' && user.role !== roleFilter) return false; // Role filter
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()); // Search filter
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      {/* Filters */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-900 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-gray-200 py-2 px-4 rounded-lg text-gray-700 focus:outline-none"
        >
          <option value="All">All Roles</option>
          <option value="Trainee">Trainee</option>
          <option value="Mentor">Mentor</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Examiner">Examiner</option>
        </select>
      </div>

      {/* Table */}
      <table className="text-center table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 py-2 px-4">Username</th>
            <th className="border border-gray-300 py-2 px-4">Role</th>
            <th className="border border-gray-300 py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 py-2 px-4">{user.name}</td>
              <td className="border border-gray-300 py-2 px-4">{user.role}</td>
              <td className="border border-gray-300 py-2 px-4">
                <button className="text-blue-500 hover:underline mr-2">
                  Edit
                </button>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
