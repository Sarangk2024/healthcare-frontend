// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
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
            await axios.post('http://localhost:8080/api/auth/register', user);
            setMessage('Registration successful! Redirecting to login...');
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            setMessage('Registration failed. Please try a different username.');
            console.error('Registration error!', error);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
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
                <button type="submit">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
            <Link to="/login" className="form-switch-button">
                Already have an account? Log in here.
            </Link>
        </div>
    );
};

export default Register;