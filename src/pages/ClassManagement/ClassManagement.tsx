import React, { useState } from "react";

const ClassManagement: React.FC = () => {
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [className, setClassName] = useState(""); // Untuk menyimpan nama kelas
  const [mentorEmails, setMentorEmails] = useState<string[]>([]); // Untuk email mentor/examiner
  const [traineeEmails, setTraineeEmails] = useState<string[]>([]); // Untuk email trainee
  const [currentMentorEmail, setCurrentMentorEmail] = useState(""); // Email sementara mentor
  const [currentTraineeEmail, setCurrentTraineeEmail] = useState(""); // Email sementara trainee

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal konfirmasi hapus
  const [classToDelete, setClassToDelete] = useState<string | null>(null); // Kelas yang akan dihapus

  const handleAddClassClick = () => {
    setIsAddClassModalOpen(true); // Membuka modal tambah kelas
  };

  const handleCloseModal = () => {
    // Reset semua data ketika modal ditutup
    setIsAddClassModalOpen(false);
    setClassName("");
    setMentorEmails([]);
    setTraineeEmails([]);
    setCurrentMentorEmail("");
    setCurrentTraineeEmail("");
  };

  const handleAddEmail = (type: "mentor" | "trainee") => {
    if (type === "mentor" && currentMentorEmail.trim() !== "") {
      setMentorEmails([...mentorEmails, currentMentorEmail]);
      setCurrentMentorEmail(""); // Reset input mentor
    } else if (type === "trainee" && currentTraineeEmail.trim() !== "") {
      setTraineeEmails([...traineeEmails, currentTraineeEmail]);
      setCurrentTraineeEmail(""); // Reset input trainee
    }
  };

  const handleRemoveEmail = (type: "mentor" | "trainee", email: string) => {
    if (type === "mentor") {
      setMentorEmails(mentorEmails.filter((e) => e !== email));
    } else {
      setTraineeEmails(traineeEmails.filter((e) => e !== email));
    }
  };

  const handleDeleteClassClick = (className: string) => {
    setClassToDelete(className);
    setIsDeleteModalOpen(true); // Buka modal konfirmasi hapus
  };

  const handleCancelDelete = () => {
    setClassToDelete(null);
    setIsDeleteModalOpen(false); // Tutup modal
  };

  const handleConfirmDelete = () => {
    console.log(`Class deleted: ${classToDelete}`);
    setClassToDelete(null);
    setIsDeleteModalOpen(false); // Tutup modal setelah konfirmasi
  };

  const handleSubmit = () => {
    console.log("Class Name:", className);
    console.log("Mentor Emails:", mentorEmails);
    console.log("Trainee Emails:", traineeEmails);
    handleCloseModal();
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Class Management</h1>
        <button
          onClick={handleAddClassClick}
          className="text-2xl text-gray-700 hover:text-gray-900"
        >
          <img src="/image/plus.png" alt="plus" className="h-6" />
        </button>
      </header>

      {/* Daftar Kelas */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        {["Class 1"].map((className, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-100 rounded"
          >
            <p className="font-medium text-gray-700">{className}</p>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeleteClassClick(className)}
            >
              <img src="/image/bin.png" alt="bin" className="h-6" />
            </button>
          </div>
        ))}
      </div>

      {/* Modal Tambah Kelas */}
      {isAddClassModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Class</h2>

            <form className="space-y-4">
              {/* Nama Kelas */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Enter class name"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Invite Mentor/Examiner */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Invite Mentor & Examiner
                </label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={currentMentorEmail}
                    onChange={(e) => setCurrentMentorEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddEmail("mentor")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  {mentorEmails.map((email, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm text-gray-600 bg-gray-100 p-2 rounded"
                    >
                      {email}
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail("mentor", email)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Invite Trainee
                </label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={currentMentorEmail}
                    onChange={(e) => setCurrentTraineeEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddEmail("trainee")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  {mentorEmails.map((email, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm text-gray-600 bg-gray-100 p-2 rounded"
                    >
                      {email}
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail("trainee", email)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tombol Submit dan Cancel */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
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
        Are you sure you want to delete this class?
      </h2>
      <div className="flex justify-between">
        <button
          onClick={handleCancelDelete} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
        >
          No
        </button>
        <button
          onClick={handleConfirmDelete} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ClassManagement;
