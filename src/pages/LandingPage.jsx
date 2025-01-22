import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-dreamyPurple text-white">
            <h1 className="text-4xl font-bold mb-6 text-softPink">Dream MEmoir</h1>
            <div className="flex space-x-4">
                <Link to="/login">
                    <button className="bg-deepBlue text-white px-6 py-3 rounded hover:bg-opacity-90">
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button className="bg-deepBlue text-white px-6 py-3 rounded hover:bg-opacity-90">
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
