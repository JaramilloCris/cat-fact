// src/components/LikedCatFacts.js
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../process';

const LikedCatFacts = () => {
  const [catFacts, setCatFacts] = useState([]);

  useEffect(() => {
    const fetchLikedCatFacts = async () => {
      try {
        const response = await fetch(`${backendUrl}/user/liked`,
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                },   
            }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCatFacts(data);
      } catch (error) {
        console.error('Error al obtener los cat facts liked:', error);
      }
    };

    fetchLikedCatFacts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Liked Cat Facts</h1>
      <ul className="space-y-4">
        {catFacts.map((fact) => (
          <li key={fact.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg">{fact.fact}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedCatFacts;
