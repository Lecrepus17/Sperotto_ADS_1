import { StatusEncomenda } from '../../types/encomenda';

/**
 * Interface State do padrão State.
 * Cada estado concreto decide quais transições são válidas a partir dele.
 */
export interface IEstadoEncomenda {
  readonly nome: StatusEncomenda;
  transicoesPermitidas(): StatusEncomenda[];
  iniciarRota(): IEstadoEncomenda;
  finalizarEntrega(): IEstadoEncomenda;
  cancelar(): IEstadoEncomenda;
}

export class TransicaoEstadoInvalidaError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'TransicaoEstadoInvalidaError';
  }
}
