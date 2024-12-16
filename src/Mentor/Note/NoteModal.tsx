import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Note } from './types';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  initialNote?: Note;
}

export function NoteModal({ isOpen, onClose, onSave, initialNote }: NoteModalProps) {
  const [content, setContent] = useState(initialNote?.content ?? '');
  const [visibility, setVisibility] = useState<'trainee' | 'admin'>(initialNote?.visibility ?? 'admin');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      content,
      visibility, // In a real app, this would come from auth context
      mentorName: 'Johnathan Doe', // In a real app, this would come from auth context
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            {initialNote ? 'Edit Note' : 'Add New Note'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your note here..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visibility
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="trainee"
                  checked={visibility === 'trainee'}
                  onChange={(e) => setVisibility(e.target.value as 'trainee' | 'admin')}
                  className="mr-2"
                />
                Visible to Trainee
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="admin"
                  checked={visibility === 'admin'}
                  onChange={(e) => setVisibility(e.target.value as 'trainee' | 'admin')}
                  className="mr-2"
                />
                Admin Only
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}