import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { AuthService, LoginCredentials, RegisterData, UserData } from '../services/authService';
import api from '../services/api';

// Define types
interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await AuthService.login({ email, password });
      const transformedUser = {
        id: userData._id,
        username: userData.username,
        email: userData.email,
        token: userData.token
      };
      localStorage.setItem('user', JSON.stringify(transformedUser));
      setUser(transformedUser);
      toast.success('Login successful!');
    } catch (error) {
      console.debug(error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await AuthService.register({ username, email, password });
      const transformedUser = {
        id: userData._id,
        username: userData.username,
        email: userData.email,
        token: userData.token
      };
      localStorage.setItem('user', JSON.stringify(transformedUser));
      setUser(transformedUser);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully!');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export all the types to keep compatibility with existing imports
export type { Task, TaskUrgency, TaskCategory, TaskStatus } from '../types/task';
