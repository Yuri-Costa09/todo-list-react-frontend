import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, register as registerService } from '../services/authService';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
  const navigate = useNavigate();
  
  const login = async (email: string, password: string) => {
    try {
      const response = await loginService(email, password);
      const userIdFromResponse = response.user.id;
      
      setToken(response.token);
      setUserId(userIdFromResponse);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', userIdFromResponse);
      
      console.log('Stored userId:', userIdFromResponse);
      navigate('/tasks');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await registerService(name, email, password);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
    navigate('/login');
  };
  
  return (
    <AuthContext.Provider value={{ token, userId, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

 