import React from 'react';
import goldmedal from '../assets/medalha ouro.svg';
import silvermedal from '../assets/medalha prata.svg';
import bronzemedal from '../assets/medalha bronze.svg';
import useTop10Clients from '../hooks/top10Clients';

const RankingPage = () => {
  const { clients, loading, error } = useTop10Clients();

  const medalImages = {
    gold: goldmedal,
    silver: silvermedal,
    bronze: bronzemedal
  };

  if (loading) {
    return <div className="text-center mt-20 text-gray-700">Carregando ranking...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600">Erro ao carregar ranking.</div>;
  }

  const podiumUsers = clients.slice(0, 3);
  const otherUsers = clients.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ce6b48] via-[#f3f4f6] to-[#509145] py-8 px-4">
      <div className="mt-20">
        

        {/* Pódio */}
        <div className="flex justify-center items-end gap-4 mb-12">
          {/* 2º Lugar */}
          {podiumUsers[1] && (
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-300 shadow-lg">
                  <img src={`/${podiumUsers[1].avatar}.svg`} alt={podiumUsers[1].name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute -bottom-11 left-1/2 transform -translate-x-1/2 w-20 h-20">
                  <img src={medalImages.silver} alt="Medalha de Prata" className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="text-center font-mono pt-4 text-lg font-semibold text-gray-800">{podiumUsers[1].name}</h3>
              <div className="font-mono text-gray-700 font-medium">{podiumUsers[1].points.toLocaleString()} pts</div>
            </div>
          )}

          {/* 1º Lugar */}
          {podiumUsers[0] && (
            <div className="flex flex-col items-center mb-4">
              <div className="relative mb-4">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-yellow-400 shadow-xl">
                  <img src={`/${podiumUsers[0].avatar}.svg`} alt={podiumUsers[0].name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24">
                  <img src={medalImages.gold} alt="Medalha de Ouro" className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="text-center font-mono pt-4 text-xl font-bold text-gray-900">{podiumUsers[0].name}</h3>
              <div className="font-mono text-yellow-600 font-bold">{podiumUsers[0].points.toLocaleString()} pts</div>
            </div>
          )}

          {/* 3º Lugar */}
          {podiumUsers[2] && (
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="bg-white w-24 h-24 rounded-full border-4 border-amber-600 shadow-lg">
                  <img src={`/${podiumUsers[2].avatar}.svg`} alt={podiumUsers[2].name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute -bottom-11 left-1/2 transform -translate-x-1/2 w-20 h-20">
                  <img src={medalImages.bronze} alt="Medalha de Bronze" className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="text-center font-mono pt-4 text-lg font-semibold text-gray-800">{podiumUsers[2].name}</h3>
              <div className="font-mono text-amber-700 font-medium">{podiumUsers[2].points.toLocaleString()} pts</div>
            </div>
          )}
        </div>

        {/* Lista */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow">
          <ul className="divide-y divide-gray-200">
            {otherUsers.map((user, index) => (
              <li key={user.id} className="p-4">
                <div className="flex items-center">
                  <span className="text-gray-500 w-8">{index + 4}</span>
                  <img src={`/${user.avatar}.svg`} alt="" className="w-10 h-10 rounded-full mr-3" />
                  <div className="flex-grow">
                    <p className="font-mono font-medium text-gray-700">{user.name}</p>
                  </div>
                  <span className="font-mono text-gray-700">{user.points}</span>
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
