import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/NavbarUser";
import NavbarUser from "../components/Navbar";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import HomeUser from "../pages/HomeUser";
import Loja from "../pages/LojaDeResgate";
import Rank from "../pages/Rank";
import Perfil from "../pages/Perfil";
import RedemptionHistory from "../pages/RedemptionHistory";
import DiscardHistory from "../pages/DiscardHistory";
import useTokenValidation from "../hooks/useTokenValidation";
import ClientSelection from "../pages/ClientSelection";

const RouteHandler = () => {
  const { isAuthenticated, loading } = useTokenValidation();
  const location = useLocation();

  if (loading) {
    return <div></div>;
  }

  const noNavbarRoutes = ["/login", "/cadastro", "/admin-c"];
  const currentPath = location.pathname;

  const showNavbarPublic = !isAuthenticated && !noNavbarRoutes.includes(currentPath);
  const showNavbarPrivate = isAuthenticated;

  return (
    <>
      {showNavbarPublic && <Navbar />}
      {showNavbarPrivate && <NavbarUser />}

      <Routes>
        <Route path="/" element={<HomeUser />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/admin-c" element={<ClientSelection />} />

        {isAuthenticated ? (
          <>
            <Route path="/loja" element={<Loja />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/resgates" element={<RedemptionHistory />} />
            <Route path="/descartes" element={<DiscardHistory />} />
          </>
        ) : (
          <>
            <Route path="/loja" element={<Navigate to="/login" />} />
            <Route path="/perfil" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default RouteHandler;