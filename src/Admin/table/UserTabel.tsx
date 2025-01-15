import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

type UserActivity = {
  id: number;
  name: string;
  role: string;
};

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<UserActivity[]>([
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserActivity | null>(null);
  const [tempUser, setTempUser] = useState<UserActivity | null>(null);

  const filteredUsers = users.filter((user) => {
    if (roleFilter !== 'All' && user.role !== roleFilter) return false;
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Open delete confirmation modal
  const handleDeleteConfirmation = (id: number) => {
    setDeleteUserId(id);
    setShowModal(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (deleteUserId !== null) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteUserId));
    }
    setShowModal(false);
    setDeleteUserId(null);
  };

  // Cancel delete action
  const cancelDelete = () => {
    setShowModal(false);
    setDeleteUserId(null);
  };

  const handleEdit = (user: UserActivity) => {
    setSelectedUser(user);
    setTempUser({ ...user });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedUser && tempUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === selectedUser.id ? tempUser : user))
      );
      setIsEditing(false);
    }
  };

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
                <div className="flex justify-center items-center gap-4">
                  <button
                    className="flex items-center text-blue-500 hover:underline"
                    onClick={() => handleEdit(user)}
                  >
                    <Pencil className="mr-1" size={16} /> Edit
                  </button>
                  <button
                    className="flex items-center text-red-500 hover:underline"
                    onClick={() => handleDeleteConfirmation(user.id)}
                  >
                    <Trash2 className="mr-1" size={16} /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</h2>
            <div className="flex justify-around mt-6">
              <button
                onClick={cancelDelete}
                className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && tempUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={tempUser.name}
                onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Role</label>
              <select
                value={tempUser.role}
                onChange={(e) => setTempUser({ ...tempUser, role: e.target.value })}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              >
                <option value="Trainee">Trainee</option>
                <option value="Mentor">Mentor</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Examiner">Examiner</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
