import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ blogs, setBlogs, bookmarks, setBookmarks, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
