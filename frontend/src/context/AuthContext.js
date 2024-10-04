import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEmailFromToken, refreshAccessToken, setupAxiosInterceptors } from '../utils/jwtUtils';

// Create a Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);  // Add loading state
  const navigate = useNavigate();

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
        console.log("Token is not valid, navigating to login");
        navigate('/login');
      }

      setLoading(false);  // Finish loading once the check is done
    };

    checkAuthStatus();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ userEmail, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
