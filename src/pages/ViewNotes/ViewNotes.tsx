import { useState } from 'react'

const ViewNotes: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">View Notes</h1>
      </header>

      {/* Daftar Notes */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        {/* Note 1 */}
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 flex items-center justify-center text-gray-600">
              <img src="/image/notes.png" alt="Note" className="h-8" />
            </div>
            <div>
              <p className="font-medium text-gray-700">Notes from Examiner1</p>
              <p className="text-sm text-gray-500">To User1</p>
            </div>
          </div>
          <button
            onClick={handleOpenModal}
            className="text-blue-500 hover:text-blue-700"
          >
            <img src="/image/external-link.png" alt="Open" className="h-5" />
          </button>
        </div>

        {/* Tambahkan lebih banyak notes jika diperlukan */}
      </div>

      {/* Modal View Notes */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
            >
              ✖
            </button>
            <div className="space-y-2">
              <p>
                <strong>From:</strong> Examiner1
              </p>
              <p>
                <strong>To:</strong> User1
              </p>
              <p>
                <strong>Subject:</strong> Please review the recent tasks
              </p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tristique risus a eros dapibus, eget dapibus sem vehicula.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewNotes;
