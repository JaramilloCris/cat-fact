import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { backendUrl } from '../process';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  const handleRegister = async () => {
    const response = await fetch(`${backendUrl}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    login(data);
  };

  const handleLogin = async () => {
    const response = await fetch(`${backendUrl}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    login(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login or Register</h2>
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
