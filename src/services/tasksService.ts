import api from './api';

export interface Task {
    id: string;
    description: string;
    completed: boolean;
    userId: string;
}

export interface User {
    id: string;
    email: string;
}

export const getTasks = async (userId: string): Promise<Task[]> => {
    const response = await api.get<Task[]>(`/tasks/user/${userId}`);
    return response.data;
};

export const createTask = async (
    payload: { description: string; authorId: string }
): Promise<Task> => {
    const response = await api.post<Task>(
        `/tasks/user/${payload.authorId}`, 
        { description: payload.description }
    );
    return response.data;
};

export const updateTask = async (
    taskId: string,
    updates: Partial<Pick<Task, 'description' | 'completed'>>
): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${taskId}`, updates);
    return response.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}`);
};



