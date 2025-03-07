import React, { useContext, useState } from 'react';
import BlogList from '../components/Blog/BlogList';
import BookmarkList from '../components/Bookmark/BookmarkList';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const DashboardPage = () => {
    const { user, logout } = useContext(AuthContext);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    if (!user) {
        return <p>Please log in to view your dashboard.</p>;
    }

    const handlePostBlog = async () => {
        if (!blogTitle || !blogContent) {
            alert('Title and content are required.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`,
                },
                body: JSON.stringify({
                    title: blogTitle,
                    content: blogContent,
                    is_public: isPublic,
                    user_id: user.id,
                }),
            });

            if (response.ok) {
                alert('Blog posted successfully!');
                setBlogTitle('');
                setBlogContent('');
                setIsPublic(false);
            } else {
                alert('Failed to post blog');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while posting the blog');
        }
    };

    return (
        <div className="p-4 bg-dreamyPurple min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.username} ✨🌌!</h1>
            <div className="flex space-x-4">
                <button
                    onClick={logout}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Log out
                </button>
                <Link to="/home">
                    <button className="bg-deepBlue text-white py-2 px-4 rounded hover:bg-opacity-90">
                        Go to Home
                    </button>
                </Link>
            </div>

            {/* Blog Posting Box */}
            <div className="mt-4 p-4 border rounded bg-softPink text-Black">
                <h2 className="text-xl font-bold mb-2">Post a New Blog</h2>
                <input
                    type="text"
                    placeholder="Blog Title"
                    className="w-full p-2 mb-2 border rounded"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                />
                <textarea
                    placeholder="Blog Content"
                    className="w-full p-2 mb-2 border rounded"
                    rows="4"
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                />
                <label className="block mb-2">
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                    />
                    <span className="ml-2">Make Public</span>
                </label>
                <button
                    onClick={handlePostBlog}
                    className="bg-deepBlue text-white py-2 px-4 rounded hover:bg-opacity-90"
                >
                    Post Blog
                </button>
            </div>

            <div className="mt-4">
                <BlogList user={user} />
                <BookmarkList user={user} />
            </div>
        </div>
    );
};

export default DashboardPage;
