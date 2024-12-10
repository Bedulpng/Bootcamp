import { useState } from 'react'

interface User {
  id: number;
  name: string;
  role: string;
  certificate: File | null;
}

const CertificateManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'User 1', role: 'Trainee', certificate: null },
  ]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, userId: number) => {
    const file = event.target.files?.[0];
    if (file) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, certificate: file } : user
        )
      );
    }
  };

  const handleViewCertificate = (user: User) => {
    setSelectedUser(user);
    setIsPreviewOpen(true);
  };

  const handleDeleteCertificate = () => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, certificate: null } : user
        )
      );
    }
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleDownloadCertificate = () => {
    if (selectedUser?.certificate) {
      const url = URL.createObjectURL(selectedUser.certificate);
      const link = document.createElement('a');
      link.href = url;
      link.download = selectedUser.certificate.name;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Certificate Management</h1>
      </header>

      {/* Daftar User */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 bg-gray-100 rounded"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-gray-600">
                <img src="/image/user.png" alt="user" className="h-6" />
              </div>
              <div>
                <p className="font-medium text-gray-700">{user.name}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </div>
            </div>
            {!user.certificate ? (
              <label className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 cursor-pointer">
                Upload
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="hidden"
                  onChange={(event) => handleFileUpload(event, user.id)}
                />
              </label>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={() => handleViewCertificate(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Preview Certificate Modal */}
      {isPreviewOpen && selectedUser?.certificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
            <h2 className="text-xl font-bold mb-4">Certificate Preview</h2>
            <img
              src={URL.createObjectURL(selectedUser.certificate)}
              alt="Certificate"
              className="w-full h-auto mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
              <button
                onClick={handleDownloadCertificate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete this certificate?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                No
              </button>
              <button
                onClick={handleDeleteCertificate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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

export default CertificateManagement;
