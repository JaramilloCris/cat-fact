import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { backendUrl } from '../process';

const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${backendUrl}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.detail === 'Username already registered') {
          setError('User already registered');
        } else {
          setError('Registration failed');
        }
        return;
      }
      const data = await response.json();
      login(data);
      setError(''); // Clear error if successful
    } catch (error) {
      setError('Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${backendUrl}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.detail === 'Invalid username') {
          setError('User not registered');
        } else {
          setError('Login failed');
        }
        return;
      }
      const data = await response.json();
      login(data);
      setError(''); // Clear error if successful
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login or Register</h2>
      {error && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">
          {error}
        </div>
      )}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 mb-4 w-full"
      />
      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full">
        Register
      </button>
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded w-full">
        Login
      </button>
    </div>
  );
};

export default Login;

