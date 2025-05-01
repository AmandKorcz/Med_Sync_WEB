import PropTypes from 'prop-types';
import { useState } from 'react';

const Popup = ({ medico, data, horario, onClose, onContact }) => {
  const valorConsulta = "R$280,00";
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);
  const [mostrarOpcoesPagamento, setMostrarOpcoesPagamento] = useState(false);

  const formasPagamento = [
    { id: 1, nome: 'Cartão de Crédito' },
    { id: 2, nome: 'PIX' },
    { id: 3, nome: 'Boleto Bancário' }
  ];

  const handleWhatsAppClick = () => {
    let message = `Olá, gostaria de confirmar meu agendamento com ${medico} no dia ${data} às ${horario}\n`;
    message += `Valor da consulta: ${valorConsulta}\n`;
    
    if (pagamentoSelecionado) {
      message += `Forma de pagamento selecionada: ${pagamentoSelecionado.nome}`;
    } else {
      message += `Forma de pagamento: A definir`;
    }

    const phoneNumber = "5547984747598";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onContact();
  };

  const selecionarPagamento = (forma) => {
    setPagamentoSelecionado(forma);
    setMostrarOpcoesPagamento(false);
  };

  const styles = {
    paymentButton: "bg-[#f0f0f0] hover:bg-[#e0e0e0] text-gray-800 py-2 px-4 rounded-lg text-left transition-colors",
    whatsappButton: "flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-4 rounded-lg w-full transition-colors",
    closeButton: "bg-[#008E9A] hover:bg-[#006E7A] text-white font-medium py-2 px-4 rounded-lg w-full transition-colors",
    selectedPayment: "bg-[#008E9A] text-white font-medium",
    valorConsulta: "text-lg font-bold text-[#00565e]"
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-[#00565e] mb-4">Dê continuidade em seu agendamento!</h2>
        
        <div className="mb-6 p-4 bg-gray-100 rounded-lg space-y-2">
          <p className="font-semibold">Detalhes do agendamento:</p>
          <div className="space-y-1">
            <p className="text-lg"><span className="font-medium">Médico:</span> {medico}</p>
            <p className="text-lg"><span className="font-medium">Data:</span> {data}</p>
            <p className="text-lg"><span className="font-medium">Horário:</span> {horario}</p>
            <p className={styles.valorConsulta}><span className="font-medium">Valor:</span> {valorConsulta}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#008E9A] mb-2">
            Realize o pagamento total ou parcial da consulta
          </h3>
          
          {!mostrarOpcoesPagamento ? (
            <button 
              onClick={() => setMostrarOpcoesPagamento(true)}
              className={`${styles.paymentButton} ${pagamentoSelecionado ? styles.selectedPayment : ''}`}
            >
              {pagamentoSelecionado ? pagamentoSelecionado.nome : 'Selecione a forma de pagamento'}
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              {formasPagamento.map((forma) => (
                <button 
                  key={forma.id}
                  onClick={() => selecionarPagamento(forma)}
                  className={styles.paymentButton}
                >
                  {forma.nome}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#008E9A] mb-2">Mais informações</h3>
          <button 
            onClick={handleWhatsAppClick}
            className={styles.whatsappButton}
            disabled={!pagamentoSelecionado}
          >
            <WhatsAppIcon />
            {pagamentoSelecionado ? 'CONFIRMAR AGENDAMENTO' : 'SELECIONE UMA FORMA DE PAGAMENTO'}
          </button>
          {!pagamentoSelecionado && (
            <p className="text-sm text-red-500 mt-2">Por favor, selecione uma forma de pagamento</p>
          )}
        </div>

        <button 
          onClick={onClose}
          className={styles.closeButton}
        >
          Voltar para horários
        </button>
      </div>
    </div>
  );
};

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.435l-.01.008c-.01.008-.01.008-.02.008h-.02s-.01 0-.02-.008l-.01-.008v-.008s0-.008.01-.008l.02-.008.02.008s.01.008.01.008l.01.008v.008z"/>
    <path d="M12 0a12 12 0 00-12 12 12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm0 22a10 10 0 1110-10 10 10 0 01-10 10z"/>
  </svg>
);

// Validação de props
Popup.propTypes = {
  medico: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  horario: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onContact: PropTypes.func.isRequired
};

export default Popup;