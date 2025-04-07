import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import MedSync from "../assets/image/MedSync.png"; 
import Crianças from "../assets/image/Crianças.jpg"
import { FaFileAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";

function Principal() {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <div className="w-full">
        <img
          src={Crianças}
          alt="Imagem principal"
          className="w-full h-screen object-cover object-top"
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
              Controle simples e seguro das transações financeiras e legais da
              sua organização. Envie faturas e contratos personalizados.
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
              Agende salas para um ou mais locais. Mantenha registros detalhados
              de presença.
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
              Automatize e acompanhe emails para indivíduos ou grupos. Organize sua
              equipe com sistemas integrados.
            </p>
          </div>
        </div>
      </section>

      {/* Seção "O que somos?" */}
      <section className="bg-[#DFF3F4] py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0">
            <img
              src={MedSync}
              alt="Logo MedSync"
              className="w-60 md:w-72"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#008E9A] mb-4">
              O que somos?
            </h2>
            <p className="text-gray-800 text-base mb-4">
              <strong>MedSync</strong> é uma plataforma moderna de agendamento de
              consultas médicas, desenvolvida para facilitar a conexão entre
              pacientes e profissionais da saúde.
              <br />
              Com uma interface intuitiva e tecnologia avançada, o MedSync permite:
            </p>
            <ul className="list-disc list-inside text-gray-800 space-y-2">
              <li><strong>Agendar consultas rapidamente</strong></li>
              <li><strong>Gerenciar horários de forma eficiente</strong></li>
              <li><strong>Acesso seguro com autenticação</strong></li>
              <li><strong>Experiência simplificada para médicos e pacientes</strong></li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Principal;
