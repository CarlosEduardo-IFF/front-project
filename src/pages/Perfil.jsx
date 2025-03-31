import React from 'react';

const ProfilePage = () => {
  // Dados do usuário (pode vir de props ou estado)
  const user = {
    name: 'Ana Silva',
    email: 'ana.silva@gmail.com',
    matricula: '2023001234',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=avatar1&backgroundColor=b6e3f4',
    level: 'Ouro',
    points: 12500,
    credits: 1250
  };

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Container principal */}
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-700">Perfil</h1>
        </header>

        {/* Card de perfil */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Seção superior com avatar */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
            <div className="relative mx-auto w-32 h-32">
              <div className="absolute inset-0 rounded-full border-4 border-white shadow-lg">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
            </div>
          </div>

          {/* Informações do usuário */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Coluna 1 - Dados pessoais */}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
                  Informações Pessoais
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nome completo</p>
                    <p className="text-lg text-gray-800">{user.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-lg text-gray-800">{user.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Matrícula</p>
                    <p className="text-lg text-gray-800">{user.matricula}</p>
                  </div>
                </div>
              </div>

              {/* Coluna 2 - Estatísticas */}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
                  Estatísticas
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-full mr-4">
                        <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Nível</p>
                        <p className="text-lg font-semibold text-gray-700">{user.level}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-full mr-4">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Pontuação</p>
                        <p className="text-lg font-semibold text-gray-700">{user.points.toLocaleString()} pts</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-full mr-4">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m8-8v13m-4-13v13m-8-13v13M3 21h18M3 10h18M3 7l9-4 9 4M3 7v3m18-3v3" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Créditos</p>
                        <p className="text-lg font-semibold text-gray-700">{user.credits.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé do card */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <div className="flex justify-end">
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;