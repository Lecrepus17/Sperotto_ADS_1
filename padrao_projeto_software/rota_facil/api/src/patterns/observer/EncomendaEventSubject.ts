import { EventoEncomenda } from '../../types/encomenda';
import { IEncomendaObserver } from './IEncomendaObserver';

/**
 * Subject (Publicador) do padrão Observer.
 * Mantém a lista de observadores inscritos e notifica todos de forma desacoplada.
 */
export class EncomendaEventSubject {
  private readonly observers: IEncomendaObserver[] = [];

  inscrever(observer: IEncomendaObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  desinscrever(observer: IEncomendaObserver): void {
    const idx = this.observers.indexOf(observer);
    if (idx !== -1) {
      this.observers.splice(idx, 1);
    }
  }

  notificar(evento: EventoEncomenda): void {
    for (const observer of this.observers) {
      observer.atualizar(evento);
    }
  }
}
