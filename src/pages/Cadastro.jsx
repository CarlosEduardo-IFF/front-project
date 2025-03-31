import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Importando os ícones
import image from '../assets/loginimg.jpg';
import { Link } from "react-router-dom";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    matricula: '',
    aceitarTermos: false
  });

  const [focused, setFocused] = useState({
    nome: false,
    email: false,
    senha: false,
    confirmarSenha: false,
    matricula: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar os dados do formulário
    console.log('Dados do cadastro:', formData);
  };

  return (
    <section className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-green-600 via-gray-100 to-green-400 p-4">
      
      <div className="flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden
        w-full max-w-5xl mt-20 bg-white">
        
        {/* Imagem à esquerda */}
        <div className="w-full lg:w-1/2 bg-gray-100">
          <img 
            src={image} 
            alt="Ilustração de cadastro" 
            className="w-full h-full object-cover hidden lg:block"
            style={{minHeight: '600px'}}
          />
        </div>

        {/* Formulário à direita */}
        <div className="w-full lg:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Crie sua conta</h1>
          <p className="text-gray-600 mb-6 text-sm">Preencha os campos para se cadastrar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Nome */}
            <div className="relative">
              <input 
                type="text" 
                id="nome"
                className="block px-4 py-2.5 w-full rounded-lg border border-gray-300 
                focus:outline-none focus:border-green-500 peer"
                onFocus={() => handleFocus('nome')}
                onBlur={() => handleBlur('nome')}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                value={formData.nome}
              />
              <label 
                htmlFor="nome"
                className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
                ${focused.nome || formData.nome ? 
                  'top-0 text-xs bg-white px-1 text-green-600 -translate-y-1/2' : 
                  'top-1/2 text-sm text-gray-500 -translate-y-1/2'}`}
              >
                Nome Completo
              </label>
            </div>

            {/* Campo Email */}
            <div className="relative">
              <input 
                type="email" 
                id="email"
                className="block px-4 py-2.5 w-full rounded-lg border border-gray-300 
                focus:outline-none focus:border-green-500 peer"
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                value={formData.email}
              />
              <label 
                htmlFor="email"
                className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
                ${focused.email || formData.email ? 
                  'top-0 text-xs bg-white px-1 text-green-600 -translate-y-1/2' : 
                  'top-1/2 text-sm text-gray-500 -translate-y-1/2'}`}
              >
                E-mail
              </label>
            </div>

            {/* Campo Matrícula */}
            <div className="relative">
              <input 
                type="text" 
                id="matricula"
                className="block px-4 py-2.5 w-full rounded-lg border border-gray-300 
                focus:outline-none focus:border-green-500 peer"
                onFocus={() => handleFocus('matricula')}
                onBlur={() => handleBlur('matricula')}
                onChange={(e) => setFormData({...formData, matricula: e.target.value})}
                value={formData.matricula}
              />
              <label 
                htmlFor="matricula"
                className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
                ${focused.matricula || formData.matricula ? 
                  'top-0 text-xs bg-white px-1 text-green-600 -translate-y-1/2' : 
                  'top-1/2 text-sm text-gray-500 -translate-y-1/2'}`}
              >
                Matrícula
              </label>
            </div>

            {/* Campo Senha com ícone de olho */}
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="senha"
                className="block px-4 py-2.5 w-full rounded-lg border border-gray-300 
                focus:outline-none focus:border-green-500 peer pr-10"
                onFocus={() => handleFocus('senha')}
                onBlur={() => handleBlur('senha')}
                onChange={(e) => setFormData({...formData, senha: e.target.value})}
                value={formData.senha}
              />
              <label 
                htmlFor="senha"
                className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
                ${focused.senha || formData.senha ? 
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

            {/* Campo Confirmar Senha com ícone de olho */}
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                id="confirmarSenha"
                className="block px-4 py-2.5 w-full rounded-lg border border-gray-300 
                focus:outline-none focus:border-green-500 peer pr-10"
                onFocus={() => handleFocus('confirmarSenha')}
                onBlur={() => handleBlur('confirmarSenha')}
                onChange={(e) => setFormData({...formData, confirmarSenha: e.target.value})}
                value={formData.confirmarSenha}
              />
              <label 
                htmlFor="confirmarSenha"
                className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
                ${focused.confirmarSenha || formData.confirmarSenha ? 
                  'top-0 text-xs bg-white px-1 text-green-600 -translate-y-1/2' : 
                  'top-1/2 text-sm text-gray-500 -translate-y-1/2'}`}
              >
                Confirmar Senha
              </label>
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 focus:outline-none"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Checkbox Termos - Estilo igual ao da página de login */}
            <div className="flex items-center justify-between text-sm mt-4">
              <div className="flex items-center">
                <div className="relative">
                  <input 
                    id="aceitarTermos"
                    type="checkbox"
                    checked={formData.aceitarTermos}
                    onChange={(e) => setFormData({...formData, aceitarTermos: e.target.checked})}
                    className="absolute opacity-0 h-4 w-4 cursor-pointer"
                  />
                  <div className={`flex items-center justify-center h-4 w-4 border-2 rounded
                    ${formData.aceitarTermos ? 
                      'bg-green-100 border-green-500' : 
                      'bg-white border-gray-300'}`}
                  >
                    {formData.aceitarTermos && (
                      <svg className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label htmlFor="aceitarTermos" className="ml-2 text-sm text-gray-600">
                  Eu aceito os <a href="#" className="text-green-600 hover:underline">Termos</a> e <a href="#" className="text-green-600 hover:underline">Política</a>
                </label>
              </div>
            </div>

            {/* Botão de Cadastro */}
            <button 
              type="submit"
              className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700
              text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 mt-6"
            >
              Cadastrar
            </button>

            {/* Link para Login */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Já tem uma conta?{' '}
              <Link to="/login">
              <a href="#" className="text-green-600 font-medium hover:underline">
                Faça login
              </a>
              </Link>
              
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Cadastro;