import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Header/NavbarA';
import UserTable from '../../table/UserTabel';

const UserManage = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const addUser = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ username: '', email: '', role: '', password: '', confirmPassword: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setUsers([...users, { ...formData }]);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 bg-[#0020f6]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">User Registered</h1>
            <button
              onClick={addUser}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              + Add
            </button>
          </div>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
              <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
                <h2 className="text-xl font-semibold mb-4">Add Account</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">Mentor</option>
                    <option value="User">Exaimer</option>
                    <option value="User">Supervisor</option>
                  </select>
                  <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none">
                    {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  </div>
                  <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none">
                    {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
                </div>
                <button
                  onClick={handleSave}
                  className="w-full bg-green-500 text-white py-3 mt-4 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* User Table */}
          <UserTable users={users} />
        </main>
      </div>
    </div>
  );
};

export default UserManage;
