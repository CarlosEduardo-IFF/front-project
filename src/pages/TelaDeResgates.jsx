import React from "react"

import { useState, useEffect } from 'react';
import { FiArrowUpRight, FiSearch, FiFilter, FiDownload, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ResgatesUsuario = () => {
  const [resgates, setResgates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Simulando chamada API
    const fetchResgates = async () => {
      try {
        // Substituir por chamada real à API
        const mockData = [
          {
            id: 1,
            data: '2023-10-15T10:30:00',
            descricao: 'Resgate de pontos para crédito',
            valor: 1500,
            status: 'concluido',
            image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
          },
          {
            id: 2,
            data: '2023-10-10T14:45:00',
            descricao: 'Resgate para produto X',
            valor: 2500,
            status: 'pendente',
            image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
          },
          {
            id: 3,
            data: '2023-09-28T09:15:00',
            descricao: 'Resgate para voucher Y',
            valor: 1800,
            status: 'cancelado',
            image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
          },
          {
            id: 4,
            data: '2023-09-15T16:20:00',
            descricao: 'Resgate de pontos para crédito',
            valor: 3200,
            status: 'concluido',
            image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
          },
        ];
        setResgates(mockData);
      } catch (error) {
        console.error('Erro ao buscar resgates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResgates();
  }, []);

  const filteredResgates = resgates.filter(resgate => {
    const matchesSearch = resgate.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'todos' || resgate.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'concluido': return <FiCheckCircle className="mr-1" />;
      case 'pendente': return <FiClock className="mr-1" />;
      case 'cancelado': return <FiXCircle className="mr-1" />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Meus Resgates</h1>
            <p className="text-gray-600 mt-2">Histórico de todos os resgates realizados</p>
          </div>
          
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-xs p-3 mb-4">
  <div className="flex items-center gap-2">
    {/* Ícone de Filtro (externo) */}
    <FiFilter className="text-gray-500 shrink-0" />
    
    {/* Select de Status - Compacto */}
    <select
      className="text-sm py-1.5 px-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="todos">Todos</option>
      <option value="concluido">Concluídos</option>
      <option value="pendente">Pendentes</option>
      <option value="cancelado">Cancelados</option>
    </select>
    
    {/* Select de Ano - Compacto */}
    <select
      className="text-sm py-1.5 px-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
    >
      {Array.from({length: 5}, (_, i) => new Date().getFullYear() - i).map(year => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  </div>
</div>

        {/* Tabela de Resgates */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredResgates.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum resgate encontrado
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Imagem
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Créditos
                    </th>
                   
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResgates.map((resgate) => (
                    <tr key={resgate.id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={resgate.image} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(resgate.data)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {resgate.descricao}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                        - {resgate.valor}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(resgate.status)}`}>
                          {getStatusIcon(resgate.status)}
                          {resgate.status === 'concluido' ? 'Concluído' : 
                           resgate.status === 'pendente' ? 'Pendente' : 'Cancelado'}
                        </span>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Paginação */}
        {!loading && filteredResgates.length > 0 && (
          <div className="mt-4 bg-white px-3 py-2 rounded-lg shadow-xs">
            <div className="flex items-center justify-between">
              {/* Contagem de itens - compacta */}
              <div className="text-xs text-gray-500">
                <span className="font-medium">1-10</span> de {filteredResgates.length}
              </div>
              
              {/* Navegação unificada em retângulo */}
              <nav className="flex items-center border border-gray-200 rounded-md divide-x divide-gray-200 overflow-hidden">
                {/* Botão Anterior */}
                <button
                  onClick={() => {}}
                  className="p-1.5 hover:bg-gray-50 text-gray-500 disabled:opacity-50"
                  disabled={true}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Páginas - dentro do mesmo retângulo */}
                <button className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 ">
                  1
                </button>
                <button className="px-2.5 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50">
                  2
                </button>
                <button className="px-2.5 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50">
                  3
                </button>
                
                {/* Botão Próximo */}
                <button
                  onClick={() => {}}
                  className="p-1.5 hover:bg-gray-50 text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResgatesUsuario;