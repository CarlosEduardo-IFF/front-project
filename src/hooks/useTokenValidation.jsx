import { useAuth } from "../context/AuthContext";

const useTokenValidation = () => {
  const { isAuthenticated, loading } = useAuth();
  
  return { isAuthenticated, loading };
};

export default useTokenValidation;