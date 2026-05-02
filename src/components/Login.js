import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const Login = ({ onLogin }) => {
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
            await axios.post(`${API_BASE_URL}/auth/login`, user);
            onLogin();
            navigate('/');
        } catch (error) {
            setMessage('Login failed. Invalid username or password.');
            console.error('Login error!', error);
        }
    };

    return (
        <div className="auth-form-container">
            <p className="eyebrow">Patient portal</p>
            <h2>Welcome back</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="username">Username</label>
                <input
                    value={user.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your username"
                    id="username"
                    name="username"
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    value={user.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter your password"
                    id="password"
                    name="password"
                    required
                />
                <button type="submit">Log in securely</button>
            </form>
            {message && <p className="message">{message}</p>}
            <Link to="/register" className="form-switch-button">
                Don't have an account? Register here.
            </Link>
        </div>
    );
};

export default Login;
