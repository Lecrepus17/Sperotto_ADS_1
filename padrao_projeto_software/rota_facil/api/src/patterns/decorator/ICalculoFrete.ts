import { ItemComposicaoFrete } from '../../types/encomenda';

/**
 * Interface Component do padrão Decorator.
 * Define o contrato comum para o cálculo base de frete e para cada adicional componível.
 */
export interface ICalculoFrete {
  calcularTaxa(): number;
  calcularPrazoHoras(): number;
  descreverItens(): ItemComposicaoFrete[];
}
