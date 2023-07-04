import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';

// Create a new context for the AuthContext
export const AuthContext = createContext();

// AuthContext Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  console.log(user);

  useEffect(() => {
    // Check if a JWT token exists in cookies
    const token = Cookies.get('jwt');
    console.log(token);

    if (token) {
      try {
        // Decode the JWT
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);
        setUser(decodedToken);
      } catch (error) {
        console.log('Error decoding the JWT:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user.id) {
        try {
          const response = await axios.get(`/api/v1/users/${user.id}`);
          console.log(response);
          setUser(response.data.data.user);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
    };

    fetchUser();
  }, [user.id]);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
