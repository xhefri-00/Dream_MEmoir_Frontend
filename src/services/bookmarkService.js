import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/bookmarks';

export const getBookmarks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

