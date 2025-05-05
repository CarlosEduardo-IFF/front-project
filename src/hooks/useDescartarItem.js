import axiosInstance from "../api/axiosInstance";

const useDescartarItem = () => {
  const descartarItem = async (dados) => {
    try {
      const response = await axiosInstance.post("/discarded-items", dados);
      return response.data;
    } catch (error) {
      console.error("Erro ao descartar item:", error);
      throw error;
    }
  };

  return { descartarItem };
};

export default useDescartarItem;