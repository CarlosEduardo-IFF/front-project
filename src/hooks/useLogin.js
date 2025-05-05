import axiosInstance from "../api/axiosInstance";

const useLogin = () => {
  const loginUsuario = async (dados) => {
    try {
      const response = await axiosInstance.post("/auth/login", dados);
      return response.data;
    } catch (error) {
      console.error("Erro no login: ", error);
      throw error;
    }
  };

  return { loginUsuario };
};

export default useLogin;