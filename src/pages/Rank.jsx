import React from 'react';
import goldmedal from '../assets/medalha-de-ouro.png';
import silvermedal from '../assets/medalha-de-prata.png';
import bronzemedal from '../assets/medalha-de-bronze.png';

const RankingPage = () => {

    const medalImages = {
        gold: goldmedal,
        silver: silvermedal,
        bronze: bronzemedal
    };

  // Dados de exemplo
  const users = [
    { "id": 1, "name": "Ana Silva", "points": 12500, "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=avatar1&backgroundColor=b6e3f4" },
    { "id": 2, "name": "Carlos Oliveira", "points": 11800, "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=avatar2&backgroundColor=ffadad" },
    { "id": 3, "name": "Mariana Costa", "points": 11200, "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=avatar3&backgroundColor=caffbf" },
    { "id": 4, "name": "João Santos", "points": 9850, "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=avatar4&backgroundColor=f9c74f" },
    { "id": 5, "name": "Patrícia Lima", "points": 9200, "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=avatar5&backgroundColor=a0c4ff" },
    { "id": 6, "name": "Pedro Alves", "points": 8750, "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=avatar6&backgroundColor=ff9b85" },
    { "id": 7, "name": "Fernanda Rocha", "points": 8200, "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=avatar7&backgroundColor=dda15e" },
    { "id": 8, "name": "Ricardo Pereira", "points": 7900, "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=avatar8&backgroundColor=80ed99" },
    { "id": 9, "name": "Juliana Castro", "points": 7650, "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=avatar9&backgroundColor=ffcad4" },
    { "id": 10, "name": "Lucas Martins", "points": 7300, "avatar": "https://api.dicebear.com/7.x/adventurer/svg?seed=avatar10&backgroundColor=f28482" }
  ];

  const podiumUsers = users.slice(0, 3);
  const otherUsers = users.slice(3);

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-600 via-gray-100 to-green-400 py-8 px-4">
    
        <div className=" mt-20 ">
      {/* Cabeçalho */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ranking</h1>
       
      </header>

      {/* Pódio */}
      <div className="flex justify-center items-end gap-4 mb-12">
        {/* 2º Lugar (Prata) */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-lg">
              <img 
                src={podiumUsers[1].avatar} 
                alt={podiumUsers[1].name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12">
              <img 
                src={medalImages.silver} 
                alt="Medalha de Prata" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{podiumUsers[1].name}</h3>
          <div className="text-gray-700 font-medium">
            {podiumUsers[1].points.toLocaleString()} pts
          </div>
        </div>

        {/* 1º Lugar (Ouro) */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-xl">
              <img 
                src={podiumUsers[0].avatar} 
                alt={podiumUsers[0].name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-14 h-14">
              <img 
                src={medalImages.gold} 
                alt="Medalha de Ouro" 
                className="w-full h-full object-contain"
              />
            </div>
            
          </div>
          <h3 className="text-xl font-bold text-gray-900">{podiumUsers[0].name}</h3>
          <div className="text-yellow-600 font-bold">
            {podiumUsers[0].points.toLocaleString()} pts
          </div>
        </div>

        {/* 3º Lugar (Bronze) */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-amber-600 shadow-lg">
              <img 
                src={podiumUsers[2].avatar} 
                alt={podiumUsers[2].name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12">
              <img 
                src={medalImages.bronze} 
                alt="Medalha de Bronze" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{podiumUsers[2].name}</h3>
          <div className="text-amber-700 font-medium">
            {podiumUsers[2].points.toLocaleString()} pts
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow">
        <ul className="divide-y divide-gray-200">
          {otherUsers.map((user, index) => (
            <li key={user.id} className="p-4">
              <div className="flex items-center">
                <span className="text-gray-500 w-8">{index + 4}</span>
                <img src={user.avatar} alt="" className="w-10 h-10 rounded-full mr-3"/>
                <div className="flex-grow">
                  <p className="font-medium text-gray-700">{user.name}</p>
                </div>
                <span className="text-gray-700">{user.points}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
};

export default RankingPage;