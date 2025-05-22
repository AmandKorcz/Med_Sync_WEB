import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import artigo01 from "../assets/image/artigo01.jpg";
import artigo02 from "../assets/image/artigo02.jpg";
import artigo03 from "../assets/image/artigo03.jpg";
import artigo04 from "../assets/image/artigo04.webp";
import artigo05 from "../assets/image/artigo05.jpg";
import artigo06 from "../assets/image/artigo06.jpg";
import artigo07 from "../assets/image/artigo07.jpg";

function Informativo() {
    return(
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            
            <main className="container mx-auto px-4 py-28 mb-16">
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#00565e]">Informativo Médico</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Conheça os trabalhos, pesquisas e artigos desenvolvidos por nossos especialistas para promover saúde e bem-estar.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-[#00565e] mb-8 border-b-2 border-blue-100 pb-2">Artigos em Destaque</h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo01} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">setembro 2, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Comorbidades nas Disfunções do Trato Urinário Infantil</h3>
                                <p className="text-black">
                                    Explore as comorbidades relacionadas às disfunções do trato urinário em crianças e a importância de uma abordagem abrangente.
                                </p>
                            </div>
                        </article>

                        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo02} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">setembro 2, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Identificando Distúrbios Funcionais do Trato Urinário na Infância</h3>
                                <p className="text-black">
                                    Sinais de alerta que ajudam os pais a identificarem quando é necessário buscar orientação médica.
                                </p>
                            </div>
                        </article>
                    
                        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                               <img src={artigo03} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">julho 12, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Fisioterapia Pélvica Infantil</h3>
                                <p className="text-black">
                                    Como a fisioterapia pélvica pediátrica pode diagnosticar e tratar distúrbios relacionados à região pélvica em crianças.
                                </p>
                            </div>
                        </article>
                    </div>
                </section>
                
                <section>
                    <h2 className="text-2xl font-semibold text-[#00565e] mb-8 border-b-2 border-blue-100 pb-2">Mais Artigos e Pesquisas</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo04} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">maio 17, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Urticária</h3>
                                <p className="text-black">
                                    Avermelhamento, inchaço e coceira... mais de 20% da população vai apresentar pelo menos uma vez essa alteração.
                                </p>
                            </div>
                        </article>

                        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo05} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">maio 17, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Torcicolo em Bebês</h3>
                                <p className="text-black">
                                    Você já ouviu falar de torcicolo em bebês? Saiba que isso pode acontecer e causar alguns incômodos aos pequenos.
                                </p>
                            </div>
                        </article>

                        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo06} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">maio 17, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Acompanhamento de Peso e Altura</h3>
                                <p className="text-black">
                                    &quot;Doutora, você acha que o peso e a altura dele estão bons?&quot; Responder a esta pergunta tão frequente em nossa rotina pediátrica.
                                </p>
                            </div>
                        </article>
                        
                        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                                <img src={artigo07} alt="Crianças em tratamento" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-[#00565e]">abril 10, 2023</span>
                                <h3 className="text-xl font-bold text-[#00565e] my-2">Tecnologia e Saúde Infantil</h3>
                                <p className="text-black">
                                    Como a MedSync está revolucionando o acompanhamento pediátrico através da tecnologia e atendimento humanizado.
                                </p>
                            </div>
                        </article>
                    </div>
                </section>
                
                <section className="mt-16 bg-[#00565e] rounded-xl p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Você se interessa por pesquisa científica?</h2>
                    <p className="mb-6 max-w-2xl mx-auto">
                       A MedSync valoriza o conhecimento compartilhado.
                    </p>

                    <p>Profissionais da saúde podem publicar seus artigos, estudos de caso e resultados de pesquisas diretamente na plataforma.</p> 
                       <p> Contribua para o crescimento da comunidade médica, ajude pacientes e fortaleça sua atuação como pesquisador.</p>
                <p>Publique, inspire e faça a diferença.</p>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}

export default Informativo;