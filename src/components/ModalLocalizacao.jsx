import React from 'react';
import { FaTimes, FaMapMarkerAlt, FaBuilding, FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ModalLocalizacao = ({ ponto, onClose }) => {
  if (!ponto) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#faefe7] bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Cabeçalho */}
          <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#509145] to-[#aac049]">
            <h3 className="font-mono text-xl font-bold text-white">Ponto mais próximo</h3>
            <button 
              onClick={onClose} 
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Fechar modal"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-6 space-y-6">
            <div className="flex items-start">
              <div className="bg-[#aac049] p-3 rounded-full mr-4">
                <FaBuilding className="text-white text-xl" />
              </div>
              <div>
                <h4 className="font-mono font-bold text-lg text-gray-800">{ponto.nome}</h4>
                <p className="font-mono text-gray-600 mt-1">{ponto.descricao}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#aac049] p-3 rounded-full mr-4">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <div>
                <p className="font-mono text-gray-800 font-medium">{ponto.endereco.rua}</p>
                <p className="font-mono text-gray-600">{ponto.endereco.cidade}, {ponto.endereco.estado}</p>
                <p className="font-mono text-gray-500 text-sm mt-1">CEP: {ponto.endereco.cep}</p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${ponto.endereco.rua},${ponto.endereco.cidade}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono inline-flex items-center text-[#aac049] hover:text-[#509145] mt-2 transition-colors"
                >
                  Ver no mapa <FaExternalLinkAlt className="ml-1" size={12} />
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#aac049] p-3 rounded-full mr-4">
                <FaClock className="text-white text-xl" />
              </div>
              <div>
                <p className="font-mono font-semibold text-gray-800">Horário de funcionamento:</p>
                <p className="font-mono text-gray-600 mt-1">Segunda a Sexta, 07:00 - 23:00</p>
                <p className="font-mono text-gray-600">Sábado, 07:00 - 17:00</p>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="px-6 py-4 border-t flex justify-between items-center bg-gray-50">
          <button
            onClick={onClose}
            className="font-mono px-5 py-2 rounded-lg bg-gradient-to-r from-[#509145] to-[#aac049] hover:from-[#aac049] hover:to-[#509145] text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
            Voltar
            </button>
           
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalLocalizacao;