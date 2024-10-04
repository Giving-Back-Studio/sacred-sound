import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { userEmail, loading } = useAuth();  // Add loading state check

  if (loading) {
    // Show a loading indicator or nothing while the auth check is in progress
    return <p>Loading...</p>;
  }

  if (!userEmail) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, allow access to the protected component
  return children;
};

export default PrivateRoute;
