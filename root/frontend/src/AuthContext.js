import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userName, setUserName] = useState('');

  const [user, setUser] = useState({
    name: '',
    isLoggedIn: false,
  });

  useEffect(() => {
    // Check if the isLoggedIn state is stored in localStorage
    // const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    // const storedUserName = localStorage.getItem('userName');
    // if (storedIsLoggedIn || storedUserName) {
    //   setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    //   setUserName(JSON.parse(storedUserName));
    // }

    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Save the isLoggedIn state to localStorage whenever it changes
    // localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    // localStorage.setItem('userName', JSON.stringify(userName));

    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  console.log(user);

  const login = (user) => {
    // setIsLoggedIn(true);
    // setUserName(user);

    setUser({
      name: user.name,
      isLoggedIn: true,
    });
  };

  const logout = async () => {
    try {
      await axios.get('/api/v1/users/signout', { withCredentials: true });

      // setIsLoggedIn(false);
      // setUserName('');

      setUser({
        name: '',
        isLoggedIn: false,
      });

      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    login,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
