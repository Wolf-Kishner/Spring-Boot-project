import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from './types';
import SearchBar from './components/SearchBar';
import TodoList from './components/TodoList';
import AddTodoModal from './components/AddTodoModal';
import { PlusIcon } from './components/icons/PlusIcon';

const API_BASE_URL = 'http://localhost:8080/api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        alert('Error fetching tasks: ' + (err instanceof Error ? err.message : 'Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = useCallback(async (text: string) => {
    if (text.trim() === '') return;
    setIsLoading(true);
    try {
      const newTodo: Omit<Todo, 'id'> = {
        text,
        status: false,
        createdAt: Date.now(),
      };
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      const addedTodo: Todo = await response.json();
      setTodos(prevTodos => [addedTodo, ...prevTodos]);
      setIsAddModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      alert('Error adding task: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTodo = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      alert('Error deleting task: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleComplete = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;
      const updatedTodo: Todo = {
        ...todoToUpdate,
        status: !todoToUpdate.status,
      };
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, status: !todo.status } : todo
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      alert('Error updating task: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [todos]);

  const filteredTodos = todos
    .filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.createdAt - a.createdAt); // Sort by creation date, newest first

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex flex-col items-center py-8 px-4 font-sans">
      <div className="w-full max-w-2xl bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 mb-6">
            My To-Do List
          </h1>
          <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        </header>

        <main className="mb-8 min-h-[300px]">
          {isLoading && <p className="text-center text-gray-400">Loading...</p>}
          {error && <p className="text-center text-red-400">{error}</p>}
          {!isLoading && !error && (
            <TodoList
              todos={filteredTodos}
              onDelete={deleteTodo}
              onToggleComplete={toggleComplete}
            />
          )}
        </main>
      </div>

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white p-4 rounded-full shadow-xl transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-sky-300"
        aria-label="Add new to-do"
        disabled={isLoading}
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTodo={addTodo}
      />
      <footer className="text-center text-gray-400 mt-12 text-sm">
        <p>Powered by React & TailwindCSS</p>
      </footer>
    </div>
  );
};

export default App;