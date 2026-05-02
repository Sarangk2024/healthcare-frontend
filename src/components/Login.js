// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/login', user);
            setIsLoggedIn(true); // Set the login state to true
            navigate('/'); // Redirect to the home page
        } catch (error) {
            setMessage('Login failed. Invalid username or password.');
            console.error('Login error!', error);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="username">Username</label>
                <input
                    value={user.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="username"
                    id="username"
                    name="username"
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    value={user.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="password"
                    id="password"
                    name="password"
                    required
                />
                <button type="submit">Log In</button>
            </form>
            {message && <p className="message">{message}</p>}
            <Link to="/register" className="form-switch-button">
                Don't have an account? Register here.
            </Link>
        </div>
    );
};

export default Login;