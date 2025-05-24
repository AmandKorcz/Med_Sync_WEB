import { useState } from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Med_1 from "../assets/image/Med_1.jpg";
import Med_2 from "../assets/image/Med_2.jpg";
import Popup from "../components/Popup.jsx";
import DoctorCard from "../components/DoctorCard.jsx";
import ScheduleCalendar from "../components/ScheduleCalendar.jsx";

function Atendimento() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [agendamentoInfo, setAgendamentoInfo] = useState({
    medico: '',
    data: '',
    horario: ''
  });

  const busySlots = [
    { date: '24/05/2025', time: '08:00' },
    { date: '24/05/2025', time: '09:20' }
  ];

  const doctors = [
    {
      id: 1,
      name: "Dra. Eduarda Do Nascimento",
      shortName: "Dra. Eduarda",
      crm: "CRM/SC - 26580",
      specialty: "Dermatologista",
      image: Med_2,
    },
    {
      id: 2,
      name: "Dra. Maria Luana",
      shortName: "Dra. Maria",
      crm: "CRM/SC - 25687",
      specialty: "Pediatra",
      image: Med_1,
    }
  ];

  const handleAgendar = (medico, data, horario) => {
    setAgendamentoInfo({ medico, data, horario });
    setShowPopup(true);
  };

  const handleClosePopup = () => setShowPopup(false);

  const handleSelectDoctor = (doctor) => setSelectedDoctor(doctor);

  const handleBackToList = () => setSelectedDoctor(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-28 mb-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#00565e] mb-4">
          Profissionais <span className="text-teal-500">MedSync</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Agende sua consulta assecando os horários disponiveis de cada especialista!
          </p>
        </section>
        {!selectedDoctor ? (
          <section className="flex justify-center mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {doctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} onSchedule={handleSelectDoctor} />
              ))}
            </div>
          </section>
        ) : (
          <section className="flex justify-center mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <DoctorCard doctor={selectedDoctor} onSchedule={() => handleAgendar(selectedDoctor.name, 'Data a confirmar', 'Horário a confirmar')} />
              <ScheduleCalendar doctor={selectedDoctor} onSchedule={handleAgendar} onBack={handleBackToList} busySlots={busySlots} />
            </div>
          </section>
        )}
      </main>

        <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5547984747598"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition duration-300"
          aria-label="Conversar no WhatsApp"
          
        >
          <svg
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      <Footer />

      {showPopup && (
        <Popup
          medico={agendamentoInfo.medico}
          data={agendamentoInfo.data}
          horario={agendamentoInfo.horario}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default Atendimento;
