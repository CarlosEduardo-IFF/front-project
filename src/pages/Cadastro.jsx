import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import image from '../assets/mascote.svg';
import { Link } from "react-router-dom";
import useCadastro from "../hooks/useCadastro";

const Cadastro = () => {
  const { cadastrarUsuario } = useCadastro();

  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    matricula: '',
    aceitarTermos: false
  });

  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    matricula: '',
    aceitarTermos: ''
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
  const [formValid, setFormValid] = useState(false);

  // Validação do formulário sempre que os dados mudam
  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {...errors};

    // Validação do nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório*';
      valid = false;
    } else if (formData.nome.length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres*';
      valid = false;
    } else {
      newErrors.nome = '';
    }

    // Validação do email
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório*';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
      valid = false;
    } else {
      newErrors.email = '';
    }

    // Validação da senha
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória*';
      valid = false;
    } else if (formData.senha.length < 8) {
      newErrors.senha = 'Senha deve ter pelo menos 8 caracteres';
      valid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.senha)) {
      newErrors.senha = 'Senha deve conter maiúsculas, minúsculas, números e símbolos';
      valid = false;
    } else {
      newErrors.senha = '';
    }

    // Validação da confirmação de senha
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem';
      valid = false;
    } else {
      newErrors.confirmarSenha = '';
    }

    // Validação da matrícula
    if (!formData.matricula.trim()) {
      newErrors.matricula = 'Matrícula é obrigatória*';
      valid = false;
    } else if (!/^\d+$/.test(formData.matricula)) {
      newErrors.matricula = 'Matrícula deve conter apenas números';
      valid = false;
    } else {
      newErrors.matricula = '';
    }

    // Validação dos termos
    if (!formData.aceitarTermos) {
      newErrors.aceitarTermos = 'Você deve aceitar os termos*';
      valid = false;
    } else {
      newErrors.aceitarTermos = '';
    }

    setErrors(newErrors);
    setFormValid(valid && Object.values(newErrors).every(error => !error));
    return valid;
  };

  const handleFocus = (field) => {
    setFocused({...focused, [field]: true});
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setFocused({...focused, [field]: false});
    }
    validateForm();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const dados = {
        name: formData.nome,
        login: formData.email,
        password: formData.senha,
        matriculation: formData.matricula
      };

      const response = await cadastrarUsuario(dados);
      console.log("Usuário cadastrado com sucesso:", response);
      
      // Mostrar mensagem de sucesso
      setCadastroSucesso(true);
      alert('Cadastro realizado com sucesso, você será redirecionnado para realizar o login!'); // Mensagem simples no navegador
      
      // Limpar formulário após cadastro bem-sucedido
      setFormData({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        matricula: '',
        aceitarTermos: false
      });
      
      // Redirecionar para login após 3 segundos (opcional)
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);

    } catch (err) {
      console.error("Erro no cadastro:", err);
      alert('Erro ao cadastrar: ' + (err.message || 'Por favor, tente novamente.'));
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#ce6b48] via-[#f3f4f6] to-[#509145] p-4">
      
      <div className="flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden
        w-full max-w-5xl mt-20 bg-white">
        
        {/* Imagem à esquerda */}
        <div className="w-full lg:w-1/2 bg-white">
          <img 
            src={image} 
            alt="Ilustração de cadastro" 
            className="w-full h-full object-cover hidden lg:block"
            style={{minHeight: '600px'}}
          />
        </div>

        {/* Formulário à direita */}
        <div className="w-full lg:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h1 className="font-mono text-3xl font-bold text-[#509145] mb-2">Crie sua conta</h1>
          <p className="font-mono text-gray-600 mb-6 text-sm">Preencha os campos para se cadastrar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Nome */}
            <div className="relative">
              <input 
                type="text" 
                id="nome"
                className={`font-mono block px-4 py-3 w-full rounded-lg border ${errors.nome ? 'border-red-500' : 'border-gray-300'} 
focus:outline-none focus:border-[#aac049] peer`}
                onFocus={() => handleFocus('nome')}
                onBlur={() => handleBlur('nome')}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                value={formData.nome}
              />
              <label 
                htmlFor="nome"
                className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
                  ${focused.nome || formData.nome ? 
                    'font-mono top-0 text-xs bg-white px-1 text-[#aac049] -translate-y-3' : 
                    'font-mono top-3 text-sm text-gray-500 -translate-y-0'}`}
              >
                Nome
              </label>
              {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome}</p>}
            </div>

            {/* Campo Email */}
            <div className="relative">
  <input 
    type="email" 
    id="email"
    className={`font-mono block px-4 py-3 w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} 
    focus:outline-none focus:border-[#aac049] peer`}
    onFocus={() => handleFocus('email')}
    onBlur={() => handleBlur('email')}
    onChange={(e) => setFormData({...formData, email: e.target.value})}
    value={formData.email}
  />
  <label 
    htmlFor="email"
    className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
    ${focused.email || formData.email ? 
      'font-mono top-0 text-xs bg-white px-1 text-[#aac049] -translate-y-3' : 
      'font-mono top-3 text-sm text-gray-500 -translate-y-0'}`}
  >
    E-mail
  </label>
  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
</div>

            {/* Campo Matrícula */}
            <div className="relative">
  <input 
    type="text" 
    id="matricula"
    className={`font-mono block px-4 py-3 w-full rounded-lg border ${errors.matricula ? 'border-red-500' : 'border-gray-300'} 
    focus:outline-none focus:border-[#aac049] peer`}
    onFocus={() => handleFocus('matricula')}
    onBlur={() => handleBlur('matricula')}
    onChange={(e) => setFormData({...formData, matricula: e.target.value})}
    value={formData.matricula}
  />
  <label 
    htmlFor="matricula"
    className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
    ${focused.matricula || formData.matricula ? 
      'font-mono top-0 text-xs bg-white px-1 text-[#aac049] -translate-y-3' : 
      'font-mono top-3 text-sm text-gray-500 -translate-y-0'}`}
  >
    Matrícula
  </label>
  {errors.matricula && <p className="mt-1 text-xs text-red-500">{errors.matricula}</p>}
</div>

            {/* Campo Senha com ícone de olho */}
            <div className="relative">
  <input 
    type={showPassword ? "text" : "password"} 
    id="senha"
    className={`font-mono block px-4 py-3 w-full rounded-lg border ${errors.senha ? 'border-red-500' : 'border-gray-300'} 
    focus:outline-none focus:border-[#aac049] peer pr-10`}
    onFocus={() => handleFocus('senha')}
    onBlur={() => handleBlur('senha')}
    onChange={(e) => setFormData({...formData, senha: e.target.value})}
    value={formData.senha}
  />
  <label 
    htmlFor="senha"
    className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
    ${focused.senha || formData.senha ? 
      'font-mono top-0 text-xs bg-white px-1 text-[#aac049] -translate-y-3' : 
      'font-mono top-3 text-sm text-gray-500 -translate-y-0'}`}
  >
    Senha
  </label>
  <button
    type="button"
    className="absolute right-3 top-3 text-gray-500 hover:text-[#aac049] focus:outline-none"
    onClick={togglePasswordVisibility}
  >
    {showPassword ? (
      <EyeIcon className="h-5 w-5" />
    ) : (
      <EyeSlashIcon className="h-5 w-5" />
    )}
  </button>
  {errors.senha && <p className="mt-1 text-xs text-red-500">{errors.senha}</p>}
</div>

            {/* Campo Confirmar Senha com ícone de olho */}
            <div className="relative">
  <input 
    type={showConfirmPassword ? "text" : "password"} 
    id="confirmarSenha"
    className={`font-mono block px-4 py-3 w-full rounded-lg border ${errors.confirmarSenha ? 'border-red-500' : 'border-gray-300'} 
    focus:outline-none focus:border-[#aac049] peer pr-10`}
    onFocus={() => handleFocus('confirmarSenha')}
    onBlur={() => handleBlur('confirmarSenha')}
    onChange={(e) => setFormData({...formData, confirmarSenha: e.target.value})}
    value={formData.confirmarSenha}
  />
  <label 
    htmlFor="confirmarSenha"
    className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
    ${focused.confirmarSenha || formData.confirmarSenha ? 
      'font-mono top-0 text-xs bg-white px-1 text-[#aac049] -translate-y-3' : 
      'font-mono top-3 text-sm text-gray-500 -translate-y-0'}`}
  >
    Confirmar Senha
  </label>
  <button
    type="button"
    className="absolute right-3 top-3 text-gray-500 hover:text-[#aac049] focus:outline-none"
    onClick={toggleConfirmPasswordVisibility}
  >
    {showConfirmPassword ? (
      <EyeIcon className="h-5 w-5" />
    ) : (
      <EyeSlashIcon className="h-5 w-5" />
    )}
  </button>
  {errors.confirmarSenha && <p className="mt-1 text-xs text-red-500">{errors.confirmarSenha}</p>}
</div>

            {/* Checkbox Termos */}
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
                      'bg-green-100 border-[#509145]' : 
                      'bg-white border-gray-300'}`}
                  >
                    {formData.aceitarTermos && (
                      <svg className="h-3 w-3 text-[#509145]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label htmlFor="aceitarTermos" className="ml-2 text-sm text-gray-600">
                  Eu aceito os <a href="#" className="font-mono text-[#aac049] hover:underline">Termos</a> e <a href="#" className="font-mono text-[#aac049] hover:underline">Política</a>
                </label>
              </div>
            </div>
            {errors.aceitarTermos && <p className="text-xs text-red-500">{errors.aceitarTermos}</p>}

            {/* Botão de Cadastro */}
            <button 
              type="submit"
              disabled={!formValid}
              className={`font-mono w-full py-2.5 px-4 ${formValid ? 'bg-[#509145] hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}
              text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 mt-6`}
            >
              Cadastrar
            </button>

            {/* Link para Login */}
            <p className="font-mono text-center text-sm text-gray-600 mt-4">
              Já tem uma conta?{' '}
              <Link to="/login" className="font-mono text-[#aac049] font-medium hover:underline">
                Faça login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Cadastro;