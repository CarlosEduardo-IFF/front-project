import axiosInstance from "../api/axiosInstance";

const useRedemptionRecord = () => {
  const create = async (body) => {
    try {
      const response = await axiosInstance.post("/redemptions", body);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar registro de resgate:");
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

  return { create };
};

export default useRedemptionRecord;