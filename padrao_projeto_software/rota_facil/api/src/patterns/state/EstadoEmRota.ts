import { StatusEncomenda } from '../../types/encomenda';
import { EstadoCancelada } from './EstadoCancelada';
import { EstadoEntregue } from './EstadoEntregue';
import { IEstadoEncomenda, TransicaoEstadoInvalidaError } from './IEstadoEncomenda';

/**
 * Estado intermediário: encomenda saiu para entrega com o entregador.
 */
export class EstadoEmRota implements IEstadoEncomenda {
  readonly nome: StatusEncomenda = 'EM_ROTA';

  transicoesPermitidas(): StatusEncomenda[] {
    return ['ENTREGUE', 'CANCELADA'];
  }

  iniciarRota(): IEstadoEncomenda {
    throw new TransicaoEstadoInvalidaError('A encomenda já está em rota de entrega.');
  }

  finalizarEntrega(): IEstadoEncomenda {
    return new EstadoEntregue();
  }

  cancelar(): IEstadoEncomenda {
    return new EstadoCancelada();
  }
}
