import { BattleLogger } from "../Singleton/BattleLogger";
import { EstrategiaAtaque } from "./EstrategiaAtaque";

export class AtaqueParanormal implements EstrategiaAtaque {
    executar(danoBase: number): number {
        const dano = danoBase * 2;
        BattleLogger.getInstancia().log(`Ataque paranormal executado causando ${dano} de dano crítico!`);
        return dano;
    }
}