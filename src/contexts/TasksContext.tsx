import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AxiosError } from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { getTasks, createTask, updateTask, deleteTask as deleteTaskService, type Task } from '../services/tasksService';

interface TasksContextType {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
    addTask: (description: string) => Promise<void>;
    toggleTaskCompletion: (task: Task) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const TasksContext = createContext<TasksContextType>({
    tasks: [],
    fetchTasks: async () => {},
    addTask: async () => {},
    toggleTaskCompletion: async () => {},
    deleteTask: async () => {},
});

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { logout, userId } = useContext(AuthContext);

    const handleApiError = (error: AxiosError) => {
        if (error?.response?.status === 401) {
            logout();
        }
        throw error;
    };

    const checkUserId = () => {
        if (!userId) throw new Error('No user ID available');
        return userId;
    };

    const fetchTasks = async () => {
        try {
            const currentUserId = checkUserId();
            console.log('Fetching tasks for userId:', currentUserId);
            const tasks = await getTasks(currentUserId);
            setTasks(tasks);
        } catch (error) {
            handleApiError(error as AxiosError);
        }
    };

    const addTask = async (description: string) => {
        try {
            const currentUserId = checkUserId();
            console.log('Adding task for userId:', currentUserId);
            const newTask = await createTask({ description, authorId: currentUserId });
            setTasks([...tasks, newTask]);
        } catch (error) {
            handleApiError(error as AxiosError);
        }
    };

    const toggleTaskCompletion = async (task: Task) => {
        try {
            const updated = { ...task, complete: !task.complete };
            await updateTask(task.id, { complete: updated.complete });
            setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? updated : t)));
        } catch (error) {
            handleApiError(error as AxiosError);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const currentUserId = checkUserId();
            console.log('Deleting task:', id, 'for user:', currentUserId);
            await deleteTaskService(id, currentUserId);
            setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
        } catch (error) {
            handleApiError(error as AxiosError);
        }
    };

    useEffect(() => {
        if (userId) {
            console.log('userId changed, fetching tasks for:', userId);
            fetchTasks();
        } else {
            console.log('No userId available yet, skipping task fetch');
            setTasks([]);
        }
    }, [userId]);

    return (
        <TasksContext.Provider value={{ tasks, fetchTasks, addTask, toggleTaskCompletion, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
};