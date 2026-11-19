import { StatusEncomenda } from '../../types/encomenda';
import { IEstadoEncomenda, TransicaoEstadoInvalidaError } from './IEstadoEncomenda';

/**
 * Estado final: encomenda já entregue ao destinatário.
 */
export class EstadoEntregue implements IEstadoEncomenda {
  readonly nome: StatusEncomenda = 'ENTREGUE';

  transicoesPermitidas(): StatusEncomenda[] {
    return [];
  }

  iniciarRota(): IEstadoEncomenda {
    throw new TransicaoEstadoInvalidaError(
      'Não é possível colocar em rota uma encomenda que já foi entregue.'
    );
  }

  finalizarEntrega(): IEstadoEncomenda {
    throw new TransicaoEstadoInvalidaError('Esta encomenda já foi entregue.');
  }

  cancelar(): IEstadoEncomenda {
    throw new TransicaoEstadoInvalidaError(
      'Não é possível cancelar uma encomenda que já foi entregue.'
    );
  }
}
