// src/components/PopularCatFacts.js
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../process';

const PopularCatFacts = () => {
  const [catFacts, setCatFacts] = useState([]);

  useEffect(() => {
    const fetchPopularCatFacts = async () => {
      try {
        const response = await fetch(`${backendUrl}/catfacts/popular/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCatFacts(data);
      } catch (error) {
        console.error('Error al obtener los cat facts populares:', error);
      }
    };

    fetchPopularCatFacts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Popular Cat Facts</h1>
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

export default PopularCatFacts;
