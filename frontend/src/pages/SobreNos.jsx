import Header from "../components/header";
import Footer from "../components/footer";
import MedLocal from "../assets/image/MedLocal.jpg"
import { FaCalendarAlt, FaUserClock, FaShieldAlt, FaUserMd, FaHeartbeat, FaClinicMedical, FaWhatsapp } from "react-icons/fa";

function SobreNos() {
    // Dados de contato centralizados
    const phoneNumber = "5547984747598";
    const whatsappLink = `https://wa.me/${phoneNumber}`;
    const whatsappMessage = encodeURIComponent("Olá, gostaria de mais informações sobre a MedSync!");

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#008E9A] to-[#00B4C5] text-white py-28 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
                </div>
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                        Conectando <span className="text-[#DFF3F4]">saúde</span> e <span className="text-[#DFF3F4]">tecnologia</span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
                        A MedSync reinventa a experiência em saúde com agendamentos simples e atendimento humanizado
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-white text-[#008E9A] hover:bg-[#DFF3F4] font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                            Agendar Consulta
                        </button>
                        <a 
                            href={`${whatsappLink}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white text-white hover:bg-white hover:text-[#008E9A] font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                        >
                            <FaWhatsapp /> Fale Conosco
                        </a>
                    </div>
                </div>
            </section>

            {/* Sobre Nós - Versão Redesign */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-[#DFF3F4] text-[#008E9A] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            SOBRE NÓS
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Quem somos?
                        </h2>
                        <div className="max-w-2xl mx-auto">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                A <strong className="text-[#008E9A]">MedSync</strong> é uma plataforma inovadora que conecta pacientes e profissionais de saúde de forma simples, segura e eficiente. Nossa missão é democratizar o acesso à saúde de qualidade através da tecnologia.
                            </p>
                        </div>
                    </div>

                    {/* Diferenciais em Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-[#F8FDFD] p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-[#DFF3F4]">
                            <div className="bg-[#00B4C5] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white">
                                <FaCalendarAlt size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[#007A87] mb-3">Agendamento Rápido</h3>
                            <p className="text-gray-600">Marque consultas em poucos cliques, 24 horas por dia, sem complicações.</p>
                        </div>
                        
                        <div className="bg-[#F8FDFD] p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-[#DFF3F4]">
                            <div className="bg-[#00B4C5] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white">
                                <FaUserClock size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[#007A87] mb-3">Gestão Inteligente</h3>
                            <p className="text-gray-600">Médicos controlam sua agenda com ferramentas poderosas e intuitivas.</p>
                        </div>
                        
                        <div className="bg-[#F8FDFD] p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-[#DFF3F4]">
                            <div className="bg-[#00B4C5] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white">
                                <FaShieldAlt size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[#007A87] mb-3">Segurança Total</h3>
                            <p className="text-gray-600">Seus dados protegidos com os mais avançados protocolos de criptografia.</p>
                        </div>
                        
                        <div className="bg-[#F8FDFD] p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-[#DFF3F4]">
                            <div className="bg-[#00B4C5] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white">
                                <FaUserMd size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[#007A87] mb-3">Experiência Completa</h3>
                            <p className="text-gray-600">Interface intuitiva projetada para médicos e pacientes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nossa Missão com Card de Imagem */}
            <section className="py-20 px-6 bg-gradient-to-br from-[#F8FDFD] to-[#E6F7F8]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-stretch gap-8"> {/* Alterado para items-stretch */}
                        {/* Card com Imagem */}
                        <div className="lg:w-1/2">
                            <div className="h-full overflow-hidden rounded-2xl shadow-xl">
                                <div className="relative h-full group">
                                    <img 
                                        src={MedLocal} 
                                        alt="Estrutura da Clínica MedSync" 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        style={{ minHeight: '400px' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Nossa Estrutura</h3>
                                            <p className="text-white/90">Ambiente moderno e acolhedor para seu conforto</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Conteúdo Textual */}
                        <div className="lg:w-1/2 flex flex-col">
                            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg h-full flex flex-col justify-center">
                                <span className="inline-block bg-[#008E9A] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    NOSSA MISSÃO
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Saúde acessível para todos
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Acreditamos que o cuidado com a saúde deve ser simples, humano e acessível. Por isso, desenvolvemos uma plataforma que elimina barreiras e conecta quem precisa de atendimento com os melhores profissionais.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="text-[#00B4C5] mt-1">
                                            <FaHeartbeat size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#007A87] text-lg">Atendimento Humanizado</h4>
                                            <p className="text-gray-600">Priorizamos o relacionamento médico-paciente em cada interação.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="text-[#00B4C5] mt-1">
                                            <FaClinicMedical size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#007A87] text-lg">Tecnologia que Cura</h4>
                                            <p className="text-gray-600">Ferramentas inovadoras para melhorar sua experiência em saúde.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default SobreNos;