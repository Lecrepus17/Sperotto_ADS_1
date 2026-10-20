export type TipoDano = 'FISICO' | 'PARANORMAL';

export interface AlvoCombate {
    getNome(): string;
    getTipoAtaque?(): TipoDano | undefined;
}

export interface EstrategiaAtaque {
    getTipo(): TipoDano;
    executar(danoBase?: number, alvo?: AlvoCombate): number;
}
