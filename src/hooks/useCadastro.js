import axiosInstance from "../api/axiosInstance";

const useCadastro = () => {
  const cadastrarUsuario = async (dados) => {
    try {
      const response = await axiosInstance.post("/auth/register", dados); // endpoint real aqui
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  };

  return { cadastrarUsuario };
};

export default useCadastro;