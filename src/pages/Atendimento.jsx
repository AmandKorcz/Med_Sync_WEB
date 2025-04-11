import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Clinica from "../assets/image/Clinica.jpg";
import Med_1 from "../assets/image/Med_1.jpg";

function Atendimento() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Seção de introdução */}
                <section className="mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
                        Venha conhecer nosso espaço!!
                    </h1>
                    
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg text-gray-700 mb-8">
                            Aqui cuidamos da saúde dos pequenos com carinho e dedicação. Nossa equipe especializada em pediatria oferece um atendimento humanizado, em um ambiente acolhedor e seguro. Aqui, cada criança recebe o cuidado que merece para crescer com saúde e bem-estar!
                        </p>
                        
                        <div className="border-t-2 border-blue-200 pt-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">CONTATO</h2>
                        </div>
                    </div>
                </section>
                
                {/* Seção da Dra. Eduarda */}
                <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                        {/* Imagem da médica - substitua Med_1 pela imagem real */}
                        <div className="md:w-1/3 bg-gray-200 flex items-center justify-center">
                            <img 
                                src={Med_1} 
                                alt="Dra. Eduarda Do Nascimento" 
                                className="w-full h-64 md:h-auto object-cover"
                            />
                        </div>
                        
                        <div className="md:w-2/3 p-6">
                            <div className="mb-4">
                                <span className="text-sm font-semibold text-gray-600">CRM/SC - 26580</span>
                                <span className="text-sm font-semibold text-gray-600 ml-2">Dermatologista</span>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-blue-800 mb-6">Dra. Eduarda Do Nascimento</h3>
                            
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">
                                Qual a melhor data e hora para seu atendimento?
                            </h4>
                            
                            {/* Tabela de horários */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="bg-blue-50">
                                            <th className="py-2 px-4 border-b">Seg</th>
                                            <th className="py-2 px-4 border-b">Ter</th>
                                            <th className="py-2 px-4 border-b">Qua</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 border-b text-center">02/Jun</td>
                                            <td className="py-2 px-4 border-b text-center">03/Jun</td>
                                            <td className="py-2 px-4 border-b text-center">04/Jun</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b text-center">11:30</td>
                                            <td className="py-2 px-4 border-b text-center">09:50</td>
                                            <td className="py-2 px-4 border-b text-center">09:30</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b text-center">17:10</td>
                                            <td className="py-2 px-4 border-b text-center">14:30</td>
                                            <td className="py-2 px-4 border-b text-center">09:50</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b text-center">18:10</td>
                                            <td className="py-2 px-4 border-b text-center"></td>
                                            <td className="py-2 px-4 border-b text-center">10:10</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-6">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
                                    Agendar Horário
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Imagem da clínica */}
                <section className="mt-12 rounded-lg overflow-hidden shadow-lg">
                    <img 
                        src={Clinica} 
                        alt="Nossa clínica" 
                        className="w-full h-64 md:h-96 object-cover"
                    />
                </section>
            </main>
            
            <Footer />
        </div>
    );
}

export default Atendimento;