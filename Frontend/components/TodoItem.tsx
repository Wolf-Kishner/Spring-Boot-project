
import React from 'react';
import { Todo } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { CheckIcon } from './icons/CheckIcon';


interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggleComplete }) => {
  return (
    <li className={`flex items-center justify-between p-4 bg-slate-700 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${todo.status ? 'opacity-60' : 'opacity-100'}`}>
      <div className="flex items-center flex-grow">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`w-7 h-7 mr-4 rounded-full border-2 flex items-center justify-center transition-colors duration-200
            ${todo.status ? 'bg-green-500 border-green-500 hover:bg-green-600' : 'border-slate-500 hover:border-sky-400'}`}
          aria-label={todo.status ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.status && <CheckIcon className="w-4 h-4 text-white" />}
        </button>
        <span className={`flex-grow text-lg ${todo.status ? 'line-through text-slate-400' : 'text-gray-100'}`}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-slate-400 hover:text-red-500 transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label="Delete to-do"
      >
        <TrashIcon className="w-6 h-6" />
      </button>
    </li>
  );
};

export default TodoItem;
