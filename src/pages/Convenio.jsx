import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

function Convenio() {
    return(
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            
            <main className="container mx-auto px-4 py-12 mb-16">
                {/* Seção Título */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#00565e]">Convênio MedSync</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
                        Planos de saúde e descontos especiais para cuidar da sua família
                    </p>
                </section>

                {/* Seção Benefícios */}
                <section className="mb-16">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 - Oftalmologista */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-[#00565e] p-4 text-white text-center">
                                <h3 className="text-2xl font-bold">Oftalmologista</h3>
                            </div>
                            <div className="p-6">
                                <div className="text-center mb-4">
                                    <span className="text-green-600 font-bold text-lg">R$ 120 de economia</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-500 line-through">R$ 210</span>
                                    <span className="text-gray-500 text-sm">No particular</span>
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[#00565e] font-bold text-xl">R$ 90</span>
                                    <span className="text-[#00565e] text-sm">Com MedSync</span>
                                </div>
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>Sem filas</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>Sem longas horas de espera</span>
                                    </li>
                                </ul>
                                <button className="w-full bg-[#00565e] hover:bg-[#00454a] text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                                    Agendar agora
                                </button>
                            </div>
                        </div>

                        {/* Card 2 - Exame de Sangue */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-[#00565e] p-4 text-white text-center">
                                <h3 className="text-2xl font-bold">Exame de sangue</h3>
                            </div>
                            <div className="p-6">
                                <div className="text-center mb-4">
                                    <span className="text-green-600 font-bold text-lg">+70% de desconto</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-500 line-through">R$ 24</span>
                                    <span className="text-gray-500 text-sm">No particular</span>
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[#00565e] font-bold text-xl">R$ 7</span>
                                    <span className="text-[#00565e] text-sm">Com MedSync</span>
                                </div>
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>Sem filas</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>Sem longas horas de espera</span>
                                    </li>
                                </ul>
                                <button className="w-full bg-[#00565e] hover:bg-[#00454a] text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                                    Agendar agora
                                </button>
                            </div>
                        </div>

                        {/* Card 3 - Check Up */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-[#00565e] p-4 text-white text-center">
                                <h3 className="text-2xl font-bold">Check Up</h3>
                            </div>
                            <div className="p-6">
                                <div className="text-center mb-4">
                                    <span className="text-green-600 font-bold text-lg">R$ 42 de economia</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-500 line-through">R$ 92</span>
                                    <span className="text-gray-500 text-sm">No particular</span>
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[#00565e] font-bold text-xl">R$ 50</span>
                                    <span className="text-[#00565e] text-sm">Com MedSync</span>
                                </div>
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>Sem filas</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>Sem longas horas de espera</span>
                                    </li>
                                </ul>
                                <button className="w-full bg-[#00565e] hover:bg-[#00454a] text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                                    Agendar agora
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seção Informações Adicionais */}
                <section className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-[#00565e] mb-6">Como funciona nosso convênio?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-[#00565e] mb-4">Benefícios</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Descontos em consultas e exames</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Agendamento rápido e sem burocracia</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Atendimento humanizado e especializado</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#00565e] mb-4">Cobertura</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Consultas com especialistas</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Exames laboratoriais e de imagem</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Procedimentos terapêuticos</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}

export default Convenio;