import React from "react";
import { Note } from "@/types/Trainee";

interface ViewNoteModalProps {
  notes: Note[];
  onClose: () => void;
}

const ViewNoteModal: React.FC<ViewNoteModalProps> = ({ notes, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">View Notes</h2>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="p-2 border rounded-md bg-gray-50 shadow-sm"
              >
                <p className="text-sm text-gray-700">{note.content}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No notes available.</p>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNoteModal;
