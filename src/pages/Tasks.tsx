import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { TasksContext } from '../contexts/TasksContext';
import type { Task } from '../services/tasksService';

const Tasks: React.FC = () => {
  const [newTask, setNewTask] = useState('');
  const { logout } = useContext(AuthContext);
  const { tasks, fetchTasks, addTask, toggleTaskCompletion, deleteTask } = useContext(TasksContext);

  useEffect(() => {
    console.log("Tasks component mounted");
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      await addTask(newTask.trim());
      setNewTask('');
    }
  };

  const handleToggleTask = async (task: Task) => {
    await toggleTaskCompletion(task);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  return (
    <div>
    </div>
  );
};

export default Tasks; 