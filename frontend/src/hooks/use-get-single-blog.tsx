import { useState, useEffect } from 'react';
import axios from 'axios';

interface Blog {
    _id: {
        $oid: string;
    };
    title: string;
    content: string;
    author: string;
    image: string;
    created_at: {
        $date: string;
    };
}

interface BlogResponse {
    data: Blog;
}

const useGetSingleBlog = (id: string) => {
    const [blog, setBlog] = useState<BlogResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/posts/${id}`);
                setBlog(response.data);
            } catch (err) {
                setError('Failed to fetch blog');
                console.error('Error fetching blog:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    return { blog, loading, error };
};

export default useGetSingleBlog;