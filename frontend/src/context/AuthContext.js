import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEmailFromToken, refreshAccessToken, setupAxiosInterceptors } from '../utils/jwtUtils';

// Create a Context
const AuthContext = createContext();

// Create a Provider component
export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthProvider mounted");
    setupAxiosInterceptors();

    const checkAuthStatus = async () => {
      let { email, isValid } = getUserEmailFromToken();
      console.log("Token validation result:", { email, isValid });

      if (!isValid) {
        console.log("Token is not valid, attempting to refresh");
        const token = await refreshAccessToken();
        if (token) {
          ({ email, isValid } = getUserEmailFromToken());
        }
      }

      if (isValid) {
        console.log("Token is valid, userEmail set to:", email);
        setUserEmail(email);
      } else {
        console.log("Token is not valid, navigating to login");
        navigate('/login');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);