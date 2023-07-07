import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  // Check if the user is authenticated by validating the session ID
  const isAuthenticated = Cookies.get('session_id') !== undefined && Cookies.get('session_id') !== '';
  console.log(isAuthenticated);
  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/" />
  );
};

export default ProtectedRoute;
