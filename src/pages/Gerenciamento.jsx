import { useState } from 'react';
import { useEffect } from 'react'; 
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import PopupHorario from "../components/PopupHorario.jsx";
import NewDayPopup from "../components/NewDayPopup.jsx";
import { useMedical } from '../contexts/MedicalContext.jsx';
import { generateTimeSlots } from '../assets/Utils/scheduleUtils.js';

function Gerenciamento() {
  const [medicos, setMedicos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const [medicoNome, setMedicoNome] = useState("");
  const [medicoCRM, setMedicoCRM] = useState("");
  const [medicoEspecializacao, setMedicoEspecializacao] = useState("");
  const [medicoNotas, setMedicoNotas] = useState("");

  const [mostrarFormMedico, setMostrarFormMedico] = useState(false);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [medicoParaDeletar, setMedicoParaDeletar] = useState(null);


  const [editandoMedico, setEditandoMedico] = useState(null);
  const [erros, setErros] = useState({ nome: "", crm: "", especializacao: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [showAddDayPopup, setShowAddDayPopup] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [medicoSelecionadoId, setMedicoSelecionadoId] = useState(null);
  const [dayToAdd, setDayToAdd] = useState({ dia: "", data: "" });

  const medicosFiltrados = medicos.filter(m => m?.nome?.toLowerCase().includes(filtro.toLowerCase()));

  const handleAddPaciente = (medicoId, diaIndex, horarioIndex, nomePaciente) => {
    setMedicos((prev) => prev.map(m => {
      if (m.id !== medicoId) return m;
      const novosDias = [...m.diasAtendimento];
      const novosHorarios = [...novosDias[diaIndex].horarios];
      novosHorarios[horarioIndex].paciente = nomePaciente || null;
      novosDias[diaIndex].horarios = novosHorarios;
      return { ...m, diasAtendimento: novosDias };
    }));
  };

  const handleDeleteHorario = (medicoId, diaIndex, horarioId) => {
    setMedicos((prev) => prev.map(m => {
      if (m.id !== medicoId) return m;
      const novosDias = [...m.diasAtendimento];
      novosDias[diaIndex].horarios = novosDias[diaIndex].horarios.filter(h => h.id !== horarioId);
      return { ...m, diasAtendimento: novosDias };
    }));
  };

  const openPopupHorario = (medicoId, diaIndex) => {
    setMedicoSelecionadoId(medicoId);
    setDiaSelecionado(diaIndex);
    setShowPopup(true);
  };

  const handleConfirmarHorario = (novoHorario) => {
    if (medicoSelecionadoId === null || diaSelecionado === null) return;
    setMedicos((prev) => prev.map(m => {
      if (m.id !== medicoSelecionadoId) return m;
      const novosDias = [...m.diasAtendimento];
      const novoHorarioObj = { id: Date.now(), hora: novoHorario, paciente: "", status: "" };
      novosDias[diaSelecionado].horarios.push(novoHorarioObj);
      return { ...m, diasAtendimento: novosDias };
    }));
    setShowPopup(false);
  };

  const handleAddStandardHours = (medicoId, diaIndex) => {
    const horariosPadrao = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
    setMedicos((prev) => prev.map(m => {
      if (m.id !== medicoId) return m;
      const novosDias = [...m.diasAtendimento];
      const horariosExistentes = novosDias[diaIndex].horarios.map(h => h.hora);
      horariosPadrao.forEach(horario => {
        if (!horariosExistentes.includes(horario)) {
          novosDias[diaIndex].horarios.push({ id: Date.now() + Math.random(), hora: horario, paciente: "", status: "" });
        }
      });
      return { ...m, diasAtendimento: novosDias };
    }));
  };

  const handleAddDiaAtendimentoClick = (medicoId) => {
    setMedicoSelecionadoId(medicoId);
    setShowAddDayPopup(true);
    setDayToAdd({ dia: "", data: "" });
  };

  const handleConfirmAddDay = (novoDia) => {
    if (!novoDia.dia || !novoDia.data || medicoSelecionadoId === null) return;
    setMedicos((prev) => prev.map(m => {
      if (m.id !== medicoSelecionadoId) return m;
      const novosDias = [...m.diasAtendimento, { dia: novoDia.dia, data: novoDia.data, horarios: [] }];
      return { ...m, diasAtendimento: novosDias };
    }));
    setShowAddDayPopup(false);
  };

  const abrirConfirmDelete = (medico) => {
    setMedicoParaDeletar(medico);
    setShowConfirmDelete(true);
  };


  const handleAddOrUpdateMedico = async () => {
    let valid = true;
    const novosErros = { nome: "", crm: "", especializacao: "", notas: "" };
    if (!medicoNome.trim()) {
      novosErros.nome = "Nome é obrigatório";
      valid = false;
    }
    if (!medicoCRM.trim()) {
      novosErros.crm = "CRM é obrigatório";
      valid = false;
    }
    if (!medicoEspecializacao.trim()) {
      novosErros.especializacao = "Especialização é obrigatória";
      valid = false;
    }
    if (!valid) {
      setErros(novosErros);
      return;
    }

    try {
      if (editandoMedico !== null) {
        // Atualizar médico existente (PUT)
        const token = localStorage.getItem('token'); 
        const response = await fetch(`http://localhost:3000/editMedico/${editandoMedico}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            nome: medicoNome,
            crm: medicoCRM,
            especializacao: medicoEspecializacao,
            notas: medicoNotas
          })
        });

        if (!response.ok) throw new Error("Erro ao atualizar médico");

        const medicoAtualizado = await response.json();

        setMedicos(prev =>
          prev.map(m =>
            m.id === editandoMedico
              ? { ...medicoAtualizado, diasAtendimento: m.diasAtendimento || [] }
              : m
          )
        );

        await fetchMedicos();
        setMostrarFormMedico(false);
        setEditandoMedico(null);
        setMedicoNome("");
        setMedicoCRM("");
        setMedicoEspecializacao("");
        setMedicoNotas("");

        window.scrollTo({ top: 0, behavior: 'smooth' });

      } else {
        // Criar novo médico (POST)
        const token = localStorage.getItem('token'); 
        const response = await fetch("http://localhost:3000/criarMedico", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            nome: medicoNome,
            crm: medicoCRM,
            especializacao: medicoEspecializacao,
            notas: medicoNotas
          })
        });

        if (!response.ok) throw new Error("Erro ao criar médico");

        const novoMedico = await response.json();

        setMedicos(prev => [...prev, { ...novoMedico, diasAtendimento: [] }]);
        setMostrarFormMedico(false); 

        await fetchMedicos();
        setMedicoNome("");
        setMedicoCRM("");
        setMedicoEspecializacao("");
        setMedicoNotas("");
        setErros({ nome: "", crm: "", especializacao: "" });

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao salvar o médico.");
    }
  };

  const handleEditMedico = (medico) => {
    setMedicoNome(medico.nome);
    setMedicoCRM(medico.crm);
    setMedicoEspecializacao(medico.especializacao);
    setMedicoNotas(medico.notas || "");
    setEditandoMedico(medico.id);
    setMostrarFormMedico(true);
  };

  const handleDeleteMedico = async () => {
    if (!medicoParaDeletar) return;

    try{
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/deleteMedico/${medicoParaDeletar.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Erro ao deletar médico');

      setMedicos(prev => prev.filter(m => m.id !== medicoParaDeletar.id));
      setShowConfirmDelete(false);
      setMedicoParaDeletar(null);
    } catch (error) {
      console.error("Erro ao deletar médico: ", error);
      alert("Não foi possível deletar o médico");
    }
  };

  async function fetchMedicos() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:3000/getMedico', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Erro ao buscar médicos');

      const data = await response.json();
      const medicosFormatados = data.map(m => ({
        ...m,
        id: m.id_medico,
        diasAtendimento: [],
      }));
      setMedicos(medicosFormatados);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  }

  useEffect(() => {
    fetchMedicos();
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <PopupHorario
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          onConfirm={handleConfirmarHorario}
        />

        <NewDayPopup 
          isOpen={showAddDayPopup}
          onClose={() => setShowAddDayPopup(false)}
          onConfirm={handleConfirmAddDay}
          dayToAdd={dayToAdd}
          setDayToAdd={setDayToAdd}
        />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#00565e]">Gestão de Horários | Médicos</h1>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="w-full">
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
                  setMedicoNome("");
                  setMedicoCRM("");
                  setMedicoEspecializacao("");
                  setMedicoNotas("");
                  setEditandoMedico(null);
                  setMostrarFormMedico(true);
                }}
                className="bg-[#008E9A] hover:bg-[#006670] text-white font-bold py-2 px-4 rounded-lg transition duration-200 w-full sm:w-auto"
              >
                + Médico
              </button>
            </div>
          </div>
          {mostrarFormMedico && (
            <div className="mb-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#00565e] mb-4">
                {editandoMedico ? "Editar Médico" : "Cadastrar Novo Médico"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                  <input
                    type="text"
                    className={`w-full border ${erros.nome ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                    value={medicoNome}
                    onChange={(e) => {
                      setMedicoNome(e.target.value);
                      setErros({ ...erros, nome: "" });
                    }}
                  />
                  {erros.nome && <p className="text-red-500 text-xs mt-1">{erros.nome}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CRM *</label>
                  <input
                    type="text"
                    className={`w-full border ${erros.crm ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                    value={medicoCRM}
                    onChange={(e) => {
                      setMedicoCRM(e.target.value);
                      setErros({ ...erros, crm: "" });
                    }}
                  />
                  {erros.crm && <p className="text-red-500 text-xs mt-1">{erros.crm}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Especialização *</label>
                  <input
                    type="text"
                    className={`w-full border ${erros.especializacao ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                    value={medicoEspecializacao}
                    onChange={(e) => {
                      setMedicoEspecializacao(e.target.value);
                      setErros({ ...erros, especializacao: "" });
                    }}
                  />
                  {erros.especializacao && <p className="text-red-500 text-xs mt-1">{erros.especializacao}</p>}
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows="2"
                    value={medicoNotas}
                    onChange={(e) => setMedicoNotas(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setMostrarFormMedico(false);
                    setEditandoMedico(null);
                    setMedicoNome("");
                    setMedicoCRM("");
                    setMedicoEspecializacao("");
                    setMedicoNotas("");
                    setErros({ nome: "", crm: "", especializacao: "" });
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddOrUpdateMedico}
                  className="bg-[#008E9A] hover:bg-[#006670] text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                >
                  {editandoMedico ? "Atualizar" : "Cadastrar"}
                </button>
              </div>
            </div>
          )}
          <div className="space-y-8">
            {medicosFiltrados.map(medico => (
              <div key={medico.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#008E9A] p-4 text-white">
                  <div className="flex justify-between items-start flex-wrap">
                    <div>
                      <h2 className="text-xl font-bold">{medico.nome}</h2>
                      <p className="text-sm">CRM: {medico.crm} • {medico.especializacao}</p>
                      {medico.notas && <p className="text-xs mt-1 italic">{medico.notas}</p>}
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap justify-end">
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
                        onClick={() => abrirConfirmDelete(medico)}
                        className="bg-white text-red-500 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                        title="Remover médico"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleAddDiaAtendimentoClick(medico.id)}
                        className="bg-white text-[#008E9A] px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                        title="Adicionar dia"
                      >
                        + Dia
                      </button>
                    </div>
                  </div>
                </div>

                {showConfirmDelete && (
                  <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">Confirmar exclusão</h3>
                        <p className="mb-6">Tem certeza que deseja remover o médico <strong>{medicoParaDeletar?.nome}</strong>?</p>
                          <div className="flex justify-end gap-4">
                            <button
                              onClick={() => {
                                setShowConfirmDelete(false);
                                setMedicoParaDeletar(null);
                              }}
                              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={handleDeleteMedico}
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Deletar
                            </button>
                      </div>
                    </div>
                  </div>
                )}


                <div className="p-4 sm:p-6">
                  {(medico.diasAtendimento || []).map((dia, diaIndex) => (
                    <div key={`${medico.id}-${diaIndex}`} className="mb-6 last:mb-0 border-b pb-4 last:border-b-0">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {dia.dia} - {dia.data}
                        </h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openPopupHorario(medico.id, diaIndex)}
                            className="text-[#008E9A] text-sm font-medium hover:text-[#006670] flex items-center gap-1"
                            title="Adicionar horário personalizado"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Horário
                          </button>
                          <button
                            onClick={() => handleAddStandardHours(medico.id, diaIndex)}
                            className="text-blue-500 text-sm font-medium hover:text-blue-700 flex items-center gap-1"
                            title="Adicionar horários padrão"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Padrão
                          </button>
                        </div>
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