import React, { useState } from "react";

const UserManagement: React.FC = () => {
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [role, setRole] = useState<string>("Trainee");

  const handleAddAccountClick = () => {
    setIsAddAccountModalOpen(true);
  };

  const handleEditClick = (user: string) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: string) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddAccountModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button onClick={handleAddAccountClick}>
          <img src="/image/add-user.png" alt="add user" className="h-8" />
        </button>
      </header>

      {/* Daftar User */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        {["User 1", "User 2"].map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-100 rounded"
          >
            <div className="flex items-center space-x-4">
              <img src="/image/user.png" alt="user" className="h-8" />
              <div>
                <p className="font-medium">{user}</p>
                <p className="text-sm text-gray-500">
                  Role: {index === 0 ? "Trainee" : "Mentor"}
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEditClick(user)}
                className="text-blue-500 hover:text-blue-700"
              >
                <img src="/image/setting.png" alt="edit" className="h-6" />
              </button>
              <button
                onClick={() => handleDeleteClick(user)}
                className="text-red-500 hover:text-red-700"
              >
                <img src="/image/bin.png" alt="delete" className="h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah Akun */}
      {isAddAccountModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[600px]">
            <h2 className="text-xl font-bold mb-4">Add New Account</h2>
            <form className="grid grid-cols-2 gap-4">
              {/* Kolom Kiri */}
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Trainee">Trainee</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Examiner">Examiner</option>
                </select>
                {role !== "Trainee" && (
                  <>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="GitHub Link"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </>
                )}
              </div>

              {/* Tombol */}
              <div className="col-span-2 flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete this account?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              >
                No
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Akun */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Edit {selectedUser}
            </h2>
            <form className="grid grid-cols-2 gap-4">
              {/* Kolom Kiri */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Nickname"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled selected>
                    Change Role
                  </option>
                  <option value="Trainee">Trainee</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Examiner">Examiner</option>
                </select>
              </div>

              {/* Bagian Foto */}
              <div className="col-span-2 flex justify-around items-center mt-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-20 w-20 rounded-full border border-gray-300 flex items-center justify-center bg-gray-100">
                    <img src="/image/image.png" alt="Professional" className="h-10" />
                  </div>
                  <p className="text-sm text-gray-600">Professional Photo</p>
                  <button
                    type="button"
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-20 w-20 rounded-full border border-gray-300 flex items-center justify-center bg-gray-100">
                    <img src="/image/image.png" alt="Informal" className="h-10" />
                  </div>
                  <p className="text-sm text-gray-600">Informal Photo</p>
                  <button
                    type="button"
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Tombol */}
              <div className="col-span-2 flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
