
import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onToggleComplete }) => {
  if (todos.length === 0) {
    return <p className="text-center text-slate-400 py-10 text-lg">No tasks yet. Add one!</p>;
  }

  return (
    <ul className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
