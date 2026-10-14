export interface Entidade {
    getNome(): string;
    getVida(): number;
    receberDano(dano: number): void;
    atacar(): number;
}