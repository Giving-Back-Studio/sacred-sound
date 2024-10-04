import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { userEmail, loading } = useAuth();

  // Wait for auth check to finish
  if (loading) {
    return <p>Loading...</p>;
  }

  // If user is not authenticated, redirect to login
  if (!userEmail) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if user is authenticated
  return children;
};

export default PrivateRoute;
