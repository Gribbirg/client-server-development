'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User, AuthContextType } from '../types';

// Mock user data
const MOCK_USERS: User[] = [
  { id: 1, username: 'admin', role: 'admin' },
  { id: 2, username: 'user1', role: 'user' },
  { id: 3, username: 'user2', role: 'user' },
];

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as User;
      setUser(parsedUser);
      setIsAdmin(parsedUser.role === 'admin');
    }
  }, []);

  const login = (userId: number) => {
    const selectedUser = MOCK_USERS.find(u => u.id === userId);
    if (selectedUser) {
      setUser(selectedUser);
      setIsAdmin(selectedUser.role === 'admin');
      localStorage.setItem('currentUser', JSON.stringify(selectedUser));
      
      // Set the user ID in axios defaults to be used in API requests
      axios.defaults.headers.common['X-User-ID'] = selectedUser.id.toString();
      axios.defaults.headers.common['X-User-Role'] = selectedUser.role;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
    
    // Clear axios headers
    delete axios.defaults.headers.common['X-User-ID'];
    delete axios.defaults.headers.common['X-User-Role'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 