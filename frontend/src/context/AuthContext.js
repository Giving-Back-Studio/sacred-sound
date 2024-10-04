import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserEmailFromToken, refreshAccessToken, setupAxiosInterceptors } from '../utils/jwtUtils';

// Create a Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    const checkAuthStatus = async () => {
      setupAxiosInterceptors();

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
        console.log("User is not authenticated.");
      }

      setLoading(false);  // Finish loading once the check is done
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ userEmail, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);