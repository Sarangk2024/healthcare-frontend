// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentForm from './components/AppointmentForm';
import Navbar from './components/Navbar';
import './App.css';
import './components/Home.css';
import './components/Navbar.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getPageWithNavbar = (element) => (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      {element}
    </>
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={getPageWithNavbar(<Home />)} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/book"
            element={isLoggedIn ? getPageWithNavbar(<AppointmentForm />) : <Login setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;