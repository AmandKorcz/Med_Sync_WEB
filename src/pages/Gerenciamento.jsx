import { useState } from 'react';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

function Gerenciamento() {
  const [medicos, setMedicos] = useState([
    {
      id: 1,
      crm: "26580-SC",
      nome: "Dra. Eduarda Do Nascimento",
      especializacao: "Dermatologista",
      diasAtendimento: [
        {
          dia: "SEGUNDA-FEIRA",
          data: "02/JUNHO",
          horarios: [
            { id: 1, hora: "11:30", paciente: "", status: "disponivel" },
            { id: 2, hora: "17:10", paciente: "", status: "disponivel" },
            { id: 3, hora: "18:10", paciente: "", status: "disponivel" },
            { id: 4, hora: "19:10", paciente: "Luiza Helena De Souza", status: "agendado" }
          ]
        },
        {
          dia: "TERÇA-FEIRA",
          data: "03/JUNHO",
          horarios: [
            { id: 5, hora: "09:00", paciente: "", status: "disponivel" },
            { id: 6, hora: "14:00", paciente: "Carlos Silva", status: "agendado" }
          ]
        }
      ],
      notas: "Atendimento às segundas e terças"
    },
    {
      id: 2,
      crm: "20258-SC",
      nome: "Dra. Maria Antonieli",
      especializacao: "Pediatra",
      diasAtendimento: [
        {
          dia: "SEGUNDA-FEIRA",
          data: "02/JUNHO",
          horarios: [
            { id: 7, hora: "11:30", paciente: "", status: "disponivel" },
            { id: 8, hora: "17:10", paciente: "", status: "disponivel" },
            { id: 9, hora: "18:10", paciente: "", status: "disponivel" },
            { id: 10, hora: "19:10", paciente: "Gustavo Korczagin", status: "agendado" }
          ]
        }
      ],
      notas: "Especialista em pediatria geral"
    }
  ]);

  // Arquitetura para Novo médico com validação
  const [novoMedico, setNovoMedico] = useState({
    nome: "",
    crm: "",
    especializacao: "",
    notas: ""
  });

  // controle de erros (inicio de testes)
  const [erros, setErros] = useState({
    nome: "",
    crm: "",
    especializacao: ""
  });

  // busca/filtro
  const [filtro, setFiltro] = useState("");

  // Adicionar paciente a um horário
  const handleAddPaciente = (medicoId, diaIndex, horarioIndex, nome) => {
    setMedicos(medicos.map(medico => {
      if (medico.id === medicoId) {
        const novosDias = [...medico.diasAtendimento];
        const novosHorarios = [...novosDias[diaIndex].horarios];
        
        novosHorarios[horarioIndex] = {
          ...novosHorarios[horarioIndex],
          paciente: nome,
          status: nome ? "agendado" : "disponivel"
        };
        
        novosDias[diaIndex] = {
          ...novosDias[diaIndex],
          horarios: novosHorarios
        };
        
        return { ...medico, diasAtendimento: novosDias };
      }
      return medico;
    }));
  };

  // Adicionar novo médico com validação
  const handleAddMedico = () => {
    const novosErros = {};
    let valido = true;

    if (!novoMedico.nome.trim()) {
      novosErros.nome = "Nome é obrigatório";
      valido = false;
    }

    if (!novoMedico.crm.trim()) {
      novosErros.crm = "CRM é obrigatório";
      valido = false;
    }

    if (!novoMedico.especializacao.trim()) {
      novosErros.especializacao = "Especialização é obrigatória";
      valido = false;
    }

    setErros(novosErros);

    if (valido) {
      const novoMedicoCompleto = {
        id: medicos.length + 1,
        crm: novoMedico.crm,
        nome: novoMedico.nome,
        especializacao: novoMedico.especializacao,
        diasAtendimento: [{
          dia: "SEGUNDA-FEIRA",
          data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase(),
          horarios: []
        }],
        notas: novoMedico.notas
      };

      setMedicos([...medicos, novoMedicoCompleto]);
      setNovoMedico({ nome: "", crm: "", especializacao: "", notas: "" });
    }
  };

  // Adicionar novo dia de atendimento
  const handleAddDiaAtendimento = (medicoId) => {
    setMedicos(medicos.map(medico => {
      if (medico.id === medicoId) {
        const novoDia = {
          dia: "TERÇA-FEIRA", // Poderia ser um selecionável (ver como aprimorar essa parte) 
          data: new Date(Date.now() + 86400000).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase(),
          horarios: []
        };
        return {
          ...medico,
          diasAtendimento: [...medico.diasAtendimento, novoDia]
        };
      }
      return medico;
    }));
  };

  // Adicionar novo horário
  const handleAddHorario = (medicoId, diaIndex, novaHora) => {
    setMedicos(medicos.map(medico => {
      if (medico.id === medicoId) {
        const novosDias = [...medico.diasAtendimento];
        const novosHorarios = [
          ...novosDias[diaIndex].horarios,
          {
            id: Date.now(), // ID único (incluir no banco)
            hora: novaHora,
            paciente: "",
            status: "disponivel"
          }
        ];
        
        novosDias[diaIndex] = {
          ...novosDias[diaIndex],
          horarios: novosHorarios
        };
        
        return { ...medico, diasAtendimento: novosDias };
      }
      return medico;
    }));
  };

  // Filtrar médicos
  const medicosFiltrados = medicos.filter(medico =>
    medico.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    medico.crm.toLowerCase().includes(filtro.toLowerCase()) ||
    medico.especializacao.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-[#00565e]">Gestão de Horários Médicos</h1>
            
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Buscar médico..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
          </div>
          
          {/* Listagem de Médicos e Horários */}
          <div className="space-y-8">
            {medicosFiltrados.map(medico => (
              <div key={medico.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#008E9A] p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold">{medico.nome}</h2>
                      <p className="text-sm">CRM: {medico.crm} • {medico.especializacao}</p>
                      {medico.notas && <p className="text-xs mt-1 italic">{medico.notas}</p>}
                    </div>
                    <button
                      onClick={() => handleAddDiaAtendimento(medico.id)}
                      className="bg-white text-[#008E9A] px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                    >
                      + Dia
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {medico.diasAtendimento.map((dia, diaIndex) => (
                    <div key={`${medico.id}-${diaIndex}`} className="mb-8 last:mb-0">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {dia.dia} - {dia.data}
                        </h3>
                        <button
                          onClick={() => {
                            const novaHora = prompt("Adicionar novo horário (HH:MM):");
                            if (novaHora) handleAddHorario(medico.id, diaIndex, novaHora);
                          }}
                          className="text-[#008E9A] text-sm font-medium hover:text-[#006670]"
                        >
                          + Horário
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {dia.horarios.map((horario, horarioIndex) => (
                          <div 
                            key={horario.id} 
                            className={`border rounded-lg p-4 ${
                              horario.status === "agendado" 
                                ? "border-green-200 bg-green-50" 
                                : "border-gray-200"
                            }`}
                          >
                            <div className="font-bold text-[#008E9A] mb-2">{horario.hora}</div>
                            {horario.paciente ? (
                              <div className="text-gray-700">
                                <span className="font-medium">Paciente:</span> {horario.paciente}
                                <button
                                  onClick={() => handleAddPaciente(medico.id, diaIndex, horarioIndex, "")}
                                  className="ml-2 text-red-500 text-xs hover:text-red-700"
                                >
                                  Cancelar
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  placeholder="Nome do paciente"
                                  className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
                                  onBlur={(e) => handleAddPaciente(medico.id, diaIndex, horarioIndex, e.target.value)}
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      handleAddPaciente(medico.id, diaIndex, horarioIndex, e.target.value);
                                      e.target.blur();
                                    }
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Formulário para cadastrar novo médico */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#00565e] mb-4">Cadastrar Novo Médico</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input
                  type="text"
                  className={`w-full border ${erros.nome ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                  value={novoMedico.nome}
                  onChange={(e) => {
                    setNovoMedico({...novoMedico, nome: e.target.value});
                    setErros({...erros, nome: ""});
                  }}
                />
                {erros.nome && <p className="text-red-500 text-xs mt-1">{erros.nome}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CRM *</label>
                <input
                  type="text"
                  className={`w-full border ${erros.crm ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                  value={novoMedico.crm}
                  onChange={(e) => {
                    setNovoMedico({...novoMedico, crm: e.target.value});
                    setErros({...erros, crm: ""});
                  }}
                />
                {erros.crm && <p className="text-red-500 text-xs mt-1">{erros.crm}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialização *</label>
                <input
                  type="text"
                  className={`w-full border ${erros.especializacao ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                  value={novoMedico.especializacao}
                  onChange={(e) => {
                    setNovoMedico({...novoMedico, especializacao: e.target.value});
                    setErros({...erros, especializacao: ""});
                  }}
                />
                {erros.especializacao && <p className="text-red-500 text-xs mt-1">{erros.especializacao}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows="2"
                  value={novoMedico.notas}
                  onChange={(e) => setNovoMedico({...novoMedico, notas: e.target.value})}
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setNovoMedico({ nome: "", crm: "", especializacao: "", notas: "" })}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-200"
              >
                Limpar
              </button>
              <button
                onClick={handleAddMedico}
                className="bg-[#008E9A] hover:bg-[#006670] text-white font-bold py-2 px-6 rounded-lg transition duration-200"
              >
                Cadastrar Médico
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Gerenciamento;