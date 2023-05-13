import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if the isLoggedIn state is stored in localStorage
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserName = localStorage.getItem('userName');
    if (storedIsLoggedIn || storedUserName) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
      setUserName(JSON.parse(storedUserName));
    }
  }, []);

  useEffect(() => {
    // Save the isLoggedIn state to localStorage whenever it changes
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('userName', JSON.stringify(userName));
  }, [isLoggedIn, userName]);

  console.log(isLoggedIn);
  console.log(userName);

  const login = (user) => {
    setIsLoggedIn(true);
    setUserName(user);
  };

  const logout = async () => {
    try {
      await axios.get('/api/v1/users/signout', { withCredentials: true });

      setIsLoggedIn(false);
      setUserName('');

      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    isLoggedIn,
    login,
    logout,
    userName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
