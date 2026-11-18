
import React, { useContext, useState } from 'react';
import '../signup/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productContext } from '../contextAPI/Context';
import API_URL from '../../api';

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(productContext);

    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/login`,
                {
                    email,
                    password
                }
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);

                setToken(response.data.token);

                alert('Login successful!');

                navigate('/home');
            }
        } catch (error) {
            console.error(
                'Login error:',
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                error.response?.data?.error ||
                'Login failed. Please check your credentials.'
            );
        }
    };

    return (
        <div className="signup">
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setMail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>

                <p className="text-center mt-3">
                    Don't have an account?{' '}
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
