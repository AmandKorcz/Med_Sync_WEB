import PropTypes from 'prop-types';
import { generateTimeSlots, generateWeekDays } from '../assets/Utils/scheduleUtils.js';

const ScheduleCalendar = ({ doctor, onSchedule, onBack, busySlots = [] }) => {
  const daysOfWeek = generateWeekDays();
  const timeSlots = generateTimeSlots();

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
              {daysOfWeek.map((day, index) => (
                <th key={index} className="py-4 px-6 border-b border-gray-600 text-center text-white">
                  {day.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, rowIndex) => (
              <tr key={rowIndex}>
                {daysOfWeek.map((day, colIndex) => {
                  const dateStr = day.toLocaleDateString('pt-BR');
                  const isBusy = busySlots.some(slot => slot.date === dateStr && slot.time === time);

                  return (
                    <td key={colIndex} className="py-3 px-5 border-b border-gray-700 text-center">
                      {isBusy ? (
                        <span className="bg-red-600 text-white py-1 px-2 rounded-lg text-xs">Ocupado</span>
                      ) : (
                        <button
                          onClick={() => onSchedule(doctor.name, dateStr, time)}
                          className="bg-[#e0f7f9] hover:bg-[#008E9A] hover:text-white text-[#008E9A] font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm"
                        >
                          {time}
                        </button>
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
  }).isRequired,
  onSchedule: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  busySlots: PropTypes.array,
};

export default ScheduleCalendar;
