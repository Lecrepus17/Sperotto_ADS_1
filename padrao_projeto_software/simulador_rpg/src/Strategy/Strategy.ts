import { BattleLogger } from "../Singleton/BattleLogger";
import { AlvoCombate, EstrategiaAtaque, TipoDano } from "./EstrategiaAtaque";

export class AtaqueParanormal implements EstrategiaAtaque {
    getTipo(): TipoDano {
        return 'PARANORMAL';
    }

    executar(danoBase: number = 0, alvo?: AlvoCombate): number {
        const d1 = Math.floor(Math.random() * 10) + 1;
        const d2 = Math.floor(Math.random() * 10) + 1;
        const rolagem = d1 + d2;
        let dano = danoBase + rolagem;
        const logger = BattleLogger.getInstancia();

        if (alvo && alvo.getTipoAtaque && alvo.getTipoAtaque() === 'FISICO') {
            dano = Math.max(1, Math.floor(dano / 2));
            logger.log(`Ataque paranormal executado (2d10: ${d1}+${d2} = ${rolagem}). ${alvo.getNome()} é Físico (resistente)! Dano reduzido pela metade: ${dano}.`);
        } else {
            logger.log(`Ataque paranormal executado (2d10: ${d1}+${d2} = ${rolagem}) causando ${dano} de dano crítico!`);
        }

        return dano;
    }
}
