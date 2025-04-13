import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import MedLocal from "../assets/image/MedLocal.jpg" 
import { FaFileAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import VidMed from "../assets/image/MedVideo.mp4";

function Principal() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full">
        <video
          src={VidMed}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[80vh] object-cover object-top"
        />
      </div>
      <section className="bg-white py-12 px-4 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-500 p-4 rounded-full text-white text-2xl">
                <FaFileAlt />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-indigo-900 mb-2">
              Atendimento de qualidade
            </h3>
            <p className="text-gray-600 text-sm">
            Tenha acesso rápido e fácil ao nosso time de atendimento!
            Conte com uma equipe pronta para te ajudar com agilidade e eficiência sempre que precisar.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-teal-500 p-4 rounded-full text-white text-2xl">
                <FaCalendarAlt />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-indigo-900 mb-2">
              Agendamento personalizado
            </h3>
            <p className="text-gray-600 text-sm">
            Visualize facilmente os horários disponíveis e escolha o que for melhor para você.
            Agende com poucos cliques e acompanhe tudo de forma organizada!
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-500 p-4 rounded-full text-white text-2xl">
                <FaUsers />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-indigo-900 mb-2">
              Profissionais capacitados
            </h3>
            <p className="text-gray-600 text-sm">
            Encontre uma ampla variedade de médicos especializados à sua disposição.
            Escolha o profissional ideal para o seu atendimento, com confiança e comodidade.
            </p>
          </div>
        </div>
      </section>

    {/* Seção "O que somos?" */}
<section className="bg-gradient-to-r from-[#DFF3F4] to-[#E6F7F8] py-16 px-6 md:px-20">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="flex-shrink-0 transform hover:scale-105 transition duration-500">
        <img 
          src={MedLocal} 
          alt="Logo MedSync" 
          className="w-94 md:w-110 drop-shadow-lg rounded-lg" 
        />
      </div>
      <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold text-[#008E9A] mb-2">
      <span className="pb-2">Quem somos?</span>
        </h2>
        
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong className="text-[#007A87]">MedSync</strong> é uma plataforma moderna de agendamento
          de consultas médicas, desenvolvida para facilitar a conexão entre
          pacientes e profissionais da saúde.
        </p>
        
        <p className="text-gray-700 text-lg leading-relaxed">
          Com uma interface intuitiva e tecnologia avançada, o MedSync
          permite:
        </p>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="bg-[#00B4C5] p-2 rounded-full">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-800 font-medium">Agendar consultas rapidamente</span>
          </li>
          
          <li className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="bg-[#00B4C5] p-2 rounded-full">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-800 font-medium">Gerenciar horários de forma eficiente</span>
          </li>
          
          <li className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="bg-[#00B4C5] p-2 rounded-full">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-800 font-medium">Acesso seguro com autenticação</span>
          </li>
          
          <li className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="bg-[#00B4C5] p-2 rounded-full">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-800 font-medium">Experiência simplificada para médicos e pacientes</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
      <Footer />
    </div>
  );
}

export default Principal;
