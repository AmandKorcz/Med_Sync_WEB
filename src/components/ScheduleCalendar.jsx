import PropTypes from 'prop-types';

const ScheduleCalendar = ({ doctor, onSchedule, onBack }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  // Filtra os dias de atendimento para incluir apenas a partir de hoje
  const futureDaysAtendimento = doctor.diasAtendimento.filter(day => {
    const [d, m, y] = day.data.split('/').map(Number);
    const dayDate = new Date(y, m - 1, d);
    return dayDate >= today;
  });

  // Extrair todos os horários únicos dos dias futuros
  const allUniqueTimes = Array.from(
    new Set(
      futureDaysAtendimento.flatMap(day =>
        day.horarios.map(slot => slot.hora)
      )
    )
  ).sort((a, b) => {
    const [ha, ma] = a.split(':').map(Number);
    const [hb, mb] = b.split(':').map(Number);
    if (ha !== hb) return ha - hb;
    return ma - mb;
  });

  if (futureDaysAtendimento.length === 0 || allUniqueTimes.length === 0) {
    return (
      <div className="w-full max-w-6xl p-6 bg-[#086068] rounded-xl shadow-2xl text-white text-center">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-[#e0f7f9] hover:text-white transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar
        </button>
        <h4 className="text-2xl font-bold text-gray-100 mb-6">
          Horários disponíveis para {doctor.shortName}
        </h4>
        <p className="text-lg">Nenhum horário disponível para os próximos dias.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl p-6 bg-[#086068] rounded-xl shadow-2xl">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-[#e0f7f9] hover:text-white transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Voltar
      </button>

      <h4 className="text-2xl font-bold text-gray-100 mb-6">
        Horários disponíveis para {doctor.shortName}
      </h4>

      <div className="overflow-x-auto">
        <table className="w-full bg-[#03484E] border border-gray-700 rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#007b87]">
              {futureDaysAtendimento.map((day, index) => (
                <th key={index} className="py-4 px-6 border-b border-gray-600 text-center text-white">
                  {day.dia} - {day.data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allUniqueTimes.map((time, rowIndex) => (
              <tr key={rowIndex}>
                {futureDaysAtendimento.map((day, colIndex) => {
                  const currentSlot = day.horarios.find(slot => slot.hora === time);
                  const isBusy = currentSlot && currentSlot.status === "agendado";
                  const isAvailable = currentSlot && currentSlot.status === "disponivel";

                  const [slotHour, slotMinute] = time.split(':').map(Number);
                  const [dayD, dayM, dayY] = day.data.split('/').map(Number);
                  const slotDateTime = new Date(dayY, dayM - 1, dayD, slotHour, slotMinute);

                  const isPastTime = slotDateTime < new Date(); // Compara com a data/hora atual

                  return (
                    <td key={colIndex} className="py-3 px-5 border-b border-gray-700 text-center">
                      {isPastTime && slotDateTime.toDateString() === new Date().toDateString() ? ( // Apenas se for o dia de hoje e o horário já passou
                        <span className="bg-gray-700 text-white py-1 px-2 rounded-lg text-xs opacity-70">Passado</span>
                      ) : isBusy ? (
                        <span className="bg-red-600 text-white py-1 px-2 rounded-lg text-xs">Ocupado</span>
                      ) : isAvailable ? (
                        <button
                          onClick={() => onSchedule(doctor.name, day.data, time)}
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm"
                        >
                          {time}
                        </button>
                      ) : (
                        <span className="text-gray-500 text-xs">--</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ScheduleCalendar.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired,
    diasAtendimento: PropTypes.array.isRequired,
  }).isRequired,
  onSchedule: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ScheduleCalendar;