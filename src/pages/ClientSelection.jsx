import React, { useState, useEffect } from 'react';
import dropOffPoint from "../hooks/dropOffPoint";
import useDiscardedItemCategory from '../hooks/useDiscardedItemCategory';
import useDescartarItem from '../hooks/useDescartarItem';
import useUploadImage from '../hooks/useUploadImage';
import { Link } from "react-router-dom";
import { PowerIcon} from "@heroicons/react/24/solid";

const WasteDisposalForm = () => {
  const [email, setEmail] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [dropOffPointId, setDropOffPointId] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize hooks
  const { dropOffs } = dropOffPoint();
  const { categories: getCategories } = useDiscardedItemCategory();
  const { descartarItem } = useDescartarItem();
  const { uploadImage, loading: imageLoading, error: imageError } = useUploadImage();

  // State for dynamic data
  const [categoriesList, setCategoriesList] = useState([]);
  const [dropOffPointsList, setDropOffPointsList] = useState([]);

  // Fetch categories and drop-off points on component mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const [categoriesData, dropOffPointsData] = await Promise.all([
          getCategories(),
          dropOffs()
        ]);

        if (isMounted) {
          setCategoriesList(categoriesData);
          setDropOffPointsList(dropOffPointsData);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Falha ao carregar dados. Por favor, recarregue a página.');
          setIsLoading(false);
        }
      }
    };
    
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const convertImageToJpeg = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Criar um canvas para redesenhar a imagem
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          // Converter para JPEG com qualidade 80%
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Falha na conversão da imagem'));
              return;
            }
            
            // Criar um novo arquivo com o mesmo nome mas extensão .jpg
            const newFile = new File([blob], 
              imageFile.name.replace(/\.[^/.]+$/, '') + '.jpg', 
              { type: 'image/jpeg', lastModified: Date.now() }
            );
            
            resolve(newFile);
          }, 'image/jpeg', 0.8);
        };
        img.onerror = () => reject(new Error('Falha ao carregar imagem'));
        img.src = event.target.result;
      };
      reader.onerror = () => reject(new Error('Falha ao ler arquivo'));
      reader.readAsDataURL(imageFile);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert('Por favor, selecione uma imagem menor que 5MB');
      return;
    }

    try {
      // Converter para JPEG independentemente do formato original
      const convertedFile = await convertImageToJpeg(file);
      
      setImage(convertedFile);
      setPreview(URL.createObjectURL(convertedFile));
    } catch (err) {
      console.error('Erro na conversão da imagem:', err);
      alert('Erro ao processar a imagem. Por favor, tente outra.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 1. Primeiro cria o item descartado para obter o ID
      const itemDescartado = await descartarItem({
        email,
        dropOffPointId: parseInt(dropOffPointId),
        categoryId: parseInt(categoryId)
      });

      // 2. Se houver imagem, faz upload com o ID como nome
      let imageUrl = null;
      if (image) {
        const nomeDaImagem = `item_${itemDescartado.id}.jpg`; // Agora sempre será .jpg
        imageUrl = await uploadImage(image, nomeDaImagem);
      }

      setSuccess(true);
      // Reset do formulário
      setEmail('');
      setCategoryId('');
      setDropOffPointId('');
      setImage(null);
      setPreview('');
      
    } catch (err) {
      setError(err.message || 'Erro ao registrar descarte. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-[#faefe7] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mb-4"></div>
          <p className="font-mono text-gray-700">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[#faefe7] py-8 px-4 relative">
      {/* Botão de Sair no canto superior direito */}
      <div className="absolute pt-20 top-4 right-4">
        <Link 
          to="/" 
          className="focus:outline-none"
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          <button className="flex items-center text-[#ce6b48] hover:bg-red-100 focus:bg-red-100 rounded-md p-2 cursor-pointer text-sm">
            <PowerIcon className="w-4 h-4 mr-1 text-[#ce6b48]" />
            Sair
          </button>
        </Link>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-6">
          <h1 className="font-mono text-2xl font-bold text-gray-800">Descarte de Eletrônicos</h1>
          <p className="font-mono text-gray-600 mt-2">Preencha os campos para realizar o descarte</p>
        </div>

        {success && (
          <div className="font-mono mb-4 p-4 bg-green-100 text-green-700 rounded-md">
            Descarte registrado com sucesso!
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Campo de Email */}
          <div className="mb-4">
            <label className="font-mono block text-gray-700 text-sm font-medium mb-1">Email do cliente</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#aac049]"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Categoria do Item */}
          <div className="mb-4">
            <label className="font-mono block text-gray-700 text-sm font-medium mb-1">Categoria do Item</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#aac049]"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option className='font-mono' value="">Selecione uma categoria</option>
              {categoriesList.map((cat) => (
                <option className='font-mono'  key={cat.id} value={cat.id}>{cat.name} (+{cat.pointsPerItens} pontos)</option>
              ))}
            </select>
          </div>

          {/* Ponto de Descarte */}
          <div className="mb-4">
            <label className="font-mono block text-gray-700 text-sm font-medium mb-1">Ponto de Descarte</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#aac049]"
              value={dropOffPointId}
              onChange={(e) => setDropOffPointId(e.target.value)}
              required
            >
              <option className='font-mono' value="">Selecione um local</option>
              {dropOffPointsList.map((point) => (
                <option key={point.id} value={point.id}>{point.name} - {point.address.street}</option>
              ))}
            </select>
          </div>

          {/* Upload de Imagem */}
          <div className="mb-6">
            <label className="font-mono block text-gray-700 text-sm font-medium mb-1">Foto do Item (Opcional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Preview" className="mx-auto max-h-40 rounded-md" />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview('');
                      setImage(null);
                    }}
                    className="absolute top-0 right-0 bg-[#ce6b48] text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="font-mono mt-2 text-sm text-gray-600">
                    <label htmlFor="file-upload" className="font-mono relative cursor-pointer font-medium text-[#aac049] hover:text-[#509145]">
                      <span>Clique para enviar uma foto</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Formatos: JPG, PNG, GIF (serão convertidos para JPG)</p>
                </>
              )}
            </div>
            {imageLoading && <p className="text-sm text-[#aac049] mt-1">Enviando imagem...</p>}
            {imageError && <p className="text-sm text-[#ce6b48] mt-1">{imageError}</p>}
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            className="font-mono w-full bg-[#aac049] hover:bg-[#509145] text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 disabled:bg-green-300"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? 'Enviando...' : 'Descartar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WasteDisposalForm;