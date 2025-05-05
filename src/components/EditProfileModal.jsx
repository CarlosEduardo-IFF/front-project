import React, { useState, useEffect } from 'react';

const avatars = [
  { id: '1', src: '/1.svg' },
  { id: '2', src: '/2.svg' },
  { id: '3', src: '/3.svg' },
  { id: '4', src: '/4.svg' },
  { id: '5', src: '/5.svg' },
  { id: '6', src: '/6.svg' },
  { id: '7', src: '/7.svg' },
];

const EditProfileModal = ({ 
  isOpen, 
  onClose, 
  user, 
  onSave, 
  error,
  successMessage 
}) => {
  const [name, setName] = useState('');
  const [matriculation, setMatriculation] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('1');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setName(user.name || '');
      setMatriculation(user.matriculation || '');
      const userAvatar = avatars.some(a => a.id === user.avatar) ? user.avatar : '1';
      setSelectedAvatar(userAvatar);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        name,
        matriculation,
        avatar: selectedAvatar,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#faefe7] bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="font-mono text-2xl font-bold text-gray-800 mb-6">Editar Perfil</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-[#ce6b48] rounded-lg text-sm">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-[#509145] rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="font-mono block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-mono w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#509145] transition-all duration-200"
            />
          </div>

          <div>
            <label className="font-mono block text-sm font-medium text-gray-700 mb-1">Matrícula</label>
            <input
              type="text"
              value={matriculation}
              onChange={(e) => setMatriculation(e.target.value)}
              className="font-mono w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#509145] transition-all duration-200"
            />
          </div>

          <div>
            <label className="font-mono block text-sm font-medium text-gray-700 mb-3">Avatar</label>
            <div className="grid grid-cols-4 gap-4">
              {avatars.map((avatar) => (
                <div 
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`relative flex items-center justify-center w-20 h-20 rounded-full cursor-pointer border-4 transition-all ${
                    selectedAvatar === avatar.id 
                      ? 'border-[#509145] scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={avatar.src} 
                    alt={`Avatar ${avatar.id}`}
                    className="absolute inset-0 w-full h-full rounded-full object-cover p-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="font-mono px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="font-mono px-4 py-2 bg-[#509145] text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;