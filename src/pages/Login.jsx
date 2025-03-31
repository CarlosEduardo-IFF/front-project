import React, { useState } from "react";
import image from '../assets/loginimg.jpg';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate} from "react-router-dom";


const Login = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulação de autenticação
    localStorage.setItem("auth", "true");
    navigate("/app"); // Redireciona para a área autenticada
  };

  const [focused, setFocused] = useState({
    username: false,
    password: false
  });
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (field) => {
    setFocused({...focused, [field]: true});
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setFocused({...focused, [field]: false});
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-green-600 via-gray-100 to-green-400 p-4">
      
      <div className="flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden
        w-full max-w-4xl bg-white">
        
        {/* Imagem - agora à esquerda */}
        <div className="w-full lg:w-1/2">
          <img 
            src={image} 
            alt="Ilustração de login" 
            className="w-full h-full object-cover hidden lg:block"
            style={{minHeight: '400px'}}
          />
        </div>

        {/* Formulário - agora à direita */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Bem-vindo</h1>
          <p className="text-gray-600 mb-6 text-sm">Acesse sua conta</p>

          <div className="space-y-4">
            {/* Campo Usuário */}
            <div className="relative">
              <input 
                type="text" 
                id="username"
                className="block px-4 py-2.5 w-full rounded-lg border border-gray-300 
                focus:outline-none focus:border-green-500 peer"
                onFocus={() => handleFocus('username')}
                onBlur={() => handleBlur('username')}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                value={formData.username}
              />
              <label 
                htmlFor="username"
                className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
                ${focused.username || formData.username ? 
                  'top-0 text-xs bg-white px-1 text-green-600 -translate-y-1/2' : 
                  'top-1/2 text-sm text-gray-500 -translate-y-1/2'}`}
              >
                Usuário ou e-mail
              </label>
            </div>

            {/* Campo Senha com ícone de olho */}
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                className="block px-4 py-2.5 w-full rounded-lg border border-gray-300 
                focus:outline-none focus:border-green-500 peer pr-10"
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                value={formData.password}
              />
              <label 
                htmlFor="password"
                className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
                ${focused.password || formData.password ? 
                  'top-0 text-xs bg-white px-1 text-green-600 -translate-y-1/2' : 
                  'top-1/2 text-sm text-gray-500 -translate-y-1/2'}`}
              >
                Senha
              </label>
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Checkbox */}
            <div className="flex items-center justify-between text-sm mt-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <div className="relative">
                        <input 
                            id="remember-me"
                            type="checkbox"
                            checked={formData.remember}
                            onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                            className="absolute opacity-0 h-4 w-4 cursor-pointer"
                        />
                        <div className={`flex items-center justify-center h-4 w-4 border-2 rounded
                            ${formData.remember ? 
                            'bg-green-100 border-green-500' : 
                            'bg-white border-gray-300'}`}>
                            {formData.remember && (
                            <svg className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            )}
                        </div>
                    </div>
                    <span className="text-gray-600 text-sm">Lembrar-me</span>
                </label>

                <a href="#" className="text-green-600 hover:underline">
                    Esqueceu a senha?
                </a>
            </div>

            
            <button onClick={handleLogin} className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700
              text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200">
              Entrar
            </button>
            
            <p className="text-center text-sm text-gray-600">
              Não tem conta?{' '}

              <Link to="/cadastro">
              <a href="#" className="text-green-600 font-medium hover:underline">
                Cadastrar-se
              </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;