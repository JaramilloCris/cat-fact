// src/components/CatFacts.js
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../process';

const CatFacts = () => {
  const [catFacts, setCatFacts] = useState([]);
  const [likedFacts, setLikedFacts] = useState([]);

  useEffect(() => {
    // Obtener los cat facts del backend
    const fetchCatFacts = async () => {
      try {
        const response = await fetch(`${backendUrl}/catfacts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCatFacts(data);
      } catch (error) {
        console.error('Error al obtener los cat facts:', error);
      }
    };

    fetchCatFacts();
  }, []);

  const handleLike = async (id) => {
    try {
      // Aquí deberías implementar la lógica para enviar el "like" al backend
      // Por ejemplo, una solicitud POST a /like-catfact con el id del cat fact
      const response = await fetch(`${backendUrl}/catfact/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ cat_fact_id: id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Actualizar el estado local para reflejar el like
      setLikedFacts((prevLikedFacts) => {
        if (prevLikedFacts.includes(id)) {
          return prevLikedFacts.filter((factId) => factId !== id);
        } else {
          return [...prevLikedFacts, id];
        }
      });
    } catch (error) {
      console.error('Error al dar like al cat fact:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cat Facts</h1>
      <ul className="space-y-4">
        {catFacts.map((fact) => (
          <li key={fact.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg">{fact.fact}</p>
            <button
              onClick={() => handleLike(fact.id)}
              className={`mt-2 px-4 py-2 rounded ${
                likedFacts.includes(fact.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {likedFacts.includes(fact.id) ? 'Unlike' : 'Like'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatFacts;
