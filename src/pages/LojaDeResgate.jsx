import React, { useState, useEffect } from "react";
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import rewardItems from "../hooks/rewardItem";
import useClientData from '../hooks/useClientData';
import useRedemptionRecord from '../hooks/useRedemptionRecord';

const LojaDeResgate = () => {
  const { client: user, loading, error } = useClientData();
  const [credits, setCredits] = useState(0);
  const [products, setProducts] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { create } = useRedemptionRecord();

  const { items } = rewardItems();

  useEffect(() => {
    if (user) {
      setCredits(user.credits);
    }
  }, [user]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await items();
        setProducts(data);
      } catch (err) {
        setFetchError("Erro ao carregar produtos");
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, []);

  const handleRedeem = async (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
  
    if (credits >= product.costInPoints) {
      try {
        await create({
          email: user.email,
          rewardItemId: product.id
        });
  
        alert(`Parabéns! Você resgatou ${product.name}!`);
        setCredits(prev => prev - product.costInPoints);
      } catch (err) {
        alert("Erro ao realizar o resgate. Tente novamente.");
      }
    } else {
      alert('Créditos insuficientes para este produto');
    }
  };

  if (loading || loadingItems) return <div className="font-mono text-center pt-20">Carregando...</div>;
  if (error || fetchError) return <div className="font-mono text-center pt-20 text-red-500">{fetchError || "Erro ao carregar dados do usuário"}</div>;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#faefe7] to-white">
      <header className="bg-[#faefe7] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white px-4 py-2 rounded-full">
                <span className="text-[#509145] font-mono font-medium mr-2">Créditos:</span>
                <span className="text-[#aac049] font-mono font-bold">{credits}</span>
              </div>
              
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 z-10">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                userCredits={user.credits}
                onRedeem={handleRedeem}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const ProductCard = ({ product, userCredits, onRedeem }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${isHovered ? 'transform -translate-y-2 shadow-lg' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          className="h-48 w-full object-contain z-10 bg-gray-50" 
          src={`/rewardItem${product.id}.png`} 
          alt={product.name}
        />
        <div className="font-mono absolute top-2 right-2 bg-[#ce6b48] text-white text-xs font-bold px-2 py-1 rounded-2xl">
          -{product.costInPoints} créditos
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-mono text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="font-mono text-gray-600 mb-4">{product.description}</p>
        <button
          onClick={() => onRedeem(product.id)}
          disabled={userCredits < product.costInPoints}
          className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center ${
            userCredits >= product.costInPoints 
              ? 'font-mono bg-[#aac049] text-white hover:bg-[#509145]' 
              : 'font-mono bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingBagIcon className="h-5 w-5 mr-2" />
          {userCredits >= product.costInPoints ? 'Resgatar Agora' : 'Créditos Insuficientes'}
        </button>
      </div>
    </div>
  );
};

export default LojaDeResgate;
