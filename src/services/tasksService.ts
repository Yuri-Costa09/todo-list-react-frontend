import api from './api';

export interface Task {
    id: string;
    description: string;
    complete: boolean;
    created_at: string;
    authorId: string;
}

export interface User {
    id: string;
    email: string;
}

export const getTasks = async (userId: string): Promise<Task[]> => {
    const response = await api.get<Task[]>(`/tasks/user/${userId}`);
    console.log('Tasks response:', response.data);
    return response.data;
};

export const createTask = async (
    payload: { description: string; authorId: string }
): Promise<Task> => {
    const response = await api.post<Task>(
        `/tasks/create`, 
        { description: payload.description, authorId: payload.authorId }
    );
    return response.data;
};

export const updateTask = async (
    taskId: string,
    updates: Partial<Pick<Task, 'description' | 'complete'>>
): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/update/${taskId}`, updates);
    return response.data;
};

export const deleteTask = async (taskId: string, userId?: string): Promise<void> => {
    if (userId) {
        await api.delete(`/tasks/delete/${taskId}`, { 
            data: { authorId: userId } 
        });
    } else {
        await api.delete(`/tasks/delete/${taskId}`);
    }
};



