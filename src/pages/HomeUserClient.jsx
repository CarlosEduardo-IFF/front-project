import React from "react";
import Navbar from "../components/Navbar";
import CarouselUm from "../components/CarouselUm";
import MapComponent from "../components/MapComponent";
import { motion } from "framer-motion"; 
import { FaRecycle, FaMapMarkerAlt, FaLeaf, FaMobileAlt, FaMapPin } from 'react-icons/fa';

const HomeUserClient = () => {

  const locais = [
    { name: "Campus Centro", latitude: -21.761810, longitude: -41.336694, },
    { name: "Campus Guarus", latitude: -21.73504662750264, longitude: -41.32432988492616 }
  ];

  return (
    <div className="min-h-screen mt-20 bg-white">
      
      {/* Conteúdo principal com animação de entrada */}
      
      <div className="pt-20 p-6 relative z-10">
        {/* Animação de fade-in e slide-up */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <CarouselUm />
        </motion.div>
      </div>


      <div className="min-h-screen bg-white">
      {/* Seu carrossel existente viria aqui */}

      {/* Seção Re.Vira */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center mb-6">
              <FaRecycle className="text-4xl text-green-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">Re.Vira</h2>
            </div>
            <p className="text-lg text-gray-700 mb-8">
              O Re.Vira é um projeto inovador que promove a reciclagem e sustentabilidade de 
              eletrônicos. Nosso objetivo é facilitar o descarte correto desses materiais, 
              conectando você aos pontos de coleta mais próximos e fornecendo informações 
              valiosas sobre como reciclar de forma responsável. Juntos, podemos dar um novo 
              ciclo de vida aos seus dispositivos eletrônicos e proteger o meio ambiente.
            </p>
            <div className="bg-green-600 text-white px-6 py-3 rounded-full inline-block font-medium">
              Saiba mais sobre o projeto
            </div>
          </div>
        </div>
      </section>

      {/* Seção Como descartar? */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <FaLeaf className="text-3xl text-green-400 mr-4" />
              <h2 className="text-3xl font-bold">Como descartar?</h2>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <p className="text-gray-300 mb-6">
                Descarte seus eletrônicos de forma consciente seguindo estas práticas:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
                  <span className="text-gray-300">Remova todos os dados pessoais de dispositivos como celulares e computadores antes do descarte.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
                  <span className="text-gray-300">Separe os componentes por tipo de material quando possível (baterias, plásticos, metais).</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
                  <span className="text-gray-300">Utilize nosso sistema para encontrar o ponto de coleta mais próximo de você.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">4</span>
                  <span className="text-gray-300">Para itens grandes, verifique se o local de coleta aceita o tamanho do seu dispositivo.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Seção Nossos Pontos de Coleta - Versão FINAL corrigida */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Título principal da seção (acima das colunas) */}
          <div className="flex items-center mb-8">
            <FaMapPin className="text-3xl text-green-600 mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">Nossos Pontos de Coleta</h2>
          </div>

          {/* Container das duas colunas */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Coluna de informações (esquerda) */}
            <div className="lg:w-1/2">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-full flex flex-col">
                <p className="text-gray-700 mb-6">
                  Encontre os locais de coleta mais próximos de você. Nossa rede cobre diversas 
                  regiões e todos os pontos são certificados para o descarte adequado de 
                  eletrônicos, garantindo a reciclagem responsável.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Localização em Tempo Real</h3>
                      <p className="text-gray-600">Veja os pontos mais próximos da sua localização atual</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <FaRecycle className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Filtros Inteligentes</h3>
                      <p className="text-gray-600">Encontre pontos específicos para seu tipo de dispositivo</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <FaMobileAlt className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Informações Detalhadas</h3>
                      <p className="text-gray-600">Horários de funcionamento e tipos de materiais aceitos</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition duration-300 flex items-center justify-center">
                    <FaMapMarkerAlt className="mr-2" />
                    Usar minha localização
                  </button>
                  <button className="flex-1 bg-white hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-lg transition duration-300 border border-gray-300">
                    Ver todos os pontos
                  </button>
                </div>
              </div>
            </div>

            {/* Coluna do mapa (direita) */}
            <div className="lg:w-1/2 z-11" >
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  Pontos de Coleta Disponíveis
                </h3>
                <div className="flex-grow min-h-[400px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full"
                  >
                    <MapComponent locations={locais} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção O que descartar? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <FaMobileAlt className="text-3xl text-green-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">O que descartar?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="font-bold text-lg text-green-800 mb-3">Aceitamos</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Celulares e smartphones</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Computadores e notebooks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Tablets e e-readers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Baterias e carregadores</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Cabos e acessórios</span>
                  </li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <h3 className="font-bold text-lg text-red-800 mb-3">Não aceitamos</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Eletrodomésticos grandes (geladeiras, fogões)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Lâmpadas fluorescentes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Pilhas comuns (alcalinas)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Resíduos perigosos (químicos, hospitalares)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Encontre o local mais próximo */}
      <section className="py-12 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <FaMapMarkerAlt className="text-5xl mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Encontre o ponto de coleta mais próximo</h2>
            <p className="text-xl mb-8">Contribua com o meio ambiente descartando seus eletrônicos no local correto</p>
            <button className="bg-white text-green-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300 shadow-lg">
              Localizar agora
            </button>
          </div>
        </div>
      </section>
    </div>



    </div>
  );
}

export default HomeUserClient;