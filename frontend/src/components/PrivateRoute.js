import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { userEmail } = useAuth();
  console.log("PrivateRoute: userEmail =", userEmail);

  return userEmail ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;