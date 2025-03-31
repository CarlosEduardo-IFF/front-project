import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavbarUser from "../components/Navbar";
import HomeUser from "../pages/HomeUser";
import Loja from "../pages/LojaDeResgate";
import Rank from "../pages/Rank";
import Perfil from "../pages/Perfil";

const PrivateRoutes = () => {
  const isAuthenticated = true; // Lógica de autenticação

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavbarUser />
      <Routes>
        <Route path="/" element={<HomeUser />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;