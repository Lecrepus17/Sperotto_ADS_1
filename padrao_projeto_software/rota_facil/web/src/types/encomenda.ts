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
  transicoesPermitidas: StatusEncomenda[];
  criadaEm: string;
  atualizadaEm: string;
}

export interface CriarEncomendaPayload {
  codigo?: string;
  cliente: string;
  contatoCliente: string;
  origem: string;
  destino: string;
  pesoKg: number;
  valorDeclarado: number;
  modalidade: ModalidadeEntrega;
  adicionais: AdicionalFrete[];
}

export interface SimularFretePayload {
  pesoKg: number;
  valorDeclarado: number;
  modalidade: ModalidadeEntrega;
  adicionais: AdicionalFrete[];
}

export interface RegistroAuditoria {
  id: string;
  tipoEvento: 'ENCOMENDA_CRIADA' | 'STATUS_ALTERADO';
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
