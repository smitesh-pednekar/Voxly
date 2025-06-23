import { useParams } from 'react-router-dom';
import useGetSingleBlog from '../../hooks/use-get-single-blog';

const LoadingSkeleton = () => (
    <div className="animate-pulse">
        <div className="h-64 bg-gray-300 rounded-xl mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
    </div>
);

const Blog = () => {
    const { id } = useParams<{ id: string }>();
    const { blog, loading, error } = useGetSingleBlog(id || '');

    // Function to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) return (
        <section className="container px-6 py-10 mx-auto">
            <LoadingSkeleton />
        </section>
    );

    if (error) return (
        <section className="container px-6 py-10 mx-auto">
            <div className="text-center text-red-600">
                <h2 className="text-2xl font-bold">Error</h2>
                <p>{error}</p>
            </div>
        </section>
    );

    if (!blog?.data) return null;

    return (
        <section className="container px-6 py-10 mx-auto">
            <article className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {blog.data.title}
                    </h1>
                    
                    <div className="flex items-center mb-6">
                        <div className="mr-6">
                            <p className="text-gray-600">
                                By <span className="text-purple-600 font-semibold">{blog.data.author}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                {formatDate(blog.data.created_at.$date)}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="mb-8">
                    <img
                        src={blog.data.image}
                        alt={blog.data.title}
                        className="w-full h-[400px] object-cover rounded-xl shadow-lg"
                    />
                </div>

                {/* Content */}
                <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.data.content }}
                />
            </article>
        </section>
    );
};

export default Blog;
