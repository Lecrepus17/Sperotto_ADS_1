import { ItemComposicaoFrete } from '../../types/encomenda';
import { FreteDecorator } from './FreteDecorator';
import { ICalculoFrete } from './ICalculoFrete';

/**
 * ConcreteDecorator: adiciona prioridade na fila de despacho, reduzindo o prazo pela metade.
 */
export class UrgenciaDecorator extends FreteDecorator {
  private static readonly TAXA_URGENCIA = 18;

  constructor(componente: ICalculoFrete) {
    super(componente);
  }

  calcularTaxa(): number {
    return Number((super.calcularTaxa() + UrgenciaDecorator.TAXA_URGENCIA).toFixed(2));
  }

  calcularPrazoHoras(): number {
    return Math.max(1, Math.ceil(super.calcularPrazoHoras() / 2));
  }

  descreverItens(): ItemComposicaoFrete[] {
    return [
      ...super.descreverItens(),
      {
        nome: 'Prioridade / Urgência',
        valor: UrgenciaDecorator.TAXA_URGENCIA,
        detalhe: 'Saída prioritária (reduz o prazo pela metade, mínimo 1h)',
      },
    ];
  }
}
