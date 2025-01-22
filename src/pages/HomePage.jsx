import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user){
            const fetchBlogs = async () => {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blogs`,
                    { method: 'GET',
                    headers: { 'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${user.access_token}`, 
                    }, credentials: 'include',
                });
                const data = await response.json();
                setBlogs(data);
        }
        fetchBlogs();
        };
    }, [user]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Public Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="p-4 border rounded shadow hover:shadow-lg"
                    >
                        <h2 className="text-xl font-bold">{blog.title}</h2>
                        <p>{blog.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;