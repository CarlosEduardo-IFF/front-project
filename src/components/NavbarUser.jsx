import React, { useState } from "react";
import { Navbar } from "@material-tailwind/react";
import { Button, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const NavbarUser = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navOptions = [
    { name: "Projeto", path: "/" },
    { name: "Rank", path: "/rank" },
  ];

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
        <div className="flex flex-col items-center gap-4 mt-4">
          <Link to="/login" onClick={handleDrawerToggle}>
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
                fontFamily: 'font-mono',     
                textTransform: 'none',     
                borderColor: '#FFFFFF',
                color: '#FFFFFF',
                transition: 'all 0.3s ease',
                display: 'inline-flex',          
                alignItems: 'center',           
                justifyContent: 'center',       
                lineHeight: 1,                  
                '&:hover': {
                  transform: 'translateY(-3px)',
                  borderColor: '#d1d5db',
                  backgroundColor: 'rgba(56, 142, 60, 0.08)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }
              }}
            >
              Entrar
            </Button>
          </Link>
          <Link to="/cadastro" onClick={handleDrawerToggle}>
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
                fontFamily: 'font-mono',
                textTransform: 'none',
                background: 'linear-gradient(90deg, #509145, #aac049, #509145)',
                backgroundSize: '300% 100%',
                boxShadow: 'none',
                animation: 'gradientMove 4s ease infinite',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  animation: 'gradientMove 3s ease infinite',
                },
              }}
            >
              Cadastrar-se
            </Button>
          </Link>
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

        {/* Botões de Acesso - Desktop */}
        <div className="hidden md:flex items-center gap-2">
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
                fontFamily: 'font-mono',     
                textTransform: 'none',     
                borderColor: '#FFFFFF',
                color: '#FFFFFF',
                transition: 'all 0.3s ease',
                display: 'inline-flex',          
                alignItems: 'center',           
                justifyContent: 'center',       
                lineHeight: 1,                  
                '&:hover': {
                  transform: 'translateY(-3px)',
                  borderColor: '#d1d5db',
                  backgroundColor: 'rgba(56, 142, 60, 0.08)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }
              }}
            >
              Entrar
            </Button>
          </Link>
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
                fontFamily: 'font-mono',
                textTransform: 'none',
                background: 'linear-gradient(90deg, #509145, #aac049, #509145)',
                backgroundSize: '300% 100%',
                boxShadow: 'none',
                animation: 'gradientMove 4s ease infinite',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  animation: 'gradientMove 3s ease infinite',
                },
              }}
            >
              Cadastrar-se
            </Button>
          </Link>
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

export default NavbarUser;