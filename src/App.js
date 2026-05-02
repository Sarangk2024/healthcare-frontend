import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentForm from './components/AppointmentForm';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const getPageWithNavbar = (element) => (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {element}
    </>
  );

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={getPageWithNavbar(<Home isLoggedIn={isLoggedIn} />)} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/book"
            element={isLoggedIn ? getPageWithNavbar(<AppointmentForm />) : <Login onLogin={handleLogin} />}
          />
          <Route path="/logout" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
