import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Clinica from "../assets/image/Clinica.jpg";
import Med_1 from "../assets/image/Med_1.jpg";
import Med_2 from "../assets/image/Med_2.jpg";

function Atendimento() {
  const handleAgendar = (medico, data, horario) => {
    console.log(`Agendando com ${medico} em ${data} às ${horario}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold text-[#008E9A] mb-6">
                Venha conhecer nosso espaço!!
              </h1>

              <p className="text-lg text-black">
                Aqui cuidamos da saúde dos pequenos com carinho e dedicação.
                Nossa equipe especializada em pediatria oferece um atendimento
                humanizado, em um ambiente acolhedor e seguro. Aqui, cada
                criança recebe o cuidado que merece para crescer com saúde e
                bem-estar!
              </p>

              <button className="bg-[#008E9A] hover:bg-[#007b87] text-white font-bold py-3 px-8 rounded-lg transition duration-200 text-lg transform hover:scale-105 shadow-lg hover:shadow-xl">
                CONTATO
              </button>
            </div>
            <div className="md:w-1/2 relative group mt-16 mb-16">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#008E9A] to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <img
                src={Clinica}
                alt="Nosso espaço"
                className="w-full h-auto rounded-lg shadow-xl transform transition duration-500 group-hover:scale-105 relative z-10 border-4 border-white"
              />
            </div>
          </div>
        </section>

        {/* Seção da Dra. Eduarda - Estilo Dark com botões claros */}
        <section className="max-w-4xl mx-auto bg-gradient-to-r from-[#00565e] to-[#008E9A] rounded-lg shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/3 relative overflow-hidden group">
              <img
                src={Med_2}
                alt="Dra. Eduarda Do Nascimento"
                className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-lg">
                  Dra. Eduarda
                </span>
              </div>
            </div>

            <div className="md:w-2/3 p-6 bg-[#086068] backdrop-blur-sm">
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-300">
                  CRM/SC - 26580
                </span>
                <span className="text-sm font-semibold text-gray-300 ml-2">
                  Dermatologista
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-6">
                Dra. Eduarda Do Nascimento
              </h3>

              <h4 className="text-lg font-semibold text-gray-300 mb-4">
                Qual a melhor data e hora para seu atendimento?
              </h4>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-[#03484E] border border-gray-700 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#007b87]">
                      <th className="py-3 px-4 border-b border-gray-600 text-center text-white">
                        Seg 02/Jun
                      </th>
                      <th className="py-3 px-4 border-b border-gray-600 text-center text-white">
                        Ter 03/Jun
                      </th>
                      <th className="py-3 px-4 border-b border-gray-600 text-center text-white">
                        Qua 04/Jun
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Eduarda", "02/Jun", "11:30")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          11:30
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Eduarda", "03/Jun", "09:50")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          09:50
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Eduarda", "04/Jun", "09:30")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          09:30
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Eduarda", "02/Jun", "17:10")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          17:10
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Eduarda", "03/Jun", "14:30")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          14:30
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Eduarda", "04/Jun", "09:50")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          09:50
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Eduarda", "02/Jun", "18:10")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          18:10
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        {/* Célula vazia */}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Eduarda", "04/Jun", "10:10")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          10:10
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <button className="bg-[#008E9A] hover:bg-[#00B4C6] text-white font-bold py-2 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-md">
                  Agendar Horário
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Seção da Dra. Maria Luana - Estilo Dark com botões claros */}
        <section className="max-w-4xl mx-auto bg-gradient-to-r from-[#00565e] to-[#008E9A] rounded-lg shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/3 relative overflow-hidden group">
              <img
                src={Med_1}
                alt="Dra. Maria Luana"
                className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-lg">Dra. Maria</span>
              </div>
            </div>

            <div className="md:w-2/3 p-6 bg-[#086068] backdrop-blur-sm">
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-300">
                  CRM/SC - 25687
                </span>
                <span className="text-sm font-semibold text-gray-300 ml-2">
                  Pediatra
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-6">
                Dra. Maria Luana
              </h3>

              <h4 className="text-lg font-semibold text-gray-300 mb-4">
                Qual a melhor data e hora para seu atendimento?
              </h4>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full  bg-[#03484E] border border-gray-700 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#007b87]">
                      <th className="py-3 px-4 border-b border-gray-600 text-center text-white">
                        Seg 02/Jun
                      </th>
                      <th className="py-3 px-4 border-b border-gray-600 text-center text-white">
                        Ter 03/Jun
                      </th>
                      <th className="py-3 px-4 border-b border-gray-600 text-center text-white">
                        Qua 04/Jun
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Maria Luana", "02/Jun", "11:30")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          11:30
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Maria Luana", "03/Jun", "09:50")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          09:50
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Maria Luana", "04/Jun", "09:30")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          09:30
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Maria Luana", "02/Jun", "17:10")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          17:10
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Maria Luana", "03/Jun", "14:30")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          14:30
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Maria Luana", "04/Jun", "09:50")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          09:50
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Maria Luana", "02/Jun", "18:10")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          18:10
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        {/* Célula vazia */}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        <button
                          onClick={() =>
                            handleAgendar("Dra. Maria Luana", "04/Jun", "10:10")
                          }
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                        >
                          10:10
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <button className="bg-[#008E9A] hover:bg-[#00B4C6] text-white font-bold py-2 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-md">
                  Agendar Horário
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Atendimento;