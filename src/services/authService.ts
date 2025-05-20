import api from './api';

interface AuthResponse {
    token: string;
    userId: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/users/login', { email, password_hash: password });
    return response.data;
};

export const register = async (name: string, email: string, password: string): Promise<void> => {
    await api.post('/users/register', { name, email, password_hash: password });
};

