import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Med_1 from "../assets/image/Med_1.jpg";
import Med_2 from "../assets/image/Med_2.jpg";

function Atendimento() {
  const handleAgendar = (medico, data, horario) => {
    console.log(`Agendando com ${medico} em ${data} às ${horario}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

     
    <main className="container mx-auto px-4 py-34 mb-16"> 
        <section className="max-w-6xl mx-auto bg-gradient-to-r from-[#00565e] to-[#008E9A] rounded-lg shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/4 relative overflow-hidden group">
              <img
                src={Med_2}
                alt="Dra. Eduarda Do Nascimento"
                className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-xl">
                  Dra. Eduarda
                </span>
              </div>
            </div>

            <div className="md:w-3/4 p-6 bg-[#086068]">
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

              <div className="mb-6">
                {/* Tabela mais ampla sem scroll horizontal */}
                <table className="w-full bg-[#03484E] border border-gray-700 rounded-lg">
                  <thead>
                    <tr className="bg-[#007b87]">
                      <th className="py-3 px-6 border-b border-gray-600 text-center text-white w-1/5">
                        Seg 02/Jun
                      </th>
                      <th className="py-3 px-6 border-b border-gray-600 text-center text-white w-1/5">
                        Ter 03/Jun
                      </th>
                      <th className="py-3 px-6 border-b border-gray-600 text-center text-white w-1/5">
                        Qua 04/Jun
                      </th>
                      <th className="py-3 px-6 border-b border-gray-600 text-center text-white w-1/5">
                        Qui 05/Jun
                      </th>
                      <th className="py-3 px-6 border-b border-gray-600 text-center text-white w-1/5">
                        Sex 06/Jun
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Linha 1 de horários */}
                    <tr>
                      {["11:30", "09:50", "09:30", "10:00", "14:00"].map((horario, index) => (
                        <td key={index} className="py-3 px-6 border-b border-gray-700 text-center">
                          <button
                            onClick={() =>
                              handleAgendar(
                                "Dra. Eduarda", 
                                ["02/Jun", "03/Jun", "04/Jun", "05/Jun", "06/Jun"][index], 
                                horario
                              )
                            }
                            className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                          >
                            {horario}
                          </button>
                        </td>
                      ))}
                    </tr>
                    {/* Linha 2 de horários */}
                    <tr>
                      {["17:10", "14:30", "09:50", "11:00", "15:30"].map((horario, index) => (
                        <td key={index} className="py-3 px-6 border-b border-gray-700 text-center">
                          <button
                            onClick={() =>
                              handleAgendar(
                                "Dra. Eduarda", 
                                ["02/Jun", "03/Jun", "04/Jun", "05/Jun", "06/Jun"][index], 
                                horario
                              )
                            }
                            className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                          >
                            {horario}
                          </button>
                        </td>
                      ))}
                    </tr>
                    {/* Linha 3 de horários */}
                    <tr>
                      {["18:10", "16:00", "10:10", "14:00", "16:30"].map((horario, index) => (
                        <td key={index} className="py-3 px-6 border-b border-gray-700 text-center">
                          <button
                            onClick={() =>
                              handleAgendar(
                                "Dra. Eduarda", 
                                ["02/Jun", "03/Jun", "04/Jun", "05/Jun", "06/Jun"][index], 
                                horario
                              )
                            }
                            className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                          >
                            {horario}
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-center">
                <button className="bg-[#008E9A] hover:bg-[#00B4C6] text-white font-bold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg text-lg">
                  Agendar Horário
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Dra. Maria Luana - Layout ampliado */}
        <section className="max-w-6xl mx-auto bg-gradient-to-r from-[#00565e] to-[#008E9A] rounded-lg shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/4 relative overflow-hidden group">
              <img
                src={Med_1}
                alt="Dra. Maria Luana"
                className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-xl">Dra. Maria</span>
              </div>
            </div>

            <div className="md:w-3/4 p-6 bg-[#086068]">
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

              <div className="mb-6">
                {/* Tabela mais ampla sem scroll horizontal */}
                <table className="w-full bg-[#03484E] border border-gray-700 rounded-lg">
                  <thead>
                    <tr className="bg-[#007b87]">
                      <th className="py-3 px-6 border-b border-gray-600 text-center text-white w-1/5">
                        Seg 02/Jun
                      </th>
                      <th className="py-3 px-6 border-b border-gray-600 text-center text-white w-1/5">
                        Ter 03/Jun
                      </th>
                      <th className="py-3 px-6 border-b border-gray-600 text-center text-white w-1/5">
                        Qua 04/Jun
                      </th>
                      <th className="py-3 px-6 border-b border-gray-600 text-center text-white w-1/5">
                        Qui 05/Jun
                      </th>
                      <th className="py-3 px-6 border-b border-gray-600 text-center text-white w-1/5">
                        Sex 06/Jun
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Linha 1 de horários */}
                    <tr>
                      {["11:30", "09:50", "09:30", "10:00", "14:00"].map((horario, index) => (
                        <td key={index} className="py-3 px-6 border-b border-gray-700 text-center">
                          <button
                            onClick={() =>
                              handleAgendar(
                                "Dra. Maria Luana", 
                                ["02/Jun", "03/Jun", "04/Jun", "05/Jun", "06/Jun"][index], 
                                horario
                              )
                            }
                            className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                          >
                            {horario}
                          </button>
                        </td>
                      ))}
                    </tr>
                    {/* Linha 2 de horários */}
                    <tr>
                      {["17:10", "14:30", "09:50", "11:00", "15:30"].map((horario, index) => (
                        <td key={index} className="py-3 px-6 border-b border-gray-700 text-center">
                          <button
                            onClick={() =>
                              handleAgendar(
                                "Dra. Maria Luana", 
                                ["02/Jun", "03/Jun", "04/Jun", "05/Jun", "06/Jun"][index], 
                                horario
                              )
                            }
                            className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                          >
                            {horario}
                          </button>
                        </td>
                      ))}
                    </tr>
                    {/* Linha 3 de horários */}
                    <tr>
                      {["18:10", "16:00", "10:10", "14:00", "16:30"].map((horario, index) => (
                        <td key={index} className="py-3 px-6 border-b border-gray-700 text-center">
                          <button
                            onClick={() =>
                              handleAgendar(
                                "Dra. Maria Luana", 
                                ["02/Jun", "03/Jun", "04/Jun", "05/Jun", "06/Jun"][index], 
                                horario
                              )
                            }
                            className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
                          >
                            {horario}
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-center">
                <button className="bg-[#008E9A] hover:bg-[#00B4C6] text-white font-bold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg text-lg">
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