import React, { useState } from "react";
import { Navbar } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import useClientData from '../hooks/useClientData';
import ProfileMenu from './ProfileMenu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { IconButton } from "@mui/material";

const NavbarClient = () => {
  const location = useLocation();
  const { client: user, loading, error } = useClientData();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navOptions = [
    { name: "Projeto", path: "/" },
    { name: "Loja", path: "/loja" },
    { name: "Rank", path: "/rank" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ce6b48]"></div>
      </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Erro: {error}</p>
      </div>
    );
  }

  const drawer = (
    <div className="p-4 h-full" style={{ backgroundColor: '#3565a5' }}>
      <div className="flex justify-start mb-4">
        <IconButton onClick={handleDrawerToggle} color="inherit">
          <CloseIcon style={{ color: 'white' }} />
        </IconButton>
      </div>
      <List>
        {navOptions.map((option) => (
          <ListItem key={option.path} className="flex flex-col items-center">
            <Link
              to={option.path}
              onClick={handleDrawerToggle}
              className={`text-white font-mono hover:text-gray-300 relative px-3 py-2 transition-all duration-300 ${
                location.pathname === option.path ? "text-blue-500" : ""
              }`}
            >
              {option.name}
            </Link>
            <div
              className={`absolute bottom-0 h-0.5 bg-white rounded-full transition-all duration-300 ${
                location.pathname === option.path ? "w-3/4 scale-x-100" : "w-0 scale-x-0"
              }`}
              style={{ transformOrigin: "center" }}
            />
          </ListItem>
        ))}
        <div className="flex flex-col items-center mt-4">
          <ProfileMenu user={user} mobile onClose={handleDrawerToggle} />
        </div>
      </List>
    </div>
  );

  return (
    <>
      <Navbar
        className="fixed top-0 left-0 right-0 w-[97%] mx-auto mt-2 py-2 px-6 rounded-full shadow-lg flex justify-between items-center z-50"
        style={{ 
          backgroundColor: '#3565a5',
          border: 'none'
        }}
      >
        {/* Logo / Nome com Ícone */}
        <div className="flex items-center gap-2">
          <img src="/Reviralogotipo.svg" alt="Logo" className="h-6 w-32" />
        </div>

        {/* Opções de Navegação - Desktop */}
        <div className="hidden md:flex space-x-6 relative">
          {navOptions.map((option) => (
            <div key={option.path} className="relative flex flex-col items-center">
              <Link
                to={option.path}
                className={`text-white font-mono hover:text-gray-300 relative px-3 py-2 transition-all duration-300 ${
                  location.pathname === option.path ? "text-blue-500" : ""
                }`}
              >
                {option.name}
              </Link>
              <div
                className={`absolute bottom-0 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  location.pathname === option.path ? "w-3/4 scale-x-100" : "w-0 scale-x-0"
                }`}
                style={{ transformOrigin: "center" }}
              />
            </div>
          ))}
        </div>

        {/* ProfileMenu - Desktop */}
        <div className="hidden md:block">
          <ProfileMenu user={user} />
        </div>

        {/* Botão de Menu Mobile */}
        <div className="md:hidden">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon style={{ color: 'white' }} />
          </IconButton>
        </div>
      </Navbar>

      {/* Menu Mobile */}
      <nav className="md:hidden">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: '70%',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default NavbarClient;