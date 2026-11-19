import crypto from 'crypto';
import { EventoEncomenda, RegistroAuditoria } from '../../types/encomenda';
import { IEncomendaObserver } from './IEncomendaObserver';

/**
 * ConcreteObserver 1: grava registro detalhado de auditoria para cada evento de encomenda.
 */
export class AuditoriaObserver implements IEncomendaObserver {
  readonly nome = 'AuditoriaObserver';

  constructor(private readonly aoRegistrar: (registro: RegistroAuditoria) => void) {}

  atualizar(evento: EventoEncomenda): void {
    const { encomenda, tipo, statusAnterior, statusNovo, observacao, ocorridoEm } = evento;

    let resumo: string;
    if (tipo === 'ENCOMENDA_CRIADA') {
      resumo = `Encomenda ${encomenda.codigo} cadastrada (${encomenda.modalidade}) para ${encomenda.cliente} — Taxa R$ ${encomenda.taxaEntrega.toFixed(2)}, prazo ${encomenda.prazoHoras}h.`;
    } else {
      resumo = `Status alterado de ${statusAnterior} para ${statusNovo}${observacao ? ` — Obs: ${observacao}` : ''}.`;
    }

    const registro: RegistroAuditoria = {
      id: `aud-${crypto.randomUUID().slice(0, 8)}`,
      tipoEvento: tipo,
      encomendaId: encomenda.id,
      codigoEncomenda: encomenda.codigo,
      cliente: encomenda.cliente,
      statusAnterior,
      statusNovo,
      resumo,
      ocorridoEm,
    };

    this.aoRegistrar(registro);
  }
}
