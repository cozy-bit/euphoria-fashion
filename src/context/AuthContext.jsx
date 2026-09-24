import React, { createContext, useContext, useState } from 'react';
import defaultAvatar from '../assets/images/tolibov/contact-details/user-profile-avatar.png';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Jhanvi Shah',
    email: 'jhanvi.shah@euphoria.in',
    phone: '+91 98765 43210',
    avatar: defaultAvatar,
    address: {
      firstName: 'Jhanvi',
      lastName: 'Shah',
      street: '89 Main Market Street, Flat 4B',
      city: 'Ahmedabad',
      state: 'Gujarat',
      postalCode: '380015',
      country: 'India'
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (email, password) => {
    setUser(prev => ({
      ...prev,
      email: email || prev.email
    }));
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (data) => {
    setUser(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
