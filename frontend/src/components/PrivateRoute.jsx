import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading">Carregando...</div>;

  // Se não estiver logado → redireciona p/ login
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default PrivateRoute;