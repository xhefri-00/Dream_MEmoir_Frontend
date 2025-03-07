import React, { useEffect, useState } from 'react';

const BlogList = ({ user }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                if (user) {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blogs/user/${user.id}`,
                        { method: 'GET',
                            headers: { 'Content-Type': 'application/json', 
                                'Authorization': `Bearer ${user.access_token}`, 
                            }, credentials: 'include',
                        }
                    );
                    const data = await response.json();
                    if (response.ok) {
                        setBlogs(data);
                    } else {
                        alert(data.message || 'Failed to fetch blogs');
                    }
                }

            } catch (error) {
                console.error(error);
                alert('An error occurred while fetching blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [user]);

    const handleDelete = async (blogId) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/blogs/${user.id}/${blogId}`,
                { method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${user.access_token}` }
                }
            );
            if (response.ok) {
                setBlogs(blogs.filter((blog) => blog.id !== blogId));
                alert('Blog deleted successfully');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to delete blog');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the blog');
        }
    };

    if (loading) return <p>Loading blogs...</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Blogs</h2>
            {blogs.length === 0 ? (
                <p>No blogs available.</p>
            ) : (
                <ul>
                    {blogs.map((blog) => (
                        <li key={blog.id} className="mb-4 p-4 border rounded shadow">
                            <h3 className="font-semibold text-lg">{blog.title}</h3>
                            <p>{blog.content}</p>
                            <button
                                onClick={() => handleDelete(blog.id)}
                                className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BlogList;
