import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const useTop10Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get("/users/top-points");
        setClients(response.data);
      } catch (err) {
        console.error("Erro ao pegar top 10 clients:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, loading, error };
};

export default useTop10Clients;
