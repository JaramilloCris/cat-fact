import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import PopularCat from './components/PopularCat';
import LikedCat from './components/LikedCat';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AuthRoute />} />
          <Route path="/catfacts" element={<AuthRoute component={Home} />} />
          <Route path="/popular" element={<AuthRoute component={PopularCat} />} />
          <Route path="/liked" element={<AuthRoute component={LikedCat} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const AuthRoute = ({ component: Component }) => {
  const { user } = useAuth();

  if (user) {
    return Component ? <Component /> : <Home />;
  } else {
    return <Login />;
  }
};

export default App;
