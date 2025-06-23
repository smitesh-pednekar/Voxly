import axios from 'axios';
import { useEffect, useState } from 'react'

const UseGetBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchBlogs().then((blogs) => {
      setBlogs(blogs);
      setLoading(false);
    });
  }, []);

  const fetchBlogs = async () => {
    const response = await axios.get('http://localhost:8000/posts');
    return response.data;
  }
  return { blogs, loading };

}

export default UseGetBlogs