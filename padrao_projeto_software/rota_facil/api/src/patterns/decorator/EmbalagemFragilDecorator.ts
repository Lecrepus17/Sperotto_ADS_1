import { ItemComposicaoFrete } from '../../types/encomenda';
import { FreteDecorator } from './FreteDecorator';
import { ICalculoFrete } from './ICalculoFrete';

/**
 * ConcreteDecorator: adiciona manuseio e embalagem reforçada para itens frágeis.
 */
export class EmbalagemFragilDecorator extends FreteDecorator {
  private static readonly TAXA_FRAGIL = 12;
  private static readonly HORAS_PREPARO = 1;

  constructor(componente: ICalculoFrete) {
    super(componente);
  }

  calcularTaxa(): number {
    return Number((super.calcularTaxa() + EmbalagemFragilDecorator.TAXA_FRAGIL).toFixed(2));
  }

  calcularPrazoHoras(): number {
    return super.calcularPrazoHoras() + EmbalagemFragilDecorator.HORAS_PREPARO;
  }

  descreverItens(): ItemComposicaoFrete[] {
    return [
      ...super.descreverItens(),
      {
        nome: 'Embalagem Frágil',
        valor: EmbalagemFragilDecorator.TAXA_FRAGIL,
        detalhe: 'Proteção reforçada (+1h de preparo cuidadoso)',
      },
    ];
  }
}
