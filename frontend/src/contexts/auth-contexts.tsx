import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

interface User {
  id?: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, navigate: NavigateFunction) => Promise<void>;
  register: (username: string, email: string, password: string, navigate: NavigateFunction) => Promise<void>;
  logout: (navigate: NavigateFunction) => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string, navigate: NavigateFunction) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);

      const userResponse = await fetch("http://localhost:8000/users/me", {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    navigate: NavigateFunction
  ) => {
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // After successful registration, log the user in
      await login(email, password, navigate);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = (navigate: NavigateFunction) => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

