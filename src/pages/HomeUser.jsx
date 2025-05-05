import React, { useState, useEffect } from 'react';
import CarouselUm from "../components/CarouselUm";
import MapComponent from "../components/UserMap";
import adesivoReci from "../assets/adesivoreciclagem.svg"
import ModalLocalizacao  from "../components/ModalLocalizacao"
import mascote  from "../assets/mascote2.svg"

import { motion } from "framer-motion"; 
import { FaRecycle, FaTrash, FaMapMarkerAlt, FaLeaf, FaMobileAlt, FaMapPin } from 'react-icons/fa';

import dropOffPoint from "../hooks/dropOffPoint";

const HomeUser = () => {
  
  const { dropOffs } = dropOffPoint();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [erro, setErro] = useState(null);
  const [pontos, setPontos] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [pontoMaisProximo, setPontoMaisProximo] = useState(null);

  const handleLocalizarAgora = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
  
          // Mapear os pontos para o formato esperado pelo modal
          const pontosComDistancia = pontos.map(ponto => {
            if (!ponto.address?.latitude || !ponto.address?.longitude) {
              console.warn("Ponto sem coordenadas:", ponto);
              return null;
            }
  
            const distancia = calcularDistancia(
              userLat,
              userLon,
              parseFloat(ponto.address.latitude),
              parseFloat(ponto.address.longitude)
            );
  
            return {
              nome: ponto.name,
              descricao: ponto.description,
              endereco: {
                rua: ponto.address.street,
                cidade: ponto.address.city,
                estado: ponto.address.state,
                cep: ponto.address.zipCode
              },
              latitude: ponto.address.latitude,
              longitude: ponto.address.longitude,
              distancia
            };
          }).filter(Boolean);
  
          if (pontosComDistancia.length > 0) {
            const pontoProximo = pontosComDistancia.sort((a, b) => a.distancia - b.distancia)[0];
            setPontoMaisProximo(pontoProximo);
            setShowModal(true);
          } else {
            alert("Nenhum ponto de coleta disponível foi encontrado.");
          }
        },
        (error) => {
          alert("Não foi possível obter sua localização: " + error.message);
        }
      );
    } else {
      alert("Geolocalização não é suportada neste navegador.");
    }
  };

  // Função auxiliar para cálculo de distância
  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const obterLocalizacao = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setErro(error.message);
        }
      );
    } else {
      setErro("Geolocalização não é suportada por este navegador.");
    }
  };

  useEffect(() => {
    const buscarPontos = async () => {
      try {
        const dados = {};
        const locais = await dropOffs(dados);
        setPontos(locais);
        console.log(locais);
      } catch (error) {
        console.error("Erro ao buscar pontos de coleta", error);
      }
    };

    buscarPontos();
  }, []);

  
  return (

    <div className="min-h-screen pt-20 bg-[#faefe7]">
      
      {/* Conteúdo principal com animação de entrada */}
      
      <div className="p-6 relative z-10">
        {/* Container que só aparece em desktop (lg: = 1024px+) */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <CarouselUm />
          </motion.div>
        </div>

        {/* Imagem que só aparece em mobile (abaixo de lg: 1024px) */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img 
              src={mascote} 
              alt="Descrição da imagem mobile" 
              className="w-32 h-auto mx-auto"
            />
          </motion.div>
        </div>
      </div>


      <div className="min-h-screen bg-[#faefe7]">
      {/* Seu carrossel existente viria aqui */}

      {/* Seção ReVira */}
      <section className="py-8 md:py-16 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(to bottom, #faefe7, #ffffff)'
        }}>
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Título centralizado */}
            <div className="text-center mb-4 md:mb-6">
              <h2 className="font-mono text-2xl md:text-4xl font-bold text-[#ce6b48]">ReVira</h2>
            </div>

            {/* Container flex modificado */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
              {/* Imagem ainda mais próxima da borda */}
              <div className="hidden lg:block w-32 lg:w-48 flex-shrink-0 -ml-40 lg:-ml-52">
                <img 
                  src={adesivoReci} 
                  alt="Reciclagem eletrônica"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Texto justificado e ocupando bem o espaço */}
              <div className="lg:flex-1 px-2 sm:px-0">
              <p className="font-mono text-sm md:text-lg text-gray-700 text-justify indent-4 md:indent-8">
                  O ReVira é um projeto inovador que promove a reciclagem e sustentabilidade de 
                  eletrônicos. Nosso objetivo é facilitar o descarte correto desses materiais, 
                  conectando você aos pontos de coleta mais próximos e fornecendo informações 
                  valiosas sobre como reciclar de forma responsável. Juntos, podemos dar um novo 
                  ciclo de vida aos seus dispositivos eletrônicos e proteger o meio ambiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Seção Como descartar? */}
      <section className="py-8 md:py-16 bg-[#263346] text-white">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      {/* Cabeçalho ajustado */}
      <div className="flex items-center mb-4 md:mb-8">
        <FaTrash className="text-xl md:text-3xl text-[#aac049] mr-2 md:mr-4" />
        <h2 className="font-mono text-xl md:text-3xl font-bold">Como descartar?</h2>
      </div>
      
      {/* Card de conteúdo */}
      <div className="bg-[#384a66] p-4 md:p-8 rounded-xl shadow-lg">
        {/* Texto introdutório */}
        <p className="text-gray-300 mb-4 md:mb-6 font-mono text-sm md:text-base">
          Descarte seus eletrônicos de forma consciente seguindo estas práticas:
        </p>
        
        {/* Lista de itens */}
        <ul className="space-y-3 md:space-y-4">
          <li className="flex items-start">
            <span className="bg-[#aac049] rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mr-2 md:mr-3 mt-0.5 md:mt-1 flex-shrink-0 text-xs md:text-base">1</span>
            <span className="text-gray-300 font-mono text-sm md:text-base">
              Remova todos os dados pessoais de dispositivos como celulares e computadores antes do descarte.
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-[#aac049] rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mr-2 md:mr-3 mt-0.5 md:mt-1 flex-shrink-0 text-xs md:text-base">2</span>
            <span className="text-gray-300 font-mono text-sm md:text-base">
              Separe os componentes por tipo de material quando possível (baterias, plásticos, metais).
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-[#aac049] rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mr-2 md:mr-3 mt-0.5 md:mt-1 flex-shrink-0 text-xs md:text-base">3</span>
            <span className="text-gray-300 font-mono text-sm md:text-base">
              Utilize nosso sistema para encontrar o ponto de coleta mais próximo de você.
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-[#aac049] rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mr-2 md:mr-3 mt-0.5 md:mt-1 flex-shrink-0 text-xs md:text-base">4</span>
            <span className="text-gray-300 font-mono text-sm md:text-base">
              Para itens grandes, verifique se o local de coleta aceita o tamanho do seu dispositivo.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>


      {/* Seção Nossos Pontos de Coleta - Versão FINAL corrigida */}
      <section className="py-8 md:py-16 bg-[#faefe7]"> 
        <div className="container mx-auto px-4">
          {/* Título principal da seção (acima das colunas) */}
          <div className="flex items-center mb-6 md:mb-8">
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-gray-900">Nossos Pontos de Coleta</h2>
          </div>

          {/* Container das duas colunas - agora com ordem inversa */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
            {/* Coluna do mapa (agora na esquerda) */}
            <div className="w-full lg:w-1/2 z-11 order-2 lg:order-1">
              <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200 h-full flex flex-col">
                <h3 className="font-mono text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4 text-center">
                  Pontos de Coleta Disponíveis
                </h3>
                <div className="flex-grow h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] relative overflow-hidden rounded-xl">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full"
                  >
                    {latitude !== null && longitude !== null ? (
                      <MapComponent latitude={latitude} longitude={longitude} locations={pontos} />
                    ) : (
                      <MapComponent locations={pontos} />
                    )}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Coluna de informações (agora na direita) */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-200 h-full flex flex-col">
                <p className="text-gray-700 mb-4 md:mb-6 font-mono text-sm md:text-base">
                  Encontre os locais de coleta mais próximos de você. Nossa rede cobre diversas 
                  regiões e todos os pontos são certificados para o descarte adequado de 
                  eletrônicos, garantindo a reciclagem responsável.
                </p>
                
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex items-start">
                    <div className="bg-[#aac049] p-2 rounded-full mr-3 md:mr-4">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 font-mono text-sm md:text-base">Localização em Tempo Real</h3>
                      <p className="text-gray-600 font-mono text-xs md:text-sm">Veja os pontos mais próximos da sua localização atual</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#aac049] p-2 rounded-full mr-3 md:mr-4">
                      <FaMobileAlt className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-gray-900 text-sm md:text-base">Informações Detalhadas</h3>
                      <p className="text-gray-600 font-mono text-xs md:text-sm">Horários de funcionamento e tipos de materiais aceitos</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-auto">
                  <button 
                    onClick={obterLocalizacao}
                    className="flex-1 font-mono bg-[#aac049] hover:bg-gray-400 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg transition duration-300 flex items-center justify-center text-sm md:text-base"
                  >
                    <FaMapMarkerAlt className="mr-2" />
                    Usar minha localização
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção O que descartar? */}
      <section className="py-12 md:py-16" style={{
          background: 'linear-gradient(to bottom, #faefe7, #ffffff)'
        }}>
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6 md:mb-8">
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-gray-900">O que descartar?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
       
        <div className="relative p-4 pb-6 md:p-6 md:pb-8 rounded-lg shadow-md" style={{background: "linear-gradient(to right, #90b8e0, #d0d6eb)"}}>
         
          <div className="absolute -top-3 left-0 w-32 h-6 rounded-t-lg" style={{background: "linear-gradient(to right, #90b8e0, #d0d6eb)"}}>
            
          </div>
          <h3 className="font-mono font-bold text-lg text-[#3565a5] mb-3">Aceitamos</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-[#3565a5] mr-2">✓</span>
              <span className='font-mono'>Celulares e smartphones</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#3565a5] mr-2">✓</span>
              <span className='font-mono'>Computadores e notebooks</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#3565a5] mr-2 ">✓</span>
              <span className='font-mono'>Tablets e e-readers</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#3565a5] mr-2">✓</span>
              <span className='font-mono'>Baterias e carregadores</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#3565a5] mr-2 ">✓</span>
              <span className='font-mono'>Cabos e acessórios</span>
            </li>
          </ul>
        </div>

       
        <div className="relative p-4 pb-6 md:p-6 md:pb-8 rounded-lg shadow-md" style={{background: "linear-gradient(to right, #d9ab96, #e3c9bf)"}}>
        
          <div className="absolute -top-3 left-0 w-40 h-6 rounded-t-lg" style={{background: "linear-gradient(to right, #d9ab96, #e3c9bf)"}}>
            
          </div>
          <h3 className="font-mono font-bold text-lg text-[#ce6b48] mb-3">Não aceitamos</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-[#ce6b48] mr-2 ">✗</span>
              <span className='font-mono'>Lâmpadas fluorescentes</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#ce6b48] mr-2 ">✗</span>
              <span className='font-mono'>Resíduos perigosos</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CTA - Encontre o local mais próximo */}
      <section className="py-8 md:py-12 bg-[#aac049] text-white">
  <div className="container mx-auto px-4 text-center">
    <div className="max-w-3xl mx-auto">
      <FaMapMarkerAlt className="text-4xl md:text-5xl mx-auto mb-4 md:mb-6" />
      <h2 className="font-mono text-2xl md:text-3xl font-bold mb-3 md:mb-4">Encontre o ponto de coleta mais próximo</h2>
      <p className="font-mono text-base md:text-xl mb-6 md:mb-8">Contribua com o meio ambiente descartando seus eletrônicos no local correto</p>
      <button 
        onClick={handleLocalizarAgora}
        className="bg-white font-mono text-[#aac049] px-6 py-2 md:px-8 md:py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300 shadow-lg text-sm md:text-base"
      >
        Localizar agora
      </button>
    </div>
  </div>
</section>
    </div>
    {showModal && (
        <ModalLocalizacao 
          ponto={pontoMaisProximo} 
          onClose={() => setShowModal(false)} 
        />
      )}


    </div>
  );
}

export default HomeUser;