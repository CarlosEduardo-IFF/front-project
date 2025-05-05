import React, { useState } from 'react';
import { Menu, MenuHandler, MenuList, MenuItem, Avatar } from '@material-tailwind/react';
import { ChevronDownIcon, GiftIcon, TrashIcon, UserCircleIcon, PowerIcon } from '@heroicons/react/24/solid';
import { ButtonBase } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth(); // Usamos a função logout do contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Chama a função logout do AuthContext
    navigate('/'); // Redireciona para a página inicial
    setOpen(false); // Fecha o menu
  };

  return (
    <Menu open={open} handler={setOpen}>
      <MenuHandler>
        <ButtonBase
          component="div"
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
            '& .MuiTouchRipple-root': {
              color: '#3565a5',
            }
          }}
          onClick={() => setOpen(!open)}
        >
          {/* Avatar com bordas */}
          <div className="w-9 h-9 rounded-full bg-white flex justify-center items-center border border-white">
            <div className="w-full h-full rounded-full border-2 border-white">
              <Avatar
                src={`/${user.avatar}.svg`} 
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Ícone de seta */}
          <ChevronDownIcon
            className={`w-3 h-3 transition-transform ${
              open ? "rotate-180" : "rotate-0"
            } text-white`}
          />
        </ButtonBase>
      </MenuHandler>
      <MenuList className="bg-white text-black shadow-lg rounded-lg p-2 w-32 max-w-[200px] border border-gray-200 z-2000">
        <Link to="/perfil" className="focus:outline-none">
          <MenuItem className="flex text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 rounded-md p-2 cursor-pointer text-xs text-left">
            <UserCircleIcon className="font-mono w-4 h-4 mr-1 text-gray-600" />
            Perfil
          </MenuItem>
        </Link>

        <Link to="/resgates" className="focus:outline-none">
          <MenuItem className="flex text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 rounded-md p-2 cursor-pointer text-xs text-left">
            <GiftIcon className="font-mono w-4 h-4 mr-1 text-gray-600" />
            Resgates
          </MenuItem>
        </Link>

        <Link to="/descartes" className="focus:outline-none">
          <MenuItem className="flex text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 rounded-md p-2 cursor-pointer text-xs text-left">
            <TrashIcon className="font-mono w-4 h-4 mr-1 text-gray-600" />
            Descartes
          </MenuItem>
        </Link>

        <MenuItem 
          className="flex text-[#ce6b48] hover:bg-red-100 focus:bg-red-100 focus:outline-none focus:ring-0 rounded-md p-2 cursor-pointer text-xs text-left"
          onClick={handleLogout}
        >
          <PowerIcon className="font-mono w-4 h-4 mr-1 text-[#ce6b48]" />
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;