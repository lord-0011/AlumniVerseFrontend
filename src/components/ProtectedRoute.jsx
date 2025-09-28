// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This is optional but good UX.
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;