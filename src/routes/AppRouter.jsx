import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRouters";
import PublicRoutes from "./PublicRoutes";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas (Login, Cadastro) */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Rotas privadas (Home, Loja, etc.) */}
        <Route path="/app/*" element={<PrivateRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;