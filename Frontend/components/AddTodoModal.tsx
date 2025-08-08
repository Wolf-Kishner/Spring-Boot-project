
import React, { useState, useEffect } from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { XIcon } from './icons/XIcon';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: (text: string) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ isOpen, onClose, onAddTodo }) => {
  const [newTodoText, setNewTodoText] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setNewTodoText(''); // Reset text when modal opens
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      onAddTodo(newTodoText.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>
      <div 
        className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-sky-400">Add New Task</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-full"
            aria-label="Close modal"
          >
            <XIcon className="w-7 h-7" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full p-3 mb-6 bg-slate-700 text-gray-200 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-colors placeholder-slate-400"
            autoFocus
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
