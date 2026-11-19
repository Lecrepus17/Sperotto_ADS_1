import { ItemComposicaoFrete, ModalidadeEntrega } from '../../types/encomenda';
import { ICalculoFrete } from './ICalculoFrete';

const CONFIG_MODALIDADE: Record<
  ModalidadeEntrega,
  { rotulo: string; taxaBase: number; valorPorKg: number; prazoHoras: number }
> = {
  PADRAO: {
    rotulo: 'Entrega Padrão',
    taxaBase: 15,
    valorPorKg: 2.5,
    prazoHoras: 24,
  },
  EXPRESSA: {
    rotulo: 'Entrega Expressa',
    taxaBase: 28,
    valorPorKg: 4,
    prazoHoras: 6,
  },
  BALCAO: {
    rotulo: 'Retirada no Balcão',
    taxaBase: 5,
    valorPorKg: 0,
    prazoHoras: 2,
  },
};

/**
 * ConcreteComponent do padrão Decorator.
 * Calcula a taxa e o prazo base conforme a modalidade escolhida e o peso da encomenda.
 */
export class FreteBase implements ICalculoFrete {
  constructor(
    private readonly modalidade: ModalidadeEntrega,
    private readonly pesoKg: number
  ) {}

  calcularTaxa(): number {
    const config = CONFIG_MODALIDADE[this.modalidade];
    const valor = config.taxaBase + this.pesoKg * config.valorPorKg;
    return Number(valor.toFixed(2));
  }

  calcularPrazoHoras(): number {
    return CONFIG_MODALIDADE[this.modalidade].prazoHoras;
  }

  descreverItens(): ItemComposicaoFrete[] {
    const config = CONFIG_MODALIDADE[this.modalidade];
    const detalhe =
      config.valorPorKg > 0
        ? `Base R$ ${config.taxaBase.toFixed(2)} + ${this.pesoKg.toFixed(1)} kg × R$ ${config.valorPorKg.toFixed(2)}/kg`
        : 'Taxa fixa de separação no balcão';

    return [
      {
        nome: config.rotulo,
        valor: this.calcularTaxa(),
        detalhe,
      },
    ];
  }
}
