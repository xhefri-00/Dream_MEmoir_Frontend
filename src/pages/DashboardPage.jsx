import React, { useContext, useRef } from 'react';
import BlogList from '../components/Blog/BlogList';
import BookmarkList from '../components/Bookmark/BookmarkList';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const timeout = useRef(null);

    /*const startInactivityTimer = () => {
        clearTimeout(timeout.current); 
        timeout.current = setTimeout(() => { 
         navigate('/')}, 2000); 
        }; */

    if (!user) {
        //startInactivityTimer()
        return <p>Please log in to view your dashboard.</p>;
    }

    console.log(user)
    
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
            <button
                onClick={logout}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
                Logout
            </button>
            <div className="mt-4">
                <BlogList user={user} />
                <BookmarkList user={user} />
            </div>
        </div>
    );
};

export default DashboardPage;