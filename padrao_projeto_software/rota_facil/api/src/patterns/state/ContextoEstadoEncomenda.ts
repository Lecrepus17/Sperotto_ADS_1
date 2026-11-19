import { StatusEncomenda } from '../../types/encomenda';
import { EstadoCancelada } from './EstadoCancelada';
import { EstadoEmRota } from './EstadoEmRota';
import { EstadoEntregue } from './EstadoEntregue';
import { EstadoPendente } from './EstadoPendente';
import { IEstadoEncomenda, TransicaoEstadoInvalidaError } from './IEstadoEncomenda';

/**
 * Contexto do padrão State.
 * Delega todas as regras de transição para o estado concreto atual da encomenda.
 */
export class ContextoEstadoEncomenda {
  private estadoAtual: IEstadoEncomenda;

  constructor(statusInicial: StatusEncomenda) {
    this.estadoAtual = ContextoEstadoEncomenda.criarEstado(statusInicial);
  }

  private static criarEstado(status: StatusEncomenda): IEstadoEncomenda {
    switch (status) {
      case 'PENDENTE':
        return new EstadoPendente();
      case 'EM_ROTA':
        return new EstadoEmRota();
      case 'ENTREGUE':
        return new EstadoEntregue();
      case 'CANCELADA':
        return new EstadoCancelada();
    }
  }

  get status(): StatusEncomenda {
    return this.estadoAtual.nome;
  }

  transicoesPermitidas(): StatusEncomenda[] {
    return this.estadoAtual.transicoesPermitidas();
  }

  transicionarPara(novoStatus: StatusEncomenda): StatusEncomenda {
    switch (novoStatus) {
      case 'EM_ROTA':
        this.estadoAtual = this.estadoAtual.iniciarRota();
        break;
      case 'ENTREGUE':
        this.estadoAtual = this.estadoAtual.finalizarEntrega();
        break;
      case 'CANCELADA':
        this.estadoAtual = this.estadoAtual.cancelar();
        break;
      case 'PENDENTE':
        throw new TransicaoEstadoInvalidaError(
          `Não é permitido retornar a encomenda do status ${this.estadoAtual.nome} para PENDENTE.`
        );
    }

    return this.estadoAtual.nome;
  }
}
