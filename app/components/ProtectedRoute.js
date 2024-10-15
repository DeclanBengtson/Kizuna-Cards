import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decode token to check subscription status
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (!payload.isSubscribed) {
    return <Navigate to="/subscriptions" />;
  }

  return children;
};

export default ProtectedRoute;