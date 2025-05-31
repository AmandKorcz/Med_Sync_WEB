import { useState } from 'react';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import PopupHorario from "../components/PopupHorario.jsx";
import NewDayPopup from "../components/NewDayPopup.jsx";
import { useMedical } from '../contexts/MedicalContext.jsx';
import { generateTimeSlots } from '../assets/Utils/scheduleUtils.js';

function Gerenciamento() {
  const {
    medicos,
    addMedico,
    updateMedico,
    deleteMedico,
    deleteHorario,
    updatePacienteInHorario,
    addHorario,
    addDiaAtendimento
  } = useMedical();

  const [showPopup, setShowPopup] = useState(false); 
  const [showAddDayPopup, setShowAddDayPopup] = useState(false); 
  const [currentMedicoId, setCurrentMedicoId] = useState(null);
  const [currentDiaIndex, setCurrentDiaIndex] = useState(null); 
  const [dayToAdd, setDayToAdd] = useState({ date: '', weekday: '' }); 

  const [editandoMedico, setEditandoMedico] = useState(null);
  const [mostrarFormMedico, setMostrarFormMedico] = useState(false);

  const [formMedico, setFormMedico] = useState({
    nome: "",
    crm: "",
    especializacao: "",
    notas: "",
    image: ""
  });
  const [erros, setErros] = useState({
    nome: "",
    crm: "",
    especializacao: ""
  });

  const [filtro, setFiltro] = useState("");

  const handleAddOrUpdateMedico = () => {
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

    setErros(novosErros);

    if (valido) {
      if (editandoMedico) {
        updateMedico({ ...editandoMedico, ...formMedico });
      } else {
        addMedico({ ...formMedico, diasAtendimento: [] });
      }

      setFormMedico({ nome: "", crm: "", especializacao: "", notas: "", image: "" });
      setEditandoMedico(null);
      setMostrarFormMedico(false);
    }
  };

  const handleEditMedico = (medico) => {
    setFormMedico({
      nome: medico.nome,
      crm: medico.crm,
      especializacao: medico.especializacao,
      notas: medico.notas || "",
      image: medico.image || ""
    });
    setEditandoMedico(medico);
    setMostrarFormMedico(true);
  };

  const handleDeleteMedico = (medicoId) => {
    deleteMedico(medicoId);
  };

  const handleDeleteHorario = (medicoId, diaIndex, horarioId) => {
    deleteHorario(medicoId, diaIndex, horarioId);
  };

  const handleAddPaciente = (medicoId, diaIndex, horarioIndex, nome) => {
    updatePacienteInHorario(medicoId, diaIndex, horarioIndex, nome);
  };

  const handleAddHorario = (medicoId, diaIndex, novaHora) => {
    addHorario(medicoId, diaIndex, novaHora);
  };

  const openPopupHorario = (medicoId, diaIndex) => {
    setCurrentMedicoId(medicoId);
    setCurrentDiaIndex(diaIndex);
    setShowPopup(true);
  };

  const handleConfirmarHorario = (horario) => {
    handleAddHorario(currentMedicoId, currentDiaIndex, horario);
  };

  const handleAddDiaAtendimentoClick = (medicoId) => {
    setCurrentMedicoId(medicoId);
    setShowAddDayPopup(true);
    setDayToAdd({ date: '', weekday: '' }); 
  };

  const handleConfirmAddDay = () => {
    if (!dayToAdd.date || !dayToAdd.weekday) {
      alert("Por favor, selecione a data e o dia da semana.");
      return;
    }
    addDiaAtendimento(currentMedicoId, dayToAdd.weekday, dayToAdd.date);
    setShowAddDayPopup(false);
  };

  const handleAddStandardHours = (medicoId, diaIndex) => {
    const standardSlots = generateTimeSlots();
    standardSlots.forEach(hora => {
      // Verifica se o horário já existe antes de adicionar para evitar duplicatas
      const medico = medicos.find(m => m.id === medicoId);
      const dia = medico?.diasAtendimento[diaIndex];
      const horarioExists = dia?.horarios.some(h => h.hora === hora);

      if (!horarioExists) {
        addHorario(medicoId, diaIndex, hora);
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormMedico({ ...formMedico, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormMedico({ ...formMedico, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const medicosFiltrados = medicos.filter(medico =>
    medico.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    medico.crm.toLowerCase().includes(filtro.toLowerCase()) ||
    medico.especializacao.toLowerCase().includes(filtro.toLowerCase())
  );

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
            <h1 className="text-2xl sm:text-3xl font-bold text-[#00565e]">Gestão de Horários Médicos</h1>

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
                  setFormMedico({ nome: "", crm: "", especializacao: "", notas: "", image: "" });
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
                    value={formMedico.nome}
                    onChange={(e) => {
                      setFormMedico({...formMedico, nome: e.target.value});
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
                    value={formMedico.crm}
                    onChange={(e) => {
                      setFormMedico({...formMedico, crm: e.target.value});
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
                    value={formMedico.especializacao}
                    onChange={(e) => {
                      setFormMedico({...formMedico, especializacao: e.target.value});
                      setErros({...erros, especializacao: ""});
                    }}
                  />
                  {erros.especializacao && <p className="text-red-500 text-xs mt-1">{erros.especializacao}</p>}
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foto do Médico</label>
                  <div
                    className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload-input').click()}
                  >
                    <input
                      id="file-upload-input"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {formMedico.image ? (
                      <img src={formMedico.image} alt="Pré-visualização" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L7 9m3-3 3 3"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">Clique para fazer upload</span> ou arraste e solte</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou GIF (MAX. 800x400px)</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-1">
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
                    setFormMedico({ nome: "", crm: "", especializacao: "", notas: "", image: "" });
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
                        onClick={() => handleDeleteMedico(medico.id)}
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

                <div className="p-4 sm:p-6">
                  {medico.diasAtendimento.map((dia, diaIndex) => (
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