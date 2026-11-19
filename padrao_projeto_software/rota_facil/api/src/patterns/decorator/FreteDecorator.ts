import { ItemComposicaoFrete } from '../../types/encomenda';
import { ICalculoFrete } from './ICalculoFrete';

/**
 * Decorator abstrato base.
 * Envolve qualquer implementação de ICalculoFrete e delega as chamadas por padrão.
 */
export abstract class FreteDecorator implements ICalculoFrete {
  constructor(protected readonly componente: ICalculoFrete) {}

  calcularTaxa(): number {
    return this.componente.calcularTaxa();
  }

  calcularPrazoHoras(): number {
    return this.componente.calcularPrazoHoras();
  }

  descreverItens(): ItemComposicaoFrete[] {
    return this.componente.descreverItens();
  }
}
