import axiosInstance from "../api/axiosInstance";

const useUpdateClient = () => {
  const updateClient = async (dados) => {
    try {
      const response = await axiosInstance.put("/users/client/update", dados); // endpoint real aqui
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  };

  return { updateClient };
};

export default useUpdateClient;