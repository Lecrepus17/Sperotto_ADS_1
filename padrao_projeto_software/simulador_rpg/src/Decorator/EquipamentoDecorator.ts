import { Entidade } from "../Factory/Entidade";

export abstract class EquipamentoDecorator implements Entidade {
    constructor(protected entidadeEnvolvida: Entidade) {}

    getNome(): string { return this.entidadeEnvolvida.getNome(); }
    getVida(): number { return this.entidadeEnvolvida.getVida(); }
    receberDano(dano: number): void { this.entidadeEnvolvida.receberDano(dano); }
    
    abstract atacar(): number;
}