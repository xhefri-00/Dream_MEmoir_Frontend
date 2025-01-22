import React, { useEffect, useState } from 'react';

const BookmarkList = ({ user }) => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                if (user){
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookmarks`,
                        { method: 'GET',
                            headers: { 'Content-Type': 'application/json', 
                                'Authorization': `Bearer ${user.access_token}`, 
                            }, credentials: 'include',
                        }
                    );
                    const data = await response.json();
                    if (response.ok) {
                        setBookmarks(data);
                    } else {
                        alert(data.message || 'Failed to fetch bookmarks');
                    }
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred while fetching bookmarks');
            }
        };

        fetchBookmarks();
    }, [user]);

    const handleDelete = async (bookmarkId) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/bookmarks/${bookmarkId}`,
                { method: 'DELETE' }
            );
            if (response.ok) {
                setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== bookmarkId));
                alert('Bookmark deleted successfully');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to delete bookmark');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the bookmark');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Bookmarks</h2>
            {bookmarks.length === 0 ? (
                <p>No bookmarks available.</p>
            ) : (
                <ul>
                    {bookmarks.map((bookmark) => (
                        <li key={bookmark.id} className="mb-4 p-4 border rounded shadow">
                            <p>{bookmark.blog}</p>
                            <button
                                onClick={() => handleDelete(bookmark.id)}
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

export default BookmarkList;
