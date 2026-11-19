import crypto from 'crypto';
import { EventoEncomenda, NotificacaoSimulada } from '../../types/encomenda';
import { IEncomendaObserver } from './IEncomendaObserver';

/**
 * ConcreteObserver 2: simula envio automático de notificação (WhatsApp/SMS) ao cliente.
 */
export class NotificacaoClienteObserver implements IEncomendaObserver {
  readonly nome = 'NotificacaoClienteObserver';

  constructor(private readonly aoNotificar: (notificacao: NotificacaoSimulada) => void) {}

  atualizar(evento: EventoEncomenda): void {
    const { encomenda, tipo, statusNovo, ocorridoEm } = evento;
    const canal: 'WhatsApp' | 'SMS' =
      encomenda.modalidade === 'EXPRESSA' || encomenda.adicionais.includes('URGENCIA')
        ? 'WhatsApp'
        : 'SMS';

    let mensagem: string;
    if (tipo === 'ENCOMENDA_CRIADA') {
      mensagem = `Olá, ${encomenda.cliente}! Sua encomenda ${encomenda.codigo} foi registrada na RotaFácil. Prazo estimado: ${encomenda.prazoHoras}h.`;
    } else if (statusNovo === 'EM_ROTA') {
      mensagem = `Olá, ${encomenda.cliente}! Sua encomenda ${encomenda.codigo} saiu para entrega rumo a ${encomenda.destino}.`;
    } else if (statusNovo === 'ENTREGUE') {
      mensagem = `Entrega confirmada! A encomenda ${encomenda.codigo} foi entregue com sucesso em ${encomenda.destino}. Obrigado por escolher a RotaFácil!`;
    } else {
      mensagem = `Atenção, ${encomenda.cliente}: a encomenda ${encomenda.codigo} foi cancelada. Em caso de dúvida, fale com nossa central.`;
    }

    const notificacao: NotificacaoSimulada = {
      id: `not-${crypto.randomUUID().slice(0, 8)}`,
      encomendaId: encomenda.id,
      codigoEncomenda: encomenda.codigo,
      destinatario: encomenda.cliente,
      contato: encomenda.contatoCliente,
      canal,
      mensagem,
      enviadaEm: ocorridoEm,
    };

    this.aoNotificar(notificacao);
  }
}
