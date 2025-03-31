import React, { useState } from "react";
import { Navbar, Typography, Menu, MenuHandler, MenuList, MenuItem, Avatar } from "@material-tailwind/react";
import { ChevronDownIcon, UserCircleIcon, PowerIcon, Cog6ToothIcon} from "@heroicons/react/24/solid";
import { ButtonBase } from '@mui/material';
import { Link, useLocation } from "react-router-dom";

const NavbarClient = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Navbar className="fixed top-0 left-0 right-0 w-[97%] mx-auto mt-2 bg-white text-white py-2 px-6 rounded-full shadow-lg flex justify-between items-center z-50">
      {/* Logo / Nome com Ícone */}
      <div className="flex items-center gap-2">
        <img 
          src="/logo.PNG" 
          alt="Logo" 
          className="h-6 w-6"
        />
        <Typography className="text-gray-700 text-xl md:text-2xl font-bold">
          Re•Vira
        </Typography>
      </div>

      {/* Opções de Navegação */}
      <div className="flex space-x-6 relative">
        {[
          { name: "Projeto", path: "/app" },
          { name: "Loja", path: "/app/loja" },
          { name: "Rank", path: "/app/rank" },
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

      {/* Avatar e Menu de Perfil */}
      <Menu open={open} handler={setOpen}>
        <MenuHandler>
        <ButtonBase
          component="div" // Renderiza como div em vez de button
          focusRipple
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px',
            paddingRight: '4px',
            height: '40px',
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': { 
              backgroundColor: 'rgba(0, 0, 0, 0.04)' 
            },
            '&:focus': { 
              backgroundColor: 'rgba(0, 0, 0, 0.04)' 
            },
            // Adicione esta parte para personalizar o Ripple:
            '& .MuiTouchRipple-root': {
              color: '#6B7280', // Azul do Tailwind (500)
              // Ou use outras cores:
              // color: '#ef4444', // Vermelho
              // color: '#10b981', // Verde
              // color: 'rgba(59, 130, 246, 0.5)', // Com transparência
            }
          }}
          onClick={() => setOpen(!open)}
        >
          {/* Avatar com bordas */}
          <div className="w-9 h-9 rounded-full bg-white flex justify-center items-center border border-black">
            <div className="w-full h-full rounded-full border-2 border-white">
              <Avatar
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=avatar1&backgroundColor=b6e3f4"
                
                alt="Foto de Perfil"
                className="rounded-full w-full h-full"
              />
            </div>
          </div>

          {/* Ícone de seta */}
          <ChevronDownIcon
            className={`w-3 h-3 transition-transform ${
              open ? "rotate-180" : "rotate-0"
            } text-gray-500`}
          />
        </ButtonBase>
        </MenuHandler>
        <MenuList className="bg-white text-black shadow-lg rounded-lg p-2 w-32 max-w-[200px] border border-gray-200 z-51">
          <Link to="/app/perfil" className="focus:outline-none">
            <MenuItem className="flex text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 rounded-md p-2 cursor-pointer text-xs text-left">
              <UserCircleIcon className="w-4 h-4 mr-1 text-gray-600" />
              Perfil
            </MenuItem>
          </Link>
          <MenuItem className="flex text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 rounded-md p-2 cursor-pointer text-xs text-left">
            <Cog6ToothIcon className="w-4 h-4 mr-1 text-gray-600" />
            Resgates
          </MenuItem>

          <MenuItem className="flex text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 rounded-md p-2 cursor-pointer text-xs text-left">
            <Cog6ToothIcon className="w-4 h-4 mr-1 text-gray-600" />
            Descartes
          </MenuItem>

          <Link to="/" className="focus:outline-none">
          <MenuItem className="flex text-red-500 hover:bg-red-100 focus:bg-red-100 focus:outline-none focus:ring-0 rounded-md p-2 cursor-pointer text-xs text-left">
            <PowerIcon className="w-4 h-4 mr-1 text-red-500 hover:text-red-300 focus:text-red-300" />
            Sair
          </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Navbar>
  );
};

export default NavbarClient;





