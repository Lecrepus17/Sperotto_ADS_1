import { BattleLogger } from '../Singleton/BattleLogger';
import { Observador } from './Observador';

export class MestreDeJogo implements Observador {
  atualizar(mensagem: string): void {
    BattleLogger.getInstancia().log(`[ALERTA DO MESTRE] ${mensagem}`, 'MESTRE');
  }
}
