import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const MedicalContext = createContext();

export const useMedical = () => {
  return useContext(MedicalContext);
};

export const MedicalProvider = ({ children }) => {
  const [medicos, setMedicos] = useState([
    {
      id: 1,
      crm: "26580-SC",
      nome: "Dra. Eduarda Do Nascimento",
      especializacao: "Dermatologista",
      image: 'src/assets/image/Med_2.jpg',
      diasAtendimento: [
        {
          dia: "SEXTA-FEIRA",
          data: "31/05/2025",
          horarios: [
            { id: 1, hora: "11:30", paciente: "", status: "disponivel" },
            { id: 2, hora: "17:10", paciente: "", status: "disponivel" },
            { id: 3, hora: "18:10", paciente: "", status: "disponivel" },
            { id: 4, hora: "19:10", paciente: "Luiza Helena De Souza", status: "agendado" }
          ]
        },
        {
          dia: "SÁBADO",
          data: "01/06/2025",
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
      image: 'src/assets/image/Med_1.jpg',
      diasAtendimento: [
        {
          dia: "SEXTA-FEIRA",
          data: "31/05/2025",
          horarios: [
            { id: 7, hora: "11:30", paciente: "", status: "disponivel" },
            { id: 8, hora: "17:10", paciente: "", status: "disponivel" },
            { id: 9, hora: "18:10", paciente: "", status: "disponivel" },
            { id: 10, hora: "19:10", paciente: "Gustavo Korczagin", status: "agendado" }
          ]
        },
        {
          dia: "DOMINGO",
          data: "02/06/2025",
          horarios: [
            { id: 11, hora: "09:00", paciente: "", status: "disponivel" },
          ]
        }
      ],
      notas: "Especialista em pediatria geral"
    }
  ]);

  const scheduleAppointment = (medicoNome, data, horario, nomePaciente) => {
    setMedicos(prevMedicos => {
      return prevMedicos.map(medico => {
        if (medico.nome === medicoNome) {
          const novosDiasAtendimento = medico.diasAtendimento.map(dia => {
            if (dia.data === data) {
              const novosHorarios = dia.horarios.map(slot => {
                if (slot.hora === horario && slot.status === "disponivel") {
                  return { ...slot, paciente: nomePaciente, status: "agendado" };
                }
                return slot;
              });
              return { ...dia, horarios: novosHorarios };
            }
            return dia;
          });
          return { ...medico, diasAtendimento: novosDiasAtendimento };
        }
        return medico;
      });
    });
  };

  const addMedico = (novoMedico) => {
    setMedicos(prevMedicos => [...prevMedicos, { ...novoMedico, id: prevMedicos.length ? Math.max(...prevMedicos.map(m => m.id)) + 1 : 1 }]);
  };

  const updateMedico = (updatedMedico) => {
    setMedicos(prevMedicos => prevMedicos.map(medico => medico.id === updatedMedico.id ? updatedMedico : medico));
  };

  const deleteMedico = (medicoId) => {
    setMedicos(prevMedicos => prevMedicos.filter(medico => medico.id !== medicoId));
  };

  const deleteHorario = (medicoId, diaIndex, horarioId) => {
    setMedicos(prevMedicos => prevMedicos.map(medico => {
      if (medico.id === medicoId) {
        const novosDias = [...medico.diasAtendimento];
        novosDias[diaIndex] = {
          ...novosDias[diaIndex],
          horarios: novosDias[diaIndex].horarios.filter(h => h.id !== horarioId)
        };
        return { ...medico, diasAtendimento: novosDias };
      }
      return medico;
    }));
  };

  const updatePacienteInHorario = (medicoId, diaIndex, horarioIndex, nomePaciente) => {
    setMedicos(prevMedicos => prevMedicos.map(medico => {
      if (medico.id === medicoId) {
        const novosDias = [...medico.diasAtendimento];
        const novosHorarios = [...novosDias[diaIndex].horarios];
        novosHorarios[horarioIndex] = {
          ...novosHorarios[horarioIndex],
          paciente: nomePaciente,
          status: nomePaciente ? "agendado" : "disponivel"
        };
        novosDias[diaIndex] = { ...novosDias[diaIndex], horarios: novosHorarios };
        return { ...medico, diasAtendimento: novosDias };
      }
      return medico;
    }));
  };

  const addHorario = (medicoId, diaIndex, novaHora) => {
    setMedicos(prevMedicos => prevMedicos.map(medico => {
      if (medico.id === medicoId) {
        const novosDias = [...medico.diasAtendimento];
        const currentHorarios = novosDias[diaIndex].horarios;

        if (!currentHorarios.some(h => h.hora === novaHora)) {
          novosDias[diaIndex] = {
            ...novosDias[diaIndex],
            horarios: [...currentHorarios, { id: Date.now() + Math.random(), hora: novaHora, paciente: "", status: "disponivel" }]
          };
        }
        return { ...medico, diasAtendimento: novosDias };
      }
      return medico;
    }));
  };

  const addDiaAtendimento = (medicoId, diaDaSemana, dataDia) => {
    setMedicos(prevMedicos => prevMedicos.map(medico => {
      if (medico.id === medicoId) {
        const novoDia = {
          dia: diaDaSemana,
          data: dataDia,
          horarios: []
        };
        if (!medico.diasAtendimento.some(d => d.data === dataDia)) {
          return {
            ...medico,
            diasAtendimento: [...medico.diasAtendimento, novoDia].sort((a, b) => {
              const [d1, m1, y1] = a.data.split('/').map(Number);
              const [d2, m2, y2] = b.data.split('/').map(Number);
              const dateA = new Date(y1, m1 - 1, d1);
              const dateB = new Date(y2, m2 - 1, d2);
              return dateA - dateB;
            })
          };
        }
      }
      return medico;
    }));
  };

  return (
    <MedicalContext.Provider value={{
      medicos,
      scheduleAppointment,
      addMedico,
      updateMedico,
      deleteMedico,
      deleteHorario,
      updatePacienteInHorario,
      addHorario,
      addDiaAtendimento
    }}>
      {children}
    </MedicalContext.Provider>
  );
};

MedicalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};