"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify, JWTPayload } from "jose";

interface User {
  id: string;
  email: string;
  name: string;
  gender: string;
}

interface UserContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, gender: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-default-super-secret-key-that-is-long');
const COOKIE_NAME = 'session_token';

interface JwtPayload extends JWTPayload {
  userId: string;
  email: string;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkAuthStatus = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith(`${COOKIE_NAME}=`))
          ?.split('=')[1];

        if (token) {
          // Verify the token
          const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: JwtPayload };
          
          // Fetch user data from API
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Token is valid but user data fetch failed, logout
            logout();
          }
        }
      } catch (error) {
        // Invalid token, clear it
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [isClient]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      // Fetch user data after successful login
      const userResponse = await fetch('/api/auth/me');
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
        router.push('/');
        router.refresh();
        return { success: true };
      } else {
        return { success: false, error: 'Failed to fetch user data' };
      }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (name: string, email: string, password: string, gender: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, gender }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = () => {
    // Remove the token cookie
    document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  const value = useMemo(() => ({
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }), [user, loading]);

  // Don't render anything different on the server vs client to prevent hydration errors
  if (!isClient) {
    return <UserContext.Provider value={{...value, loading: true}}>{children}</UserContext.Provider>;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}