import { StatusEncomenda } from '../../types/encomenda';
import { IEstadoEncomenda, TransicaoEstadoInvalidaError } from './IEstadoEncomenda';

/**
 * Estado final: encomenda cancelada.
 */
export class EstadoCancelada implements IEstadoEncomenda {
  readonly nome: StatusEncomenda = 'CANCELADA';

  transicoesPermitidas(): StatusEncomenda[] {
    return [];
  }

  iniciarRota(): IEstadoEncomenda {
    throw new TransicaoEstadoInvalidaError(
      'Não é possível iniciar rota para uma encomenda cancelada.'
    );
  }

  finalizarEntrega(): IEstadoEncomenda {
    throw new TransicaoEstadoInvalidaError(
      'Não é possível finalizar entrega de uma encomenda cancelada.'
    );
  }

  cancelar(): IEstadoEncomenda {
    throw new TransicaoEstadoInvalidaError('Esta encomenda já está cancelada.');
  }
}
