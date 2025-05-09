import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import PropTypes from 'prop-types';

export default function PopupHorario({ isOpen, onClose, onConfirm }) {
  const [horario, setHorario] = useState('');
  const [erro, setErro] = useState('');

  const validarHorario = (hora) => {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(hora);
  };

  const handleSubmit = () => {
    if (!validarHorario(horario)) {
      setErro('Formato inválido. Use HH:MM (ex: 14:30)');
      return;
    }

    onConfirm(horario);
    setHorario('');
    setErro('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-[#00565e] mb-4">
            Adicionar Novo Horário
          </Dialog.Title>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horário (HH:MM)
            </label>
            <input
              type="text"
              placeholder="Ex: 14:30"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#008E9A] focus:border-[#008E9A] outline-none"
              value={horario}
              onChange={(e) => {
                setHorario(e.target.value);
                setErro('');
              }}
            />
            {erro && <p className="text-red-500 text-xs mt-1">{erro}</p>}
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

PopupHorario.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};