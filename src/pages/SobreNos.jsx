import Header from "../components/header";
import Footer from "../components/footer";
import Clinica from "../assets/image/Clinica.jpg";
import MedLocal from "../assets/image/MedLocal.jpg";
import { FaCalendarAlt, FaUserClock, FaShieldAlt, FaUserMd, FaChild, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function SobreNos() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#008E9A] to-[#00B4C5] text-white py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                        Conheça a <span className="text-[#DFF3F4]">MedSync</span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
                        Revolucionando a forma como pacientes e médicos se conectam
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-white text-[#008E9A] hover:bg-[#DFF3F4] font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                            Agendar Consulta
                        </button>
                        <button className="border-2 border-white text-white hover:bg-white hover:text-[#008E9A] font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                            Fale Conosco
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </section>

            {/* Seção "Quem somos?" */}
            <section className="py-16 px-6 md:px-20 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2 relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#00B4C5] to-[#008E9A] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                            <img 
                                src={MedLocal} 
                                alt="Equipe MedSync" 
                                className="w-full h-auto rounded-xl shadow-2xl transform transition duration-500 group-hover:scale-102 relative z-10 border-4 border-white" 
                            />
                        </div>
                        
                        <div className="lg:w-1/2 space-y-8">
                            <div className="inline-block bg-[#DFF3F4] text-[#008E9A] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                SOBRE NÓS
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-bold text-[#008E9A]">
                                Quem somos?
                            </h2>
                            
                            <p className="text-gray-700 text-lg leading-relaxed">
                                <strong className="text-[#007A87] font-bold">MedSync</strong> é uma plataforma inovadora de agendamento
                                de consultas médicas, desenvolvida para conectar pacientes e profissionais 
                                da saúde com eficiência e comodidade.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#F8FDFD] p-6 rounded-xl border border-[#DFF3F4] hover:border-[#00B4C5] transition duration-300">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="bg-[#00B4C5] p-3 rounded-full text-white">
                                            <FaCalendarAlt size={20} />
                                        </div>
                                        <h3 className="font-bold text-[#007A87]">Agendamento Rápido</h3>
                                    </div>
                                    <p className="text-gray-600">Marque consultas em poucos cliques, 24 horas por dia.</p>
                                </div>
                                
                                <div className="bg-[#F8FDFD] p-6 rounded-xl border border-[#DFF3F4] hover:border-[#00B4C5] transition duration-300">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="bg-[#00B4C5] p-3 rounded-full text-white">
                                            <FaUserClock size={20} />
                                        </div>
                                        <h3 className="font-bold text-[#007A87]">Gestão de Horários</h3>
                                    </div>
                                    <p className="text-gray-600">Médicos controlam sua agenda com facilidade.</p>
                                </div>
                                
                                <div className="bg-[#F8FDFD] p-6 rounded-xl border border-[#DFF3F4] hover:border-[#00B4C5] transition duration-300">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="bg-[#00B4C5] p-3 rounded-full text-white">
                                            <FaShieldAlt size={20} />
                                        </div>
                                        <h3 className="font-bold text-[#007A87]">Segurança Total</h3>
                                    </div>
                                    <p className="text-gray-600">Seus dados protegidos com criptografia avançada.</p>
                                </div>
                                
                                <div className="bg-[#F8FDFD] p-6 rounded-xl border border-[#DFF3F4] hover:border-[#00B4C5] transition duration-300">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="bg-[#00B4C5] p-3 rounded-full text-white">
                                            <FaUserMd size={20} />
                                        </div>
                                        <h3 className="font-bold text-[#007A87]">Experiência Simplificada</h3>
                                    </div>
                                    <p className="text-gray-600">Interface intuitiva para médicos e pacientes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção do Espaço Físico */}
            <section className="py-16 px-6 md:px-20 bg-gradient-to-br from-[#F8FDFD] to-[#E6F7F8]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                        <div className="lg:w-1/2 space-y-8">
                            <div className="inline-block bg-[#008E9A] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                NOSSO ESPAÇO
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-bold text-[#008E9A]">
                                Venha conhecer nosso espaço!
                            </h2>
                            
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Na MedSync, cuidamos da saúde com carinho e dedicação. Nossa equipe 
                                especializada oferece um atendimento humanizado, em um ambiente 
                                acolhedor e seguro.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="text-[#00B4C5] mt-1">
                                        <FaChild size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#007A87]">Pediatria Especializada</h4>
                                        <p className="text-gray-600">Cuidados específicos para cada fase do desenvolvimento infantil.</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="text-[#00B4C5] mt-1">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#007A87]">Localização Privilegiada</h4>
                                        <p className="text-gray-600">Facilidade de acesso e estacionamento amplo.</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="text-[#00B4C5] mt-1">
                                        <FaClock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#007A87]">Horário Flexível</h4>
                                        <p className="text-gray-600">Atendimento em horários estendidos para sua comodidade.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <button className="bg-[#008E9A] hover:bg-[#007A87] text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
                                <FaPhoneAlt /> Fale Conosco
                            </button>
                        </div>
                        
                        <div className="lg:w-1/2 relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#00B4C5] to-[#008E9A] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                            <img
                                src={Clinica}
                                alt="Nosso espaço"
                                className="w-full h-auto rounded-xl shadow-2xl transform transition duration-500 group-hover:scale-102 relative z-10 border-4 border-white"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção de Destaques */}
            <section className="py-16 px-6 md:px-20 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#008E9A] mb-12">
                        Por que escolher a MedSync?
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-xl bg-[#F8FDFD] hover:shadow-lg transition duration-300">
                            <div className="bg-[#00B4C5] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold">100+</span>
                            </div>
                            <h3 className="text-xl font-bold text-[#007A87] mb-3">Profissionais</h3>
                            <p className="text-gray-600">Especialistas em diversas áreas da saúde à sua disposição</p>
                        </div>
                        
                        <div className="p-8 rounded-xl bg-[#F8FDFD] hover:shadow-lg transition duration-300">
                            <div className="bg-[#00B4C5] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold">24/7</span>
                            </div>
                            <h3 className="text-xl font-bold text-[#007A87] mb-3">Disponibilidade</h3>
                            <p className="text-gray-600">Agendamento online disponível a qualquer momento</p>
                        </div>
                        
                        <div className="p-8 rounded-xl bg-[#F8FDFD] hover:shadow-lg transition duration-300">
                            <div className="bg-[#00B4C5] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold">5.0</span>
                            </div>
                            <h3 className="text-xl font-bold text-[#007A87] mb-3">Avaliação</h3>
                            <p className="text-gray-600">Média de satisfação dos nossos pacientes</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default SobreNos;