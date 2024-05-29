import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CatFacts from './CatFact';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mt-10 mx-auto p-4">
      <div class="p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user}!</h2>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
          Logout
        </button>
      </div>
      <CatFacts />
    </div>
  );
};

export default Home;
