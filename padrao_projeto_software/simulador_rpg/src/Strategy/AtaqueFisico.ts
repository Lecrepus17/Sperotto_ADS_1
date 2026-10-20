import { BattleLogger } from "../Singleton/BattleLogger";
import { AlvoCombate, EstrategiaAtaque, TipoDano } from "./EstrategiaAtaque";

export class AtaqueFisico implements EstrategiaAtaque {
    getTipo(): TipoDano {
        return 'FISICO';
    }

    executar(danoBase: number = 0, alvo?: AlvoCombate): number {
        const d20 = Math.floor(Math.random() * 20) + 1;
        let dano = danoBase + d20;
        const logger = BattleLogger.getInstancia();

        if (alvo && alvo.getTipoAtaque && alvo.getTipoAtaque() === 'PARANORMAL') {
            dano = Math.max(1, Math.floor(dano / 2));
            logger.log(`Ataque físico realizado (1d20 = ${d20}). ${alvo.getNome()} é Paranormal (resistente)! Dano reduzido pela metade: ${dano}.`);
        } else {
            logger.log(`Ataque físico realizado (1d20 = ${d20}) causando ${dano} de dano.`);
        }

        return dano;
    }
}
