// src/components/CatFacts.js
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../process';

const CatFacts = () => {
  const [catFacts, setCatFacts] = useState([]);
  const [likedFacts, setLikedFacts] = useState([]);

  const fetchLikedFacts = async () => {
    try {
      const response = await fetch(`${backendUrl}/user/liked/id`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLikedFacts(data);
    }
    catch (error) {
      console.error('Error al obtener los cat facts:', error);
    }
  }

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
    fetchLikedFacts();
  }, []);

  const handleLike = async (id) => {
    try {
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

  const handleUnlike = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/catfact/unlike`, {
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

      // Actualizar el estado local para reflejar el unlike
      setLikedFacts((prevLikedFacts) => prevLikedFacts.filter((factId) => factId !== id));
    } catch (error) {
      console.error('Error al dar unlike al cat fact:', error);
    }
  }

  return (
    <div className="container p-4">
      <h1 className="text-3xl font-bold mb-4">Cat Facts</h1>
      <ul className="space-y-4">
        {catFacts.map((fact) => (
          <li key={fact.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg">{fact.fact}</p>
            <button
              onClick={() => {
                if (likedFacts.includes(fact.id)) {
                  handleUnlike(fact.id);
                } else {
                  handleLike(fact.id);
                }
              }}
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
