import { useState } from 'react';
import axios from 'axios';

const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (file, customName) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'meu_preset');
    
    // Remove caracteres especiais e espaços do nome personalizado
    const sanitizedName = customName
      .toLowerCase()
      .replace(/[^\w-]/g, ''); // Remove caracteres não alfanuméricos exceto hífens
    
    // Define o public_id com o nome sanitizado
    formData.append('public_id', `discard_images/${sanitizedName}`); // Organiza em uma pasta

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dugz9fmo6/image/upload',
        formData
      );
      setImageUrl(response.data.secure_url);
      return response.data.secure_url; // Adicionado retorno explícito
    } catch (error) {
      console.error('Erro no upload da imagem: ', error);
      setError('Falha no upload da imagem');
      throw error; // Importante para tratamento no componente
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error, imageUrl };
};

export default useUploadImage;
