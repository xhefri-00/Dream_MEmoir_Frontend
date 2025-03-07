import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-4 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dream MEmoir</h1>
            <div className="flex space-x-4">
                <Link className="hover:text-blue-300 transition" to="/">Home</Link>
                <Link className="hover:text-blue-300 transition" to="/blogs">Blogs</Link>
                <Link className="hover:text-blue-300 transition" to="/bookmarks">Bookmarks</Link>
            </div>
        </div>
    </nav>
);

export default Navbar;