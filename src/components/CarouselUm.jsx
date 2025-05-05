import { useState, useEffect, useRef } from 'react';
import imagem1 from '../assets/criancas.svg';
import imagem2 from '../assets/fototeclado.svg';
import imagem3 from '../assets/fototv.svg';
import imagemDecorativa from '../assets/adesivolixera.svg'

const CarouselUm = () => {

  const images = [imagem1, imagem2, imagem3];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    resetAutoSlide();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    resetAutoSlide();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoSlide();
  };

  const resetAutoSlide = () => {
    clearInterval(intervalRef.current);
    startAutoSlide();
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative w-full">
    {/* Carrossel com overflow escondido */}
    <div className="relative h-64 md:h-80 lg:h-110 rounded-xl shadow-lg group overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Setas de navegação */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        aria-label="Slide anterior"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        aria-label="Próximo slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              currentIndex === index ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>

    {/* Imagem decorativa flutuando na borda do carrossel */}
    <img
      src={imagemDecorativa}
      alt="Decoração"
      className="absolute bottom-0 right-0 translate-x-1/4 translate-y-40 w-64 h-64 object-contain z-30"
    />
  </div>
);
};

export default CarouselUm;