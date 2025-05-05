import React, { useState, useEffect } from 'react';
import useRedemptionsByEmail from '../hooks/useRedemptionsByEmail';
import useClientData from '../hooks/useClientData';

const RedemptionHistory = () => {
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { client: user, loading2, error2 } = useClientData();

  const { fetchRedemptions } = useRedemptionsByEmail();

  if (loading2) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-gray-600 text-base sm:text-lg">Carregando dados do perfil...</p>
      </div>
    );
  }

  if (error2) {
    return (
      <div className="min-h-screen mt-16 md:mt-20 flex items-center justify-center">
        <p className="text-red-500 text-base sm:text-lg">Erro: {error}</p>
      </div>
    );
  }

  useEffect(() => {
    const loadRedemptions = async () => {
      try {
        if (!user || !user.email) return;
  
        const email = user.email;
        const data = await fetchRedemptions(email);
  
        const mapped = data.map((item, index) => ({
          id: index + 1,
          rewardItem: {
            name: item.itemName,
            description: item.itemDescription,
            cost: item.itemCostInPoints,
            imageUrl: `/rewardItem${item.idItem}.png`
          },
          redemptionDate: item.redemptionDate
        }));
  
        setRedemptions(mapped);
      } catch (err) {
        setError(err.message || "Erro inesperado");
      } finally {
        setLoading(false);
      }
    };
  
    if (!loading2 && user && user.email) {
      loadRedemptions();
    }
  }, [loading2, user]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 mt-16 md:mt-20 border-red-500 text-red-700 p-4" role="alert">
      <p className="font-bold">Erro</p>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 md:pt-20 bg-[#faefe7] py-4 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-gray-900">
            Histórico de Resgates
          </h1>
          <p className="font-mono mt-2 text-base sm:text-lg text-gray-500">
            Veja todos os itens que você resgatou
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <ul className="divide-y divide-gray-200">
            {redemptions.map((redemption) => (
              <li key={redemption.id} className="p-3 sm:p-4 md:p-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4 md:mr-6 mx-auto sm:mx-0">
                    <img 
                      className="h-20 w-20 sm:h-22 sm:w-22 md:h-24 md:w-24 rounded-lg object-cover"
                      src={redemption.rewardItem.imageUrl}
                      alt={redemption.rewardItem.name}
                    />
                  </div>
                  <div className="flex-1 sm:ml-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-mono text-base sm:text-lg font-medium text-gray-900 text-center sm:text-left">
                        {redemption.rewardItem.name}
                      </h3>
                      <span className="font-mono inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#e1eaf5] text-[#3565a5] text-xs sm:text-sm font-medium mt-2 sm:mt-0 mx-auto sm:mx-0">
                        -{redemption.rewardItem.cost} pontos
                      </span>
                    </div>
                    <p className="font-mono mt-1 text-sm sm:text-base text-gray-600 text-center sm:text-left">
                      {redemption.rewardItem.description}
                    </p>
                    <div className="font-mono mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Resgatado em {formatDate(redemption.redemptionDate)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {redemptions.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-mono mt-2 text-base sm:text-lg font-medium text-gray-900">Nenhum resgate encontrado</h3>
              <p className="font-mono mt-1 text-sm sm:text-base text-gray-500">Você ainda não resgatou nenhum item.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedemptionHistory;