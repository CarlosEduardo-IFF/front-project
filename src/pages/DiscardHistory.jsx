import React, { useState, useEffect } from 'react';
import useDiscardedItemsByEmail from '../hooks/useDiscardedItemsByEmail';
import useClientData from '../hooks/useClientData';

const DiscardHistory = () => {
  const [discards, setDiscards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { client: user, loading2, error2 } = useClientData();
  const { fetchDiscardedItems } = useDiscardedItemsByEmail();

  useEffect(() => {
    const loadDiscards = async () => {
      try {
        if (!user || !user.email) return;

        const email = user.email;
        const data = await fetchDiscardedItems(email);

        setDiscards(data);
      } catch (err) {
        setError("Não foi possível carregar os descartes.");
      } finally {
        setLoading(false);
      }
    };

    if (!loading2 && user && user.email) {
      loadDiscards();
    }
  }, [loading2, user]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (loading || loading2) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || error2) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Erro</p>
        <p>{error || error2}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-20 bg-[#faefe7] py-4 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-gray-900">
            Histórico de Descartes
          </h1>
          <p className="font-mono mt-2 text-base sm:text-xl text-gray-500">
            Veja todos os itens que você descartou e os pontos ganhos
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <ul className="divide-y divide-gray-200">
            {discards.map((discard) => (
              <li key={discard.id} className="p-4 sm:p-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg object-cover"
                      src={`https://res.cloudinary.com/dugz9fmo6/image/upload/v1746417918/discard_images/item_${discard.id}jpg.jpg`}
                      alt={discard.categoryName}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="text-center sm:text-left">
                        <h3 className="font-mono text-base sm:text-lg font-medium text-gray-900">
                          {discard.categoryName}
                        </h3>
                        <p className="font-mono text-xs sm:text-sm text-gray-500 mt-1">
                          Descarte de {discard.categoryName.toLowerCase()}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 flex justify-center sm:justify-start">
                        <span className="font-mono inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#f0f7e2] text-[#509145] text-xs sm:text-sm font-medium">
                          +{discard.pointsEarned} pontos
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1 sm:space-y-2">
                      <div className="font-mono flex flex-col sm:flex-row items-start sm:items-center text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg className="flex-shrink-0 mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>{discard.dropOffPointName}</span>
                        </div>
                        <span className="hidden sm:inline mx-2">-</span>
                        <span className="sm:ml-0 ml-5 sm:mt-0 mt-1">{discard.dropOffPointDescription}</span>
                      </div>
                      
                      <div className="font-mono flex items-center text-xs sm:text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {formatDate(discard.discardDate)}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {discards.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="font-mono mt-2 text-base sm:text-lg font-medium text-gray-900">Nenhum descarte encontrado</h3>
              <p className="font-mono mt-1 text-sm text-gray-500">Você ainda não descartou nenhum item.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscardHistory;