
import API_URL from '../../api';
import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const url = `${API_URL}/signup`;

    const changeNameHandler = (e) => {
        setName(e.target.value);
    };

    const changeMailHandler = (e) => {
        setMail(e.target.value);
    };

    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (loading) return;

        try {
            setLoading(true);

            const res = await axios.post(url, {
                name,
                email,
                password
            });

            if (res.status === 201) {
                // Save the signup token
                localStorage.setItem('token', res.data.token);

                // Show successful signup notification
                alert('🎉 Signup successful! Welcome to ShoeStop.');

                // Redirect to login page
                navigate('/login');
            }

        } catch (error) {
            console.error(
                'Signup error:',
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                error.response?.data?.error ||
                'Signup failed. Please try again.'
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup">
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={changeNameHandler}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={changeMailHandler}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={changePasswordHandler}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default Signup;
