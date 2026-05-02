import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" aria-label="HealthCare home">
        <span className="brand-mark">+</span>
        <span>HealthCare</span>
      </Link>
      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/book">Book Appointment</NavLink>
            </li>
            <li>
              <button type="button" className="nav-logout" onClick={onLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register" className="nav-cta">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
