import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to sign-in page if token is not available
    return <Navigate to="/signin" />;
  }

  return children; // Render the protected component
};

export default PrivateRoute;
