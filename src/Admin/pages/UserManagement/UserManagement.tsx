import React, { useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import Sidebar from "../../Layouts/Sidebar";
import ImageUpload from "../../Layouts/imageupload";

const UserManagement: React.FC = () => {
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const [photos, setPhotos] = useState({
    professional: null as File | null,
    informal: null as File | null,
  });

  // Handler untuk perubahan foto
  const handlePhotoChange = (type: "professional" | "informal") => (file: File) => {
    setPhotos((prevPhotos) => ({
      ...prevPhotos,
      [type]: file,
    }));
  };

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
    <div className="bg-[#D9D9D9] overflow-hidden min-h-screen relative">
      <div className="relative z-30">
        <MainLayout />
      </div>
      <Sidebar />
      <div className="ml-[300px] pt-20 flex justify-between items-center">
        <h1 className="text-[32px] text-black font-bold">User Management</h1>
        <div className="mr-[100px]">
          <button
            onClick={handleAddAccountClick}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <img src="/image/add-user.png" alt="Add User" className="h-6" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Daftar User */}
      <div className="ml-[255px] mt-[50px] p-6 rounded-lg shadow-lg space-y-6">
        {["User 1", "User 2"].map((user, index) => (
          <div
            key={index}
            className="flex bg-[#B0B0B0] items-center justify-between p-4 bg-gray-100 rounded-lg"
          >
            <div className="flex text-black items-center gap-4">
              <div className="items-center bg-white rounded-full">
                <img
                  src="/image/user.png"
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div>
                <p className="font-semibold text-lg">{user}</p>
                <p className="text-sm">
                  Role: {index === 0 ? "Trainee" : "Mentor"}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleEditClick(user)}
                className="bg-[#4D00FF] hover:text-blue-700"
              >
                <img src="/image/setting.png" alt="Edit" className="h-6" />
              </button>
              <button
                onClick={() => handleDeleteClick(user)}
                className="bg-[#FF0000] text-red-500 hover:text-red-700"
              >
                <img src="/image/bin.png" alt="Delete" className="h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

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
                  className="w-full text-black border bg-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full text-black border bg-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Nickname"
                  className="w-full text-black border bg-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full text-black border bg-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full text-black border bg-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                <ImageUpload
                  label="Professional Photo"
                  onImageChange={handlePhotoChange("professional")}
                  previewUrl={
                    photos.professional
                      ? URL.createObjectURL(photos.professional)
                      : undefined
                  }
                />
                <ImageUpload
                  label="Informal Photo"
                  onImageChange={handlePhotoChange("informal")}
                  previewUrl={
                    photos.informal
                      ? URL.createObjectURL(photos.informal)
                      : undefined
                  }
                />
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
