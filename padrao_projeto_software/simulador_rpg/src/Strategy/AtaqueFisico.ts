import { BattleLogger } from "../Singleton/BattleLogger";
import { EstrategiaAtaque } from "./EstrategiaAtaque";

export class AtaqueFisico implements EstrategiaAtaque {
    executar(danoBase: number): number {
        const dano = danoBase + Math.floor(Math.random() * 6);
        BattleLogger.getInstancia().log(`Ataque físico realizado causando ${dano} de dano.`);
        return dano;
    }
}