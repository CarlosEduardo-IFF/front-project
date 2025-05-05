import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useClientData = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axiosInstance.get("/users/me");
        setClient(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao carregar dados do cliente.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, []);

  return { client, loading, error };
};

export default useClientData;
