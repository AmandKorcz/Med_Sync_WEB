import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const getWeekdayName = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('pt-BR', { weekday: 'long' }).toUpperCase();
};

export default function NewDayPopup({ isOpen, onClose, onConfirm, setDayToAdd }) {
  const [selectedDate, setSelectedDate] = useState(null); 
  const [localWeekday, setLocalWeekday] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(null);
      setLocalWeekday('');
      setError('');
    }
  }, [isOpen]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = formatDate(date);
      const weekdayName = getWeekdayName(date);
      setLocalWeekday(weekdayName);
      setDayToAdd({ date: formattedDate, weekday: weekdayName });
    } else {
      setLocalWeekday('');
      setDayToAdd({ date: '', weekday: '' });
    }
    setError('');
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      setError('Por favor, selecione uma data.');
      return;
    }

    const formattedDate = formatDate(selectedDate);
    const weekdayName = getWeekdayName(selectedDate);

    onConfirm({
      dia: weekdayName,
      data: formattedDate,
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-[#00565e] mb-4">
            Adicionar Novo Dia de Atendimento
          </Dialog.Title>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione uma data"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#008E9A] focus:border-[#008E9A] outline-none"
              minDate={new Date()} 
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dia da Semana
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              value={localWeekday}
              readOnly
              disabled
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#008E9A] hover:bg-[#006670] text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Adicionar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

NewDayPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  setDayToAdd: PropTypes.func.isRequired,
};