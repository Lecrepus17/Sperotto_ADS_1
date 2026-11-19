import { StatusEncomenda } from '../../types/encomenda';
import { EstadoCancelada } from './EstadoCancelada';
import { EstadoEmRota } from './EstadoEmRota';
import { IEstadoEncomenda, TransicaoEstadoInvalidaError } from './IEstadoEncomenda';

/**
 * Estado inicial: encomenda registrada e aguardando despacho.
 */
export class EstadoPendente implements IEstadoEncomenda {
  readonly nome: StatusEncomenda = 'PENDENTE';

  transicoesPermitidas(): StatusEncomenda[] {
    return ['EM_ROTA', 'CANCELADA'];
  }

  iniciarRota(): IEstadoEncomenda {
    return new EstadoEmRota();
  }

  finalizarEntrega(): IEstadoEncomenda {
    throw new TransicaoEstadoInvalidaError(
      'Uma encomenda pendente precisa entrar em rota antes de ser marcada como entregue.'
    );
  }

  cancelar(): IEstadoEncomenda {
    return new EstadoCancelada();
  }
}
