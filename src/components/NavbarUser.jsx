import React, { useState } from "react";
import { Navbar, Typography } from "@material-tailwind/react";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const NavbarUser = () => {
  
  const location = useLocation();

  return (
    <Navbar className="fixed top-0 left-0 right-0 w-[97%] mx-auto mt-2 bg-white text-white py-2 px-6 rounded-full shadow-lg flex justify-between items-center z-50">
      {/* Logo / Nome com Ícone */}
      <div className="flex items-center gap-2">
        <img src="/logo.PNG" alt="Logo" className="h-6 w-6" />
        <Typography className="text-gray-700 text-xl md:text-2xl font-bold">
          Re•Vira
        </Typography>
      </div>

      {/* Opções de Navegação { name: "Loja", path: "/loja" },*/}
      <div className="flex space-x-6 relative">
        {[
          { name: "Projeto", path: "/" },
          
          

          { name: "Rank", path: "/rank" },
        ].map((option) => (
          <div key={option.path} className="relative flex flex-col items-center">
            <Link
              to={option.path}
              className={`text-gray-700 hover:text-black relative px-3 py-2 transition-all duration-300 ${
                location.pathname === option.path ? "text-blue-500" : ""
              }`}
            >
              {option.name}
            </Link>

            <div
              className={`absolute bottom-0 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${
                location.pathname === option.path ? "w-3/4 scale-x-100" : "w-0 scale-x-0"
              }`}
              style={{ transformOrigin: "center" }}
            />
          </div>
        ))}
      </div>

      {/* Botões de Acesso */}
      <div className="flex items-center gap-2">
        {/* Botão Entrar */}
        <Link to="/login">
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: '18px',          
            minWidth: 0,
            padding: '3px 10px',           
            height: '28px',                
            fontSize: '0.75rem',           
            fontWeight: 400,           
            fontFamily: 'inherit',     
            textTransform: 'none',     
            borderColor: '#388E3C',
            color: '#2E7D32',
            transition: 'all 0.3s ease',
            display: 'inline-flex',          
            alignItems: 'center',           
            justifyContent: 'center',       
            lineHeight: 1,                  
            '&:hover': {
              transform: 'translateY(-3px)',
              borderColor: '#1B5E20',
              backgroundColor: 'rgba(56, 142, 60, 0.08)',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }
          }}
        >
          Entrar
        </Button>
        </Link>

        {/* Botão Cadastrar-se - COM GRADIENTE ANIMADO + PULINHO */}
        <Link to="/cadastro">
        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: '18px',           
            minWidth: 0,
            padding: '3px 10px',           
            height: '28px',                
            fontSize: '0.75rem',           
            fontWeight: 400,           
            fontFamily: 'inherit',     
            textTransform: 'none',     
            background: 'linear-gradient(90deg, #388E3C, #374151, #388E3C)',
            backgroundSize: '200% auto',
            boxShadow: 'none',
            animation: 'gradientMove 3s linear infinite',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'inline-flex',          
            alignItems: 'center',           
            justifyContent: 'center',       
            lineHeight: 1,                  
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              animation: 'gradientMove 2s linear infinite',
            },
            '@keyframes gradientMove': {
              '0%': {
                backgroundPosition: '0% center'
              },
              '100%': {
                backgroundPosition: '200% center'
              }
            }
          }}
        >
          Cadastrar-se
        </Button>
        </Link>
      </div>
    </Navbar>
  );
};

export default NavbarUser;