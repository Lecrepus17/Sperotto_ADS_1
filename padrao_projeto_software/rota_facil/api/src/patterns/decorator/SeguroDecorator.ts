import { ItemComposicaoFrete } from '../../types/encomenda';
import { FreteDecorator } from './FreteDecorator';
import { ICalculoFrete } from './ICalculoFrete';

/**
 * ConcreteDecorator: adiciona seguro proporcional ao valor declarado da carga.
 */
export class SeguroDecorator extends FreteDecorator {
  private readonly valorSeguro: number;

  constructor(componente: ICalculoFrete, private readonly valorDeclarado: number) {
    super(componente);
    this.valorSeguro = Number(Math.max(6, valorDeclarado * 0.03).toFixed(2));
  }

  calcularTaxa(): number {
    return Number((super.calcularTaxa() + this.valorSeguro).toFixed(2));
  }

  descreverItens(): ItemComposicaoFrete[] {
    return [
      ...super.descreverItens(),
      {
        nome: 'Seguro de Carga',
        valor: this.valorSeguro,
        detalhe: `3% sobre R$ ${this.valorDeclarado.toFixed(2)} (mínimo R$ 6,00)`,
      },
    ];
  }
}
