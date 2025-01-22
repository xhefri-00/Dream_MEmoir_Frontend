import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/blogs';

export const getBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await axios.post(API_URL, blogData);
  return response.data;
};