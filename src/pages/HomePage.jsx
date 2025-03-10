import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            const fetchBlogs = async () => {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blogs`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access_token}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                
                // Sort blogs by latest first
                setBlogs(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            };
            fetchBlogs();
        }
    }, [user]);

    return (
        <div className="p-6 bg-dreamyPurple min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">Public Blogs</h1>
            
            {/* Blog List - Display Vertically */}
            <div className="flex flex-col gap-4">
                {blogs.map((blog) => (
                    <div key={blog.id} className="p-4 border rounded shadow hover:shadow-lg bg-softPink text-black">
                        <h2 className="w-full p-2 mb-2 border font-bold rounded">{blog.title}</h2>
                        <p className="mt-2">{blog.content}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <Link to="/dashboard">
                    <button className="bg-deepBlue text-white px-6 py-3 rounded hover:bg-opacity-90">
                        Go to Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
