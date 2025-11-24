import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

/*
  O AuthContext será responsável por:
  - Guardar informações do usuário
  - Verificar se existe um token válido
  - Fazer login e logout
  - Cadastrar usuários
  - Evitar que páginas privadas carreguem sem autenticação
*/
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // usado para verificar sessão no carregamento

  // Executa uma vez ao carregar a aplicação
  useEffect(() => {
    checkAuth();
  }, []);

  // Verifica se existe sessão ativa
  const checkAuth = async () => {
    try {
      const userData = await authService.getMe();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login -> armazena usuário retornado
  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    return data;
  };

  // Registro -> apenas retorna resultado
  const register = async (userData) => {
    const data = await authService.register(userData);
    return data;
  };

  // Logout -> limpa sessão
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar facilmente o AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};