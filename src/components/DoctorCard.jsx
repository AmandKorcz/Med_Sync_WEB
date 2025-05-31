import PropTypes from 'prop-types';

const DoctorCard = ({ doctor, onSchedule }) => {
  return (
    <div className="w-64 bg-gray-100 rounded-xl shadow-xl overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative group h-96">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col gap-2">
          <span className="text-white font-bold text-lg">{doctor.shortName}</span>
          <span className="text-sm text-gray-300">{doctor.crm} — {doctor.specialty}</span>
          <h3 className="text-md font-semibold text-white">{doctor.name}</h3>
          <button
            onClick={() => onSchedule(doctor)}
            className="mt-2 bg-[#00B4C6] hover:bg-[#00D6F0] text-white font-semibold py-2 px-4 rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00B4C6] text-sm"
          >
            Ver Horários
          </button>
        </div>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired,
    crm: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
  }).isRequired,
  onSchedule: PropTypes.func.isRequired,
};

export default DoctorCard;