import { Entidade } from "../Factory/Entidade";
import { EstrategiaAtaque, TipoDano } from "../Strategy/EstrategiaAtaque";

export abstract class EquipamentoDecorator implements Entidade {
    constructor(protected entidadeEnvolvida: Entidade) {}

    getNome(): string { return this.entidadeEnvolvida.getNome(); }
    getVida(): number { return this.entidadeEnvolvida.getVida(); }
    receberDano(dano: number): void { this.entidadeEnvolvida.receberDano(dano); }
    getEstrategia(): EstrategiaAtaque | undefined {
        return this.entidadeEnvolvida.getEstrategia?.();
    }
    getTipoAtaque(): TipoDano | undefined {
        return this.entidadeEnvolvida.getTipoAtaque?.();
    }
    setEstrategia(estrategia: EstrategiaAtaque): void {
        this.entidadeEnvolvida.setEstrategia?.(estrategia);
    }
    
    abstract atacar(alvo?: Entidade): number;
}
