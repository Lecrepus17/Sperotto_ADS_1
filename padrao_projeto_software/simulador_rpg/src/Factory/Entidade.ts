import { EstrategiaAtaque, TipoDano } from "../Strategy/EstrategiaAtaque";

export interface Entidade {
    getNome(): string;
    getVida(): number;
    receberDano(dano: number): void;
    atacar(alvo?: Entidade): number;
    getEstrategia?(): EstrategiaAtaque | undefined;
    getTipoAtaque?(): TipoDano | undefined;
    setEstrategia?(estrategia: EstrategiaAtaque): void;
}
