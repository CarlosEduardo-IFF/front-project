import React, { useState } from "react";
import image from '../assets/mascote.svg';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { loginUsuario } = useLogin();
  const { setToken, loading: authLoading } = useAuth(); // Adicionamos authLoading

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
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    setErro('');
    setCarregando(true);

    if (!formData.username || !formData.password) {
      setErro('Por favor, preencha todos os campos');
      setCarregando(false);
      return;
    }

    try {
      const resposta = await loginUsuario({
        login: formData.username,
        password: formData.password,
      });

      const rawToken = resposta.token.startsWith("Bearer ")
        ? resposta.token.replace("Bearer ", "")
        : resposta.token;

      await setToken(rawToken); // Aguarda a atualização do token
      navigate("/"); // Redireciona após a autenticação
  
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      
      if (err.response) {
        if (err.response.status === 401) {
          setErro("Credenciais inválidas");
        } else if (err.response.status === 500) {
          setErro("Problema no servidor. Tente novamente mais tarde.");
        } else {
          setErro(err.response.data?.message || "Erro ao fazer login");
        }
      } else if (err.request) {
        setErro("Sem resposta do servidor. Verifique sua conexão.");
      } else {
        setErro("Erro ao configurar a requisição.");
      }
    } finally {
      setCarregando(false);
    }
  };

  const handleFocus = (field) => {
    setFocused({...focused, [field]: true});
    setErro(''); // Limpa erro quando o usuário começa a digitar
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
      bg-gradient-to-br from-[#ce6b48] via-[#f3f4f6] to-[#509145] p-4">
      
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
          <h1 className="font-mono text-3xl font-bold text-[#509145] mb-2">Bem-vindo</h1>
          <p className="font-mono text-gray-600 mb-6 text-sm">Acesse sua conta</p>

          {/* Mensagem de erro */}
          {erro && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-mono text-sm">{erro}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Campo Usuário */}
            <div className="relative">
              <input 
                type="text" 
                id="username"
                className="font-mono block px-4 py-2.5 w-full rounded-lg border border-gray-300 
                focus:outline-none focus:border-[#aac049] peer"
                onFocus={() => handleFocus('username')}
                onBlur={() => handleBlur('username')}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                value={formData.username}
              />
              <label 
                htmlFor="username"
                className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
                ${focused.username || formData.username ? 
                  'font-mono top-0 text-xs bg-white px-1 text-[#aac049] -translate-y-1/2' : 
                  'font-mono top-1/2 text-sm text-gray-500 -translate-y-1/2'}`}
              >
                E-mail
              </label>
            </div>

            {/* Campo Senha com ícone de olho */}
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                className="font-mono block px-4 py-2.5 w-full rounded-lg border border-gray-300 
                focus:outline-none focus:border-[#aac049] peer pr-10"
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                value={formData.password}
              />
              <label 
                htmlFor="password"
                className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
                ${focused.password || formData.password ? 
                  'font-mono top-0 text-xs bg-white px-1 text-[#aac049] -translate-y-1/2' : 
                  'font-mono top-1/2 text-sm text-gray-500 -translate-y-1/2'}`}
              >
                Senha
              </label>
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#aac049] focus:outline-none"
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
                            'bg-green-100 border-[#509145]' : 
                            'bg-white border-gray-300'}`}>
                            {formData.remember && (
                            <svg className="h-3 w-3 text-[#509145]" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            )}
                        </div>
                    </div>
                    <span className="font-mono text-gray-600 text-sm">Lembrar-me</span>
                </label>

                <a href="#" className="font-mono text-[#aac049] hover:underline">
                    Esqueceu a senha?
                </a>
            </div>

            
            <button 
              onClick={handleLogin} 
              disabled={carregando}
              className={`font-mono w-full py-2.5 px-4 ${
                carregando ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#509145] hover:bg-green-700'
              } text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 flex items-center justify-center`}
            >
              {carregando ? (
                <span className="inline-flex items-center">
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Autenticando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
            
            <p className="font-mono text-center text-sm text-gray-600">
              Não tem conta?{' '}

              <Link to="/cadastro" className="font-mono text-[#aac049] font-medium hover:underline">
               
                Cadastrar-se
              
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;