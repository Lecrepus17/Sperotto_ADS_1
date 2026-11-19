import { AdicionalFrete, ModalidadeEntrega, ResultadoFrete } from '../../types/encomenda';
import { EmbalagemFragilDecorator } from './EmbalagemFragilDecorator';
import { FreteBase } from './FreteBase';
import { ICalculoFrete } from './ICalculoFrete';
import { SeguroDecorator } from './SeguroDecorator';
import { UrgenciaDecorator } from './UrgenciaDecorator';

/**
 * Compõe dinamicamente o frete base com todos os decorators selecionados.
 */
export function calcularFreteComDecorators(
  modalidade: ModalidadeEntrega,
  pesoKg: number,
  valorDeclarado: number,
  adicionais: AdicionalFrete[] = []
): ResultadoFrete {
  let calculadora: ICalculoFrete = new FreteBase(modalidade, pesoKg);
  const adicionaisUnicos = Array.from(new Set(adicionais));

  for (const adicional of adicionaisUnicos) {
    if (adicional === 'SEGURO') {
      calculadora = new SeguroDecorator(calculadora, valorDeclarado);
    } else if (adicional === 'FRAGIL') {
      calculadora = new EmbalagemFragilDecorator(calculadora);
    } else if (adicional === 'URGENCIA') {
      calculadora = new UrgenciaDecorator(calculadora);
    }
  }

  return {
    taxaTotal: calculadora.calcularTaxa(),
    prazoHoras: calculadora.calcularPrazoHoras(),
    itens: calculadora.descreverItens(),
  };
}
