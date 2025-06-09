import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.435l-.01.008c-.01.008-.01.008-.02.008h-.02s-.01 0-.02-.008l-.01-.008v-.008s0-.008.01-.008l.02-.008.02.008s.01.008.01.008l.01.008v.008z"/>
    <path d="M12 0a12 12 0 00-12 12 12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm0 22a10 10 0 1110-10 10 10 0 01-10 10z"/>
  </svg>
);

const AgendamentoPopup = ({ isOpen, onClose, onConfirmBooking, medico, data, horario: initialHorario }) => {
  const valorConsulta = "R$280,00";

  const [horario, setHorario] = useState(initialHorario || '');
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [cpfOuRgResponsavel, setCpfOuRgResponsavel] = useState('');
  const [telefoneResponsavel, setTelefoneResponsavel] = useState('');
  const [emailResponsavel, setEmailResponsavel] = useState('');
  const [nomePaciente, setNomePaciente] = useState('');
  const [idadePaciente, setIdadePaciente] = useState('');
  const [convenio, setConvenio] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);
  const [mostrarOpcoesPagamento, setMostrarOpcoesPagamento] = useState(false);
  const [setErroHorario] = useState(''); 
  const [erroNomeResponsavel, setErroNomeResponsavel] = useState('');
  const [erroCpfOuRgResponsavel, setErroCpfOuRgResponsavel] = useState('');
  const [erroTelefoneResponsavel, setErroTelefoneResponsavel] = useState('');
  const [erroNomePaciente, setErroNomePaciente] = useState('');
  const [erroIdadePaciente, setErroIdadePaciente] = useState('');
  const [erroPagamento, setErroPagamento] = useState('');

  useEffect(() => {
    setHorario(initialHorario || '');
  }, [initialHorario]);

  const formasPagamento = [
    { id: 1, nome: 'Cartão de Crédito', icone: '💳' },
    { id: 2, nome: 'PIX', icone: '🧾' },
    { id: 3, nome: 'Boleto Bancário', icone: '📄' }
  ];

  const validarHorario = (hora) => {
    const regex = /^([0-1]?[0-9]|2?[0-3]):([0-5]?[0-9])$/;
    return regex.test(hora);
  };

  const handleConfirmClick = () => {
    let valido = true;

    if (!nomeResponsavel.trim()) {
      setErroNomeResponsavel("O nome do responsável é obrigatório.");
      valido = false;
    } else {
      setErroNomeResponsavel("");
    }

    if (!cpfOuRgResponsavel.trim()) {
        setErroCpfOuRgResponsavel("CPF ou RG do responsável é obrigatório.");
        valido = false;
    } else {
        setErroCpfOuRgResponsavel("");
    }

    if (!telefoneResponsavel.trim() || !/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(telefoneResponsavel)) {
        setErroTelefoneResponsavel("Por favor, digite um telefone válido.");
        valido = false;
    } else {
        setErroTelefoneResponsavel("");
    }

    if (!nomePaciente.trim()) {
      setErroNomePaciente("O nome do paciente é obrigatório.");
      valido = false;
    } else {
      setErroNomePaciente("");
    }

    const idadeNum = parseInt(idadePaciente);
    if (isNaN(idadeNum) || idadeNum <= 0 || idadeNum > 120) {
      setErroIdadePaciente("Por favor, digite uma idade válida para o paciente.");
      valido = false;
    } else {
      setErroIdadePaciente("");
    }

    if (!validarHorario(horario)) {
      setErroHorario('Formato inválido. Use HH:MM (ex: 14:30)');
      valido = false;
    } else {
      setErroHorario('');
    }

    if (!pagamentoSelecionado) {
      setErroPagamento("Por favor, selecione uma forma de pagamento.");
      valido = false;
    } else {
      setErroPagamento("");
    }

    if (valido) {
      onConfirmBooking({ medico, data, horario, nomeResponsavel, cpfOuRgResponsavel, telefoneResponsavel, emailResponsavel, nomePaciente, idadePaciente, convenio, observacoes, pagamento: pagamentoSelecionado.nome });

      let message = `Olá, gostaria de confirmar meu agendamento com ${medico} no dia ${data} às ${horario}.\n`;
      message += `*DADOS DO RESPONSÁVEL:*\n`;
      message += `Nome: ${nomeResponsavel}\n`;
      message += `CPF/RG: ${cpfOuRgResponsavel}\n`;
      message += `Telefone: ${telefoneResponsavel}\n`;
      if (emailResponsavel) message += `Email: ${emailResponsavel}\n`;
      message += `\n*DADOS DO PACIENTE:*\n`;
      message += `Nome: ${nomePaciente}\n`;
      message += `Idade: ${idadePaciente} anos\n`;
      if (convenio) message += `Convênio: ${convenio}\n`;
      message += `\n*DETALHES DA CONSULTA:*\n`;
      message += `Valor: ${valorConsulta}\n`;
      message += `Forma de pagamento: ${pagamentoSelecionado.nome}\n`;
      if (observacoes) message += `Observações: ${observacoes}\n`;

      const phoneNumber = "5547984747598";
      window.open(`http://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
      
      setHorario(initialHorario || '');
      setNomeResponsavel('');
      setCpfOuRgResponsavel('');
      setTelefoneResponsavel('');
      setEmailResponsavel('');
      setNomePaciente('');
      setIdadePaciente('');
      setConvenio('');
      setObservacoes('');
      setPagamentoSelecionado(null);
      setMostrarOpcoesPagamento(false);
      setErroHorario('');
      setErroNomeResponsavel('');
      setErroCpfOuRgResponsavel('');
      setErroTelefoneResponsavel('');
      setErroNomePaciente('');
      setErroIdadePaciente('');
      setErroPagamento('');
      onClose();
    }
  };

  const selecionarPagamento = (forma) => {
    setPagamentoSelecionado(forma);
    setErroPagamento("");
    setMostrarOpcoesPagamento(false);
  };

  const styles = {
    popupContainer: "fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in",
    popupContent: "bg-white rounded-2xl shadow-3xl max-w-full lg:max-w-3xl w-full p-8 animate-zoom-in transform transition-all duration-300 ease-out max-h-[90vh] overflow-y-auto", 
    title: "text-3xl font-extrabold text-[#004d4d] mb-6 text-center tracking-tight",
    detailsContainer: "mb-6 p-6 bg-gradient-to-br from-[#e6f7ff] to-[#d0edff] rounded-xl space-y-4 border border-[#cceeff] shadow-inner",
    detailItem: "flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0",
    detailLabel: "font-semibold text-[#3a4a58] text-lg",
    detailValue: "text-[#102a43] text-lg font-medium",
    valorConsulta: "text-2xl font-extrabold text-[#006e7a]",
    sectionTitle: "text-xl font-bold text-[#007b8a] mb-4 border-b pb-2 border-gray-200",
    inputBase: "w-full border rounded-lg px-4 py-3 text-base focus:ring-3 focus:ring-[#00aacc] focus:border-[#00aacc] outline-none transition duration-300 ease-in-out shadow-sm",
    inputError: "border-red-600 ring-red-200",
    errorText: "text-sm text-red-600 mt-2 font-medium",
    basePaymentButton: "flex items-center justify-between gap-3 bg-white hover:bg-[#f0faff] text-gray-800 py-3.5 px-5 rounded-lg text-left transition-all border shadow-sm w-full font-medium text-lg",
    paymentSelected: "bg-[#d9efff] text-gray-900 border-[#0099cc] shadow-md ring-2 ring-[#00aacc]",
    paymentDefaultBorder: "border-gray-300 hover:border-[#00aacc]",
    paymentErrorBorder: "border-red-500",
    paymentOptionsContainer: "flex flex-col gap-4 mt-3 animate-fade-in",
    paymentIcon: "text-3xl",
    chevronIcon: "text-gray-500 transition-transform duration-300",
    confirmButton: "flex items-center justify-center gap-3 bg-[#28a745] hover:bg-[#218838] text-white font-extrabold py-3.5 px-6 rounded-lg w-full transition-all shadow-lg hover:shadow-xl text-lg",
    closeButton: "bg-white hover:bg-gray-50 text-[#007bff] font-bold py-3 px-4 rounded-lg w-full transition-all border-2 border-[#007bff] hover:border-[#0056b3] text-lg mt-4",
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className={styles.popupContainer}>
        <div className={styles.popupContent}>
          <h2 className={styles.title}>Confirme seu agendamento</h2>
          
          <div className={styles.detailsContainer}>
            <p className="font-semibold text-[#008E9A] mb-2">Detalhes do Agendamento</p>
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
                <span className={styles.detailLabel}>Valor:</span>
                <span className={styles.valorConsulta}>{valorConsulta}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Horário:</span>
                <span className={styles.detailValue}>{horario}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <div className="mb-4">
                <h3 className={styles.sectionTitle}>Dados do Responsável</h3>
                <label htmlFor="nomeResponsavel" className="block text-sm font-semibold text-gray-700 mb-1">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  id="nomeResponsavel"
                  type="text"
                  placeholder="Nome completo do responsável"
                  className={`${styles.inputBase} ${erroNomeResponsavel ? styles.inputError : 'border-gray-300'}`}
                  value={nomeResponsavel}
                  onChange={(e) => {
                    setNomeResponsavel(e.target.value);
                    setErroNomeResponsavel("");
                  }}
                />
                {erroNomeResponsavel && <p className={styles.errorText}>{erroNomeResponsavel}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="cpfOuRgResponsavel" className="block text-sm font-semibold text-gray-700 mb-1">
                  CPF ou RG <span className="text-red-500">*</span>
                </label>
                <input
                  id="cpfOuRgResponsavel"
                  type="text"
                  placeholder="Ex: 123.456.789-00 ou MG-12.345.678"
                  className={`${styles.inputBase} ${erroCpfOuRgResponsavel ? styles.inputError : 'border-gray-300'}`}
                  value={cpfOuRgResponsavel}
                  onChange={(e) => {
                    setCpfOuRgResponsavel(e.target.value);
                    setErroCpfOuRgResponsavel("");
                  }}
                />
                {erroCpfOuRgResponsavel && <p className={styles.errorText}>{erroCpfOuRgResponsavel}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="telefoneResponsavel" className="block text-sm font-semibold text-gray-700 mb-1">
                  Telefone de Contato <span className="text-red-500">*</span>
                </label>
                <input
                  id="telefoneResponsavel"
                  type="tel"
                  placeholder="(DD) XXXXX-XXXX"
                  className={`${styles.inputBase} ${erroTelefoneResponsavel ? styles.inputError : 'border-gray-300'}`}
                  value={telefoneResponsavel}
                  onChange={(e) => {
                    setTelefoneResponsavel(e.target.value);
                    setErroTelefoneResponsavel("");
                  }}
                />
                {erroTelefoneResponsavel && <p className={styles.errorText}>{erroTelefoneResponsavel}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="emailResponsavel" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email do Responsável (Opcional)
                </label>
                <input
                  id="emailResponsavel"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  className={`${styles.inputBase} border-gray-300`}
                  value={emailResponsavel}
                  onChange={(e) => setEmailResponsavel(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <h3 className={styles.sectionTitle}>Dados do Paciente</h3>
                <label htmlFor="nomePaciente" className="block text-sm font-semibold text-gray-700 mb-1">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  id="nomePaciente"
                  type="text"
                  placeholder="Nome completo do paciente"
                  className={`${styles.inputBase} ${erroNomePaciente ? styles.inputError : 'border-gray-300'}`}
                  value={nomePaciente}
                  onChange={(e) => {
                    setNomePaciente(e.target.value);
                    setErroNomePaciente("");
                  }}
                />
                {erroNomePaciente && <p className={styles.errorText}>{erroNomePaciente}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="idadePaciente" className="block text-sm font-semibold text-gray-700 mb-1">
                  Idade do Paciente <span className="text-red-500">*</span>
                </label>
                <input
                  id="idadePaciente"
                  type="number"
                  placeholder="Ex: 35"
                  className={`${styles.inputBase} ${erroIdadePaciente ? styles.inputError : 'border-gray-300'}`}
                  value={idadePaciente}
                  onChange={(e) => {
                    setIdadePaciente(e.target.value);
                    setErroIdadePaciente("");
                  }}
                />
                {erroIdadePaciente && <p className={styles.errorText}>{erroIdadePaciente}</p>}
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label htmlFor="convenio" className="block text-sm font-semibold text-gray-700 mb-1">
                  Convênio/Plano de Saúde (Opcional)
                </label>
                <select
                  id="convenio"
                  className={`${styles.inputBase} border-gray-300`}
                  value={convenio}
                  onChange={(e) => setConvenio(e.target.value)}
                >
                  <option value="">Selecione (Particular se não tiver)</option>
                  <option value="Particular">Particular</option>
                  <option value="Unimed">Unimed</option>
                  <option value="Bradesco Saude">Bradesco Saúde</option>
                  <option value="SulAmerica">SulAmérica</option>
                </select>
              </div>

              <div className="mb-6">
                <h3 className={styles.sectionTitle}>
                  Selecione a forma de pagamento <span className="text-red-500">*</span>
                </h3>
                
                {!mostrarOpcoesPagamento ? (
                  <button
                    onClick={() => setMostrarOpcoesPagamento(true)}
                    className={`${styles.basePaymentButton} ${pagamentoSelecionado ? styles.paymentSelected : styles.paymentDefaultBorder} ${erroPagamento ? styles.paymentErrorBorder : ''}`}
                    aria-expanded={mostrarOpcoesPagamento}
                  >
                    <div className="flex items-center gap-3">
                      {pagamentoSelecionado ? (
                        <>
                          <span className={styles.paymentIcon}>{pagamentoSelecionado.icone}</span>
                          {pagamentoSelecionado.nome}
                        </>
                      ) : (
                        'Clique para selecionar uma forma de pagamento'
                      )}
                    </div>
                    <svg
                      className={`${styles.chevronIcon} ${mostrarOpcoesPagamento ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                ) : (
                  <div className={styles.paymentOptionsContainer}>
                    {formasPagamento.map((forma) => (
                      <button
                        key={forma.id}
                        onClick={() => selecionarPagamento(forma)}
                        className={`${styles.basePaymentButton} ${pagamentoSelecionado && pagamentoSelecionado.id === forma.id ? styles.paymentSelected : styles.paymentDefaultBorder}`}
                      >
                        <span className={styles.paymentIcon}>{forma.icone}</span>
                        {forma.nome}
                      </button>
                    ))}
                  </div>
                )}
                {erroPagamento && <p className={`${styles.errorText} text-center`}>{erroPagamento}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="observacoes" className="block text-sm font-semibold text-gray-700 mb-1">
                  Observações Adicionais (Opcional)
                </label>
                <textarea
                  id="observacoes"
                  placeholder="Alguma informação extra para o médico ou secretária?"
                  rows="3"
                  className={`${styles.inputBase} border-gray-300 resize-y`}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className={styles.sectionTitle}>Finalizar agendamento</h3>
            <button
              onClick={handleConfirmClick}
              className={styles.confirmButton}
            >
              <WhatsAppIcon />
              Confirmar Agendamento via WhatsApp
            </button>
          </div>

          <button
            onClick={onClose}
            className={styles.closeButton}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

AgendamentoPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmBooking: PropTypes.func.isRequired,
  medico: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  horario: PropTypes.string.isRequired,
};

export default AgendamentoPopup;