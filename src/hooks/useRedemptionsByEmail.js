import axiosInstance from "../api/axiosInstance";

const useRedemptionsByEmail = () => {
  const fetchRedemptions = async (email) => {
    try {
      const response = await axiosInstance.get("/redemptions/by-user-email", {
        params: { email },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar resgates por e-mail:");
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

  return { fetchRedemptions };
};

export default useRedemptionsByEmail;
