import PropTypes from 'prop-types';
import { useState } from 'react';

const Popup = ({ medico, data, horario, onClose, onContact }) => {
  const valorConsulta = "R$280,00";
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);
  const [mostrarOpcoesPagamento, setMostrarOpcoesPagamento] = useState(false);

  const formasPagamento = [
    { id: 1, nome: 'Cartão de Crédito', icone: '💳' },
    { id: 2, nome: 'PIX', icone: '🧾' },
    { id: 3, nome: 'Boleto Bancário', icone: '📄' }
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
    onContact && onContact();
  };

  const selecionarPagamento = (forma) => {
    setPagamentoSelecionado(forma);
    setMostrarOpcoesPagamento(false);
  };

  const styles = {
    popupContainer: "fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-sm",
    popupContent: "bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in transform transition-all",
    title: "text-2xl font-bold text-[#00565e] mb-4 text-center",
    detailsContainer: "mb-6 p-5 bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] rounded-xl space-y-3 border border-[#e1e8ed]",
    detailItem: "flex justify-between",
    detailLabel: "font-medium text-[#4b5563]",
    detailValue: "text-[#1f2937]",
    valorConsulta: "text-xl font-bold text-[#00565e]",
    sectionTitle: "text-lg font-semibold text-[#008E9A] mb-3",
    paymentButton: "flex items-center gap-3 bg-white hover:bg-[#f0f9ff] text-gray-800 py-3 px-4 rounded-lg text-left transition-all border border-[#e1e8ed] hover:border-[#008E9A] shadow-sm",
    selectedPayment: "bg-[#008E9A] text-black border-[#008E9A] hover:bg-[#008E9A]",
    paymentOptions: "flex flex-col gap-3 mt-2 animate-fade-in",
    whatsappButton: "flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-lg w-full transition-all shadow-md hover:shadow-lg",
    closeButton: "bg-white hover:bg-gray-100 text-[#008E9A] font-medium py-2.5 px-4 rounded-lg w-full transition-all border-2 border-[#008E9A] hover:border-[#006E7A]",
    errorText: "text-sm text-red-500 mt-2 text-center",
    paymentIcon: "text-black",
  
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <h2 className={styles.title}>Confirme seu agendamento</h2>
        
        <div className={styles.detailsContainer}>
          <p className="font-semibold text-[#008E9A] mb-2">Detalhes do agendamento</p>
          <div className="space-y-3">
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Médico:</span>
              <span className={styles.detailValue}>{medico}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Data:</span>
              <span className={styles.detailValue}>{data}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Horário:</span>
              <span className={styles.detailValue}>{horario}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Valor:</span>
              <span className={styles.valorConsulta}>{valorConsulta}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className={styles.sectionTitle}>
            Selecione a forma de pagamento
          </h3>
          
          {!mostrarOpcoesPagamento ? (
            <button 
              onClick={() => setMostrarOpcoesPagamento(true)}
              className={`${styles.paymentButton} ${pagamentoSelecionado ? styles.selectedPayment : ''}`}
            >
              {pagamentoSelecionado ? (
                <>
                  <span className={styles.paymentIcon}>{pagamentoSelecionado.icone}</span>
                  {pagamentoSelecionado.nome}
                </>
              ) : (
                'Clique para selecionar'
              )}
            </button>
          ) : (
            <div className={styles.paymentOptions}>
              {formasPagamento.map((forma) => (
                <button 
                  key={forma.id}
                  onClick={() => selecionarPagamento(forma)}
                  className={styles.paymentButton}
                >
                  <span className={styles.paymentIcon}>{forma.icone}</span>
                  {forma.nome}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className={styles.sectionTitle}>Finalizar agendamento</h3>
          <button 
            onClick={handleWhatsAppClick}
            className={styles.whatsappButton}
            disabled={!pagamentoSelecionado}
          >
            <WhatsAppIcon />
            {pagamentoSelecionado ? 'Confirmar via WhatsApp' : 'Selecione o pagamento'}
          </button>
          {!pagamentoSelecionado && (
            <p className={styles.errorText}>Por favor, selecione uma forma de pagamento</p>
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

Popup.propTypes = {
  medico: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  horario: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onContact: PropTypes.func
};

export default Popup;