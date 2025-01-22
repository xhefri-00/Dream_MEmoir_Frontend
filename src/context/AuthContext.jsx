import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/dashboard');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during login');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    };

    const register = async (email, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Registration successful, please log in');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during registration');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
