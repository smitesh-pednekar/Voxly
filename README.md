# 🗣️ **VOXLY** 
### *Where Every Voice Finds Its Stage*

<div align="center">


**A modern, full-stack blogging platform designed for creators, writers, and storytellers**

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-api-documentation) • [🛠️ Tech Stack](#️-tech-stack) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 **What is Voxly?**

Voxly is more than just another blogging platform—it's a digital sanctuary where thoughts transform into stories, ideas bloom into articles, and every voice finds its perfect pitch. Built with modern web technologies, Voxly empowers writers to craft, share, and connect through the power of words.

### ✨ **Why Choose Voxly?**

- 🎨 **Rich Text Experience** - Powered by TinyMCE for professional content creation
- 🔐 **Secure Authentication** - JWT-based security with bcrypt encryption
- 📱 **Mobile-First Design** - Seamless experience across all devices
- ⚡ **Lightning Fast** - Built with React 18 and FastAPI for optimal performance
- 🌙 **Modern Architecture** - Clean, scalable, and maintainable codebase

---

## 🛠️ **Tech Stack**

### **Frontend Arsenal** 🎨
```
React 18          TypeScript        TailwindCSS
Vite             React Router       TinyMCE Editor
Axios            React Toastify     Context API
```

### **Backend Powerhouse** ⚡
```
FastAPI          Python 3.8+        MongoDB
PyJWT            Bcrypt            Pydantic
Uvicorn          CORS Middleware    RESTful APIs
```

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 16+ and npm
- Python 3.8+
- MongoDB (local or Atlas)

### **🎯 One-Command Setup**
```bash
# Clone the magic
git clone https://github.com/yourusername/voxly.git
cd voxly

# Backend setup
cd backend
python -m venv env
source env/bin/activate  # Unix/Mac
# .\env\Scripts\activate  # Windows
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install
```

### **🔧 Configuration**

**Backend (.env)**
```env
SECRET_KEY=your-super-secret-key-here
MONGODB_URL=mongodb://localhost:27017/voxly
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Frontend (.env)**
```env
VITE_TINYMCE_API_KEY=your-tinymce-api-key
VITE_API_BASE_URL=http://localhost:8000
```

### **🚀 Launch Sequence**
```bash
# Terminal 1 - Backend
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**🎉 Visit http://localhost:5173 and start creating!**

---

## 📁 **Project Architecture**

<details>
<summary>🗂️ <strong>Click to explore the project structure</strong></summary>

```
voxly/
├── 🎨 frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── contexts/            # Global state management
│   │   │   └── auth-contexts.tsx
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── use-create-blogs.tsx
│   │   │   ├── use-get-blogs.tsx
│   │   │   └── use-get-single-blog.tsx
│   │   ├── pages/               # Route components
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   └── Home/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── ⚡ backend/
│   ├── app/
│   │   ├── controllers/         # Request handlers
│   │   ├── core/               # App configuration
│   │   ├── database/           # Database connections
│   │   ├── models/             # Data models
│   │   ├── routes/             # API routes
│   │   └── services/           # Business logic
│   └── requirements.txt
│
└── 📚 docs/                    # Documentation
```

</details>

---

## 🎯 **Core Features**

### 🔐 **Authentication System**
- **Secure Registration** - Email-based user registration
- **JWT Authentication** - Stateless, secure token-based auth
- **Protected Routes** - Automatic route protection
- **Persistent Sessions** - Stay logged in across browser sessions

### ✍️ **Blog Management**
- **Rich Text Editor** - Professional writing experience with TinyMCE
- **Image Integration** - Easy image uploads and embedding
- **Draft System** - Save and continue writing later
- **Responsive Design** - Perfect on any device

### 🎨 **User Experience**
- **Toast Notifications** - Instant feedback for user actions
- **Loading States** - Smooth transitions and animations
- **Error Handling** - Graceful error management
- **Mobile Navigation** - Touch-friendly mobile interface

---

## 📖 **API Documentation**

### **Authentication Endpoints**
```http
POST /register     # Create new user account
POST /login        # Authenticate user
GET  /users/me     # Get current user profile
```

### **Blog Management**
```http
GET    /posts           # Fetch all blog posts
GET    /posts/{id}      # Get specific blog post
POST   /posts           # Create new blog post  🔒
PUT    /posts/{id}      # Update existing post  🔒
DELETE /posts/{id}      # Delete blog post      🔒
```
*🔒 = Requires authentication*

---

## 🚀 **Available Scripts**

### **Frontend Commands**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint checks
```

### **Backend Commands**
```bash
uvicorn main:app --reload     # Development server
pytest                        # Run test suite
pip freeze > requirements.txt # Update dependencies
```

---

## 🌈 **Development Workflow**

### **Code Style Guidelines**
- ✅ Follow TypeScript best practices
- ✅ Use functional components with hooks
- ✅ Implement proper error handling
- ✅ Write clean, documented code
- ✅ Use semantic commit messages

### **Git Workflow**
```bash
git checkout -b feature/amazing-feature
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
# Create Pull Request
```

---

## 🤝 **Contributing**

We welcome contributions from developers of all skill levels! Here's how you can help make Voxly even better:

### **Ways to Contribute**
- 🐛 **Bug Reports** - Found a bug? Let us know!
- 💡 **Feature Requests** - Have an idea? We'd love to hear it!
- 📖 **Documentation** - Help improve our docs
- 🔧 **Code Contributions** - Submit PRs for fixes and features

### **Contribution Process**
1. **Fork** the repository
2. **Create** your feature branch
3. **Commit** your changes with clear messages
4. **Test** your changes thoroughly
5. **Submit** a pull request

### **Development Setup**
```bash
# Fork and clone
git clone https://github.com/yourusername/voxly.git

# Install dependencies
npm install && pip install -r requirements.txt

# Start development
npm run dev & uvicorn main:app --reload
```

---

## 🔒 **Security Features**

- 🛡️ **Password Security** - Bcrypt hashing for all passwords
- 🔑 **JWT Tokens** - Secure, stateless authentication
- 🌐 **CORS Protection** - Configured for secure cross-origin requests
- 🔐 **Route Protection** - Authentication required for sensitive operations
- 🛡️ **Input Validation** - Pydantic models ensure data integrity

---

## 🌟 **Roadmap**

### **Coming Soon**
- [ ] 🌙 Dark mode theme
- [ ] 📊 Analytics dashboard
- [ ] 🔄 Real-time collaboration
- [ ] 📱 Mobile app
- [ ] 🔍 Advanced search
- [ ] 📧 Email notifications
- [ ] 🏷️ Tagging system
- [ ] 💬 Comment system

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---
