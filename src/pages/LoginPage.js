import React, { useState, useContext, } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import dreamyImage from '../img/dreamy.jpeg';


const LoginPage = () => {
    const { login, user } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        if(user){
            navigate("/home")
        }
    };


    return (
        <div className="p-4 max-w-md mx-auto">
             <img src={dreamyImage}/>
            <h2 className="text-xl font-bold mb-4">LogIn</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full p-2 mb-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-2 mb-4 border rounded"
                />  
                <button
                    type="submit"
                    className="bg-green-500 !important text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    LogIn
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
