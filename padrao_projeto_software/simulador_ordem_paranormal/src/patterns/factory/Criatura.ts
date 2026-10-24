import { ConfigCombatente } from '../../types/Elementos';
import { EstrategiaAtaque } from '../strategy/EstrategiaAtaque';
import { PersonagemBase } from './PersonagemBase';
import { TipoEntidadeEnum } from './TipoEntidadeEnum';

export class Criatura extends PersonagemBase {
  constructor(config: ConfigCombatente, estrategia: EstrategiaAtaque) {
    super({ ...config, tipo: 'CRIATURA' }, estrategia);
  }

  public getTipoEntidade(): TipoEntidadeEnum {
    return TipoEntidadeEnum.CRIATURA;
  }
}
