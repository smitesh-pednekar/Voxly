import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import UseCreateBlogs from '../../hooks/use-create-blogs';
import { useAuth } from '../../contexts/auth-contexts';
import { toast } from 'react-toastify';


interface BlogForm {
  title: string;
  content: string;
  image: string;
  author: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<BlogForm>({
    title: '',
    content: '',
    image: '',
    author: user?.username || '',
  });
  
  const { createBlog, loading } = UseCreateBlogs();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content: content
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createBlog(formData);
    toast.success('Blog created successfully');
    // Reset form after successful submission
    setFormData({
      title: '',
      content: '',
      image: '',
      author: user?.username || '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Blog</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              {formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="h-40 w-full object-cover rounded-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <Editor
                apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc" // Free API key for development
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 
                    'charmap', 'preview', 'anchor', 'searchreplace', 
                    'visualblocks', 'code', 'fullscreen', 'media', 
                    'table', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  branding: false, // Removes TinyMCE branding
                  promotion: false, // Removes promotion link
                  statusbar: false, // Removes status bar
                }}
                value={formData.content}
                onEditorChange={handleEditorChange}
              />
            </div>

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    title: '',
                    content: '',
                    image: '',
                    author: user?.username || '',
                  });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  'Create Blog'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


