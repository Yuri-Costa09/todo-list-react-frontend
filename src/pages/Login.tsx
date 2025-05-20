import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Attempting login with:", email, password);
      // vai usar o login do authContext
      await login(email, password);
      navigate('/tasks');
      
    } catch (err) {
      console.error("Login failed:", err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>

    </div>
  );
};

export default Login; 