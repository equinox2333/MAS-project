import React, { createContext, useContext, useEffect, useState } from 'react';
import { verifyTokenValidity } from '@/services/user';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    verifyTokenValidity()
      .then((isValid) => {
        setIsAuthenticated(isValid);
      })
      .catch((error) => {
        console.error('Error verifying token validity: ', error);
      });
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};
