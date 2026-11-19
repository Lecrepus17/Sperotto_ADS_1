export type ModalidadeEntrega = 'PADRAO' | 'EXPRESSA' | 'BALCAO';

export type StatusEncomenda = 'PENDENTE' | 'EM_ROTA' | 'ENTREGUE' | 'CANCELADA';

export type AdicionalFrete = 'SEGURO' | 'FRAGIL' | 'URGENCIA';

export interface ItemComposicaoFrete {
  nome: string;
  valor: number;
  detalhe: string;
}

export interface ResultadoFrete {
  taxaTotal: number;
  prazoHoras: number;
  itens: ItemComposicaoFrete[];
}

export interface Encomenda {
  id: string;
  codigo: string;
  cliente: string;
  contatoCliente: string;
  origem: string;
  destino: string;
  pesoKg: number;
  valorDeclarado: number;
  modalidade: ModalidadeEntrega;
  adicionais: AdicionalFrete[];
  taxaEntrega: number;
  prazoHoras: number;
  composicaoFrete: ItemComposicaoFrete[];
  status: StatusEncomenda;
  criadaEm: string;
  atualizadaEm: string;
}

export interface EncomendaComTransicoes extends Encomenda {
  transicoesPermitidas: StatusEncomenda[];
}

export interface CriarEncomendaDTO {
  codigo?: string;
  cliente: string;
  contatoCliente: string;
  origem: string;
  destino: string;
  pesoKg: number;
  valorDeclarado: number;
  modalidade: ModalidadeEntrega;
  adicionais?: AdicionalFrete[];
}

export interface SimularFreteDTO {
  pesoKg: number;
  valorDeclarado: number;
  modalidade: ModalidadeEntrega;
  adicionais?: AdicionalFrete[];
}

export type TipoEventoEncomenda = 'ENCOMENDA_CRIADA' | 'STATUS_ALTERADO';

export interface EventoEncomenda {
  tipo: TipoEventoEncomenda;
  encomenda: Encomenda;
  statusAnterior?: StatusEncomenda;
  statusNovo: StatusEncomenda;
  observacao?: string;
  ocorridoEm: string;
}

export interface RegistroAuditoria {
  id: string;
  tipoEvento: TipoEventoEncomenda;
  encomendaId: string;
  codigoEncomenda: string;
  cliente: string;
  statusAnterior?: StatusEncomenda;
  statusNovo: StatusEncomenda;
  resumo: string;
  ocorridoEm: string;
}

export interface NotificacaoSimulada {
  id: string;
  encomendaId: string;
  codigoEncomenda: string;
  destinatario: string;
  contato: string;
  canal: 'WhatsApp' | 'SMS';
  mensagem: string;
  enviadaEm: string;
}

export interface BancoLocal {
  encomendas: Encomenda[];
  auditoria: RegistroAuditoria[];
  notificacoes: NotificacaoSimulada[];
}
