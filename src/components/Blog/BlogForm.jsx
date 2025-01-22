import React, { useState } from 'react';

const BlogForm = ({ userId, blog = null, onSave }) => {
    const [title, setTitle] = useState(blog ? blog.title : '');
    const [content, setContent] = useState(blog ? blog.content : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = blog ? 'PUT' : 'POST';
        const url = blog
            ? `${process.env.REACT_APP_BACKEND_URL}/blogs/${userId}`
            : `${process.env.REACT_APP_BACKEND_URL}/blogs/`;

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });
            const data = await response.json();
            if (response.ok) {
                alert(blog ? 'Blog updated successfully' : 'Blog created successfully');
                onSave(data);
            } else {
                alert(data.message || 'Failed to save blog');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while saving the blog');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">{blog ? 'Edit Blog' : 'New Blog'}</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="block w-full p-2 mb-2 border rounded"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                className="block w-full p-2 mb-4 border rounded"
                rows={5}
            ></textarea>
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                {blog ? 'Update Blog' : 'Create Blog'}
            </button>
        </form>
    );
};

export default BlogForm;
