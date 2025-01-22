import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Registration successful!');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-500 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="block w-full p-3 mb-4 text-blue-700 bg-white rounded focus:ring-2 focus:ring-blue-300"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full p-3 mb-6 text-blue-700 bg-white rounded focus:ring-2 focus:ring-blue-300"
            />
            <button type="submit" className="w-full py-3 bg-purple-600 rounded text-white font-semibold hover:bg-purple-700 transition">
                Sign Up
            </button>
        </form>
    );
};

export default Register;