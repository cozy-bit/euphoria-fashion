import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const USERS_KEY = 'euphoria_users';
const CURRENT_USER_KEY = 'euphoria_current_user';

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
};

const getCurrentUser = () => {
  try {
    return JSON.parse(
      localStorage.getItem(CURRENT_USER_KEY) || 'null'
    );
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const savedUser = getCurrentUser();

  const [user, setUser] = useState(savedUser);
  const [isAuthenticated, setIsAuthenticated] =
    useState(!!savedUser);

  // ================= REGISTER =================

  const register = (phone, password) => {
    const users = getUsers();

    const normalizedPhone = phone.replace(/\s/g, '');

    const exists = users.some(
      (item) => item.phone === normalizedPhone
    );

    if (exists) {
      return {
        success: false,
        message: 'This phone number is already registered.'
      };
    }

    const newUser = {
      id: Date.now(),
      name: 'Euphoria User',
      phone: normalizedPhone,
      password,
      email: '',
      avatar: '',
      address: {
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Tajikistan'
      }
    };

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([...users, newUser])
    );

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(newUser)
    );

    setUser(newUser);
    setIsAuthenticated(true);

    return {
      success: true,
      user: newUser
    };
  };

  // ================= LOGIN =================

  const login = (phone, password) => {
    const users = getUsers();

    const normalizedPhone = phone.replace(/\s/g, '');

    const foundUser = users.find(
      (item) =>
        item.phone === normalizedPhone &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: 'Incorrect phone number or password.'
      };
    }

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(foundUser)
    );

    setUser(foundUser);
    setIsAuthenticated(true);

    return {
      success: true,
      user: foundUser
    };
  };

  // ================= LOGOUT =================

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);

    setUser(null);
    setIsAuthenticated(false);
  };

  // ================= UPDATE PROFILE =================

  const updateProfile = (data) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = {
        ...prev,
        ...data
      };

      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(updatedUser)
      );

      const users = getUsers();

      localStorage.setItem(
        USERS_KEY,
        JSON.stringify(
          users.map((item) =>
            item.id === updatedUser.id
              ? updatedUser
              : item
          )
        )
      );

      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        register,
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
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
}