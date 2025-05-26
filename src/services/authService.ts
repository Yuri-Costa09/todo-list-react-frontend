import api from './api';
import { AxiosError } from 'axios';

interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        password_hash: string;
    };
}

interface ErrorResponse {
    message?: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const TIMEOUT: number = 12000;

    const controller = new AbortController();
    const signal = controller.signal;

    const timeout = setTimeout(() => {
        console.log('Timeout em: ', TIMEOUT);
        controller.abort();
    }, TIMEOUT);

    try {
        const response = await api.post<AuthResponse>('/users/login', { email, password_hash: password }, { signal });
        clearTimeout(timeout);
        return response.data;
    } catch (error) {
        clearTimeout(timeout);
        
        if ((error as AxiosError).response?.status === 401 || 
            ((error as AxiosError).response?.data as ErrorResponse)?.message?.includes('Invalid Token')) {
            localStorage.removeItem('token');
        }
        throw error;
    }

};

export const register = async (name: string, email: string, password: string): Promise<void> => {
    await api.post('/users/register', { name, email, password_hash: password });
};

