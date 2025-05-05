import axiosInstance from "../api/axiosInstance";

const useDiscardedItemCategory = () => {
    const categories = async (dados) => {
      try {
        const response = await axiosInstance.get("/discarded-item-categories", {
          params: dados,
        });
        return response.data;
      } catch (error) {
        console.error("Erro ao pegar categorias: ");
        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
          console.error("Headers:", error.response.headers);
        } else {
          console.error(error.message);
        }
        throw error;
      }
    };
  
    return { categories };
  };
  
  export default useDiscardedItemCategory;