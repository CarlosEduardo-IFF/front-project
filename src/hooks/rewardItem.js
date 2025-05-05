import axiosInstance from "../api/axiosInstance";

const rewardItem = () => {
    const items = async (dados) => {
      try {
        const response = await axiosInstance.get("/reward-items", {
          params: dados,
        });
        return response.data;
      } catch (error) {
        console.error("Erro ao pegar itens de resgate: ");
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
  
    return { items };
  };
  
  export default rewardItem;
  