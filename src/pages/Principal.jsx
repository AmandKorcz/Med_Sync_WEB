import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { FaFileAlt, FaCalendarAlt, FaUsers, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import VidMed from "../assets/image/MedVideo.mp4";
import EquipeMed from "../assets/image/EquipeMed.jpg";
import MedPaciente from "../assets/image/MedPaciente.jpg";
import MedLocal from "../assets/image/MedLocal.jpg";

const ImageWithFallback = ({ src, alt, className, style }) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  const handleError = () => {
    setImgSrc('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCI+SW1hZ2Ugbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=');
  };
  
  return (
    <img 
      src={imgSrc} 
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={handleError}
    />
  );
};


ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

ImageWithFallback.defaultProps = {
  className: '',
  style: {}
};

function Principal() {
  // Dados estáticos
  const features = [
    {
      icon: <FaFileAlt className="text-2xl" />,
      color: "bg-red-500",
      title: "Atendimento de Qualidade",
      description: "Equipe especializada pronta para ajudar com agilidade e eficiência.",
      link: "/atendimento"
    },
    {
      icon: <FaCalendarAlt className="text-2xl" />,
      color: "bg-teal-500",
      title: "Agendamento Inteligente",
      description: "Visualize horários e agende em poucos cliques, com lembretes automáticos.",
      link: "/atendimento"
    },
    {
      icon: <FaUsers className="text-2xl" />,
      color: "bg-yellow-500",
      title: "Profissionais Capacitados",
      description: "Diversos especialistas à sua disposição com avaliações verificadas.",
      link: "/sobre-nos"
    }
  ];

  const stats = [
    { value: "100+", label: "Profissionais" },
    { value: "10/10", label: "Disponibilidade" },
    { value: "98%", label: "Satisfação" },
    { value: "5.0", label: "Avaliação" }
  ];

  const carouselImages = [
    {
      src: EquipeMed,
      alt: "Equipe médica da MedSync",
      caption: "Profissionais altamente qualificados",
      position: "center 15%" 
    },
    {
      src: MedPaciente,
      alt: "Atendimento personalizado",
      caption: "Cuidado individualizado para cada paciente",
      position: "center 10%" 
    },
    {
      src: MedLocal,
      alt: "Instalações modernas",
      caption: "Ambiente equipado com tecnologia de ponta",
      position: "center center" 
    }
  ];

  // Lógica do carrossel
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  }, [carouselImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  }, [carouselImages.length]);

  useEffect(() => {
    let interval;
    
    const startInterval = () => {
      interval = setInterval(nextSlide, 8000);
    };
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        startInterval();
      }
    };
    
    startInterval();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [nextSlide]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      {/* Vídeo */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <video
          src={VidMed}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
      </section>
      
      {/* Recursos */}
      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-[#008E9A] mb-4">
            Proporcione o melhor para seus filhos!
          </h2>
          <Link 
            to="/atendimento" 
            className="inline-flex items-center bg-[#008E9A] hover:bg-[#007A87] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Agendar Consulta <FaArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100 hover:border-[#008E9A]/20"
            >
              <div className={`${feature.color} w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#008E9A] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {feature.description}
              </p>
              <Link 
                to={feature.link}
                className="text-[#00B4C5] hover:text-[#008E9A] font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Saiba mais <FaArrowRight className="text-sm" />
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      {/* Carrossel */}
      <section className="py-16 bg-[#F8FDFD]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#008E9A] text-center mb-12">
            Conheça Nossa Estrutura
          </h2>
          
          <div className="relative overflow-hidden rounded-xl shadow-xl h-[400px]">
            <div 
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                willChange: 'transform'
              }}
            >
              {carouselImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0 relative h-full">
                  <ImageWithFallback 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: image.position }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <p className="text-white text-xl font-medium">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Controles do Carrossel */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition backdrop-blur-sm"
              aria-label="Slide anterior"
            >
              <FaChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition backdrop-blur-sm"
              aria-label="Próximo slide"
            >
              <FaChevronRight size={24} />
            </button>
            
            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Estatísticas */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold text-[#008E9A] mb-2">{stat.value}</div>
                <div className="text-gray-600 uppercase text-sm font-semibold tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Principal;