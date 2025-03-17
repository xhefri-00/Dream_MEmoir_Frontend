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
                
                // Sort blogs by latest first
                setBlogs(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            };
            fetchBlogs();
        }
    }, [user]);

    // Function to save a blog as a bookmark
    const handleSaveBookmark = async (blogId) => {
        if (!user) {
            alert("Please log in to save bookmarks.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookmarks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`,
                },
                body: JSON.stringify({ blog_id: blogId }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Bookmark saved successfully!");
            } else {
                alert(data.message || "Failed to save bookmark.");
            }
        } catch (error) {
            console.error("Error saving bookmark:", error);
            alert("An error occurred while saving the bookmark.");
        }
    };

    return (
        <div className="p-6 bg-dreamyPurple min-h-screen text-white">
            <div className="mt-4 flex flex-row justify-between">
            <h1 className="text-3xl font-bold mb-6 text-white">Public Blogs</h1>
                <Link to="/dashboard">
                    <button className="text-color bg-deepBlue text-white px-6 py-3 rounded hover:bg-opacity-90">
                        Go to Dashboard
                    </button>
                </Link>
            </div>
            {/* Blog List - Display Vertically */}
            <div className="flex flex-col gap-4">
                {blogs.map((blog) => (
                    <div key={blog.id} className="p-4 border rounded shadow hover:shadow-lg bg-softPink text-black">
                        <h2 className="w-full p-2 mb-2 border font-bold rounded">{blog.title}</h2>
                        <p className="mt-2">{blog.content}</p>
                        
                        {/* Save as Bookmark Button */}
                        <button
                            onClick={() => handleSaveBookmark(blog.id)}
                            className="text-color mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                        >
                            Save as Bookmark
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default HomePage;
