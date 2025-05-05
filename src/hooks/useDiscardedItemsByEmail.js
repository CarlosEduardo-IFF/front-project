import axiosInstance from "../api/axiosInstance";

const useDiscardedItemsByEmail = () => {
  const fetchDiscardedItems = async (email) => {
    try {
      const response = await axiosInstance.get("/discarded-items/by-client", {
        params: { email },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar descartes por e-mail:");
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

  return { fetchDiscardedItems };
};

export default useDiscardedItemsByEmail;
