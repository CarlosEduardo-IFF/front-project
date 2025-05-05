import axiosInstance from "../api/axiosInstance";

const dropOffPoint = () => {
    const dropOffs = async (dados) => {
      try {
        const response = await axiosInstance.get("/drop-off-points", {
          params: dados,
        });
        return response.data;
      } catch (error) {
        console.error("Erro ao pegar locais: ");
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
  
    return { dropOffs };
  };
  
  export default dropOffPoint;
  