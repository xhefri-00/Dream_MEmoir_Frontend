import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                onLogin(data.token); // Save token in context or localStorage
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-500 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Log in</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="block w-full p-3 mb-4 text-indigo-700 bg-white rounded focus:ring-2 focus:ring-indigo-300"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full p-3 mb-6 text-indigo-700 bg-white rounded focus:ring-2 focus:ring-indigo-300"
            />
            <button type="submit" className="w-full py-3 bg-blue-600 rounded text-white font-semibold hover:bg-blue-700 transition">
                Log in
            </button>
        </form>
    );
};

export default Login;