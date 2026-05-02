import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

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
            await axios.post(`${API_BASE_URL}/auth/register`, user);
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 600);
        } catch (error) {
            setMessage('Registration failed. Please try a different username.');
            console.error('Registration error!', error);
        }
    };

    return (
        <div className="auth-form-container">
            <p className="eyebrow">Create account</p>
            <h2>Start your care profile</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <label htmlFor="username">Username</label>
                <input
                    value={user.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="Choose a username"
                    id="username"
                    name="username"
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    value={user.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Choose a password"
                    id="password"
                    name="password"
                    required
                />
                <button type="submit">Create account</button>
            </form>
            {message && <p className="message">{message}</p>}
            <Link to="/login" className="form-switch-button">
                Already have an account? Log in here.
            </Link>
        </div>
    );
};

export default Register;
