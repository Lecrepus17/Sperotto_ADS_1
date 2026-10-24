import { ACOES_PADRAO } from '../../data/presetsOrdem';
import { ConfigAcao, ConfigCombatente } from '../../types/Elementos';
import { AcaoOrdemStrategy } from '../strategy/AcaoOrdemStrategy';
import { EstrategiaAtaque } from '../strategy/EstrategiaAtaque';
import { Agente } from './Agente';
import { Criatura } from './Criatura';
import { Entidade } from './Entidade';
import { TipoEntidadeEnum } from './TipoEntidadeEnum';

export class EntidadeFactory {
  /**
   * Cria uma Entidade (Agente ou Criatura) a partir de um ConfigCombatente completo.
   */
  public static criarDeConfig(
    config: ConfigCombatente,
    catalogoAcoes: ConfigAcao[] = ACOES_PADRAO,
    estrategiaCustom?: EstrategiaAtaque
  ): Entidade {
    const acaoEncontrada =
      catalogoAcoes.find((a) => a.id === config.acaoPadraoId) ??
      catalogoAcoes[0] ??
      ACOES_PADRAO[0];

    const estrategia =
      estrategiaCustom ?? new AcaoOrdemStrategy(acaoEncontrada);

    const configInstancia: ConfigCombatente = {
      ...config,
    };

    if (config.tipo === 'AGENTE') {
      return new Agente(configInstancia, estrategia);
    }
    return new Criatura(configInstancia, estrategia);
  }

  /**
   * Método clássico compatível com a assinatura original do Factory Method.
   */
  public static criarEntidade(
    tipo: TipoEntidadeEnum,
    nome: string,
    vida: number,
    estrategia: EstrategiaAtaque
  ): Entidade {
    const configSimplificada: ConfigCombatente = {
      id: `${tipo.toLowerCase()}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      nome,
      emoji: tipo === TipoEntidadeEnum.AGENTE ? '🕵️' : '🧟',
      tipo: tipo === TipoEntidadeEnum.AGENTE ? 'AGENTE' : 'CRIATURA',
      subtitulo:
        tipo === TipoEntidadeEnum.AGENTE
          ? 'Agente da Ordem'
          : 'Criatura do Outro Lado',
      elemento: estrategia.getTipo(),
      vidaMax: vida,
      peMax: 40,
      sanMax: 50,
      defesa: 15,
      rd: 2,
      dadosAtributoAcerto: 3,
      acaoPadraoId: estrategia.getConfig().id,
      amuletosIds: [],
    };

    if (tipo === TipoEntidadeEnum.AGENTE) {
      return new Agente(configSimplificada, estrategia);
    }
    return new Criatura(configSimplificada, estrategia);
  }
}
