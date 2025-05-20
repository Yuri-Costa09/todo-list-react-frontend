import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Attempting registration with:", name, email, password);
      // vai usar o register do authContext
      await register(name, email, password);
      navigate('/login');
      
    } catch (err) {
      console.error("Registration failed:", err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>

    </div>
  );
};

export default Register; 