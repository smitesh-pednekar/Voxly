import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-contexts";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10 5.16-.26 9-4.45 9-10V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Voxly
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Stories that inspire</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Home
            </Link>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Authors
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              About
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">Welcome, {user?.username}</span>
                </div>
                <Link
                  to="/dashboard"
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition duration-300">
                    Dashboard
                  </div>
                </Link>
                <button
                  onClick={() => logout(navigate)}
                  className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition duration-300">
                    Get Started
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" 
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden z-50 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10 5.16-.26 9-4.45 9-10V7l-10-5z"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Voxly
              </span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="space-y-4 mb-8">
            <Link 
              to="/" 
              className="block py-3 px-4 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <a href="#" className="block py-3 px-4 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium transition-colors duration-200">
              Categories
            </a>
            <a href="#" className="block py-3 px-4 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium transition-colors duration-200">
              Authors
            </a>
            <a href="#" className="block py-3 px-4 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium transition-colors duration-200">
              About
            </a>
          </nav>

          {/* Mobile Auth */}
          <div className="space-y-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Welcome back!</p>
                    <p className="text-sm text-gray-600">{user?.username}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-center hover:shadow-lg transition duration-300"
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout(navigate);
                    toggleMobileMenu();
                  }}
                  className="block w-full py-3 px-4 text-red-600 border border-red-200 rounded-xl font-semibold hover:bg-red-50 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    toggleMobileMenu();
                  }}
                  className="block w-full py-3 px-4 text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    toggleMobileMenu();
                  }}
                  className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition duration-300"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default Navbar;