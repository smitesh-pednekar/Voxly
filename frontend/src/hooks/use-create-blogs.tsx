import axios from 'axios';
import { useState } from 'react';

interface BlogForm {
  title: string;
  content: string;
  image: string;
  author: string;
}

const UseCreateBlogs = () => {
  const [loading, setLoading] = useState(false);

  const createBlog = async (blogData: BlogForm) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/posts', blogData, {
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createBlog, loading };
};

export default UseCreateBlogs;