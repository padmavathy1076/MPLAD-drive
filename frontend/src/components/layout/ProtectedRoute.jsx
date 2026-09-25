import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const auth = localStorage.getItem('mplads_auth');
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}
