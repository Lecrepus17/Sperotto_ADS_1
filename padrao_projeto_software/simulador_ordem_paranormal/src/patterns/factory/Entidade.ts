import {
  ConfigAmuletoDecorator,
  ConfigCombatente,
  ConfigRegrasMesa,
  ElementoOrdem,
  ResultadoAcao,
} from '../../types/Elementos';
import { Observador } from '../observer/Observador';
import { CombatenteAlvo, EstrategiaAtaque } from '../strategy/EstrategiaAtaque';
import { TipoEntidadeEnum } from './TipoEntidadeEnum';

export interface Entidade extends CombatenteAlvo {
  getSubtitulo(): string;
  getTipoEntidade(): TipoEntidadeEnum;
  getConfigBase(): ConfigCombatente;
  inscrever(obs: Observador): void;
  notificar(mensagem: string): void;
  setEstrategia(estrategia: EstrategiaAtaque): void;
  getEstrategia(): EstrategiaAtaque;
  getTipoAtaque(): ElementoOrdem;
  atacar(alvo: Entidade, regras?: ConfigRegrasMesa): ResultadoAcao;
  getAmuletosEquipados(): ConfigAmuletoDecorator[];
  resetarStatus(): void;
  estaVivo(): boolean;
  estaMachucado(): boolean;
  estaEnlouquecendo(): boolean;
}
