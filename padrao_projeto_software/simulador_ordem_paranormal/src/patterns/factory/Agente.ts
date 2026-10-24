import { ConfigCombatente } from '../../types/Elementos';
import { EstrategiaAtaque } from '../strategy/EstrategiaAtaque';
import { PersonagemBase } from './PersonagemBase';
import { TipoEntidadeEnum } from './TipoEntidadeEnum';

export class Agente extends PersonagemBase {
  constructor(config: ConfigCombatente, estrategia: EstrategiaAtaque) {
    super({ ...config, tipo: 'AGENTE' }, estrategia);
  }

  public getTipoEntidade(): TipoEntidadeEnum {
    return TipoEntidadeEnum.AGENTE;
  }
}
