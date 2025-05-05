import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: false,  // Inicia como false, será validado no useEffect
    loading: true           // Adicionamos estado de loading
  });

  // Função para validar o token
  const validateToken = async (token) => {
    try {
      if (!token) return false;
      
      const response = await axiosInstance.get("/auth/validate");
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  // Efeito para validar o token ao carregar e quando o token muda
  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken(authState.token);
      
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: isValid,
        loading: false
      }));

      // Se o token estiver inválido, limpamos
      if (authState.token && !isValid) {
        logout();
      }
    };

    checkAuth();
  }, [authState.token]);

  const setToken = async (token) => {
    const isValid = await validateToken(token);
    
    localStorage.setItem("token", token);
    setAuthState({
      token,
      isAuthenticated: isValid,
      loading: false
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      token: null,
      isAuthenticated: false,
      loading: false
    });
  };

  return (
    <AuthContext.Provider value={{ 
      ...authState, 
      setToken, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};