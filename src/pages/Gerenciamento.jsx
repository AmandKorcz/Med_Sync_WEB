import { useEffect, useState } from 'react';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import PopupHorario from "../components/PopupHorario.jsx";

function Gerenciamento() {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [consultas, setConsultas] = useState([]);

  // Estados para CRUD
  const [showPopup, setShowPopup] = useState(false);
  const [currentMedico, setCurrentMedico] = useState(null);
  const [currentDiaIndex, setCurrentDiaIndex] = useState(null);
  const [editandoMedico, setEditandoMedico] = useState(null);
  const [mostrarFormMedico, setMostrarFormMedico] = useState(false);

  // Formulário médico
  const [formMedico, setFormMedico] = useState({
    nome: "",
    crm: "",
    especializacao: "",
    notas: ""
  });
  const [errors, setErrors] = useState({
    nome: "",
    crm: "",
    especializacao: ""
  });

  // busca/filtro
  const [filtro, setFiltro] = useState("");

  //Carregando médicos do backend
  useEffect(() => {
    const fetchMedicos = async () => {
      try{
        const [medicoRes, consultasRes] = await Promise.all([
          fetch('http://localhost:3000/medico'),
          fetch('http://localhost:3000/consulta')
        ])
        if (!response.ok){
          throw new Error('Erro ao carregar médicos');
        }
        const data = await response.json();
        //Adiciona diasAtendimento vazio para cada médico 
        const medicosComDias = data.map(medico => ({
          ...medico,
          diasAtendimento: [{
            dia: "SEGUNDA-FEIRA",
            data: new Date().toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'}).toUpperCase(),
            horarios: []
          }]
        }));
        setMedicos(medicosComDias);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicos();
  }, []);

  // CRUD para Médicos
  const handleAddMedico = async () => {
    const novosErros = {};
    let valido = true;

    if (!formMedico.nome.trim()) {
      novosErros.nome = "Nome é obrigatório";
      valido = false;
    }

    if (!formMedico.crm.trim()) {
      novosErros.crm = "CRM é obrigatório";
      valido = false;
    }

    if (!formMedico.especializacao.trim()) {
      novosErros.especializacao = "Especialização é obrigatória";
      valido = false;
    }

    setErrors(novosErrors);

    if (valido) {
      try{
        const method = editandoMedico ? 'PUT' : 'POST';
        const url = editandoMedico
          ? `http://localhost:3000/medico/${editandoMedico.id}`
          : 'http://localhost:3000/medico';

          const response = await fetch(url, {
            method, 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formMedico)
          });

          if(!response.ok){
            throw new Error(editandoMedico ? 'Erro ao atualizar médico':'Erro ao cadastrar médico');
          }

          //Recarrega a lista de médicos depois das operações 
          const responseMedico = await fetch('http://localhost:3000/medico');
          const data = await responseMedico.json();
          const medicosComDias = data.map(medico => ({
            ...medico,
            diasAtendimento: [{
              dia: "SEUNDA-FEIRA",
              data: new Date().toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'}).toUpperCase(),
              horarios: []
            }]
          }));
          setMedicos(medicosComDias);

          setFormMedico({nome: "", crm: "", especializacao: ""});
          setEditandoMedico(null),
          setMostrarFormMedico(false)
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEditMedico = (medico) => {
    setFormMedico({
      nome: medico.nome,
      crm: medico.crm,
      especializacao: medico.especializacao,
      notas: medico.notas || ""
    });
    setEditandoMedico(medico);
    setMostrarFormMedico(true);
  };

  const handleDeleteMedico = async (medicoId) => {
    try{
      const response = await fetch(`http://localhost:3000/medico/${medicoId}`, {
        method: 'DELETE'
      });

      if(!response.ok){
        throw new Error('Erro ao remover médico');
      }

      //Atualiza a lista de médicos após a remoção
      setMedicos(medicos.filter(medico => medico.id !== medicoId));
    } catch (err) {
      setError(err.message);
    }
  };

  // CRUD para Horários
  const handleDeleteHorario = (medicoId, diaIndex, horarioId) => {
    setMedicos(medicos.map(medico => {
      if (medico.id === medicoId) {
        const novosDias = [...medico.diasAtendimento];
        const novosHorarios = novosDias[diaIndex].horarios.filter(
          horario => horario.id !== horarioId
        );
        
        novosDias[diaIndex] = {
          ...novosDias[diaIndex],
          horarios: novosHorarios
        };
        
        return { ...medico, diasAtendimento: novosDias };
      }
      return medico;
    }));
  };

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

  const handleAddHorario = (medicoId, diaIndex, novaHora) => {
    setMedicos(medicos.map(medico => {
      if (medico.id === medicoId) {
        const novosDias = [...medico.diasAtendimento];
        const novosHorarios = [
          ...novosDias[diaIndex].horarios,
          {
            id: Date.now(),
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

  const openPopup = (medicoId, diaIndex) => {
    setCurrentMedico(medicoId);
    setCurrentDiaIndex(diaIndex);
    setShowPopup(true);
  };

  const handleConfirmarHorario = (horario) => {
    handleAddHorario(currentMedico, currentDiaIndex, horario);
  };

  const handleAddDiaAtendimento = (medicoId) => {
    setMedicos(medicos.map(medico => {
      if (medico.id === medicoId) {
        const novoDia = {
          dia: "TERÇA-FEIRA",
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

  // Filtrar médicos
  const medicosFiltrados = medicos.filter(medico =>
    medico.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    medico.crm.toLowerCase().includes(filtro.toLowerCase()) ||
    medico.especializacao.toLowerCase().includes(filtro.toLowerCase())
  );

  if(loading) {
    return(
      <div className='min-h-screen flex flex-col bg-gray-50'>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-lg">Carregando médicos...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-red-500 text-lg">Erro: {error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto py-20 px-6">
        <PopupHorario
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          onConfirm={handleConfirmarHorario}
        />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-[#00565e]">Gestão de Horários Médicos</h1>
            
            <div className="flex gap-4">
              <div className="w-full md:w-64">
                <input
                  type="text"
                  placeholder="Buscar médico..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  setFormMedico({ nome: "", crm: "", especializacao: "", notas: "" });
                  setEditandoMedico(null);
                  setMostrarFormMedico(true);
                }}
                className="bg-[#008E9A] hover:bg-[#006670] text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                + Médico
              </button>
            </div>
          </div>
          
          {/* Formulário de Médico (Create/Update) */}
          {mostrarFormMedico && (
            <div className="mb-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#00565e] mb-4">
                {editandoMedico ? "Editar Médico" : "Cadastrar Novo Médico"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                  <input
                    type="text"
                    className={`w-full border ${erros.nome ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                    value={formMedico.nome}
                    onChange={(e) => {
                      setFormMedico({...formMedico, nome: e.target.value});
                      setError({...erros, nome: ""});
                    }}
                  />
                  {erros.nome && <p className="text-red-500 text-xs mt-1">{erros.nome}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CRM *</label>
                  <input
                    type="text"
                    className={`w-full border ${erros.crm ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                    value={formMedico.crm}
                    onChange={(e) => {
                      setFormMedico({...formMedico, crm: e.target.value});
                      setError({...erros, crm: ""});
                    }}
                  />
                  {erros.crm && <p className="text-red-500 text-xs mt-1">{erros.crm}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Especialização *</label>
                  <input
                    type="text"
                    className={`w-full border ${erros.especializacao ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                    value={formMedico.especializacao}
                    onChange={(e) => {
                      setFormMedico({...formMedico, especializacao: e.target.value});
                      setError({...erros, especializacao: ""});
                    }}
                  />
                  {erros.especializacao && <p className="text-red-500 text-xs mt-1">{erros.especializacao}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows="2"
                    value={formMedico.notas}
                    onChange={(e) => setFormMedico({...formMedico, notas: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setMostrarFormMedico(false);
                    setEditandoMedico(null);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddMedico}
                  className="bg-[#008E9A] hover:bg-[#006670] text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                >
                  {editandoMedico ? "Atualizar" : "Cadastrar"}
                </button>
              </div>
            </div>
          )}
          
          {/* Listagem de Médicos e Horários (Read) */}
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditMedico(medico)}
                        className="bg-white text-[#008E9A] px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                        title="Editar médico"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteMedico(medico.id)}
                        className="bg-white text-red-500 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                        title="Remover médico"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleAddDiaAtendimento(medico.id)}
                        className="bg-white text-[#008E9A] px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                        title="Adicionar dia"
                      >
                        + Dia
                      </button>
                    </div>
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
                          onClick={() => openPopup(medico.id, diaIndex)}
                          className="text-[#008E9A] text-sm font-medium hover:text-[#006670] flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Horário
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {dia.horarios.map((horario, horarioIndex) => (
                          <div 
                            key={horario.id} 
                            className={`border rounded-lg p-4 relative ${
                              horario.status === "agendado" 
                                ? "border-green-200 bg-green-50" 
                                : "border-gray-200"
                            }`}
                          >
                            <button
                              onClick={() => handleDeleteHorario(medico.id, diaIndex, horario.id)}
                              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Remover horário"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>

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
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Gerenciamento;