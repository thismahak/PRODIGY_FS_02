// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check for the presence of the token

  // If the user is authenticated, render the component; otherwise, redirect to login page
  return isAuthenticated ? Component : <Navigate to="/login" replace />;
};

export default PrivateRoute;
