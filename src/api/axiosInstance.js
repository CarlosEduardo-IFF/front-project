import axios from "axios";

const axiosInstance = axios.create({

  baseURL: "http://sustainable-connection-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// Interceptor para adicionar o token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    // Rotas que não precisam de token
    const publicRoutes = ['/auth/login', '/auth/register', '/addresses', '/users/top-points', '/discarded-item', '/drop-off-points'];
    
    if (!publicRoutes.some(route => config.url.includes(route))) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;