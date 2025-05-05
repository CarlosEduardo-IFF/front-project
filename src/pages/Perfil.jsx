import React, { useState } from 'react';
import useClientData from '../hooks/useClientData';
import useUpdateClient from '../hooks/useUpdateClient';
import EditProfileModal from '../components/EditProfileModal';

const ProfilePage = () => {
  const { client: user, loading, error } = useClientData();
  const { updateClient } = useUpdateClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSaveProfile = async (updatedData) => {
    try {
      await updateClient(updatedData);
      setSuccessMessage('Perfil atualizado com sucesso!');
      setUpdateError(null);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMessage(null);
      }, 2000);
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setUpdateError(err.response?.data?.message || 'Erro ao atualizar perfil. Tente novamente.');
      setSuccessMessage(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Carregando dados do perfil...</p>
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

  return (
    <>
      <div className="min-h-screen pt-20 bg-[#faefe7] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="font-mono text-3xl font-bold text-gray-700">Perfil</h1>
          </header>

          {/* Mensagens de feedback */}
          {updateError && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {updateError}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-[#509145] to-[#aac049] p-8 text-center">
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 rounded-full border-4 border-white shadow-lg">
                  <img 
                    src={`/${user?.avatar || 'avatar1'}.svg`} 
                    alt={user?.name}
                    className="bg-white w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-mono text-xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
                    Informações Pessoais
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <p className="font-mono text-sm font-medium text-gray-500">Nome</p>
                      <p className="font-mono text-lg text-gray-800">{user?.name}</p>
                    </div>

                    <div>
                      <p className="font-mono text-sm font-medium text-gray-500">Email</p>
                      <p className="font-mono text-lg text-gray-800">{user?.email}</p>
                    </div>

                    <div>
                      <p className="font-mono text-sm font-medium text-gray-500">Matrícula</p>
                      <p className="font-mono text-lg text-gray-800">{user?.matriculation}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-mono text-xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
                    Estatísticas
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-[#f2f9ef] rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-[#e0f0d9] rounded-full mr-4">
                          <svg className="h-6 w-6 text-[#509145]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-mono text-sm font-medium text-gray-500">Pontuação</p>
                          <p className="font-mono text-lg font-semibold text-gray-700">{user?.points?.toLocaleString() || '0'} pts</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#fdf2ed] rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-[#f8e0d6] rounded-full mr-4">
                          <svg className="h-6 w-6 text-[#ce6b48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m8-8v13m-4-13v13m-8-13v13M3 21h18M3 10h18M3 7l9-4 9 4M3 7v3m18-3v3" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-mono text-sm font-medium text-gray-500">Créditos</p>
                          <p className="font-mono text-lg font-semibold text-gray-700">{user?.credits?.toLocaleString() || '0'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="font-mono px-6 py-2 bg-[#509145] hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setUpdateError(null);
        }}
        user={user}
        onSave={handleSaveProfile}
        error={updateError}
        successMessage={successMessage}
      />
    </>
  );
};

export default ProfilePage;