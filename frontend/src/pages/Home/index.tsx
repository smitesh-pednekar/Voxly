import { useState, useEffect } from 'react';
import UseGetBlogs from "../../hooks/use-get-blogs";

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

const LoadingSkeleton = () => (
	<div className="flex flex-col bg-gray-50 h-96">
		<div className="h-52 rounded-t bg-gray-300 animate-pulse"></div>
		<div className="flex-1 px-4 py-8 space-y-4 sm:p-8">
			<div className="w-full h-6 rounded bg-gray-300 animate-pulse"></div>
			<div className="w-full h-6 rounded bg-gray-300 animate-pulse"></div>
			<div className="w-3/4 h-6 rounded bg-gray-300 animate-pulse"></div>
		</div>
	</div>
);

const Home = () => {
	const [blogList, setBlogList] = useState<Blog[]>([]);
	const { blogs, loading } = UseGetBlogs()

	useEffect(() => {
		if (blogs?.data) {
			// Sort blogs by created_at date in descending order
			const sortedBlogs = [...blogs.data].sort((a, b) => {
				const dateA = new Date(a.created_at.$date);
				const dateB = new Date(b.created_at.$date);
				return dateB.getTime() - dateA.getTime();
			});
			setBlogList(sortedBlogs);
		}
	}, [blogs]);

	// Function to strip HTML tags and get plain text
	const stripHtml = (html: string) => {
		const tmp = document.createElement('div');
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || '';
	};

	// Function to format date
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	return (
		<section className="py-6 sm:py-12 bg-gray-100 text-gray-800">
			<div className="container p-6 mx-auto space-y-8">
				<div className="space-y-2 text-center">
					<h2 className="text-4xl font-bold">Welcome to Voxly</h2>
					<p className="font-serif text-lg text-gray-600">Beyond the Headlines</p>
				</div>
				<div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
					{loading ? (
						// Show 4 skeleton loaders while loading
						[...Array(4)].map((_, index) => (
							<LoadingSkeleton key={index} />
						))
					) : (
						blogList.map((blog: Blog) => (
							<article key={blog._id.$oid} className="flex flex-col bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
								<div className="h-48 overflow-hidden">
									<img 
										src={blog.image} 
										alt={blog.title}
										className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<div className="flex flex-col flex-1 p-6">
									<div className="flex justify-between items-center">
										<span className="text-xs text-purple-600">
											By {blog.author}
										</span>
										<span className="text-xs text-gray-500">
											{formatDate(blog.created_at.$date)}
										</span>
									</div>
									<h3 className="flex-1 py-2 text-lg font-semibold leading-snug hover:text-purple-600 transition-colors">
										{blog.title}
									</h3>
									<div className="pt-3 text-sm text-gray-600">
										<p>{stripHtml(blog.content).substring(0, 150)}...</p>
									</div>
									<div className="flex justify-end mt-4">
										<a 
											href={`/blog/${blog._id.$oid}`}
											className="text-purple-600 hover:text-purple-800 text-sm font-semibold flex items-center gap-1 transition-colors"
										>
											Read More 
											<span className="text-lg">→</span>
										</a>
									</div>
								</div>
							</article>
						))
					)}
				</div>
			</div>
		</section>
	);
};

export default Home;

