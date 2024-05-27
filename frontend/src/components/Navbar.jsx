// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-around">
        <Link to="/" className="text-white text-lg">All Cat Facts</Link>
        <Link to="/popular" className="text-white text-lg">Popular Cat Facts</Link>
        <Link to="/liked" className="text-white text-lg">Liked Cat Facts</Link>
      </div>
    </nav>
  );
};

export default Navbar;
