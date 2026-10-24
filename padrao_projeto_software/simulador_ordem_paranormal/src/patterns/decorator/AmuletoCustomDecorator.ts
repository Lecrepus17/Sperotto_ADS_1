import { AMULETOS_PADRAO } from '../../data/presetsOrdem';
import {
  ConfigAmuletoDecorator,
  DadoIndividual,
  DetalheDecoratorAplicado,
  rolarDado,
} from '../../types/Elementos';
import { Entidade } from '../factory/Entidade';
import { EquipamentoDecorator } from './EquipamentoDecorator';

export class AmuletoCustomDecorator extends EquipamentoDecorator {
  private readonly configAmuleto: ConfigAmuletoDecorator;

  constructor(
    entidadeEnvolvida: Entidade,
    configAmuleto: ConfigAmuletoDecorator = AMULETOS_PADRAO[0]
  ) {
    super(entidadeEnvolvida);
    this.configAmuleto = { ...configAmuleto };
  }

  public getConfigAmuleto(): ConfigAmuletoDecorator {
    return this.configAmuleto;
  }

  public override getDefesaTotal(): number {
    return super.getDefesaTotal() + this.configAmuleto.bonusDefesa;
  }

  public override getRDTotal(): number {
    return super.getRDTotal() + this.configAmuleto.bonusRD;
  }

  public override getAmuletosEquipados(): ConfigAmuletoDecorator[] {
    return [...super.getAmuletosEquipados(), this.configAmuleto];
  }

  public override avaliarDecoratorsParaAtaque(): DetalheDecoratorAplicado[] {
    const anteriores = super.avaliarDecoratorsParaAtaque();
    const dadosExtrasRolados: DadoIndividual[] = [];

    for (let i = 0; i < Math.max(0, this.configAmuleto.qtdDadosExtras); i++) {
      dadosExtrasRolados.push({
        faces: this.configAmuleto.faceDadoExtra,
        valor: rolarDado(this.configAmuleto.faceDadoExtra),
        origem: 'DECORATOR',
        rotulo: this.configAmuleto.nome,
      });
    }

    const subtotalDadosExtras = dadosExtrasRolados.reduce(
      (acc, d) => acc + d.valor,
      0
    );

    const detalheAtual: DetalheDecoratorAplicado = {
      id: this.configAmuleto.id,
      nome: this.configAmuleto.nome,
      emoji: this.configAmuleto.emoji,
      elemento: this.configAmuleto.elemento,
      bonusFixoDano: this.configAmuleto.bonusDanoFixo,
      dadosExtrasRolados,
      subtotalDadosExtras,
      bonusAcerto: this.configAmuleto.bonusAcerto,
      bonusDefesa: this.configAmuleto.bonusDefesa,
      bonusRD: this.configAmuleto.bonusRD,
    };

    return [...anteriores, detalheAtual];
  }
}

/**
 * Alias de compatibilidade com o AmuletoDeForca clássico (+5 dano fixo).
 */
export class AmuletoDeForca extends AmuletoCustomDecorator {
  constructor(entidadeEnvolvida: Entidade) {
    super(entidadeEnvolvida, AMULETOS_PADRAO[0]);
  }
}

/**
 * Remove a camada mais externa de Decorator, se houver.
 */
export function removerUltimoDecorator(entidade: Entidade): Entidade {
  if (entidade instanceof EquipamentoDecorator) {
    return entidade.getEntidadeEnvolvida();
  }
  return entidade;
}

/**
 * Remove todos os Decorators empilhados e devolve a entidade base pura.
 */
export function removerTodosDecorators(entidade: Entidade): Entidade {
  let atual = entidade;
  while (atual instanceof EquipamentoDecorator) {
    atual = atual.getEntidadeEnvolvida();
  }
  return atual;
}
