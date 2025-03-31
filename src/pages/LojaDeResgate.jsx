import React, { useState } from "react";
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

const LojaDeResgate = () => {
  // Estado do usuário com pontos
  const [user, setUser] = useState({
    name: 'João Silva',
    credits: 1250,
    level: 'Ouro'
  });

  // Catálogo de produtos com pontos ganhos ao resgatar
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Horas acadêmicas complementares',
      description: '5 horas',
      price: 500,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Cupom',
      description: 'Cupom para lojas parceiras',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ]);

  // Função para resgatar produto
  const handleRedeem = (productId) => {
    const product = products.find(p => p.id === productId);
    if (user.credits >= product.price) {
      setUser({
        ...user,
        credits: user.credits - product.price,
      });
      alert(`Parabéns! Você resgatou ${product.name}!`);
    } else {
      alert('Créditos insuficientes para este produto');
    }
  };

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Loja de Resgate</h1>
            <div className="flex items-center space-x-4">
              {/*
              <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                <span className="text-blue-800 font-medium mr-2">Pontos:</span>
                <span className="text-blue-600 font-bold">{user.points}</span>
              </div>
                */}

              <div className="flex items-center bg-green-50 px-4 py-2 rounded-full">
                <span className="text-green-800 font-medium mr-2">Créditos:</span>
                <span className="text-green-600 font-bold">{user.credits}</span>
              </div>
              <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-full">
                <span className="text-yellow-800 font-medium mr-2">Nível:</span>
                <span className="text-yellow-600 font-bold">{user.level}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 z-10">
        {/* Todos os Produtos */}
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

// Componente de Card de Produto atualizado
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
          className="h-48 w-full object-cover z-10" 
          src={product.image} 
          alt={product.name}
        />
        {/*
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-2xl">
          +{product.points} pontos
        </div>
        */}
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-2xl">
          -{product.price} créditos
        </div>
      </div>
      <div className="p-6">
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <button
          onClick={() => onRedeem(product.id)}
          disabled={userCredits < product.price}
          className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center ${userCredits >= product.price 
            ? 'bg-green-600 text-white hover:bg-green-700' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          <ShoppingBagIcon className="h-5 w-5 mr-2" />
          {userCredits >= product.price ? 'Resgatar Agora' : 'Créditos Insuficientes'}
        </button>
      </div>
    </div>
  );
};

export default LojaDeResgate;