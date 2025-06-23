import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import Dashboard from "../pages/dashboard";
import Blog from "../pages/dashboard/Blog";


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
    {
      path: '/blogs',
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: '/blog/:id',
      element: (
        <Layout>
          <Blog />
        </Layout>
      ),
    },
    {
      path: '/login',
      element: (
        <Layout>
          <AuthRoute>
            <Login />
          </AuthRoute>
        </Layout>
      ),
    },
    {
      path: '/register',
      element: (
        <Layout>
          <AuthRoute>
            <Register />
          </AuthRoute>
        </Layout>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      ),
    },

  ]);