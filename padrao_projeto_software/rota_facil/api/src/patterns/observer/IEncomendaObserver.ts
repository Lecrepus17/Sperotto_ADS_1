import { EventoEncomenda } from '../../types/encomenda';

/**
 * Interface Observer do padrão Observer.
 * Qualquer reação automática (auditoria, notificação, métricas etc.) implementa este contrato.
 */
export interface IEncomendaObserver {
  readonly nome: string;
  atualizar(evento: EventoEncomenda): void;
}
