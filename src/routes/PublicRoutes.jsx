import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Navbar from "../components/NavbarUser"; // Navbar para não autenticados
import HomeUser from "../pages/HomeUser";
import Loja from "../pages/LojaDeResgate";
import Rank from "../pages/Rank";

const PublicRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<HomeUser />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/rank" element={<Rank />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;